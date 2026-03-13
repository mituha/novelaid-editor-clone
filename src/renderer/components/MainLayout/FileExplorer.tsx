import { useState, useEffect } from 'react';
import './FileExplorer.css';

interface FileEntry {
  name: string;
  isDirectory: boolean;
}

interface FileExplorerProps {
  projectPath: string;
}

function FileExplorer({ projectPath }: FileExplorerProps) {
  const [files, setFiles] = useState<FileEntry[]>([]);

  useEffect(() => {
    const fetchFiles = async () => {
      if (projectPath && projectPath !== '未選択') {
        const fileList =
          await window.electron.ipcRenderer.listFiles(projectPath);
        setFiles(fileList);
      }
    };
    fetchFiles();
  }, [projectPath]);

  return (
    <div className="file-explorer">
      <div className="file-explorer-header">PROJECT</div>
      <div className="file-explorer-list">
        {files.map((file) => (
          <div
            key={file.name}
            className={`file-item ${file.isDirectory ? 'directory' : 'file'}`}
          >
            <span className="file-icon">{file.isDirectory ? '📁' : '📄'}</span>
            <span className="file-name">{file.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FileExplorer;
