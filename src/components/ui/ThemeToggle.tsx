"use client";
import { Moon, Sun, Monitor } from "lucide-react";
import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";
const subscribe = () => () => {};
export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
  const current = mounted ? theme || "system" : "system";
  const next =
    current === "system" ? "light" : current === "light" ? "dark" : "system";
  return (
    <button
      type="button"
      className="theme-toggle icon-button"
      onClick={() => setTheme(next)}
      aria-label={`Color theme: ${current}. Switch to ${next} theme`}
      title={`Theme: ${current}. Switch to ${next}`}
    >
      {mounted ? (
        current === "system" ? (
          <Monitor size={17} />
        ) : current === "dark" ? (
          <Moon size={17} />
        ) : (
          <Sun size={17} />
        )
      ) : (
        <span className="theme-placeholder" aria-hidden="true" />
      )}
    </button>
  );
}
