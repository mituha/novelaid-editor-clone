import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';
import { useProject } from '../../contexts/ProjectContext';
import FileExplorer from './FileExplorer';
import Editor from './Editor';
import './MainLayout.css';

function MainLayout() {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const { projectPath } = useProject();

  if (!projectPath) {
    navigate('/');
    return null;
  }

  return (
    <div className="layout-container">
      <header className="layout-header">
        <span>Novelaid Editor - {projectPath}</span>
        <div>
          <button
            type="button"
            onClick={toggleTheme}
            className="header-button"
            style={{ marginRight: '10px' }}
          >
            {theme === 'dark' ? '☀ Light' : '🌙 Dark'}
          </button>
          <button
            type="button"
            onClick={() => navigate('/')}
            className="header-button"
          >
            閉じる
          </button>
        </div>
      </header>
      <div className="layout-content">
        <aside className="layout-left-pane">
          <FileExplorer projectPath={projectPath} />
        </aside>
        <main className="layout-main">
          <Editor />
        </main>
        <aside className="layout-right-pane">
          {/* 右ペイン（将来用） */}
          <div style={{ padding: '20px', color: 'var(--text-secondary)' }}>
            Inspector
          </div>
        </aside>
      </div>
      <footer className="layout-footer">Ready</footer>
    </div>
  );
}

export default MainLayout;
