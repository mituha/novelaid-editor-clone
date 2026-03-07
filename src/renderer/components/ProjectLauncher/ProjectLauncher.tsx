import { useNavigate } from 'react-router-dom';

const ProjectLauncher = () => {
  const navigate = useNavigate();

  const handleSelectProject = async () => {
    const folderPath = await (window as any).electron.ipcRenderer.selectDirectory();
    if (folderPath) {
      // 選択されたパスをステートやナビゲーションで渡す（ここでは簡易的にURLパラメータ/状態として渡す）
      navigate('/editor', { state: { projectPath: folderPath } });
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', backgroundColor: '#1e1e1e', color: '#ffffff', fontFamily: 'sans-serif' }}>
      <h1>Novelaid Editor</h1>
      <p>作業フォルダーを選択して開始してください</p>
      <button
        onClick={handleSelectProject}
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          cursor: 'pointer',
          backgroundColor: '#007acc',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          transition: 'background-color 0.3s'
        }}
        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#005999')}
        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#007acc')}
      >
        プロジェクトを選択
      </button>
    </div>
  );
};

export default ProjectLauncher;
