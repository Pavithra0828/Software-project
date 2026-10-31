import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import * as Icons from "lucide-react";
import {
  MapPin,
  Calendar,
  Clock,
  Layers,
  X,
  Leaf,
  Drumstick,
  Check,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
} from "lucide-react";
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
  const reduceMotion = useReducedMotion();
  return (
    <div className="divide-y divide-ink/15">
      {items.map((f, index) => (
        <motion.div
          key={f.name}
          initial={reduceMotion ? false : { opacity: 0, x: 16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: reduceMotion ? 0 : 0.55, delay: reduceMotion ? 0 : index * 0.08 }}
          className="group flex items-center justify-between gap-4 py-4 transition-colors hover:bg-ink/[0.03]"
        >
          <div className="flex items-center gap-3">
            <span className={cn("grid h-6 w-6 place-items-center rounded border-2", f.veg ? "border-gold text-gold" : "border-destructive text-destructive")}>
              {f.veg ? <Leaf className="h-3 w-3" /> : <Drumstick className="h-3 w-3" />}
            </span>
            <div>
              <p className="font-serif text-xl">{f.name}</p>
              <p className="text-xs uppercase tracking-widest opacity-60">{f.category}</p>
            </div>
          </div>
          <p className="font-serif text-xl text-gold transition-transform group-hover:scale-105">₹{f.price}</p>
        </motion.div>
      ))}
    </div>
  );
}

export function FoodSection() {
  const reduceMotion = useReducedMotion();
  return (
    <section className="bg-forest text-ink">
      <div className="grid lg:grid-cols-2">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, scale: 1.04 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: reduceMotion ? 0 : 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="relative min-h-[50vh] overflow-hidden"
        >
          <img src={img.canteen} alt="Students eating in the canteen" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
        </motion.div>
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

type WayfindingStep = { title: string; instruction: string };
type WayfindingRoute = { id: string; name: string; steps: WayfindingStep[] };

const wayfindingRoutes: WayfindingRoute[] = [
  {
    id: "computer-lab-3",
    name: "Computer Lab 3",
    steps: [
      { title: "Main Gate", instruction: "Start here" },
      { title: "Academic Block", instruction: "Walk 120 m ahead" },
      { title: "Second Floor", instruction: "Take the stairs on the left" },
      { title: "Computer Lab 3", instruction: "You have arrived" },
    ],
  },
  ...buildings
    .filter((building) => building.id !== "labs")
    .map((building) => ({
      id: building.id,
      name: building.id === "library" ? "Central Library" : building.name,
      steps: [
        { title: "Main Gate", instruction: "Start here" },
        { title: "Campus grounds", instruction: `Follow campus signs toward ${building.name}` },
        { title: building.name, instruction: "You have arrived" },
      ],
    })),
];

export function FindYourWay() {
  const reduceMotion = useReducedMotion();
  const [routeId, setRouteId] = useState("computer-lab-3");
  const [activeStep, setActiveStep] = useState(0);
  const route = wayfindingRoutes.find((item) => item.id === routeId) ?? wayfindingRoutes[0]!;
  const isComplete = activeStep === route.steps.length - 1;

  const selectRoute = (nextRouteId: string) => {
    setRouteId(nextRouteId);
    setActiveStep(0);
  };

  const advanceStep = () => {
    setActiveStep((step) => Math.min(step + 1, route.steps.length - 1));
  };

  const goBack = () => {
    setActiveStep((step) => Math.max(step - 1, 0));
  };

  const resetRoute = () => setActiveStep(0);

  return (
    <section className="section-y bg-secondary">
      <div className="container-x grid items-center gap-16 lg:grid-cols-2">
        <div>
          <SectionHeading
            eyebrow="Find Your Way"
            title={<>Find <em className="text-forest">{route.name}</em></>}
            text="Choose a campus destination and follow the route one step at a time."
          />
          <div className="mt-8 max-w-md">
            <label htmlFor="campus-destination" className="mb-2 block text-sm font-semibold">
              Choose your destination
            </label>
            <div className="relative">
              <MapPin aria-hidden="true" className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-forest" />
              <select
                id="campus-destination"
                value={route.id}
                onChange={(event) => selectRoute(event.target.value)}
                className="w-full appearance-none rounded-xl border border-border bg-background py-3.5 pl-11 pr-10 text-sm font-medium outline-none transition focus:border-forest focus:ring-2 focus:ring-forest/20"
              >
                {wayfindingRoutes.map((item) => (
                  <option key={item.id} value={item.id}>{item.name}</option>
                ))}
              </select>
              <ChevronRight aria-hidden="true" className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 rotate-90 text-muted-foreground" />
            </div>
            <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
              Sample campus directions. Follow posted signs and check with campus staff if a route has changed.
            </p>
          </div>
        </div>
        <div className="relative rounded-3xl bg-charcoal p-10 text-ink">
          <div className="mb-7 flex items-center justify-between gap-4">
            <div>
              <p className="eyebrow mb-2">Your route</p>
              <p className="text-sm text-ink/60" aria-live="polite">
                {isComplete ? "You've reached your destination" : `Step ${activeStep + 1} of ${route.steps.length}`}
              </p>
            </div>
            <button
              type="button"
              onClick={resetRoute}
              disabled={activeStep === 0}
              className="inline-flex items-center gap-2 rounded-full border border-ink/15 px-3 py-2 text-xs font-semibold text-ink/75 transition hover:border-gold hover:text-gold disabled:cursor-not-allowed disabled:opacity-40"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              Start over
            </button>
          </div>

          <div className="relative">
            <div aria-hidden="true" className="absolute bottom-5 left-[1rem] top-5 w-px bg-ink/15 sm:left-[1.125rem]">
              <motion.div
                className="h-full w-full origin-top bg-gold"
                animate={{ scaleY: route.steps.length > 1 ? activeStep / (route.steps.length - 1) : 1 }}
                transition={{ duration: reduceMotion ? 0 : 0.45 }}
              />
            </div>
            <ol className="relative space-y-5">
              {route.steps.map((step, index) => {
                const isActive = index === activeStep;
                const isVisited = index < activeStep;
                return (
                  <motion.li
                    key={`${route.id}-${step.title}`}
                    initial={reduceMotion ? false : { opacity: 0, x: 16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: reduceMotion ? 0 : 0.45, delay: reduceMotion ? 0 : index * 0.08 }}
                  >
                    <button
                      type="button"
                      onClick={() => setActiveStep(index)}
                      aria-current={isActive ? "step" : undefined}
                      className="group flex w-full items-center gap-4 rounded-xl py-1 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold sm:gap-5"
                    >
                      <span
                        className={cn(
                          "relative z-10 grid h-8 w-8 shrink-0 place-items-center rounded-full border text-xs font-bold transition-all duration-300 sm:h-9 sm:w-9",
                          isActive
                            ? "border-gold bg-gold text-charcoal shadow-[0_0_0_5px_rgba(212,168,85,0.12)]"
                            : isVisited
                              ? "border-gold bg-forest text-gold"
                              : "border-ink/35 bg-charcoal text-ink/60 group-hover:border-gold group-hover:text-gold",
                        )}
                      >
                        {isVisited ? <Check className="h-4 w-4" /> : index + 1}
                      </span>
                      <span className="min-w-0 flex-1 py-1">
                        <span className={cn("block font-serif text-xl transition-colors sm:text-2xl", isActive ? "text-ink" : "text-ink/75 group-hover:text-ink")}>
                          {step.title}
                        </span>
                        <span className={cn("mt-0.5 block text-[10px] uppercase tracking-[0.16em] sm:text-[11px]", isActive ? "text-gold" : "text-ink/45")}>
                          {step.instruction}
                        </span>
                      </span>
                      {isActive && <MapPin aria-hidden="true" className="mr-1 h-4 w-4 shrink-0 text-gold" />}
                    </button>
                  </motion.li>
                );
              })}
            </ol>
          </div>

          <div className="mt-8 flex items-center justify-between gap-3 border-t border-ink/10 pt-5">
            <button
              type="button"
              onClick={goBack}
              disabled={activeStep === 0}
              className="inline-flex items-center gap-1 rounded-full px-3 py-2 text-sm font-semibold text-ink/70 transition hover:text-ink disabled:cursor-not-allowed disabled:opacity-35"
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </button>
            <button
              type="button"
              onClick={advanceStep}
              disabled={isComplete}
              className="inline-flex min-w-36 items-center justify-center gap-2 rounded-full bg-gold px-5 py-3 text-sm font-bold text-charcoal transition hover:bg-ink disabled:cursor-not-allowed disabled:bg-forest disabled:text-gold"
            >
              {isComplete ? "Route complete" : activeStep === 0 ? "Start directions" : "Next step"}
              {!isComplete && <ChevronRight className="h-4 w-4" />}
              {isComplete && <Check className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
