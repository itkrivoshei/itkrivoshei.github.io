export type BackgroundTheme = "hero" | "about" | "skills" | "experience" | "projects";

export const backgroundThemeChangeEvent = "background-theme-change";

export interface BackgroundThemeChangeDetail {
  theme: BackgroundTheme;
}
