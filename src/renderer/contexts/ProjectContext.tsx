import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from 'react';
import { useApp } from './AppContext';

interface ProjectSettings {
  [key: string]: any;
}

interface ProjectContextType {
  projectPath: string | null;
  config: ProjectSettings;
  settings: ProjectSettings;
  session: ProjectSettings;
  state: ProjectSettings;
  openProject: (path: string) => Promise<void>;
  closeProject: () => void;
  updateSettings: (newSettings: Partial<ProjectSettings>) => Promise<void>;
  updateSession: (newSession: Partial<ProjectSettings>) => Promise<void>;
  updateState: (newState: Partial<ProjectSettings>) => Promise<void>;
  isLoaded: boolean;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export function ProjectProvider({ children }: { children: React.ReactNode }) {
  const {
    session: appSession,
    updateSession: updateAppSession,
    isLoaded: isAppLoaded,
  } = useApp();
  const [projectPath, setProjectPath] = useState<string | null>(null);
  const [config, setConfig] = useState<ProjectSettings>({});
  const [settings, setSettings] = useState<ProjectSettings>({});
  const [session, setSession] = useState<ProjectSettings>({});
  const [state, setState] = useState<ProjectSettings>({});
  const [isLoaded, setIsLoaded] = useState(false);

  const loadAll = useCallback(async (path: string) => {
    const dotDir = `${path}/.novelaid-clone`;
    await window.electron.ipcRenderer.ensureDir(dotDir);

    const [cfg, sets, sess, st] = await Promise.all([
      window.electron.ipcRenderer.readJson(`${dotDir}/config.json`),
      window.electron.ipcRenderer.readJson(`${dotDir}/settings.json`),
      window.electron.ipcRenderer.readJson(`${dotDir}/session.json`),
      window.electron.ipcRenderer.readJson(`${dotDir}/state.json`),
    ]);

    setConfig(cfg || {});
    setSettings(sets || {});
    setSession(sess || {});
    setState(st || {});
    setIsLoaded(true);
  }, []);

  // Initialize from app session
  useEffect(() => {
    if (isAppLoaded && appSession.lastProjectPath && !projectPath) {
      const path = appSession.lastProjectPath;
      setProjectPath(path);
      loadAll(path);
    }
  }, [isAppLoaded, appSession.lastProjectPath, projectPath, loadAll]);

  const openProject = useCallback(
    async (path: string) => {
      setProjectPath(path);
      await loadAll(path);
      await updateAppSession({ lastProjectPath: path });
    },
    [loadAll, updateAppSession],
  );

  const closeProject = useCallback(() => {
    setProjectPath(null);
    setConfig({});
    setSettings({});
    setSession({});
    setState({});
    setIsLoaded(false);
    updateAppSession({ lastProjectPath: null });
  }, [updateAppSession]);

  const updateSettings = useCallback(
    async (newSettings: Partial<ProjectSettings>) => {
      if (!projectPath) return;
      const updated = { ...settings, ...newSettings };
      setSettings(updated);
      await window.electron.ipcRenderer.writeJson(
        `${projectPath}/.novelaid-clone/settings.json`,
        updated,
      );
    },
    [projectPath, settings],
  );

  const updateSession = useCallback(
    async (newSession: Partial<ProjectSettings>) => {
      if (!projectPath) return;
      const updated = { ...session, ...newSession };
      setSession(updated);
      await window.electron.ipcRenderer.writeJson(
        `${projectPath}/.novelaid-clone/session.json`,
        updated,
      );
    },
    [projectPath, session],
  );

  const updateState = useCallback(
    async (newState: Partial<ProjectSettings>) => {
      if (!projectPath) return;
      const updated = { ...state, ...newState };
      setState(updated);
      await window.electron.ipcRenderer.writeJson(
        `${projectPath}/.novelaid-clone/state.json`,
        updated,
      );
    },
    [projectPath, state],
  );

  const value = useMemo(
    () => ({
      projectPath,
      config,
      settings,
      session,
      state,
      openProject,
      closeProject,
      updateSettings,
      updateSession,
      updateState,
      isLoaded,
    }),
    [
      projectPath,
      config,
      settings,
      session,
      state,
      openProject,
      closeProject,
      updateSettings,
      updateSession,
      updateState,
      isLoaded,
    ],
  );

  return (
    <ProjectContext.Provider value={value}>{children}</ProjectContext.Provider>
  );
}

export function useProject() {
  const context = useContext(ProjectContext);
  if (context === undefined) {
    throw new Error('useProject must be used within a ProjectProvider');
  }
  return context;
}
