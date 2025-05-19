'use client';

import { useState } from 'react';
import styles from '../postWrite.module.scss';

export default function FieldSelector() {
    const [selected, setSelected] = useState('기타'); // 초기 선택값

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelected(e.target.value);
    };

    return (
        <div className={styles.write_hashtag_box}>
            <span className={styles.tag_item}>#{selected}</span>  {/* 실시간 태그 반영 */}
            <div className={styles.select_box}>
                <select id="write-field" value={selected} onChange={handleChange}>
                    <option value="기타">기타</option>
                    <option value="AI">AI</option>
                    <option value="Back">Back</option>
                    <option value="Front">Front</option>
                    <option value="Dev-Ops">Dev Ops</option>
                    <option value="DB">DB</option>
                    <option value="Mobile">Mobile</option>
                    <option value="Collab-Tool">Collab Tool</option>
                </select>
            </div>
        </div>
    );
}
