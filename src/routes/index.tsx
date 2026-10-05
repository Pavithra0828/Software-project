import { createFileRoute } from "@tanstack/react-router";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { campusLifeRail, destinations, events, img, stats } from "@/data/campus";
import { Campus3D, CountUp, CTAButton, ImageCard, Reveal, SectionHeading } from "@/components/site/ui";
import {
  EventGrid,
  FacilitiesGrid,
  FindYourWay,
  FoodSection,
  InteractiveCampus,
  StoryCards,
  StudentHubSection,
} from "@/components/site/sections";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/")({
  head: () =>
    seo(
      "Your Campus, One Digital Experience",
      "Explore your campus, discover facilities, follow events and experience student life — all from one place.",
    ),
  component: Home,
});

const ease = [0.22, 1, 0.36, 1] as const;

function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "20%"]);
  const midY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "10%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "25%"]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);

  return (
    <section ref={ref} className="relative h-[100svh] min-h-[640px] overflow-hidden bg-charcoal">
      {/* Background photo */}
      <motion.img
        style={{ y: bgY }}
        src={img.hero}
        alt="Campus at golden hour"
        width={1920}
        height={1088}
        fetchPriority="high"
        className="absolute inset-0 h-[120%] w-full object-cover opacity-70"
      />

      {/* 3D layer — full-bleed and centred so it never pulls the composition off-axis */}
      <motion.div
        style={{ y: midY }}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-30 mix-blend-screen"
      >
        <Campus3D />
      </motion.div>

      {/* Readability overlays */}
      <div className="absolute inset-0 bg-charcoal/40" />
      <div className="absolute inset-0 bg-gradient-to-b from-charcoal/40 via-transparent to-charcoal/80" />
      <div className="shade absolute inset-0 opacity-60" />

      {/* Centred content */}
      <motion.div
        style={{ y: textY, opacity: textOpacity }}
        className="container-x relative z-10 mx-auto flex h-full max-w-6xl flex-col items-center justify-center px-5 text-center"
      >
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.7, ease }}
          className="eyebrow mb-8 rounded-full border border-ink/20 bg-charcoal/40 px-5 py-2.5 backdrop-blur-md"
        >
          Welcome to Campus Life 360
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 36 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 1, ease }}
          style={{ fontFamily: '"Inter", system-ui, sans-serif' }}
          className="font-hero mx-auto text-balance text-5xl font-bold leading-[1.02] text-ink drop-shadow-[0_2px_24px_rgba(0,0,0,0.35)] sm:text-6xl md:text-7xl lg:text-8xl"
        >
          <span className="block">Your Campus.</span>
          <span className="block text-gold">One Digital</span>
          <span className="block">Experience.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="mx-auto mt-8 max-w-xl text-balance text-base leading-relaxed text-ink/85 sm:text-lg"
        >
          Find facilities, follow events and get around campus — everything student life needs, in one place.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.7, ease }}
          className="mt-10 flex w-full flex-col items-center justify-center gap-4 sm:w-auto sm:flex-row"
        >
          <CTAButton to="/explore">Explore Campus</CTAButton>
          <CTAButton to="/campus-3d" variant="ghost">
            Take a Virtual Tour
          </CTAButton>
        </motion.div>
      </motion.div>

      {/* Scroll cue, centred at the bottom */}
      
    </section>
  );
}

function Home() {
  return (
    <>
      <Hero />

      {/* Campus at a glance */}
      <section className="section-y">
        <div className="container-x grid items-center gap-12 lg:grid-cols-[1fr_2fr]">
          <Reveal>
            <p className="eyebrow mb-4">Campus at a Glance</p>
            <h2 className="text-balance text-4xl md:text-5xl">
              A campus built
              <br />
              for curiosity.
            </h2>
          </Reveal>
          <div className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-border bg-border md:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="bg-background p-6 text-left sm:p-8">
                <p className="font-serif text-4xl text-forest sm:text-5xl md:text-6xl">
                  <CountUp to={s.value} suffix={s.suffix} />
                </p>
                <p className="mt-3 text-xs uppercase tracking-widest text-muted-foreground sm:text-sm">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Destinations */}
      <section className="pb-28 md:pb-44">
        <div className="container-x">
          <SectionHeading eyebrow="Explore Campus" title="Everything Around You." />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {destinations.map((d, i) => (
              <Reveal key={d.title} delay={(i % 3) * 0.08} className={i % 3 === 1 ? "lg:translate-y-12" : ""}>
                <ImageCard image={d.image} title={d.title} text={d.text} tall={i % 2 === 0} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <InteractiveCampus />
      <StudentHubSection />

      {/* Campus life rail */}
      <section className="section-y overflow-hidden bg-charcoal">
        <div className="container-x">
          <SectionHeading light eyebrow="Campus Life" title="Life, in full frame." />
        </div>
        <div className="no-scrollbar flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth px-[clamp(1.25rem,4vw,3rem)] pb-4">
          {campusLifeRail.map((c, i) => (
            <div key={i} className="w-[80vw] shrink-0 snap-start md:w-[38vw] lg:w-[30vw]">
              <ImageCard image={c.image} title={c.title} tall={i % 2 === 1} />
            </div>
          ))}
        </div>
      </section>

      {/* Events */}
      <section className="section-y">
        <div className="container-x">
          <SectionHeading eyebrow="Events" title="What's Happening On Campus?" />
          <EventGrid items={events.slice(0, 3)} />
          <div className="mt-12 flex justify-center">
            <CTAButton to="/events" variant="dark">
              All events
            </CTAButton>
          </div>
        </div>
      </section>

      <FoodSection />

      {/* Facilities */}
      <section className="section-y">
        <div className="container-x">
          <SectionHeading eyebrow="Campus Facilities" title="Spaces that work as hard as you do." />
          <FacilitiesGrid />
        </div>
      </section>

      <FindYourWay />

      {/* Stories */}
      <section className="section-y">
        <div className="container-x">
          <SectionHeading eyebrow="Campus Stories" title="Life Beyond The Classroom" />
          <StoryCards />
        </div>
      </section>

      {/* Closing call to action */}
      <section className="relative flex min-h-[80vh] items-center overflow-hidden bg-charcoal">
        <img src={img.sports} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-60" />
        <div className="shade absolute inset-0" />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-transparent to-charcoal/40" />
        <div className="container-x relative text-center">
          <Reveal>
            <h2 className="mx-auto max-w-4xl text-balance text-5xl leading-[1.05] text-ink md:text-7xl">
              There Is More To Your Campus Than You Think.
            </h2>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <CTAButton to="/explore">Explore Campus</CTAButton>
              <CTAButton to="/campus-3d" variant="ghost">
                Take a Virtual Tour
              </CTAButton>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}