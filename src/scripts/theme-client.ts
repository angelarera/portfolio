import { initializeThemeManager } from "../utils/theme-manager";

const themeManager = initializeThemeManager();

if (typeof window !== "undefined") {
  (window as any).vibeThemeManager = themeManager;

  const themeButton = document.getElementById("theme-switcher");
  if (themeButton) {
    themeButton.addEventListener("click", () => {
      themeManager.nextTheme();
    });
  }
}

export { themeManager };
