import { useState, useEffect } from 'react';
import { useFile } from '../../contexts/FileContext';
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
  const { selectFile, currentFilePath } = useFile();

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

  const handleFileClick = (file: FileEntry) => {
    if (!file.isDirectory) {
      const fullPath = `${projectPath}/${file.name}`;
      selectFile(fullPath);
    }
  };

  return (
    <div className="file-explorer">
      <div className="file-explorer-header">PROJECT</div>
      <div className="file-explorer-list">
        {files.map((file) => {
          const fullPath = `${projectPath}/${file.name}`;
          const isActive = currentFilePath === fullPath;
          return (
            <div
              key={file.name}
              className={`file-item ${file.isDirectory ? 'directory' : 'file'} ${isActive ? 'active' : ''}`}
              onClick={() => handleFileClick(file)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  handleFileClick(file);
                }
              }}
              role="button"
              tabIndex={0}
            >
              <span className="file-icon">
                {file.isDirectory ? '📁' : '📄'}
              </span>
              <span className="file-name">{file.name}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default FileExplorer;
