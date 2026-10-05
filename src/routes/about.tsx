import { createFileRoute } from "@tanstack/react-router";
import { img, stats } from "@/data/campus";
import { CountUp, PageHero, Reveal, SectionHeading } from "@/components/site/ui";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/about")({
  head: () => seo("About", "Why CampusLife 360 exists and what it brings to students, staff and visitors."),
  component: Page,
});

function Page() {
  return (
    <>
      <PageHero eyebrow="About" title="One campus, seen whole." image={img.hostel} />
      <section className="section-y"><div className="container-x grid items-center gap-16 lg:grid-cols-2">
        <div>
          <SectionHeading eyebrow="Our idea" title="Campus life shouldn't be scattered." text="Notices on boards, timetables in group chats, menus by word of mouth. CampusLife 360 brings places, people, events and resources into one calm, beautiful experience." />
          <div className="grid grid-cols-2 gap-6">
            {stats.map((s) => <div key={s.label}><p className="font-serif text-5xl text-forest"><CountUp to={s.value} suffix={s.suffix} /></p><p className="text-sm text-muted-foreground">{s.label}</p></div>)}
          </div>
        </div>
        <Reveal><img src={img.hero} alt="Campus" loading="lazy" className="aspect-[4/5] w-full rounded-3xl object-cover" /></Reveal>
      </div></section>
    </>
  );
}
