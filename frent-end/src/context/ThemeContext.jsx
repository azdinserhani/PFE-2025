import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const themes = {
  light: {
    name: 'Light',
    primary: '#007bff',
    secondary: '#6c757d',
    background: '#ffffff',
    text: '#212529',
    cardBg: '#f8f9fa',
    border: '#dee2e6'
  },
  dark: {
    name: 'Dark',
    primary: '#0d6efd',
    secondary: '#6c757d',
    background: '#212529',
    text: '#f8f9fa',
    cardBg: '#343a40',
    border: '#495057'
  },
  nature: {
    name: 'Nature',
    primary: '#198754',
    secondary: '#6c757d',
    background: '#f0f7f4',
    text: '#2c3e50',
    cardBg: '#ffffff',
    border: '#d1e7dd'
  },
  ocean: {
    name: 'Ocean',
    primary: '#0dcaf0',
    secondary: '#6c757d',
    background: '#e3f2fd',
    text: '#0a3622',
    cardBg: '#ffffff',
    border: '#cff4fc'
  }
};

export const ThemeProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme || 'light';
  });

  useEffect(() => {
    localStorage.setItem('theme', currentTheme);
    document.documentElement.style.setProperty('--primary-color', themes[currentTheme].primary);
    document.documentElement.style.setProperty('--secondary-color', themes[currentTheme].secondary);
    document.documentElement.style.setProperty('--background-color', themes[currentTheme].background);
    document.documentElement.style.setProperty('--text-color', themes[currentTheme].text);
    document.documentElement.style.setProperty('--card-bg', themes[currentTheme].cardBg);
    document.documentElement.style.setProperty('--border-color', themes[currentTheme].border);
  }, [currentTheme]);

  const changeTheme = (themeName) => {
    setCurrentTheme(themeName);
  };

  return (
    <ThemeContext.Provider value={{ currentTheme, changeTheme, themes }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}; 