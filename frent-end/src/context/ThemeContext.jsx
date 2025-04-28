import { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

export const themes = {
  light: {
    name: "Light",
    primary: "#007bff",
    secondary: "#6c757d",
    background: "#ffffff",
    text: "#212529",
    cardBg: "#f8f9fa",
    border: "#dee2e6",
  },
  dark: {
    name: "Dark",
    primary: "#0d6efd",
    secondary: "#6c757d",
    background: "#212529",
    text: "#f8f9fa",
    cardBg: "#343a40",
    border: "#495057",
  },
  nature: {
    name: "Nature",
    primary: "#198754",
    secondary: "#6c757d",
    background: "#f0f7f4",
    text: "#2c3e50",
    cardBg: "#ffffff",
    border: "#d1e7dd",
  },
  ocean: {
    name: "Ocean",
    primary: "#0dcaf0",
    secondary: "#6c757d",
    background: "#e3f2fd",
    text: "#0a3622",
    cardBg: "#ffffff",
    border: "#cff4fc",
  },
  orange: {
    name: "Orange",
    primary: "#fd7e14",
    secondary: "#6c757d",
    background: "#fff3e6",
    text: "#2c1810",
    cardBg: "#ffffff",
    border: "#ffe5cc",
  },
  purple: {
    name: "Purple",
    primary: "#6f42c1",
    secondary: "#6c757d",
    background: "#f3f0ff",
    text: "#2d1b4d",
    cardBg: "#ffffff",
    border: "#e2d9f3",
  },
  rose: {
    name: "Rose",
    primary: "#e83e8c",
    secondary: "#6c757d",
    background: "#fff0f6",
    text: "#1a1a1a",
    cardBg: "#ffffff",
    border: "#ffdeeb",
  },
  mint: {
    name: "Mint",
    primary: "#20c997",
    secondary: "#6c757d",
    background: "#f2fbf9",
    text: "#0f392e",
    cardBg: "#ffffff",
    border: "#d1f2ea",
  },
  sunset: {
    name: "Sunset",
    primary: "#ff4500",
    secondary: "#ff6347",
    background: "#ffe4e1",
    text: "#4b2e2e",
    cardBg: "#ffffff",
    border: "#ffcccb",
  },
  forest: {
    name: "Forest",
    primary: "#228b22",
    secondary: "#556b2f",
    background: "#f5fff5",
    text: "#2e4e2e",
    cardBg: "#ffffff",
    border: "#d0f0c0",
  },
  twilight: {
    name: "Twilight",
    primary: "#8a2be2",
    secondary: "#9370db",
    background: "#f8f0ff",
    text: "#3e2c4d",
    cardBg: "#ffffff",
    border: "#e6d5f7",
  },
  sand: {
    name: "Sand",
    primary: "#c2b280",
    secondary: "#d2b48c",
    background: "#fffaf0",
    text: "#5a4a3b",
    cardBg: "#ffffff",
    border: "#f5deb3",
  },
};

export const ThemeProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme || "light";
  });

  useEffect(() => {
    localStorage.setItem("theme", currentTheme);
    document.documentElement.style.setProperty(
      "--primary-color",
      themes[currentTheme].primary
    );
    document.documentElement.style.setProperty(
      "--secondary-color",
      themes[currentTheme].secondary
    );
    document.documentElement.style.setProperty(
      "--background-color",
      themes[currentTheme].background
    );
    document.documentElement.style.setProperty(
      "--text-color",
      themes[currentTheme].text
    );
    document.documentElement.style.setProperty(
      "--card-bg",
      themes[currentTheme].cardBg
    );
    document.documentElement.style.setProperty(
      "--border-color",
      themes[currentTheme].border
    );
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
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
