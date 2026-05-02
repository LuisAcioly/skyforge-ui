import { type HTMLAttributes } from "react";

import { cn } from "../utils/cn";

export type ThemeName = "light" | "dark";

export interface ThemeProviderProps extends HTMLAttributes<HTMLDivElement> {
  theme?: ThemeName;
}

export function ThemeProvider({ children, className, theme = "light", ...props }: ThemeProviderProps) {
  return (
    <div data-theme={theme} className={cn("bg-background text-content-primary antialiased", className)} {...props}>
      {children}
    </div>
  );
}
