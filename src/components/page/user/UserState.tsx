// src/components/UserStateComponent.tsx
'use client';

import React, { useEffect, useState } from 'react';
import styles from './UserState.module.scss';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface UserInfo {
    id: string;
    email: string;
    name: string;
    picture?: string;
}

export default function UserStateComponent() {
    const [user, setUser] = useState<UserInfo | null>(null);
    const router = useRouter();

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/me`, {
            credentials: 'include',
        })
            .then((res) => (res.ok ? res.json() : null))
            .then(setUser)
            .catch(() => setUser(null));
    }, []);

    const logout = async () => {
        await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/logout`, {
            method: 'POST',
            credentials: 'include',
        });
        setUser(null);
        router.push('/login');
    };

    return (
        <div className={`${styles.user_state} ${user ? styles.on : styles.off}`}>
            {user ? (
                <>
                    <div className={styles.state_logout}>
                        <button type="button" onClick={logout}>
                            <i className={styles.ico_logout}></i>
                            <span>로그아웃</span>
                        </button>
                    </div>
                    <div className={styles.state_mypage}>
                        <Link href={'/userpage'}>
                            <i className={styles.ico_mypage}></i>
                            <span>마이페이지</span>
                        </Link>
                    </div>
                </>
            ) : null}
        </div>
    );
}