import { createFileRoute } from "@tanstack/react-router";
import { FlaskConical } from "lucide-react";
import { departments, img } from "@/data/campus";
import { PageHero, Reveal, TiltCard } from "@/components/site/ui";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/departments")({
  head: () => seo("Departments", "Explore academic departments, their labs and specialised facilities."),
  component: Page,
});

function Page() {
  return (
    <>
      <PageHero eyebrow="Departments" title="Where disciplines meet." text="Twenty-five departments. One shared campus." image={img.lab} />
      <section className="section-y"><div className="container-x grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {departments.map((d, i) => (
          <Reveal key={d.name} delay={(i % 3) * 0.08}>
            <TiltCard className="group h-full overflow-hidden rounded-2xl border bg-card">
              <div className="aspect-[16/10] overflow-hidden"><img src={d.image} alt={d.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110" /></div>
              <div className="p-6">
                <h2 className="text-2xl">{d.name}</h2>
                <p className="mt-2 text-sm text-muted-foreground">{d.text}</p>
                <p className="mt-4 flex items-center gap-2 text-sm font-semibold text-forest"><FlaskConical className="h-4 w-4" />{d.labs} labs</p>
                <div className="mt-3 flex flex-wrap gap-2">{d.facilities.map((f) => <span key={f} className="rounded-full bg-secondary px-3 py-1 text-xs">{f}</span>)}</div>
              </div>
            </TiltCard>
          </Reveal>
        ))}
      </div></section>
    </>
  );
}
