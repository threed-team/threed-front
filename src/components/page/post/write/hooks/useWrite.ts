import { useCallback } from "react";
import { api } from "@lib/api/api";
import axios from "axios";

interface WriteFormData {
    title: string;
    content: string;
    field: string;
    skills: string[];
    image?: File;
}

export function useWrite() {
    const submit = useCallback(
        async (postId: number, data: WriteFormData, isNewPost: boolean): Promise<number | null> => {
            try {
                const isEmpty = (text: string) => !text || text.trim() === "";

                if (isEmpty(data.title)) {
                    alert("제목을 입력해주세요.");
                    return null;
                }
                if (data.title.length > 100) {
                    alert("제목의 텍스트가 너무 많습니다. (최대 100자)");
                    return null;
                }
                if (isEmpty(data.content)) {
                    alert("본문을 입력해주세요.");
                    return null;
                }
                if (data.content.length > 10000) {
                    alert("본문의 텍스트가 너무 많습니다. (최대 10,000자)");
                    return null;
                }

                let id = postId;

                if (isNewPost) {
                    const response = await api.post<{ postId: number }>("/api/v1/member-posts");
                    id = response.postId;
                    console.log("🆕 새 글 postId 생성됨:", id);
                } else {
                    try {
                        await api.get(`/api/v1/member-posts/${id}`);
                    } catch {
                        alert("❌ 게시물이 존재하지 않습니다.");
                        return null;
                    }
                }

                let imageUrl = "";
                if (data.image) {
                    const uploadInfo = await api.post<{ presignedUrl: string; fileUrl: string }>(
                        `/api/v1/member-posts/${id}/images`
                    );
                    await axios.put(uploadInfo.presignedUrl, data.image, {
                        headers: { "Content-Type": data.image.type },
                    });
                    imageUrl = uploadInfo.fileUrl;
                }

                const payload = {
                    title: data.title,
                    content: data.content,
                    field: data.field,
                    skills: data.skills,
                    thumbnailImageUrl: imageUrl,
                };

                const method = isNewPost ? "post" : "patch";
                await api[method](`/api/v1/member-posts/${id}`, payload);

                alert("✅ 게시물이 저장되었습니다.");
                return id;
            } catch (err) {
                console.error("❌ 게시물 저장 중 에러:", err);
                alert("❌ 저장 중 오류 발생");
                return null;
            }
        },
        []
    );

    return { submit };
}
