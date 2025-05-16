import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

export type RequestOptions = AxiosRequestConfig;

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwiZXhwIjoxNzQ3MTExMDMwMDg0MDAwMDB9.nia_cJhFWfYgStl_X-3lkVoOWtfrXrM5B_aSy6E2lEw";

localStorage.setItem("access_token", token);

const getAccessToken = () => {
    return localStorage.getItem("access_token");

}

const axiosInstance = axios.create({
    baseURL: `https://dev-api.threed.site`,
    headers: {
        'Content-Type': 'application/json; charset=utf-8',
    }
});

axiosInstance.interceptors.request.use(
    (config) => {
        const accessToken = getAccessToken();

        console.log("accessToken:", accessToken);

        if (accessToken) {
            config.headers["Authorization"] = `${accessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export async function apiClient<T>(endpoint: string, options?: RequestOptions): Promise<T> {
    const response: AxiosResponse<T> = await axiosInstance({
        url: endpoint,
        ...options,
    });
    return response.data;
}
