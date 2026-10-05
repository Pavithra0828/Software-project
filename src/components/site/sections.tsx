import { useState } from "react";
import { motion } from "motion/react";
import * as Icons from "lucide-react";
import { MapPin, Calendar, Clock, Layers, X, Leaf, Drumstick } from "lucide-react";
import { buildings, events, food, hubItems, img, facilities, stories } from "@/data/campus";
import { Campus3D, ImageCard, Reveal, SectionHeading, TiltCard } from "./ui";
import { cn } from "@/lib/utils";

export function BuildingPanel({ id, onClose, className }: { id: string | null; onClose: () => void; className?: string }) {
  const b = buildings.find((x) => x.id === id);
  if (!b) return null;
  return (
    <motion.div key={b.id} initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} className={cn("w-full max-w-sm overflow-hidden rounded-2xl bg-background shadow-2xl", className)}>
      <div className="relative h-40">
        <img src={b.image} alt={b.name} className="h-full w-full object-cover" />
        <button aria-label="Close" onClick={onClose} className="absolute right-3 top-3 rounded-full bg-background/90 p-1.5"><X className="h-4 w-4" /></button>
      </div>
      <div className="p-6">
        <p className="eyebrow mb-2">Location</p>
        <h3 className="text-2xl uppercase tracking-wide">{b.name}</h3>
        <p className="mt-2 text-sm text-muted-foreground">“{b.tagline}”</p>
        <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
          <div className="flex items-center gap-2"><Clock className="h-4 w-4 text-gold" />{b.hours}</div>
          <div className="flex items-center gap-2"><Layers className="h-4 w-4 text-gold" />{b.floors ? `${b.floors} floors` : "Open ground"}</div>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {b.facilities.map((f) => <span key={f} className="rounded-full bg-secondary px-3 py-1 text-xs font-medium">{f}</span>)}
        </div>
      </div>
    </motion.div>
  );
}

export function InteractiveCampus() {
  const [sel, setSel] = useState<string | null>("library");
  return (
    <section className="section-y bg-charcoal">
      <div className="container-x">
        <SectionHeading light eyebrow="Interactive Campus" title={<>Step inside.<br /><em className="text-gold">Tap any building.</em></>} />
      </div>
      <div className="container-x">
        <div className="relative h-[70vh] min-h-[480px] overflow-hidden rounded-3xl bg-forest">
          <Campus3D interactive selected={sel} onSelect={(id) => setSel(id || null)} />
          <div className="pointer-events-none absolute inset-x-4 bottom-4 flex justify-end md:inset-x-auto md:right-6 md:top-6 md:bottom-auto">
            <div className="pointer-events-auto"><BuildingPanel id={sel} onClose={() => setSel(null)} /></div>
          </div>
          <div className="absolute left-4 top-4 flex flex-wrap gap-2 md:left-6 md:top-6 md:max-w-md">
            {buildings.map((b) => (
              <button key={b.id} onClick={() => setSel(b.id)} className={cn("rounded-full px-3 py-1.5 text-xs font-semibold backdrop-blur", sel === b.id ? "bg-gold text-charcoal" : "bg-charcoal/60 text-ink")}>{b.name}</button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function StudentHubSection() {
  return (
    <section className="section-y">
      <div className="container-x grid items-center gap-16 lg:grid-cols-2">
        <Reveal className="relative">
          <img src={img.library} alt="Students studying in the library" loading="lazy" className="aspect-[4/5] w-full rounded-3xl object-cover" />
          <div className="absolute -bottom-6 -right-4 rounded-2xl bg-forest p-6 text-ink shadow-2xl md:-right-8">
            <p className="font-serif text-4xl">1,200+</p><p className="text-sm text-ink/70">resources shared this term</p>
          </div>
        </Reveal>
        <div>
          <SectionHeading eyebrow="Student Hub" title="Everything You Need, One Place." />
          <div className="grid gap-4 sm:grid-cols-2">
            {hubItems.map((h, i) => {
              const I = (Icons as any)[h.icon];
              return (
                <Reveal key={h.title} delay={i * 0.06}>
                  <div className="group rounded-2xl border bg-card p-5 transition hover:-translate-y-1 hover:border-gold hover:shadow-xl">
                    <I className="h-6 w-6 text-forest transition-transform duration-500 group-hover:rotate-[-8deg] group-hover:scale-110" />
                    <h3 className="mt-4 font-sans text-base font-semibold">{h.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{h.text}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export function EventGrid({ items = events }: { items?: typeof events }) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {items.map((e, i) => (
        <Reveal key={e.title} delay={(i % 3) * 0.08}>
          <TiltCard className="group overflow-hidden rounded-2xl border bg-card">
            <div className="relative aspect-[16/10] overflow-hidden">
              <img src={e.image} alt={e.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110" />
              <span className="absolute left-4 top-4 rounded-full bg-background/90 px-3 py-1 text-xs font-semibold">{e.category}</span>
              <div className="absolute bottom-4 right-4 rounded-xl bg-forest px-3 py-2 text-center text-ink">
                <p className="text-[10px] uppercase tracking-widest text-gold">{e.date.split(" ")[0]}</p>
                <p className="font-serif text-2xl leading-none">{e.date.split(" ")[1]}</p>
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-2xl">{e.title}</h3>
              <p className="mt-3 flex items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5"><MapPin className="h-4 w-4" />{e.location}</span>
                <span className="flex items-center gap-1.5"><Calendar className="h-4 w-4" />{e.date}, 2026</span>
              </p>
            </div>
          </TiltCard>
        </Reveal>
      ))}
    </div>
  );
}

export function FoodMenu({ items = food }: { items?: typeof food }) {
  return (
    <div className="divide-y divide-ink/15">
      {items.map((f) => (
        <div key={f.name} className="flex items-center justify-between gap-4 py-4">
          <div className="flex items-center gap-3">
            <span className={cn("grid h-6 w-6 place-items-center rounded border-2", f.veg ? "border-gold text-gold" : "border-destructive text-destructive")}>
              {f.veg ? <Leaf className="h-3 w-3" /> : <Drumstick className="h-3 w-3" />}
            </span>
            <div>
              <p className="font-serif text-xl">{f.name}</p>
              <p className="text-xs uppercase tracking-widest opacity-60">{f.category}</p>
            </div>
          </div>
          <p className="font-serif text-xl text-gold">₹{f.price}</p>
        </div>
      ))}
    </div>
  );
}

export function FoodSection() {
  return (
    <section className="bg-forest text-ink">
      <div className="grid lg:grid-cols-2">
        <div className="relative min-h-[50vh]">
          <img src={img.canteen} alt="Students eating in the canteen" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
        </div>
        <div className="section-y px-[clamp(1.25rem,5vw,5rem)]">
          <SectionHeading light eyebrow="Food & Canteen" title="Good Food. Good Breaks." />
          <FoodMenu items={food.filter((_, i) => i % 2 === 0)} />
        </div>
      </div>
    </section>
  );
}

export function FacilitiesGrid() {
  return (
    <div className="grid auto-rows-[220px] gap-4 md:grid-cols-4">
      {facilities.map((f, i) => (
        <Reveal key={f.title} delay={(i % 4) * 0.05} className={f.span}>
          <ImageCard image={f.image} title={f.title} className="!aspect-auto h-full" />
        </Reveal>
      ))}
    </div>
  );
}

export function StoryCards() {
  return (
    <div className="grid gap-8 md:grid-cols-2">
      {stories.map((s, i) => (
        <Reveal key={s.title} delay={(i % 2) * 0.1} className={i % 2 ? "md:mt-24" : ""}>
          <article className="group">
            <div className="overflow-hidden rounded-3xl">
              <img src={s.image} alt={s.title} loading="lazy" className="aspect-[4/3] w-full object-cover transition-transform duration-1000 group-hover:scale-105" />
            </div>
            <p className="eyebrow mt-6">Story {String(i + 1).padStart(2, "0")}</p>
            <h3 className="mt-2 text-3xl md:text-4xl">{s.title}</h3>
            <p className="mt-2 text-muted-foreground">{s.text}</p>
          </article>
        </Reveal>
      ))}
    </div>
  );
}

const routeSteps = ["Main Gate", "Academic Block", "Second Floor", "Computer Lab 3"];
export function FindYourWay() {
  return (
    <section className="section-y bg-secondary">
      <div className="container-x grid items-center gap-16 lg:grid-cols-2">
        <div>
          <SectionHeading eyebrow="Find Your Way" title={<>Find <em className="text-forest">Computer Lab 3</em></>} text="Step-by-step directions from the gate to any room on campus." />
        </div>
        <div className="relative rounded-3xl bg-charcoal p-10 text-ink">
          <svg className="absolute left-[3.1rem] top-14 h-[calc(100%-7rem)] w-2" preserveAspectRatio="none" viewBox="0 0 2 600">
            <line x1="1" y1="0" x2="1" y2="600" stroke="currentColor" strokeWidth="2" className="draw-path text-gold" />
          </svg>
          <ol className="relative space-y-10">
            {routeSteps.map((s, i) => (
              <motion.li key={s} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.4 }} className="flex items-center gap-6">
                <span className={cn("grid h-8 w-8 shrink-0 place-items-center rounded-full border-2 text-xs font-bold", i === routeSteps.length - 1 ? "border-gold bg-gold text-charcoal" : "border-gold bg-charcoal text-gold")}>{i + 1}</span>
                <div>
                  <p className="font-serif text-2xl">{s}</p>
                  <p className="text-xs uppercase tracking-widest text-ink/50">{["Start here", "Walk 120 m ahead", "Take stairs on the left", "You have arrived"][i]}</p>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
