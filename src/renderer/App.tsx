import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import React from 'react';
import ProjectLauncher from './components/ProjectLauncher/ProjectLauncher';
import MainLayout from './components/MainLayout/MainLayout';
import { ThemeProvider } from './contexts/ThemeContext';
import { FileProvider } from './contexts/FileContext';
import { AppProvider } from './contexts/AppContext';
import { ProjectProvider } from './contexts/ProjectContext';
import './theme.css';
import './App.css';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<ProjectLauncher />} />
      <Route path="/editor" element={<MainLayout />} />
    </Routes>
  );
}

function AppRouter() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AppProvider>
      <ProjectProvider>
        <ThemeProvider>
          <FileProvider>
            {children}
          </FileProvider>
        </ThemeProvider>
      </ProjectProvider>
    </AppProvider>
  );
}

export default function App() {
  return (
    <Providers>
      <AppRouter />
    </Providers>
  );
}
