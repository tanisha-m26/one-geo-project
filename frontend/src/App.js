import React, { useState } from 'react';
import WellPlot from './components/WellPlot';
import './App.css';

function App() {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.body.className = newTheme === 'dark' ? 'dark-theme' : '';
  };

  return (
    <div className={`app-container ${theme}`}>
      <header className="app-header">
        <h1>One Geo Well Visualization</h1>
        <button onClick={toggleTheme} className="theme-toggle">
          Toggle Theme
        </button>
      </header>

      <div className="app-main">
        <aside className="app-sidebar">
          <p>Toolkit / Controls Panel</p>
        </aside>

        <main className="app-content">
          <WellPlot />
        </main>
      </div>

      <footer className="app-footer">
        <p>AI Interpretation Results</p>
      </footer>
    </div>
  );
}

export default App;
