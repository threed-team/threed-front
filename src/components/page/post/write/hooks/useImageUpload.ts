import { useEffect } from 'react';
import { api } from '@lib/api/api';

export function useImageUpload(
    editorRef: React.RefObject<any>,
    postId: number,
    setPostId: (id: number) => void // ✅ postId를 외부에서 갱신하기 위해 추가
) {
    useEffect(() => {
        const editorInstance = editorRef.current?.getInstance();
        if (!editorInstance) return;

        editorInstance.removeHook('addImageBlobHook');

        editorInstance.addHook('addImageBlobHook', async (blob: Blob) => {
            try {
                let currentPostId = postId;

                // ✅ postId가 1이면 서버에서 임시 글 생성
                if (currentPostId === 1) {
                    const res = await api.post<{ postId: number }>('/api/v1/member-posts');
                    currentPostId = res.postId;
                    setPostId(currentPostId); // 외부에서 상태 갱신
                    console.log('🆕 postId 생성됨:', currentPostId);
                }

                const blobUrl = URL.createObjectURL(blob);
                const ext = blob.type.split('/')[1] || 'png';
                const fileName = `image-${Date.now()}.${ext}`;
                const uniqueAlt = `uploading-${Date.now()}`;

                const tempMarkdown = `![${uniqueAlt}](${blobUrl})\n`;
                editorInstance.insertText(tempMarkdown);

                const { presignedUrl, fileUrl } = await api.post<{
                    presignedUrl: string;
                    fileUrl: string;
                }>(`/api/v1/member-posts/${currentPostId}/images`, {
                    fileName,
                });

                await fetch(presignedUrl, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': blob.type,
                    },
                    body: blob,
                });

                const markdown = editorInstance.getMarkdown();
                const escapedBlobUrl = blobUrl.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
                const updatedMarkdown = markdown.replace(
                    new RegExp(`!\\[${uniqueAlt}\\]\\(${escapedBlobUrl}\\)`, 'g'),
                    `![](${fileUrl})`
                );

                editorInstance.setMarkdown(updatedMarkdown);
            } catch (error) {
                console.error('이미지 업로드 실패:', error);
                alert('이미지 업로드 중 오류가 발생했습니다.');
            }
        });
    }, [editorRef, postId, setPostId]);
}
