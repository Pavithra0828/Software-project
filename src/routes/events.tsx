import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { eventCategories, events, img } from "@/data/campus";
import { PageHero, Pills } from "@/components/site/ui";
import { EventGrid } from "@/components/site/sections";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/events")({
  head: () => seo("Events", "Symposiums, workshops, hackathons, cultural fests and sports meets on campus."),
  component: Page,
});

function Page() {
  const [cat, setCat] = useState("All");
  return (
    <>
      <PageHero eyebrow="Events" title="What's happening on campus?" image={img.fest} />
      <section className="section-y"><div className="container-x">
        <Pills items={eventCategories} value={cat} onChange={setCat} />
        <EventGrid key={cat} items={events.filter((e) => cat === "All" || e.category === cat)} />
      </div></section>
    </>
  );
}
