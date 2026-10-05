import { createFileRoute } from "@tanstack/react-router";
import { img } from "@/data/campus";
import { PageHero } from "@/components/site/ui";
import { StoryCards } from "@/components/site/sections";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/stories")({
  head: () => seo("Campus Stories", "Stories of student life, clubs, labs and hackathons beyond the classroom."),
  component: Page,
});

function Page() {
  return (
    <>
      <PageHero eyebrow="Campus Stories" title="Life Beyond The Classroom" image={img.fest} />
      <section className="section-y"><div className="container-x"><StoryCards /></div></section>
    </>
  );
}
