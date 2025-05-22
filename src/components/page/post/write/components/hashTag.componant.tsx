'use client';

import styles from '../postWrite.module.scss';
import { useHashtags } from '../hooks/useHashtag';
import { useEffect } from 'react';

export default function HashtagInput({ onChange }: { onChange: (tags: string[]) => void }) {
    const { tags, input, animatedTag, setInput, addTag, removeTag } = useHashtags();

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
