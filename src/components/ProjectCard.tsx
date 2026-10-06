import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/data/content";
import { usePrefs } from "@/lib/prefs";

export function ProjectCard({ p, large }: { p: Project; large?: boolean }) {
  const { t } = usePrefs();
  return (
    <Link
      to="/projects/$slug"
      params={{ slug: p.slug }}
      className="card-lift group flex h-full flex-col overflow-hidden rounded-xl border bg-card focus-visible:outline-2 focus-visible:outline-ring"
    >
      <div className={`overflow-hidden ${large ? "aspect-[16/10]" : "aspect-video"}`}>
        <img src={p.image} alt={t(p.title)} loading="lazy" width={1280} height={800}
          className="size-full object-cover transition-transform duration-500 group-hover:scale-105" />
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-semibold leading-snug">{t(p.title)}</h3>
          <ArrowUpRight className="size-4 shrink-0 text-muted-foreground transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
        </div>
        <p className="text-sm text-muted-foreground">{t(p.short)}</p>
        <div className="mt-auto flex flex-wrap gap-1.5 pt-2">
          {p.tags.map((tag) => (
            <span key={tag} className="rounded bg-secondary px-2 py-0.5 font-mono text-[11px] text-secondary-foreground">{tag}</span>
          ))}
        </div>
      </div>
    </Link>
  );
}
