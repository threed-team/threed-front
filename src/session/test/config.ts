import { EnvHelper } from '@libraries/helpers/env'
/**
 * 세션 설정 관리
 */
export const SessionConfig = {
    COOKIE_NAME: EnvHelper.get<string>('SESSION_COOKIE_NAME', { required: true }),
    STORE_TYPE: EnvHelper.get<string>('SESSION_STORE_TYPE', { required: true }),
    MAX_AGE:  EnvHelper.get<number>('SESSION_MAX_AGE', { required: true }) * 1000, // 24시간
    CLEANUP_INTERVAL: EnvHelper.get<number>('SESSION_CLEANUP_INTERVAL', { required: true }) * 1000, // 세션 비우는 시간 Store TYPE이 memory 일때 1시간
    SECRET_KEY : EnvHelper.get<string>('SESSION_ENC_KEY', { required: true }),
    REDIS: {
        URL: EnvHelper.get<string>('REDIS_URL', { required: true }),
        PORT: EnvHelper.get<number>('REDIS_PORT', { required: true }),
        AUTH: EnvHelper.get<string>('REDIS_AUTH', { required: true }),
        PASSWORD: EnvHelper.get<string>('REDIS_PASSWORD', { required: true }),
        TLS: EnvHelper.get<boolean>('REDIS_TLS', { required: false, defaultValue: false }),
        CLUSTER_MODE: EnvHelper.get<boolean>('REDIS_CLUSTER', { required: false, defaultValue: false }),
    }
};