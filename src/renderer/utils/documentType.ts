import { NovelaidDocumentType } from '../../novelaid-fs';

/**
 * ドキュメントエリアで表示するViewの種類。
 */
export type DocumentViewMode = 'none' | 'editor' | 'canvas' | 'reader' | 'preview';


export function getDocumentType(
  fileName: string,
  isDirectory: boolean,
  parentType: NovelaidDocumentType = 'novel',
): NovelaidDocumentType {
  if (isDirectory) {
    const name = fileName.toLowerCase();
    if (
      name.includes('小説') ||
      name.includes('novel') ||
      name.includes('本文')
    ) {
      return 'novel';
    }
    if (
      name.includes('設定') ||
      name.includes('プロット') ||
      name.includes('wiki') ||
      name.includes('setting')
    ) {
      return 'markdown';
    }
    if (name.includes('画像') || name.includes('image') || name.includes('img')) {
      return 'image';
    }
    return parentType;
  }

  const extension = fileName.split('.').pop()?.toLowerCase();

  switch (extension) {
    case 'txt':
      return 'novel';
    case 'md':
      return 'markdown';
    case 'png':
    case 'jpg':
    case 'jpeg':
    case 'gif':
    case 'webp':
    case 'svg':
    case 'bmp':
    case 'tiff':
    case 'ico':
      return 'image';
    case 'chat':
      return 'chat';
    case 'css':
      return 'css';
    default:
      return 'unknown';
  }
}
