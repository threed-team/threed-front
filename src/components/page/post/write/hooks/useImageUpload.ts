import { useEffect } from 'react';
import { api } from '@lib/api/api';

export function useImageUpload(editorRef: React.RefObject<any>, postId: number) {
    useEffect(() => {
        const editorInstance = editorRef.current?.getInstance();
        if (!editorInstance) return;

        editorInstance.removeHook('addImageBlobHook');

        editorInstance.addHook(
            'addImageBlobHook',
            async (blob: Blob, callback: (url: string, altText: string) => void) => {
                try {
                    const blobUrl = URL.createObjectURL(blob);
                    const ext = blob.type.split('/')[1] || 'png';
                    const fileName = `image-${Date.now()}.${ext}`;
                    const uniqueAlt = `uploading-${Date.now()}`;

                    // ✅ 삽입 시 줄바꿈 1번만
                    const tempMarkdown = `![${uniqueAlt}](${blobUrl})\n`;
                    editorInstance.insertText(tempMarkdown);

                    const { presignedUrl, fileUrl } = await api.post<{
                        presignedUrl: string;
                        fileUrl: string;
                    }>(`/api/v1/member-posts/${postId}/images`, {
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
            }
        );
    }, [editorRef, postId]);
}
