import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
} from 'react';

interface FileContextType {
  currentFilePath: string | null;
  content: string;
  isDirty: boolean;
  selectFile: (path: string) => Promise<void>;
  updateContent: (newContent: string) => void;
  saveFile: () => Promise<void>;
}

const FileContext = createContext<FileContextType | undefined>(undefined);

export function FileProvider({ children }: { children: React.ReactNode }) {
  const [currentFilePath, setCurrentFilePath] = useState<string | null>(null);
  const [content, setContent] = useState('');
  const [isDirty, setIsDirty] = useState(false);

  const selectFile = useCallback(
    async (path: string) => {
      try {
        if (isDirty) {
          // TODO: Confirm save before switching
        }
        const fileContent = await window.electron.ipcRenderer.readFile(path);
        setCurrentFilePath(path);
        setContent(fileContent);
        setIsDirty(false);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Failed to select file:', error);
      }
    },
    [isDirty],
  );

  const updateContent = useCallback((newContent: string) => {
    setContent(newContent);
    setIsDirty(true);
  }, []);

  const saveFile = useCallback(async () => {
    if (!currentFilePath) return;
    try {
      await window.electron.ipcRenderer.writeFile(currentFilePath, content);
      setIsDirty(false);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Failed to save file:', error);
    }
  }, [currentFilePath, content]);

  const value = useMemo(
    () => ({
      currentFilePath,
      content,
      isDirty,
      selectFile,
      updateContent,
      saveFile,
    }),
    [currentFilePath, content, isDirty, selectFile, updateContent, saveFile],
  );

  return <FileContext.Provider value={value}>{children}</FileContext.Provider>;
}

export function useFile() {
  const context = useContext(FileContext);
  if (context === undefined) {
    throw new Error('useFile must be used within a FileProvider');
  }
  return context;
}
