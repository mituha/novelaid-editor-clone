import React from 'react';
import {
  Folder,
  BookOpen,
  Settings,
  FileText,
  Image as ImageIcon,
  MessageSquareText,
  Palette,
  GitCompare,
  Globe,
  File,
} from 'lucide-react';
import { NovelaidDocumentType } from '../../types/document';

interface DocumentIconProps {
  type: NovelaidDocumentType;
  isDirectory: boolean;
  size?: number;
  className?: string;
}

function DocumentIcon({
  type,
  isDirectory,
  size = 16,
  className = '',
}: DocumentIconProps) {
  if (isDirectory) {
    switch (type) {
      case 'novel':
        return <Folder size={size} className={className} />;
      case 'markdown':
        return <Settings size={size} className={className} />;
      case 'image':
        return <ImageIcon size={size} className={className} />;
      default:
        return <Folder size={size} className={className} />;
    }
  }

  switch (type) {
    case 'novel':
      return <BookOpen size={size} className={className} />;
    case 'markdown':
      return <FileText size={size} className={className} />;
    case 'image':
      return <ImageIcon size={size} className={className} />;
    case 'chat':
      return <MessageSquareText size={size} className={className} />;
    case 'css':
      return <Palette size={size} className={className} />;
    case 'git-diff':
      return <GitCompare size={size} className={className} />;
    case 'browser':
      return <Globe size={size} className={className} />;
    default:
      return <File size={size} className={className} />;
  }
}

DocumentIcon.defaultProps = {
  size: 16,
  className: '',
};

export default DocumentIcon;
