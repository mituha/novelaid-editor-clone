import { useState, useEffect, useMemo } from 'react';
import DocumentIcon from '../DocumentIcon/DocumentIcon';
import { useFile } from '../../contexts/FileContext';
import { getDocumentType } from '../../utils/documentType';
import { NovelaidDocumentType } from '../../../novelaid-fs/models';
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

  const currentDirType = useMemo<NovelaidDocumentType>(() => {
    // 暫定的にルートフォルダーは 'novel' とする。仕様に基づき親フォルダーから継承する仕組み。
    return 'novel';
  }, []);

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
          const docType = getDocumentType(
            file.name,
            file.isDirectory,
            currentDirType,
          );
          return (
            <div
              key={file.name}
              className={`file-item ${file.isDirectory ? 'directory' : 'file'} ${isActive ? 'active' : ''} type-${docType}`}
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
                <DocumentIcon
                  type={docType}
                  isDirectory={file.isDirectory}
                  size={16}
                />
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
