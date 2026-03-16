import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from 'react';

interface AppSettings {
  [key: string]: any;
}

interface AppContextType {
  config: AppSettings;
  settings: AppSettings;
  session: AppSettings;
  state: AppSettings;
  updateSettings: (newSettings: Partial<AppSettings>) => Promise<void>;
  updateSession: (newSession: Partial<AppSettings>) => Promise<void>;
  updateState: (newState: Partial<AppSettings>) => Promise<void>;
  isLoaded: boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [config, setConfig] = useState<AppSettings>({});
  const [settings, setSettings] = useState<AppSettings>({});
  const [session, setSession] = useState<AppSettings>({});
  const [state, setState] = useState<AppSettings>({});
  const [isLoaded, setIsLoaded] = useState(false);
  const [userDataPath, setUserDataPath] = useState<string | null>(null);

  const loadAll = useCallback(async () => {
    const userData = await window.electron.ipcRenderer.getAppPath('userData');
    setUserDataPath(userData);

    const [cfg, sets, sess, st] = await Promise.all([
      window.electron.ipcRenderer.readJson(`${userData}/config.json`),
      window.electron.ipcRenderer.readJson(`${userData}/settings.json`),
      window.electron.ipcRenderer.readJson(`${userData}/session.json`),
      window.electron.ipcRenderer.readJson(`${userData}/state.json`),
    ]);

    if (cfg) setConfig(cfg);
    if (sets) setSettings(sets);
    if (sess) setSession(sess);
    if (st) setState(st);

    setIsLoaded(true);
  }, []);

  useEffect(() => {
    loadAll();
  }, [loadAll]);

  const updateSettings = useCallback(
    async (newSettings: Partial<AppSettings>) => {
      const updated = { ...settings, ...newSettings };
      setSettings(updated);
      if (userDataPath) {
        await window.electron.ipcRenderer.writeJson(
          `${userDataPath}/settings.json`,
          updated,
        );
      }
    },
    [settings, userDataPath],
  );

  const updateSession = useCallback(
    async (newSession: Partial<AppSettings>) => {
      const updated = { ...session, ...newSession };
      setSession(updated);
      if (userDataPath) {
        await window.electron.ipcRenderer.writeJson(
          `${userDataPath}/session.json`,
          updated,
        );
      }
    },
    [session, userDataPath],
  );

  const updateState = useCallback(
    async (newState: Partial<AppSettings>) => {
      const updated = { ...state, ...newState };
      setState(updated);
      if (userDataPath) {
        await window.electron.ipcRenderer.writeJson(
          `${userDataPath}/state.json`,
          updated,
        );
      }
    },
    [state, userDataPath],
  );

  const value = useMemo(
    () => ({
      config,
      settings,
      session,
      state,
      updateSettings,
      updateSession,
      updateState,
      isLoaded,
    }),
    [
      config,
      settings,
      session,
      state,
      updateSettings,
      updateSession,
      updateState,
      isLoaded,
    ],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
