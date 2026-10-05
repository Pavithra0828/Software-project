import { createFileRoute } from "@tanstack/react-router";
import { Bus } from "lucide-react";
import { busRoutes, img } from "@/data/campus";
import { PageHero, Reveal } from "@/components/site/ui";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/transport")({
  head: () => seo("Transport", "College bus routes, stops and departure times."),
  component: Page,
});

function Page() {
  return (
    <>
      <PageHero eyebrow="Transport" title="Getting to campus." text="Sample routes and timings." image={img.transport} />
      <section className="section-y"><div className="container-x grid gap-6 md:grid-cols-2">
        {busRoutes.map((r, i) => (
          <Reveal key={r.no} delay={(i % 2) * 0.08}>
            <div className="flex items-center gap-6 rounded-2xl border bg-card p-6">
              <div className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-forest font-serif text-2xl text-ink">{r.no}</div>
              <div className="flex-1">
                <h2 className="text-2xl">{r.route}</h2>
                <p className="mt-1 flex items-center gap-2 text-sm text-muted-foreground"><Bus className="h-4 w-4" />{r.stops} stops · departs {r.depart}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div></section>
    </>
  );
}
