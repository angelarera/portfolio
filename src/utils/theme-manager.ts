const THEMES = ["default", "theme-2", "theme-3", "theme-4", "theme-5"];
const PORTFOLIO_THEME = "portfolio-entry";

export class ThemeManager {
  currentTheme: string;

  constructor() {
    this.currentTheme = this.getSavedTheme() || "default";
  }

  init(): void {
    this.applyTheme(this.currentTheme);
  }

  getSavedTheme() {
    if (typeof window === "undefined") return null;
    return localStorage.getItem("vibe-theme");
  }

  saveTheme(theme: string) {
    if (typeof window === "undefined") return null;
    localStorage.setItem("vibe-theme", theme);
  }

  applyTheme(theme: string) {
    if (typeof window === "undefined") return null;

    document.documentElement.setAttribute("data-theme", theme);
    this.currentTheme = theme;

    if (theme !== PORTFOLIO_THEME) {
      this.saveTheme(theme);
    }
  }

  nextTheme() {
    if (this.currentTheme === PORTFOLIO_THEME) {
      const lastTheme = this.getSavedTheme() || "default";
      this.applyTheme(lastTheme);
      return;
    }

    const currentIndex = THEMES.indexOf(this.currentTheme);
    const nextIndex = (currentIndex + 1) % THEMES.length;
    this.applyTheme(THEMES[nextIndex]);
  }

  setPortfolioTheme(bgColour: string, textColour: string) {
    const root = document.documentElement;

    if (bgColour) root.style.setProperty("--entry-bg", bgColour);
    if (textColour) root.style.setProperty("--entry-text", textColour);

    this.applyTheme(PORTFOLIO_THEME);
  }
}

export function initializeThemeManager() {
  const themeManager = new ThemeManager();
  themeManager.init();
  return themeManager;
}
