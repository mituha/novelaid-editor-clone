import { useState, useEffect, useMemo } from 'react';
import {
  Folder,
  BookOpen,
  Settings,
  FileText,
  Image,
  MessageSquareText,
  Palette,
  GitCompare,
  Globe,
  File,
} from 'lucide-react';
import { useFile } from '../../contexts/FileContext';
import { getDocumentType } from '../../utils/documentType';
import { DocumentType } from '../../types/document';
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

  const currentDirType = useMemo<DocumentType>(() => {
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

  const getIcon = (type: DocumentType, isDirectory: boolean) => {
    const iconSize = 16;

    if (isDirectory) {
      switch (type) {
        case 'novel':
          return <Folder size={iconSize} />;
        case 'markdown':
          return <Settings size={iconSize} />;
        case 'image':
          return <Image size={iconSize} />;
        default:
          return <Folder size={iconSize} />;
      }
    }

    switch (type) {
      case 'novel':
        return <BookOpen size={iconSize} />;
      case 'markdown':
        return <FileText size={iconSize} />;
      case 'image':
        return <Image size={iconSize} />;
      case 'chat':
        return <MessageSquareText size={iconSize} />;
      case 'css':
        return <Palette size={iconSize} />;
      case 'git-diff':
        return <GitCompare size={iconSize} />;
      case 'browser':
        return <Globe size={iconSize} />;
      default:
        return <File size={iconSize} />;
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
                {getIcon(docType, file.isDirectory)}
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
