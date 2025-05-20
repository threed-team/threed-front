'use client';

import { useState, useEffect } from 'react';
import styles from '../postWrite.module.scss';

export default function HashtagInput() {
    const [tags, setTags] = useState<string[]>([]);
    const [input, setInput] = useState('');
    const [animatedTag, setAnimatedTag] = useState<string | null>(null);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && input.trim()) {
            e.preventDefault();
            const newTag = input.trim().toUpperCase();
            if (tags.includes(newTag)) return;
            if (tags.length >= 2) {
                alert('최대 2개의 해시태그만 입력할 수 있습니다.');
                return;
            }
            setTags([...tags, newTag]);
            setAnimatedTag(newTag);
            setInput('');
        }
    };

    // 애니메이션 끝나면 상태 초기화
    useEffect(() => {
        if (animatedTag) {
            const timer = setTimeout(() => setAnimatedTag(null), 300);
            return () => clearTimeout(timer);
        }
    }, [animatedTag]);
    const removeTag = (tagToRemove: string) => {
        setTags(tags.filter(tag => tag !== tagToRemove));
    };
    return (
        <div className={styles.write_hashtag_box}>
            {tags.map(tag => (
                <span
                    key={tag}
                    className={`${styles.tag_item} ${animatedTag === tag ? styles.animate : ''}`}
                    onClick={() => removeTag(tag)}
                >
                    #{tag}
                </span>
            ))}
            <input
                type="text"
                id="write-hashtag"
                value={input}
                placeholder="기술 최대 2개 태그"
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
            />
        </div>
    );
}
