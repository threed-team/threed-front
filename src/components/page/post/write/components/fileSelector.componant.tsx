'use client';

import { useState } from 'react';
import styles from '../postWrite.module.scss';

export default function FieldSelector({ onChange }: { onChange: (value: string) => void }) {
    const [selected, setSelected] = useState('기타');

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelected(e.target.value);
        onChange(e.target.value); // 선택 변경 시 상위로 전달
    };
    return (
        <div className={styles.write_hashtag_box}>
            <span className={styles.tag_item}>#{selected}</span>  {/* 실시간 태그 반영 */}
            <div className={styles.select_box}>
                <select id="write-field" value={selected} onChange={handleChange}>
                    <option value="기타">기타</option>
                    <option value="AI">AI</option>
                    <option value="Back">Back</option>
                    <option value="Frontend">Frontend</option>
                    <option value="DevOps">Dev Ops</option>
                    <option value="DB">DB</option>
                    <option value="Mobile">Mobile</option>
                    <option value="Collab-Tool">Collab Tool</option>
                </select>
            </div>
        </div>
    );
}
