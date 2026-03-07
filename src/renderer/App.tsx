import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import ProjectLauncher from './components/ProjectLauncher/ProjectLauncher';
import MainLayout from './components/MainLayout/MainLayout';
import './App.css';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProjectLauncher />} />
        <Route path="/editor" element={<MainLayout />} />
      </Routes>
    </Router>
  );
}
