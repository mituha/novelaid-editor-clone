import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import App from '../renderer/App';

// Mock window.electron
(window as any).electron = {
  ipcRenderer: {
    sendMessage: jest.fn(),
    on: jest.fn(),
    once: jest.fn(),
    invoke: jest.fn().mockImplementation((channel) => {
      if (channel === 'get-app-path') return Promise.resolve('/tmp');
      if (channel === 'read-json') return Promise.resolve({});
      return Promise.resolve(true);
    }),
    getAppPath: jest.fn().mockResolvedValue('/tmp'),
    readJson: jest.fn().mockResolvedValue({}),
    writeJson: jest.fn().mockResolvedValue(true),
    ensureDir: jest.fn().mockResolvedValue(true),
    setProjectDirectory: jest.fn().mockResolvedValue(true),
    getProjectDirectory: jest.fn().mockResolvedValue(null),
  },
};

describe('App', () => {
  it('should render', () => {
    expect(render(<App />)).toBeTruthy();
  });
});
