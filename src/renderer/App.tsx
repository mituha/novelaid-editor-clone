import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import ProjectLauncher from './components/ProjectLauncher/ProjectLauncher';
import MainLayout from './components/MainLayout/MainLayout';
import { ThemeProvider } from './contexts/ThemeContext';
import './theme.css';
import './App.css';

export default function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<ProjectLauncher />} />
          <Route path="/editor" element={<MainLayout />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}
