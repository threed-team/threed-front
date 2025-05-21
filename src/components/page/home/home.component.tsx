'use client';

import { useState, useEffect } from 'react';
import IssuCardComponent from './components/IssueCard';
import AllCardcomponent from './components/AllCard';
import FilterComponent from './components/Filter'; // 이름 수정
import { skillOptions, techStackOptions, companyOptions } from './constants/filterOptions';
import styles from './home.module.scss';
import { fetchPosts } from './hooks/apiPost'; // 데이터 요청 API 함수 (가정)

interface HomeProps {
    type: 'company' | 'member';
    condition?: 'WEEK' | 'MONTH';
}

export default function HomeComponent({ type }: HomeProps) {
    const [period, setPeriod] = useState<'WEEK' | 'MONTH'>('WEEK');
    const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
    const [selectedFields, setSelectedFields] = useState<string[]>([]);
    const [keyword, setKeyword] = useState<string>('');
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const fieldFilterOptions = type === 'company' ? companyOptions : techStackOptions;

    // 필터링된 데이터를 가져오는 함수
    const loadFilteredPosts = async () => {
        setIsLoading(true);
        try {
            // API 호출을 통해 필터링된 데이터 가져오기
            // 실제 API 구현에 맞게 수정 필요
            const data = await fetchPosts(type, {
                skills: selectedSkills,
                fields: selectedFields,
                keyword: keyword
            });
            setPosts(data);
        } catch (error) {
            console.error('데이터 로드 중 오류 발생:', error);
        } finally {
            setIsLoading(false);
        }
    };

    // 컴포넌트 마운트 시 및 필터 변경 시 데이터 로드
    useEffect(() => {
        loadFilteredPosts();
    }, [selectedSkills, selectedFields, keyword, type]);

    const handleSkillClick = (skill: string) => {
        setSelectedSkills((prev) => {
            const updated = prev.includes(skill)
                ? prev.filter((s) => s !== skill)
                : [...prev, skill];

            // console.log("선택된 스킬:", updated);
            return updated;
        });
    };

    const handleFieldClick = (field: string) => {
        setSelectedFields((prev) => {
            const updated = prev.includes(field)
                ? prev.filter((f) => f !== field)
                : [...prev, field];
            console.log("선택된 분야:", updated);
            return updated;
        });
    };

    const handleReset = () => {
        setSelectedSkills([]);
        setSelectedFields([]);
        setKeyword('');
    };

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const searchValue = formData.get('search') as string;
        setKeyword(searchValue);
    };

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
            <FilterComponent
                label={type === 'company' ? '회사' : '스킬'}
                fields={skillOptions}
                skills={fieldFilterOptions}
                selectedSkills={selectedSkills}
                selectedFields={selectedFields}
                onSkillClick={handleSkillClick}
                onFieldClick={handleFieldClick}
                onReset={handleReset}
                onSearch={handleSearch}
            />
            <AllCardcomponent
                type={type}
                posts={posts}
                isLoading={isLoading}
            />
            {/* end */}
        </main>
    );
};