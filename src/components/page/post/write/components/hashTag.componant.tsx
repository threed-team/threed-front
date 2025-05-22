'use client';

import styles from '../postWrite.module.scss';
import { useHashtags } from '../hooks/useHashtag';
import { useEffect } from 'react';
interface HashtagInputProps {
    onChange: (tags: string[]) => void;
    initial?: string[];
}

export default function HashtagInput({ onChange, initial = [] }: HashtagInputProps) {
    const { tags, input, animatedTag, setInput, addTag, removeTag, setTags } = useHashtags();

    // 최초 마운트 시 initial 값을 tags에 세팅
    useEffect(() => {
        if (initial.length > 0) {
            setTags(initial);
        }
    }, [initial, setTags]);

    useEffect(() => {
        onChange(tags);
    }, [tags, onChange]);

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
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        e.preventDefault();
                        addTag();
                    }
                }}
            />
        </div>
    );
}
