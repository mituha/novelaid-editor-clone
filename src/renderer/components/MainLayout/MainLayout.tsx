import { useLocation, useNavigate } from 'react-router-dom';
import './MainLayout.css';

function MainLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const projectPath = (location.state as any)?.projectPath || '未選択';

  return (
    <div className="layout-container">
      <header className="layout-header">
        <span>Novelaid Editor - {projectPath}</span>
        <button
          type="button"
          onClick={() => navigate('/')}
          className="header-button"
        >
          閉じる
        </button>
      </header>
      <main className="layout-main">
        <h2>エディター画面 (開発中)</h2>
      </main>
      <footer className="layout-footer">Ready</footer>
    </div>
  );
}

export default MainLayout;
