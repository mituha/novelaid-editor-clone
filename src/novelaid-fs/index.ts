export * from './models';
export * from './FileService';
import { FileService } from './FileService';

export const setProjectDirectory = (path: string | null): Promise<void> => {
  return FileService.getInstance().setProjectDirectory(path as any);
};

export const getProjectDirectory = (): Promise<string | null> => {
  return FileService.getInstance().getProjectDirectory();
};
