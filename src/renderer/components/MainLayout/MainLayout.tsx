import { useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';
import './MainLayout.css';

function MainLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const projectPath = (location.state as any)?.projectPath || '未選択';

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
      <main className="layout-main">
        <h2>エディター画面 (開発中)</h2>
      </main>
      <footer className="layout-footer">Ready</footer>
    </div>
  );
}

export default MainLayout;
