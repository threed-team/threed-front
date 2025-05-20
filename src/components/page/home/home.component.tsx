'use client';

// import { useSearchParams, useRouter } from 'next/navigation';

// import { useEffect } from 'react';
import { useState } from 'react';
// import { useProd } from '@hooks/usePosts';
// import usePageData from './hooks/usePosts';
import IssuCardComponent from './components/IssueCard';
// import AllCardcomponent from './components/AllCard';
import Filteromponent from './components/Filter';
import UserStateomponent from './components/UserState';
import styles from './home.module.scss';

interface HomeProps {
    type: 'company' | 'member';
    condition?: 'WEEK' | 'MONTH';
}

export default function HomeComponent({ type }: HomeProps) {

    const [period, setPeriod] = useState<'WEEK' | 'MONTH'>('WEEK');

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        if (value === 'week') setPeriod('WEEK');
        else if (value === 'month') setPeriod('MONTH');
    };

    return (
        <main className={styles.inner}>
            {/* start */}
            {/* title - 가장 많이 읽은 글 */}
            <div className={styles.main_header}>
                <h2><span className={styles.ico_fire}></span>가장 많이 읽은 글</h2>
                <div className={styles.date_list}>
                    <select name="date" id="date-select" onChange={handleChange}>
                        <option value="week">일주일</option>
                        <option value="month">1개월</option>
                    </select>
                </div>
            </div>
            <IssuCardComponent type={type} condition={period} />
            <div className={styles.main_header}>
                <h2><span className={styles.ico_face}></span>새로운 기술을 확인해보세요.</h2>
            </div>
            <Filteromponent />
            <UserStateomponent />
            {/* end */}
        </main>
    );
};