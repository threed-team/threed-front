'use client';

import { useEffect, useState } from 'react';
import styles from '../postWrite.module.scss';

interface FieldSelectorProps {
    onChange: (value: string) => void;
    initial?: string;
}

export default function FieldSelector({ onChange, initial }: FieldSelectorProps) {
    const getInitialValue = (value?: string) =>
        value && value.trim() !== '' ? value : '기타';

    const [selected, setSelected] = useState(getInitialValue(initial));

    // ✅ 최초 마운트 시 상위에 값 전달 (기본: 기타)
    useEffect(() => {
        const value = getInitialValue(initial);
        setSelected(value);
        onChange(value);
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        setSelected(value);
        onChange(value);
    };

    return (
        <div className={styles.write_hashtag_box}>
            <span className={styles.tag_item}>#{selected}</span>
            <div className={styles.select_box}>
                <select id="write-field" value={selected} onChange={handleChange}>
                    <option value="기타">기타</option>
                    <option value="AI">AI</option>
                    <option value="Backend">Back</option>
                    <option value="Frontend">Frontend</option>
                    <option value="DevOps">Dev Ops</option>
                    <option value="DB">DB</option>
                    <option value="Mobile">Mobile</option>
                    <option value="Collab Tool">Collab Tool</option>
                </select>
            </div>
        </div>
    );
}
