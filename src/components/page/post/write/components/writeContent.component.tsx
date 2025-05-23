'use client';
import style from './writeContent.module.scss';
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';
import React from 'react';
import Prism from 'prismjs';
import 'prismjs/themes/prism.css';
import '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css';
import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight';

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
                plugins={[[codeSyntaxHighlight, { highlighter: Prism }]]}
            />
        </div>
    );
}