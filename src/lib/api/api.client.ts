import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

export type RequestOptions = AxiosRequestConfig;

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwiZXhwIjoxNzQ3MTExMDMwMDg0MDAwMDB9.nia_cJhFWfYgStl_X-3lkVoOWtfrXrM5B_aSy6E2lEw";

if (typeof window !== 'undefined') {
    localStorage.setItem("access_token", token);
}

const axiosInstance = axios.create({
    baseURL: `https://dev-api.threed.site`,
    headers: {
        "Content-Type": "application/json;charset=utf-8",
    },
    withCredentials: true,
});

axiosInstance.interceptors.request.use(
    (config) => {

        //const accessToken = getSession('access_token')
        let accessToken = token;

        if (typeof window !== 'undefined') {
            const storedToken = localStorage.getItem("access_token");
            if (storedToken) {
                accessToken = storedToken;
            }
        }

        if (accessToken) {
            config.headers["Authorization"] = `Bearer ${accessToken}`;
        }

        //console.log('config', config)
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
    // console.log('response', response)
    return response.data;
}
