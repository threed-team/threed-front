'use client';
import style from './writeContent.module.scss';
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';
import React, { useRef } from 'react';

export default function ToastEditor() {
    const editorRef = useRef(null);

    return (
        <div className={style.content}>
            <Editor
                ref={editorRef}
                initialValue="내용을 입력해주세요"
                previewStyle="vertical"
                height="500px"
                initialEditType="markdown"
                useCommandShortcut={true}
            />
        </div>
    )
}