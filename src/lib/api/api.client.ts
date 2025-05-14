// lib/apiClient.ts
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

export type RequestOptions = AxiosRequestConfig;

const axiosInstance = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com',
    headers: {
        'Content-Type': 'application/json',
    },
});

export async function apiClient<T>(
    endpoint: string,
    options?: RequestOptions
): Promise<T> {
    const response: AxiosResponse<T> = await axiosInstance(endpoint, options);
    return response.data;
}
