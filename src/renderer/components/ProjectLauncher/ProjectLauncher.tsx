import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';
import './ProjectLauncher.css';

function ProjectLauncher() {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  const handleSelectProject = async () => {
    const folderPath = await (window as any).electron.ipcRenderer.selectDirectory();
    if (folderPath) {
      // 選択されたパスをステートやナビゲーションで渡す（ここでは簡易的にURLパラメータ/状態として渡す）
      navigate('/editor', { state: { projectPath: folderPath } });
    }
  };

  return (
    <div className="launcher-container">
      <button
        type="button"
        onClick={toggleTheme}
        className="theme-toggle-button"
      >
        {theme === 'dark' ? 'ライトモード' : 'ダークモード'}
      </button>
      <h1>Novelaid Editor</h1>
      <p>作業フォルダーを選択して開始してください</p>
      <button
        type="button"
        onClick={handleSelectProject}
        className="launcher-button"
      >
        プロジェクトを選択
      </button>
    </div>
  );
}

export default ProjectLauncher;
