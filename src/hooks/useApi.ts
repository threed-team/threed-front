// hooks/useApi.ts
import { useEffect, useState } from 'react';
import { apiClient, RequestOptions } from '@lib/api/api.client';

export function useApi<T>(
    endpoint: string,
    options?: RequestOptions,
    skip = false
) {
    const [data, setData] = useState<T | null>(null);
    const [error, setError] = useState<unknown>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (skip) return;

        const fetchData = async () => {
            setLoading(true);
            try {
                const result = await apiClient<T>(endpoint, options);
                setData(result);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [endpoint, JSON.stringify(options), skip]);

    return { data, error, loading };
}
