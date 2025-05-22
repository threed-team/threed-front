'use client';
import style from './writeContent.module.scss';
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';
import React from 'react';

export default function ToastEditor({
    editorRef,
    initialContent = "",
}: {
    editorRef: React.RefObject<any>;
    initialContent?: string;
}) {
    return (
        <div className={style.content}>
            <Editor
                ref={editorRef}
                initialValue={initialContent}  // ✅ 초기 마크다운 텍스트 전달
                previewStyle="vertical"
                height="500px"
                initialEditType="markdown"
                useCommandShortcut={true}
            />
        </div>
    );
}