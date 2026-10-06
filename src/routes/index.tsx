import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { ArrowRight, FileText, Github, Linkedin, Mail, MapPin, Send } from "lucide-react";
import headshot from "@/assets/headshot.jpg";
import { usePrefs } from "@/lib/prefs";
import { Reveal } from "@/components/Reveal";
import { ProjectCard } from "@/components/ProjectCard";
import { experience, links, projects, skills } from "@/data/content";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Yu Hao Huang 黃宇浩 — Front-end Engineer Portfolio" },
      { name: "description", content: "Front-end engineer in Taiwan building responsive, data-rich web apps: dashboards, real-time maps and AI interfaces." },
      { property: "og:title", content: "Yu Hao Huang 黃宇浩 — Front-end Engineer" },
      { property: "og:description", content: "Dashboards, real-time maps and AI-powered interfaces. Vue, React, Angular, TypeScript." },
    ],
  }),
  component: Index,
});

function SectionTitle({ k, children }: { k: string; children: React.ReactNode }) {
  return (
    <Reveal className="mb-10">
      <p className="font-mono text-xs uppercase tracking-widest text-primary">{k}</p>
      <h2 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">{children}</h2>
    </Reveal>
  );
}

const btn = "inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-medium transition-all focus-visible:outline-2 focus-visible:outline-ring";
const btnPrimary = `${btn} bg-primary text-primary-foreground hover:-translate-y-0.5 hover:shadow-[0_10px_30px_-10px_var(--glow)]`;
const btnGhost = `${btn} border hover:border-primary hover:text-primary`;
const iconBtn = "rounded-lg border p-2.5 text-muted-foreground transition-colors hover:border-primary hover:text-primary";

function Index() {
  const { t } = usePrefs();
  const [filter, setFilter] = useState<"all" | "work" | "side">("all");
  const featured = projects.filter((p) => p.featured);
  const rest = projects.filter((p) => !p.featured && (filter === "all" || p.type === filter));
  const featuredShown = featured.filter((p) => filter === "all" || p.type === filter);

  const [sent, setSent] = useState(false);
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const subject = encodeURIComponent(`Portfolio contact from ${f.get("name")}`);
    const body = encodeURIComponent(`${f.get("message")}\n\n— ${f.get("name")} (${f.get("email")})`);
    window.location.href = `mailto:${links.email}?subject=${subject}&body=${body}`;
    setSent(true);
  };

  const filters = [
    { k: "all", l: { zh: "全部", en: "All" } },
    { k: "work", l: { zh: "工作", en: "Work" } },
    { k: "side", l: { zh: "個人專案", en: "Side Projects" } },
  ] as const;

  return (
    <main>
      {/* Hero */}
      <section className="bg-grid relative overflow-hidden">
        <div className="glow-orb pointer-events-none absolute -top-40 right-0 size-[600px]" />
        <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-5 py-20 md:grid-cols-[1.4fr_1fr] md:py-32">
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            <p className="flex items-center gap-2 font-mono text-sm text-muted-foreground">
              <MapPin className="size-4 text-primary" /> {t({ zh: "台灣", en: "Taiwan" })}
            </p>
            <h1 className="mt-4 text-5xl font-bold tracking-tight md:text-7xl">
              {t({ zh: "黃宇浩", en: "Yu Hao Huang" })}
              <span className="mt-2 block text-2xl font-medium text-muted-foreground md:text-3xl">
                {t({ zh: "Yu Hao Huang", en: "黃宇浩" })}
              </span>
            </h1>
            <p className="mt-5 font-mono text-lg text-primary">Front-end Engineer</p>
            <p className="mt-4 max-w-xl text-lg text-muted-foreground">
              {t({ zh: "打造響應式、資料密集的 Web 應用 — 儀表板、即時地圖與 AI 驅動介面。", en: "Building responsive, data-rich web apps — dashboards, real-time maps, and AI-powered interfaces." })}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#projects" className={btnPrimary}>{t({ zh: "查看作品", en: "View Projects" })} <ArrowRight className="size-4" /></a>
              <a href="#contact" className={btnGhost}>{t({ zh: "聯絡我", en: "Contact Me" })}</a>
            </div>
            <div className="mt-8 flex gap-2">
              <a href={links.github} target="_blank" rel="noreferrer" aria-label="GitHub" className={iconBtn}><Github className="size-4" /></a>
              <a href={links.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className={iconBtn}><Linkedin className="size-4" /></a>
              <a href={links.resume} target="_blank" rel="noreferrer" aria-label="Resume PDF" className={`${iconBtn} flex items-center gap-1.5 font-mono text-xs`}><FileText className="size-4" /> {t({ zh: "履歷", en: "Resume" })}</a>
            </div>
          </div>
          <div className="animate-in fade-in zoom-in-95 mx-auto w-64 duration-1000 md:w-full">
            <div className="relative">
              <div className="absolute -inset-3 rounded-3xl border border-primary/30" />
              <img src={headshot} alt="Yu Hao Huang headshot" width={816} height={816} className="relative aspect-square rounded-2xl object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="mx-auto max-w-6xl scroll-mt-16 px-5 py-24">
        <SectionTitle k="01 / about">{t({ zh: "關於我", en: "About" })}</SectionTitle>
        <div className="grid gap-12 md:grid-cols-[1fr_1.3fr]">
          <Reveal>
            <p className="text-lg leading-relaxed text-muted-foreground">
              {t({
                zh: "我是一名專注於資料視覺化與即時系統的前端工程師，參與過資安、能源、航空與電商等領域的大型專案。我重視乾淨的架構、可重用的元件與流暢的使用者體驗，讓複雜的資料變得清晰易懂。",
                en: "I'm a front-end engineer focused on data visualization and real-time systems, with large-scale projects across security, energy, aviation and e-commerce. I care about clean architecture, reusable components and smooth UX that make complex data feel clear.",
              })}
            </p>
          </Reveal>
          <div className="space-y-6">
            {skills.map((s, i) => (
              <Reveal key={s.cat.en} delay={i * 60}>
                <h3 className="mb-2 font-mono text-xs uppercase tracking-wider text-muted-foreground">{t(s.cat)}</h3>
                <div className="flex flex-wrap gap-2">
                  {s.items.map((it) => (
                    <span key={it} className="rounded-md border bg-card px-3 py-1 text-sm transition-colors hover:border-primary hover:text-primary">{it}</span>
                  ))}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Experience */}
      <section id="experience" className="scroll-mt-16 border-y bg-muted/40">
        <div className="mx-auto max-w-6xl px-5 py-24">
          <SectionTitle k="02 / experience">{t({ zh: "工作經歷", en: "Experience" })}</SectionTitle>
          <ol className="relative ml-2 border-l">
            {experience.map((e, i) => (
              <li key={e.title.en} className="mb-10 ml-6 last:mb-0">
                <Reveal delay={i * 50}>
                  <span className="absolute -left-[5px] mt-2 size-2.5 rounded-full bg-primary ring-4 ring-background" />
                  <h3 className="text-lg font-semibold">{t(e.title)}</h3>
                  <p className="mt-1 text-muted-foreground">{t(e.desc)}</p>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {e.tags.map((tg) => <span key={tg} className="font-mono text-xs text-primary">#{tg}</span>)}
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="mx-auto max-w-6xl scroll-mt-16 px-5 py-24">
        <SectionTitle k="03 / projects">{t({ zh: "精選作品", en: "Projects" })}</SectionTitle>
        <div className="mb-8 flex flex-wrap gap-2" role="tablist">
          {filters.map((f) => (
            <button key={f.k} role="tab" aria-selected={filter === f.k} onClick={() => setFilter(f.k)}
              className={`rounded-full border px-4 py-1.5 text-sm transition-all ${filter === f.k ? "border-primary bg-primary text-primary-foreground" : "hover:border-primary hover:text-primary"}`}>
              {t(f.l)}
            </button>
          ))}
        </div>
        {featuredShown.length > 0 && (
          <>
            <p className="mb-4 font-mono text-xs uppercase tracking-wider text-accent">★ {t({ zh: "置頂", en: "Featured" })}</p>
            <div className="mb-12 grid gap-6 md:grid-cols-3">
              {featuredShown.map((p, i) => <Reveal key={p.slug} delay={i * 80}><ProjectCard p={p} large /></Reveal>)}
            </div>
          </>
        )}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((p, i) => <Reveal key={p.slug} delay={i * 80}><ProjectCard p={p} /></Reveal>)}
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="scroll-mt-16 border-t bg-muted/40">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 py-24 md:grid-cols-2">
          <div>
            <SectionTitle k="04 / contact">{t({ zh: "一起合作", en: "Let's talk" })}</SectionTitle>
            <Reveal>
              <p className="text-muted-foreground">{t({ zh: "有專案、職缺或想法？歡迎來信。", en: "Have a project, role or idea? Drop me a line." })}</p>
              <a href={`mailto:${links.email}`} className="mt-6 inline-flex items-center gap-2 font-mono text-primary hover:underline"><Mail className="size-4" />{links.email}</a>
              <div className="mt-6 flex gap-2">
                <a href={links.github} target="_blank" rel="noreferrer" aria-label="GitHub" className={iconBtn}><Github className="size-4" /></a>
                <a href={links.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className={iconBtn}><Linkedin className="size-4" /></a>
              </div>
            </Reveal>
          </div>
          <Reveal>
            <form onSubmit={onSubmit} className="space-y-4 rounded-xl border bg-card p-6">
              {[
                { n: "name", l: { zh: "姓名", en: "Name" }, type: "text" },
                { n: "email", l: { zh: "Email", en: "Email" }, type: "email" },
              ].map((f) => (
                <label key={f.n} className="block text-sm">
                  <span className="text-muted-foreground">{t(f.l)}</span>
                  <input name={f.n} type={f.type} required maxLength={200}
                    className="mt-1 w-full rounded-md border bg-background px-3 py-2 outline-none transition-colors focus:border-primary" />
                </label>
              ))}
              <label className="block text-sm">
                <span className="text-muted-foreground">{t({ zh: "訊息", en: "Message" })}</span>
                <textarea name="message" required rows={5} maxLength={2000}
                  className="mt-1 w-full resize-none rounded-md border bg-background px-3 py-2 outline-none transition-colors focus:border-primary" />
              </label>
              <button type="submit" className={btnPrimary}><Send className="size-4" />{t({ zh: "送出", en: "Send" })}</button>
              {sent && <p className="text-sm text-primary" role="status">{t({ zh: "已開啟你的郵件程式，謝謝！", en: "Opening your email app — thanks!" })}</p>}
            </form>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
