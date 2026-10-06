import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "zh" | "en";
export type L = { zh: string; en: string };

type Prefs = { lang: Lang; setLang: (l: Lang) => void; dark: boolean; toggleDark: () => void; t: (v: L) => string };
const Ctx = createContext<Prefs | null>(null);

export function PrefsProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("zh");
  const [dark, setDark] = useState(true);

  useEffect(() => {
    const l = localStorage.getItem("lang") as Lang | null;
    if (l) setLangState(l);
    const d = localStorage.getItem("dark");
    if (d !== null) setDark(d === "1");
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("dark", dark ? "1" : "0");
  }, [dark]);

  useEffect(() => {
    document.documentElement.lang = lang === "zh" ? "zh-Hant" : "en";
  }, [lang]);

  const setLang = (l: Lang) => { setLangState(l); localStorage.setItem("lang", l); };
  const t = (v: L) => v[lang];
  return <Ctx.Provider value={{ lang, setLang, dark, toggleDark: () => setDark((x) => !x), t }}>{children}</Ctx.Provider>;
}

export function usePrefs() {
  const c = useContext(Ctx);
  if (!c) throw new Error("usePrefs outside provider");
  return c;
}
