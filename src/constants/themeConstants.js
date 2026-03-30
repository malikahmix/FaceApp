// src/constants/themeConstants.js

export const THEME = {
  DARK:  "dark",
  LIGHT: "light",
};

export const THEME_STORAGE_KEY = "faceapp_theme";

export const THEME_CLASSES = {
  dark: {
    bg:         "bg-gray-950",
    card:       "bg-gray-900 border-gray-800",
    cardHover:  "hover:border-cyan-500/30",
    text:       "text-white",
    subtext:    "text-gray-400",
    muted:      "text-gray-500",
    input:      "bg-gray-800 border-gray-700 text-white placeholder-gray-500",
    inputFocus: "focus:border-cyan-500",
    nav:        "bg-gray-900/95 border-gray-800",
    badge:      "bg-gray-800 text-gray-400",
    divider:    "border-gray-800",
  },
  light: {
    bg:         "bg-slate-50",
    card:       "bg-white border-slate-200",
    cardHover:  "hover:border-cyan-400",
    text:       "text-slate-900",
    subtext:    "text-slate-600",
    muted:      "text-slate-400",
    input:      "bg-white border-slate-300 text-slate-900 placeholder-slate-400",
    inputFocus: "focus:border-cyan-500",
    nav:        "bg-white/95 border-slate-200",
    badge:      "bg-slate-100 text-slate-600",
    divider:    "border-slate-200",
  },
};

// Utility: get saved theme from localStorage
export const getSavedTheme = () => {
  try {
    return localStorage.getItem(THEME_STORAGE_KEY) || THEME.DARK;
  } catch {
    return THEME.DARK;
  }
};

// Utility: save theme to localStorage
export const saveTheme = (theme) => {
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    console.warn("localStorage not available");
  }
};
