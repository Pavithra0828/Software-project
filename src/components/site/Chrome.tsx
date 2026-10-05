import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { Menu, Search, X } from "lucide-react";
import { allPages, nav } from "@/data/campus";
import { cn } from "@/lib/utils";

function Logo({ dark }: { dark?: boolean }) {
  return (
    <Link to="/" className={cn("font-serif text-lg font-bold leading-[0.9] tracking-wide", dark ? "text-foreground" : "text-ink")}>
      CAMPUSLIFE<br /><span className="text-gold">360</span>
    </Link>
  );
}

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);
  const [search, setSearch] = useState(false);
  const [q, setQ] = useState("");
  const path = useRouterState({ select: (s) => s.location.pathname });
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    on(); window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  useEffect(() => { setMenu(false); setSearch(false); }, [path]);
  const results = allPages.filter((p) => p.label.toLowerCase().includes(q.toLowerCase()));

  return (
    <>
      <header className={cn("fixed inset-x-0 top-0 z-50 transition-all duration-500", scrolled ? "bg-charcoal/75 py-3 backdrop-blur-xl" : "py-6")}>
        <div className="container-x flex items-center justify-between">
          <Logo />
          <nav className="hidden items-center gap-8 lg:flex">
            {nav.map((n) => (
              <Link key={n.to} to={n.to} className="text-sm font-medium text-ink/75 transition-colors hover:text-ink" activeProps={{ className: "!text-gold" }} activeOptions={{ exact: n.to === "/" }}>
                {n.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-2 text-ink">
            <button aria-label="Search" onClick={() => setSearch(true)} className="rounded-full p-2.5 hover:bg-ink/10"><Search className="h-5 w-5" /></button>
            <button aria-label="Menu" onClick={() => setMenu(true)} className="rounded-full p-2.5 hover:bg-ink/10"><Menu className="h-5 w-5" /></button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {menu && (
          <motion.div initial={{ clipPath: "circle(0% at 95% 4%)" }} animate={{ clipPath: "circle(150% at 95% 4%)" }} exit={{ clipPath: "circle(0% at 95% 4%)" }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[60] overflow-y-auto bg-forest text-ink">
            <div className="container-x flex items-center justify-between py-6">
              <Logo />
              <button aria-label="Close menu" onClick={() => setMenu(false)} className="rounded-full p-2.5 hover:bg-ink/10"><X className="h-6 w-6" /></button>
            </div>
            <div className="container-x grid gap-1 pb-16 pt-8 md:grid-cols-2">
              {[{ to: "/", label: "Home" }, ...allPages].map((p, i) => (
                <motion.div key={p.to} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + i * 0.03 }}>
                  <Link to={p.to} className="group flex items-baseline gap-4 border-b border-ink/10 py-4 font-serif text-3xl transition-colors hover:text-gold md:text-4xl">
                    <span className="font-sans text-xs text-gold">{String(i + 1).padStart(2, "0")}</span>{p.label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
        {search && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[60] bg-charcoal/90 backdrop-blur-xl" onClick={() => setSearch(false)}>
            <div className="container-x pt-32" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center gap-4 border-b border-ink/30 pb-4">
                <Search className="h-6 w-6 text-gold" />
                <input autoFocus value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search the campus…" className="w-full bg-transparent font-serif text-3xl text-ink outline-none placeholder:text-ink/40 md:text-5xl" />
                <button aria-label="Close search" onClick={() => setSearch(false)} className="text-ink"><X /></button>
              </div>
              <div className="mt-8 grid gap-2 md:grid-cols-3">
                {results.map((r) => (
                  <Link key={r.to} to={r.to} className="rounded-xl border border-ink/10 p-4 text-ink/80 transition hover:border-gold hover:text-ink">{r.label}</Link>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export function SiteFooter() {
  return (
    <footer className="bg-charcoal text-ink">
      <div className="container-x grid gap-12 py-20 md:grid-cols-4">
        <div className="md:col-span-2">
          <Logo />
          <p className="mt-6 max-w-sm text-ink/60">One digital experience for everything on your campus — places, people, events and resources.</p>
        </div>
        <div>
          <p className="eyebrow mb-4">Explore</p>
          <ul className="space-y-2 text-sm text-ink/70">
            {allPages.slice(0, 7).map((p) => <li key={p.to}><Link to={p.to} className="hover:text-gold">{p.label}</Link></li>)}
          </ul>
        </div>
        <div>
          <p className="eyebrow mb-4">Campus</p>
          <ul className="space-y-2 text-sm text-ink/70">
            {allPages.slice(7).map((p) => <li key={p.to}><Link to={p.to} className="hover:text-gold">{p.label}</Link></li>)}
          </ul>
        </div>
      </div>
      <div className="container-x border-t border-ink/10 py-6 text-xs text-ink/40">© 2026 CampusLife 360 · Sample campus content for demonstration.</div>
    </footer>
  );
}
