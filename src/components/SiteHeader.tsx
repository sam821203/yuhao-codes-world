import { Link } from "@tanstack/react-router";
import { Moon, Sun } from "lucide-react";
import { usePrefs } from "@/lib/prefs";

export function SiteHeader() {
  const { lang, setLang, dark, toggleDark, t } = usePrefs();
  const nav = [
    { href: "/#about", l: { zh: "關於", en: "About" } },
    { href: "/#experience", l: { zh: "經歷", en: "Experience" } },
    { href: "/#projects", l: { zh: "作品", en: "Projects" } },
    { href: "/#contact", l: { zh: "聯絡", en: "Contact" } },
  ];
  return (
    <header className="sticky top-0 z-50 border-b bg-background/75 backdrop-blur-lg">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <Link to="/" className="font-mono text-sm font-semibold tracking-tight">
          <span className="text-primary">&lt;</span>yuhao<span className="text-primary">/&gt;</span>
        </Link>
        <nav className="hidden gap-7 text-sm text-muted-foreground md:flex" aria-label="Main">
          {nav.map((n) => (
            <a key={n.href} href={n.href} className="transition-colors hover:text-primary">{t(n.l)}</a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setLang(lang === "zh" ? "en" : "zh")}
            className="rounded-md border px-2.5 py-1.5 font-mono text-xs transition-colors hover:border-primary hover:text-primary"
            aria-label="Switch language"
          >
            {lang === "zh" ? "EN" : "中文"}
          </button>
          <button
            onClick={toggleDark}
            className="rounded-md border p-1.5 transition-colors hover:border-primary hover:text-primary"
            aria-label={dark ? "Light mode" : "Dark mode"}
          >
            {dark ? <Sun className="size-4" /> : <Moon className="size-4" />}
          </button>
        </div>
      </div>
    </header>
  );
}
