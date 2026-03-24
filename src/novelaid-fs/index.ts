export * from './models';

export const setProjectDirectory = (path: string | null): Promise<boolean> => {
  return window.electron.ipcRenderer.setProjectDirectory(path);
};

export const getProjectDirectory = (): Promise<string | null> => {
  return window.electron.ipcRenderer.getProjectDirectory();
};
