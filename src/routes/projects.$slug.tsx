import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import { projects } from "@/data/content";
import { usePrefs } from "@/lib/prefs";
import { Reveal } from "@/components/Reveal";

export const Route = createFileRoute("/projects/$slug")({
  loader: ({ params }) => {
    const p = projects.find((x) => x.slug === params.slug);
    if (!p) throw notFound();
    return { slug: p.slug };
  },
  head: ({ loaderData }) => {
    const p = projects.find((x) => x.slug === loaderData?.slug);
    if (!p) return { meta: [{ title: "Not found" }, { name: "robots", content: "noindex" }] };
    const title = `${p.title.en} — Case Study · Yu Hao Huang`;
    return {
      meta: [
        { title },
        { name: "description", content: p.short.en },
        { property: "og:title", content: title },
        { property: "og:description", content: p.short.en },
      ],
    };
  },
  component: CaseStudy,
});

function CaseStudy() {
  const { slug } = Route.useLoaderData();
  const p = projects.find((x) => x.slug === slug)!;
  const { t } = usePrefs();
  const H = ({ n, children }: { n: string; children: React.ReactNode }) => (
    <h2 className="mb-4 flex items-baseline gap-3 text-2xl font-bold"><span className="font-mono text-sm text-primary">{n}</span>{children}</h2>
  );
  return (
    <main className="mx-auto max-w-4xl px-5 py-12">
      <Link to="/" hash="projects" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary">
        <ArrowLeft className="size-4" />{t({ zh: "返回作品", en: "Back to projects" })}
      </Link>
      <div className="animate-in fade-in slide-in-from-bottom-4 mt-6 duration-700">
        <p className="font-mono text-xs uppercase tracking-widest text-primary">{p.type === "work" ? t({ zh: "工作專案", en: "Work" }) : t({ zh: "個人專案", en: "Side Project" })}</p>
        <h1 className="mt-2 text-4xl font-bold tracking-tight md:text-5xl">{t(p.title)}</h1>
        <p className="mt-3 text-lg text-muted-foreground">{t(p.short)}</p>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {p.tags.map((tag) => <span key={tag} className="rounded bg-secondary px-2 py-0.5 font-mono text-xs">{tag}</span>)}
        </div>
        <div className="mt-6 flex flex-wrap gap-3">
          {p.demo && <a href={p.demo} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-transform hover:-translate-y-0.5"><ExternalLink className="size-4" />Live demo</a>}
          {p.repo && <a href={p.repo} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm hover:border-primary hover:text-primary"><Github className="size-4" />GitHub</a>}
        </div>
        <img src={p.image} alt={t(p.title)} width={1280} height={800} className="mt-10 w-full rounded-xl border" />
      </div>

      <div className="mt-16 space-y-14">
        <Reveal><H n="01">{t({ zh: "問題", en: "Problem" })}</H><p className="leading-relaxed text-muted-foreground">{t(p.problem)}</p></Reveal>
        <Reveal><H n="02">{t({ zh: "我的角色", en: "My Role" })}</H><p className="leading-relaxed text-muted-foreground">{t(p.role)}</p></Reveal>
        <Reveal>
          <H n="03">{t({ zh: "前端挑戰", en: "Front-end Challenges" })}</H>
          <ul className="space-y-2">
            {p.challenges.map((c) => <li key={c.en} className="flex gap-3 text-muted-foreground"><span className="text-accent">▸</span>{t(c)}</li>)}
          </ul>
        </Reveal>
        <Reveal>
          <H n="04">{t({ zh: "解決方案", en: "Solutions" })}</H>
          <div className="grid gap-4 sm:grid-cols-2">
            {p.solutions.map((s) => (
              <div key={s.label.en} className="card-lift rounded-xl border bg-card p-5">
                <h3 className="font-mono text-sm text-primary">{t(s.label)}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{t(s.text)}</p>
              </div>
            ))}
          </div>
        </Reveal>
        <Reveal>
          <H n="05">{t({ zh: "成果", en: "Result" })}</H>
          <p className="rounded-xl border-l-4 border-primary bg-muted p-5 text-lg">{t(p.result)}</p>
        </Reveal>
      </div>
    </main>
  );
}
