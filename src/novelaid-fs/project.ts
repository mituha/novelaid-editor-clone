let projectDirectory: string | null = null;

export const setProjectDirectory = (path: string | null): void => {
  projectDirectory = path;
};

export const getProjectDirectory = (): string | null => {
  return projectDirectory;
};
