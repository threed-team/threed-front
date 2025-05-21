// api/posts.ts
import { api } from '@lib/api/api'; // 실제 API 클라이언트 구현에 맞게 수정해야 함

interface Post {
    id: number;
    title: string;
    thumbnailImageUrl: string;
    field: string[];
    viewCount: number;
    author: {
        name: string;
        imageUrl: string;
    };
    skills: string[];
    createdAt: string;
    isNew: boolean;
    isHot: boolean;
    isCompany?: boolean;
}

interface PostResponse {
    elements: Post[];
    pageNumber: number;
    pageSize: number;
    totalCount: number;
    totalPage: number;
}

interface FilterOptions {
    skills?: string[];
    fields?: string[];
    keyword?: string;
}

// 필터 옵션을 기반으로 포스트를 가져오는 함수
export async function fetchPosts(
    type: 'company' | 'member',
    filters: FilterOptions = {}
): Promise<Post[]> {
    const params = new URLSearchParams();

    // 필터 옵션을 쿼리 파라미터로 변환
    if (filters.skills?.length) {
        filters.skills.forEach(skill => params.append('skills', skill));
    }

    if (filters.fields?.length) {
        filters.fields.forEach(field => params.append('fields', field));
    }

    if (filters.keyword && filters.keyword.trim() !== '') {
        params.append('keyword', filters.keyword);
    }

    try {
        // API 요청 수행
        const response = await api.get<PostResponse>(
            `/api/v1/${type}-posts/search?${params.toString()}`
        );

        return response.elements;
    } catch (error) {
        console.error('API 요청 중 오류 발생:', error);
        throw error;
    }
}