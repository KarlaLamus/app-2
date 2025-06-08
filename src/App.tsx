import { useState, useEffect } from 'react';
import EditorSection from './components/EditorSection';
import EnvioSection from './components/EnvioSection';
import './App.css';

function App() {
  const [activeSection, setActiveSection] = useState<'editor' | 'envio'>('editor');
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

  useEffect(() => {
    document.body.classList.remove('light', 'dark');
    document.body.classList.add(theme);
  }, [theme]);

  return (
    
    <div className="app-container">
      <header className="header">
        <div className="logo">
          <img src="/logo.svg" alt="Orla Magna" />
        </div>
        <nav className="nav">
          <button
            className={`nav-link ${activeSection === 'editor' ? 'active' : ''}`}
            onClick={() => setActiveSection('editor')}
          >
            Editor
          </button>
          <button
            className={`nav-link ${activeSection === 'envio' ? 'active' : ''}`}
            onClick={() => setActiveSection('envio')}
          >
            Envío
          </button>
          <label className="theme-switch">
            <input
              type="checkbox"
              checked={theme === 'dark'}
              onChange={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            />
            <span className="slider" />
          </label>

        </nav>
      </header>

      <main className="main-section">
        <h1 className="title">Orla Magna</h1>
        <p className="subtitle">Especialistas en orlas de graduación y fotografía académica</p>
        
        {activeSection === 'editor' ? <EditorSection /> : <EnvioSection />}
      </main>

      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} Orla Magna. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}

export default App;
