import React from 'react';
import './ThemeToggle.css';

interface ThemeToggleProps {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

function ThemeToggle({ theme, toggleTheme }: ThemeToggleProps) {
  return (
    <label className="theme-switch">
      <input
        type="checkbox"
        checked={theme === 'dark'}
        onChange={toggleTheme}
        aria-label={theme === 'dark' ? 'Activar modo claro' : 'Activar modo oscuro'}
      />
      <span className="slider" />
    </label>
  );
}

export default ThemeToggle;
