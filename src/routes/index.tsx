import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useReducedMotion } from "motion/react";
import { ArrowDown, ArrowUpRight, BookOpen, Cpu, GraduationCap, MoveUpRight } from "lucide-react";
import { img } from "@/data/campus";
import { CTAButton, Reveal, SectionHeading } from "@/components/site/ui";
import { EventGrid, FacilitiesGrid, FindYourWay, FoodSection } from "@/components/site/sections";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/")({
  head: () =>
    seo(
      "Francis Xavier Engineering College",
      "Discover Francis Xavier Engineering College. Explore academic programs, campus life and the college in 360°.",
    ),
  component: Home,
});

const programs = [
  {
    icon: Cpu,
    title: "Computer Science",
    description: "Turn ideas into software, systems and solutions for the real world.",
  },
  {
    icon: BookOpen,
    title: "Engineering",
    description: "Build a strong foundation through hands-on learning and collaboration.",
  },
  {
    icon: GraduationCap,
    title: "Student Experience",
    description: "Find your community, grow your interests and make campus your own.",
  },
];

function Home() {
  const reduceMotion = useReducedMotion();

  return (
    <>
      <section className="relative flex min-h-[760px] h-[100svh] max-h-[1100px] items-center overflow-hidden bg-charcoal">
        <motion.img
          src={img.hero}
          alt="Francis Xavier Engineering College campus"
          fetchPriority="high"
          className="absolute inset-0 h-full w-full object-cover"
          initial={reduceMotion ? false : { scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal/90 via-charcoal/55 to-charcoal/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-transparent to-charcoal/25" />

        <div className="container-x relative z-10 pb-16 pt-32 text-ink">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="max-w-4xl"
          >
            <p className="eyebrow mb-6 flex items-center gap-3">
              <span className="h-px w-9 bg-gold" />A future built together
            </p>
            <h1 className="font-hero text-balance text-5xl font-semibold leading-[1.03] tracking-tight sm:text-6xl md:text-7xl lg:text-8xl">
              Francis Xavier
              <span className="mt-2 block text-gold">Engineering College</span>
            </h1>
            <p className="mt-7 max-w-xl text-balance text-base leading-relaxed text-ink/80 sm:text-lg">
              A place to ask bigger questions, discover what you can do, and shape what comes next.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <CTAButton to="/campus-3d">View College 360</CTAButton>
              <CTAButton to="/departments" variant="ghost">
                Explore academics
              </CTAButton>
            </div>
          </motion.div>
        </div>

        <motion.a
          href="#discover"
          aria-label="Scroll to discover the college"
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-[10px] uppercase tracking-[0.24em] text-ink/65 transition-colors hover:text-gold"
        >
          Discover
          <ArrowDown className="h-4 w-4 animate-bounce" />
        </motion.a>
        <div className="absolute bottom-10 right-8 hidden items-center gap-3 text-xs uppercase tracking-[0.18em] text-ink/65 md:flex">
          <span className="h-px w-10 bg-gold/70" />
          Learn · Create · Lead
        </div>
      </section>

      <section id="discover" className="section-y">
        <div className="container-x grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <Reveal>
            <p className="eyebrow mb-5">Welcome to FXEC</p>
            <h2 className="max-w-xl text-balance text-4xl leading-[1.08] md:text-6xl">
              Your next chapter starts with a<span className="text-forest"> first step.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <div className="flex flex-col gap-6 border-l border-gold pl-6 sm:pl-8">
              <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground">
                At Francis Xavier Engineering College, learning reaches beyond the classroom. Find
                the people, ideas and experiences that help you turn your ambition into action.
              </p>
              <Link
                to="/about"
                className="group inline-flex w-fit items-center gap-2 text-sm font-bold text-forest transition-colors hover:text-charcoal"
              >
                Get to know the college
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-[#f1f0e9] py-24 md:py-32">
        <div className="container-x">
          <SectionHeading
            eyebrow="Find your direction"
            title={
              <>
                Curiosity is a great place
                <br className="hidden sm:block" /> to start.
              </>
            }
            text="Explore the learning, people and possibilities that make your college experience your own."
          />
          <div className="grid gap-4 md:grid-cols-3">
            {programs.map(({ icon: Icon, title, description }, index) => (
              <Reveal key={title} delay={index * 0.1}>
                <Link
                  to={index === 2 ? "/student-hub" : "/departments"}
                  className="group flex h-full min-h-64 flex-col rounded-2xl border border-foreground/10 bg-background p-7 transition-all duration-500 hover:-translate-y-2 hover:border-gold/70 hover:shadow-[0_24px_70px_-35px_rgba(27,54,41,0.35)] sm:p-8"
                >
                  <div className="flex items-center justify-between">
                    <span className="grid h-12 w-12 place-items-center rounded-full bg-forest/10 text-forest transition-colors duration-300 group-hover:bg-forest group-hover:text-ink">
                      <Icon className="h-5 w-5" />
                    </span>
                    <MoveUpRight className="h-5 w-5 text-foreground/35 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-forest" />
                  </div>
                  <div className="mt-auto pt-12">
                    <h3 className="font-sans text-xl font-bold tracking-tight">{title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      {description}
                    </p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-y">
        <div className="container-x">
          <div className="mb-12 flex flex-col justify-between gap-6 md:mb-16 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <Reveal>
                <p className="eyebrow mb-5">Campus facilities</p>
                <h2 className="text-balance text-4xl leading-[1.05] md:text-6xl">
                  Spaces that work as hard as you do.
                </h2>
                <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground">
                  Find the places to learn, recharge and make the most of your time on campus.
                </p>
              </Reveal>
            </div>
            <Link
              to="/facilities"
              className="group inline-flex w-fit items-center gap-2 text-sm font-bold text-forest transition-colors hover:text-charcoal"
            >
              Explore all facilities
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </div>
          <FacilitiesGrid />
        </div>
      </section>

      <FindYourWay />

      <FoodSection />

      <section className="section-y">
        <div className="container-x">
          <SectionHeading
            eyebrow="Events"
            title="What's happening on campus?"
            text="From new ideas to shared celebrations, there is always something bringing campus together."
          />
          <EventGrid />
          <div className="mt-12 flex justify-center">
            <CTAButton to="/events" variant="dark">
              All events
            </CTAButton>
          </div>
        </div>
      </section>

      <section className="relative isolate overflow-hidden bg-forest py-24 text-ink md:py-36">
        <img
          src={img.auditorium}
          alt=""
          loading="lazy"
          className="absolute inset-0 -z-10 h-full w-full object-cover opacity-20 mix-blend-luminosity"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-forest via-forest/95 to-forest/65" />
        <div className="container-x grid gap-10 md:grid-cols-[1fr_auto] md:items-end">
          <Reveal>
            <p className="eyebrow mb-5">See it for yourself</p>
            <h2 className="max-w-3xl text-balance text-4xl leading-[1.05] md:text-6xl">
              Take a closer look at your future campus.
            </h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-ink/70">
              Step into the college with an interactive 360° campus experience.
            </p>
          </Reveal>
          <Reveal delay={0.12} className="md:pb-1">
            <CTAButton to="/campus-3d">View College 360</CTAButton>
          </Reveal>
        </div>
      </section>
    </>
  );
}
