import { createFileRoute } from "@tanstack/react-router";
import { img } from "@/data/campus";
import { PageHero } from "@/components/site/ui";
import { FacilitiesGrid, FindYourWay } from "@/components/site/sections";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/facilities")({
  head: () => seo("Campus Facilities", "Library, labs, auditorium, sports complex, hostel, medical centre and more."),
  component: Page,
});

function Page() {
  return (
    <>
      <PageHero eyebrow="Campus Facilities" title="Spaces for every hour." image={img.auditorium} />
      <section className="section-y"><div className="container-x"><FacilitiesGrid /></div></section>
      <FindYourWay />
    </>
  );
}
