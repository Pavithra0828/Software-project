import { createFileRoute } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { campusLifeRail, destinations, img, stats } from "@/data/campus";
import { Campus3D, CountUp, CTAButton, ImageCard, Reveal, SectionHeading } from "@/components/site/ui";
import { EventGrid, FacilitiesGrid, FindYourWay, FoodSection, InteractiveCampus, StoryCards, StudentHubSection } from "@/components/site/sections";
import { events } from "@/data/campus";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/")({
  head: () => seo("Your Campus, One Digital Experience", "Explore your campus, discover facilities, follow events and experience student life — all from one place."),
  component: Home,
});

function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const midY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  return (
    <section ref={ref} className="relative h-[100svh] min-h-[640px] overflow-hidden bg-charcoal">
      <motion.img style={{ y: bgY }} src={img.hero} alt="Campus at golden hour" width={1920} height={1088} className="absolute inset-0 h-[120%] w-full object-cover opacity-70" />
      <motion.div style={{ y: midY }} className="absolute inset-0 opacity-90 mix-blend-screen md:left-[40%]">
        <Campus3D />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-r from-charcoal via-charcoal/60 to-transparent" />
      <div className="shade absolute inset-0 opacity-60" />
      <motion.div style={{ y: textY }} className="container-x relative flex h-full flex-col justify-end pb-24 md:justify-center md:pb-0">
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="eyebrow mb-6">Welcome to Campus Life 360</motion.p>
        <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 1, ease: [0.22, 1, 0.36, 1] }} className="max-w-3xl text-5xl leading-[1] text-ink sm:text-7xl lg:text-8xl">
          Your Campus.<br /><em className="text-gold">One Digital</em> Experience.
        </motion.h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }} className="mt-8 max-w-lg text-lg text-ink/75">
          Explore your campus, discover facilities, find resources, follow events and experience student life from one place.
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }} className="mt-10 flex flex-wrap gap-4">
          <CTAButton to="/explore">Explore Campus</CTAButton>
          <CTAButton to="/campus-3d" variant="ghost">Take a Virtual Tour</CTAButton>
        </motion.div>
      </motion.div>
    </section>
  );
}

function Home() {
  return (
    <>
      <Hero />

      <section className="section-y">
        <div className="container-x grid gap-12 lg:grid-cols-[1fr_2fr]">
          <Reveal><p className="eyebrow mb-4">Campus at a Glance</p><h2 className="text-4xl md:text-5xl">A campus built<br />for curiosity.</h2></Reveal>
          <div className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl bg-border md:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="bg-background p-8">
                <p className="font-serif text-5xl text-forest md:text-6xl"><CountUp to={s.value} suffix={s.suffix} /></p>
                <p className="mt-3 text-sm uppercase tracking-widest text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-24 md:pb-36">
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

      <section className="section-y overflow-hidden bg-charcoal">
        <div className="container-x"><SectionHeading light eyebrow="Campus Life" title="Life, in full frame." /></div>
        <div className="no-scrollbar flex snap-x snap-mandatory gap-6 overflow-x-auto px-[clamp(1.25rem,4vw,3rem)] pb-4">
          {campusLifeRail.map((c, i) => (
            <div key={i} className="w-[80vw] shrink-0 snap-start md:w-[38vw]">
              <ImageCard image={c.image} title={c.title} tall={i % 2 === 1} />
            </div>
          ))}
        </div>
      </section>

      <section className="section-y">
        <div className="container-x">
          <SectionHeading eyebrow="Events" title="What's Happening On Campus?" />
          <EventGrid items={events.slice(0, 3)} />
          <div className="mt-12"><CTAButton to="/events" variant="dark">All events</CTAButton></div>
        </div>
      </section>

      <FoodSection />

      <section className="section-y">
        <div className="container-x">
          <SectionHeading eyebrow="Campus Facilities" title="Spaces that work as hard as you do." />
          <FacilitiesGrid />
        </div>
      </section>

      <FindYourWay />

      <section className="section-y">
        <div className="container-x">
          <SectionHeading eyebrow="Campus Stories" title="Life Beyond The Classroom" />
          <StoryCards />
        </div>
      </section>

      <section className="relative flex min-h-[80vh] items-center overflow-hidden bg-charcoal">
        <img src={img.sports} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-60" />
        <div className="shade absolute inset-0" />
        <div className="container-x relative text-center">
          <Reveal>
            <h2 className="mx-auto max-w-4xl text-5xl leading-[1.05] text-ink md:text-7xl">There Is More To Your Campus Than You Think.</h2>
            <div className="mt-10"><CTAButton to="/explore">Explore Campus</CTAButton></div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
