"use client";

import { useEffect, useState } from "react";

type ThemeMode = "light" | "dark" | "system";
type LayoutMode = "comfortable" | "wide";

function applyTheme(mode: ThemeMode) {
  const root = document.documentElement;
  if (mode === "system") {
    const dark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    root.dataset.theme = dark ? "dark" : "light";
  } else {
    root.dataset.theme = mode;
  }
}

export default function AppearanceCustomizer({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [theme, setTheme] = useState<ThemeMode>("system");
  const [layout, setLayout] = useState<LayoutMode>("wide");

  useEffect(() => {
    const savedTheme = (localStorage.getItem("mainstory-theme") as ThemeMode) || "system";
    const savedLayout = (localStorage.getItem("mainstory-layout") as LayoutMode) || "wide";
    setTheme(savedTheme);
    setLayout(savedLayout);
    applyTheme(savedTheme);
    document.documentElement.dataset.layout = savedLayout;

    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const listener = () => {
      if ((localStorage.getItem("mainstory-theme") || "system") === "system") applyTheme("system");
    };
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, []);

  function chooseTheme(next: ThemeMode) {
    setTheme(next);
    localStorage.setItem("mainstory-theme", next);
    applyTheme(next);
  }

  function chooseLayout(next: LayoutMode) {
    setLayout(next);
    localStorage.setItem("mainstory-layout", next);
    document.documentElement.dataset.layout = next;
  }

  if (!open) return null;

  return (
    <div className="appearance-backdrop" onClick={onClose}>
      <aside className="appearance-panel" onClick={(event) => event.stopPropagation()} aria-label="Appearance settings">
        <div className="appearance-title">
          <div>
            <span className="eyebrow">APPEARANCE</span>
            <h2>Customize reading</h2>
          </div>
          <button onClick={onClose} aria-label="Close appearance settings">×</button>
        </div>

        <div className="appearance-group">
          <h3>Theme</h3>
          <div className="segmented">
            {(["light","dark","system"] as ThemeMode[]).map((mode) => (
              <button key={mode} className={theme === mode ? "active" : ""} onClick={() => chooseTheme(mode)}>
                {mode[0].toUpperCase() + mode.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="appearance-group">
          <h3>Layout</h3>
          <div className="segmented">
            <button className={layout === "comfortable" ? "active" : ""} onClick={() => chooseLayout("comfortable")}>
              Comfortable
            </button>
            <button className={layout === "wide" ? "active" : ""} onClick={() => chooseLayout("wide")}>
              Wide
            </button>
          </div>
          <p>Reader settings are saved on this device.</p>
        </div>
      </aside>
    </div>
  );
}
