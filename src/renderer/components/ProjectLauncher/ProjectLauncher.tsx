import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';
import { useProject } from '../../contexts/ProjectContext';
import './ProjectLauncher.css';

function ProjectLauncher() {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const { openProject } = useProject();

  const handleSelectProject = async () => {
    const explorer = (window as any).electron.ipcRenderer;
    const folderPath = await explorer.selectDirectory();
    if (folderPath) {
      await openProject(folderPath);
      navigate('/editor');
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
