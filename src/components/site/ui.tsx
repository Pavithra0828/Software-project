import { lazy, Suspense, useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useInView, useMotionValue, useSpring, animate, useReducedMotion } from "motion/react";
import { ClientOnly, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

const Scene = lazy(() => import("./CampusScene"));

export function Campus3D(props: { interactive?: boolean; selected?: string | null; onSelect?: ((id: string) => void) | undefined }) {
  const [lite, setLite] = useState(false);
  useEffect(() => setLite(window.innerWidth < 768), []);
  const fallback = <div className="h-full w-full animate-pulse bg-forest" />;
  return (
    <ClientOnly fallback={fallback}>
      <Suspense fallback={fallback}><Scene {...props} lite={lite} /></Suspense>
    </ClientOnly>
  );
}

export function Reveal({ children, delay = 0, className }: { children: ReactNode; delay?: number; className?: string }) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: reduceMotion ? 0 : 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function SectionHeading({ eyebrow, title, text, light, center }: { eyebrow?: string; title: ReactNode; text?: string; light?: boolean; center?: boolean }) {
  return (
    <Reveal className={cn("mb-12 max-w-3xl md:mb-16", center && "mx-auto text-center")}>
      {eyebrow && <p className="eyebrow mb-5">{eyebrow}</p>}
      <h2 className={cn("text-4xl leading-[1.05] md:text-6xl", light ? "text-ink" : "text-foreground")}>{title}</h2>
      {text && <p className={cn("mt-6 text-lg leading-relaxed", light ? "text-ink/70" : "text-muted-foreground")}>{text}</p>}
    </Reveal>
  );
}

export function CountUp({ to, suffix }: { to: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const c = animate(0, to, { duration: 2, ease: "easeOut", onUpdate: (n) => setV(Math.round(n)) });
    return () => c.stop();
  }, [inView, to]);
  return <span ref={ref}>{v}{suffix}</span>;
}

export function TiltCard({ children, className }: { children: ReactNode; className?: string }) {
  const rx = useSpring(useMotionValue(0), { stiffness: 150, damping: 15 });
  const ry = useSpring(useMotionValue(0), { stiffness: 150, damping: 15 });
  return (
    <motion.div
      className={cn("[transform-style:preserve-3d]", className)}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 1000 }}
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        ry.set(((e.clientX - r.left) / r.width - 0.5) * 8);
        rx.set(-((e.clientY - r.top) / r.height - 0.5) * 8);
      }}
      onMouseLeave={() => { rx.set(0); ry.set(0); }}
    >
      {children}
    </motion.div>
  );
}

export function ImageCard({ image, title, text, meta, className, tall }: { image: string; title: string; text?: string; meta?: ReactNode; className?: string; tall?: boolean }) {
  return (
    <TiltCard className={cn("group relative overflow-hidden rounded-2xl bg-charcoal", tall ? "aspect-[3/4]" : "aspect-[4/3]", className)}>
      <img src={image} alt={title} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-110" />
      <div className="shade absolute inset-0" />
      <div className="absolute inset-x-0 bottom-0 p-6 text-ink">
        {meta && <div className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-gold">{meta}</div>}
        <div className="flex items-end justify-between gap-4">
          <h3 className="text-2xl md:text-3xl">{title}</h3>
          <ArrowUpRight className="h-6 w-6 shrink-0 transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1" />
        </div>
        {text && <p className="mt-2 max-h-0 overflow-hidden text-sm text-ink/75 opacity-0 transition-all duration-500 group-hover:max-h-20 group-hover:opacity-100">{text}</p>}
      </div>
    </TiltCard>
  );
}

export function PageHero({ eyebrow, title, text, image }: { eyebrow: string; title: ReactNode; text?: string; image: string }) {
  return (
    <section className="relative flex min-h-[78vh] items-end overflow-hidden bg-charcoal">
      <motion.img initial={{ scale: 1.15 }} animate={{ scale: 1 }} transition={{ duration: 1.8, ease: "easeOut" }} src={image} alt="" className="absolute inset-0 h-full w-full object-cover opacity-80" />
      <div className="shade absolute inset-0" />
      <div className="container-x relative pb-20 pt-40">
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="eyebrow mb-5">{eyebrow}</motion.p>
        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.9 }} className="max-w-4xl text-5xl leading-[1.02] text-ink md:text-8xl">{title}</motion.h1>
        {text && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="mt-6 max-w-xl text-lg text-ink/75">{text}</motion.p>}
      </div>
    </section>
  );
}

export function CTAButton({ to, children, variant = "gold" }: { to: string; children: ReactNode; variant?: "gold" | "ghost" | "dark" }) {
  const styles = {
    gold: "bg-gold text-charcoal hover:bg-ink",
    ghost: "border border-ink/40 text-ink hover:bg-ink hover:text-charcoal",
    dark: "bg-forest text-ink hover:bg-charcoal",
  }[variant];
  return (
    <Link to={to} className={cn("group inline-flex items-center gap-2 rounded-full px-7 py-4 text-sm font-semibold tracking-wide transition-all duration-300", styles)}>
      {children}
      <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
    </Link>
  );
}

export function Pills({ items, value, onChange, light }: { items: string[]; value: string; onChange: (v: string) => void; light?: boolean }) {
  return (
    <div className="mb-10 flex flex-wrap gap-2">
      {items.map((c) => (
        <button key={c} onClick={() => onChange(c)} className={cn("rounded-full border px-5 py-2 text-sm font-medium transition-colors",
          value === c ? "border-forest bg-forest text-ink" : light ? "border-ink/25 text-ink/80 hover:border-gold" : "border-border text-foreground hover:border-forest")}>
          {c}
        </button>
      ))}
    </div>
  );
}
