import { getAccessToken } from './useAuth';

export function isSession(): boolean {
    if (typeof window === "undefined") return false;
    return !!getAccessToken();
}
