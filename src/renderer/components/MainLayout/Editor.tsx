import { useRef, useEffect } from 'react';
import MonacoEditor, { OnMount } from '@monaco-editor/react';
import { useFile } from '../../contexts/FileContext';
import { useTheme } from '../../contexts/ThemeContext';
import './Editor.css';

function Editor() {
  const { currentFilePath, content, updateContent, saveFile } = useFile();
  const { theme } = useTheme();
  const editorRef = useRef<any>(null);

  const handleEditorDidMount: OnMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  };

  const handleEditorChange = (value: string | undefined) => {
    if (value !== undefined) {
      updateContent(value);
    }
  };

  // Ctrl+S で保存
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        saveFile();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [saveFile]);

  if (!currentFilePath) {
    return (
      <div className="editor-container no-file">
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            color: 'var(--text-secondary)',
          }}
        >
          ファイルを選択してください
        </div>
      </div>
    );
  }

  const fileName = currentFilePath.split(/[\\/]/).pop();
  const extension = fileName?.split('.').pop() || 'text';

  // 拡張子から言語を推測
  let language = 'text';
  if (['js', 'jsx'].includes(extension)) language = 'javascript';
  else if (['ts', 'tsx'].includes(extension)) language = 'typescript';
  else if (['md'].includes(extension)) language = 'markdown';
  else if (['json'].includes(extension)) language = 'json';
  else if (['html'].includes(extension)) language = 'html';
  else if (['css'].includes(extension)) language = 'css';

  return (
    <div className="editor-container">
      <div className="editor-header">
        <span className="file-path">{fileName}</span>
      </div>
      <div className="editor-wrapper">
        <MonacoEditor
          height="100%"
          language={language}
          theme={theme === 'dark' ? 'vs-dark' : 'light'}
          value={content}
          onChange={handleEditorChange}
          onMount={handleEditorDidMount}
          options={{
            automaticLayout: true,
            fontSize: 14,
            minimap: { enabled: true },
            scrollBeyondLastLine: false,
            wordWrap: 'on',
          }}
        />
      </div>
    </div>
  );
}

export default Editor;
