import { useLocation, useNavigate } from 'react-router-dom';

const MainLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const projectPath = (location.state as any)?.projectPath || '未選択';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', backgroundColor: '#1e1e1e', color: '#ffffff', fontFamily: 'sans-serif' }}>
      <header style={{ padding: '10px 20px', backgroundColor: '#2d2d2d', borderBottom: '1px solid #3c3c3c', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span>Novelaid Editor - {projectPath}</span>
        <button
          onClick={() => navigate('/')}
          style={{
            padding: '5px 10px',
            backgroundColor: '#444',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          閉じる
        </button>
      </header>
      <main style={{ flex: 1, padding: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <h2>エディター画面 (開発中)</h2>
      </main>
      <footer style={{ padding: '5px 20px', backgroundColor: '#007acc', fontSize: '12px' }}>
        Ready
      </footer>
    </div>
  );
};

export default MainLayout;
