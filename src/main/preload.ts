// Disable no-unused-vars, broken for spread args
/* eslint no-unused-vars: off */
import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';

export type Channels = 'ipc-example';

const electronHandler = {
  ipcRenderer: {
    sendMessage(channel: Channels, ...args: unknown[]) {
      ipcRenderer.send(channel, ...args);
    },
    on(channel: Channels, func: (...args: unknown[]) => void) {
      const subscription = (_event: IpcRendererEvent, ...args: unknown[]) =>
        func(...args);
      ipcRenderer.on(channel, subscription);

      return () => {
        ipcRenderer.removeListener(channel, subscription);
      };
    },
    once(channel: Channels, func: (...args: unknown[]) => void) {
      ipcRenderer.once(channel, (_event, ...args) => func(...args));
    },
    selectDirectory: () => ipcRenderer.invoke('select-directory'),
    listFiles: (directoryPath: string) =>
      ipcRenderer.invoke('list-files', directoryPath),
    readFile: (filePath: string) => ipcRenderer.invoke('read-file', filePath),
    writeFile: (filePath: string, content: string) =>
      ipcRenderer.invoke('write-file', filePath, content),
    getAppPath: (name: string) => ipcRenderer.invoke('get-app-path', name),
    ensureDir: (directoryPath: string) =>
      ipcRenderer.invoke('ensure-dir', directoryPath),
    readJson: (filePath: string) => ipcRenderer.invoke('read-json', filePath),
    writeJson: (filePath: string, data: any) =>
      ipcRenderer.invoke('write-json', filePath, data),
    setProjectDirectory: (path: string) =>
      ipcRenderer.invoke('fs:setProjectDirectory', path),
    getProjectDirectory: () => ipcRenderer.invoke('fs:getProjectDirectory'),
  },
};

contextBridge.exposeInMainWorld('electron', electronHandler);

export type ElectronHandler = typeof electronHandler;
