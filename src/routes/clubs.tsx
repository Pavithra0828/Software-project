import { createFileRoute } from "@tanstack/react-router";
import { clubs, img } from "@/data/campus";
import { ImageCard, PageHero, Reveal } from "@/components/site/ui";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/clubs")({
  head: () => seo("Clubs & Activities", "Coding, robotics, cultural, photography, sports and entrepreneurship clubs."),
  component: Page,
});

function Page() {
  return (
    <>
      <PageHero eyebrow="Clubs & Activities" title="Find your people." text="Six clubs. Hundreds of members. Endless weekends." image={img.hackathon} />
      <section className="section-y"><div className="container-x grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {clubs.map((c, i) => <Reveal key={c.name} delay={(i % 3) * 0.08}><ImageCard image={c.image} title={c.name} text={c.text} tall meta="Club" /></Reveal>)}
      </div></section>
    </>
  );
}
