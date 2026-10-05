import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { explorerCategories, img } from "@/data/campus";
import { ImageCard, PageHero, Pills, Reveal } from "@/components/site/ui";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/explore")({
  head: () => seo("Campus Explorer", "Discover every academic block, food spot, sports venue and student service on campus."),
  component: Page,
});

function Page() {
  const [cat, setCat] = useState("All");
  const groups = explorerCategories.filter((g) => cat === "All" || g.cat === cat);
  return (
    <>
      <PageHero eyebrow="Campus Explorer" title="Every corner, discovered." text="Browse places by what you need right now." image={img.hero} />
      <section className="section-y"><div className="container-x">
        <Pills items={["All", ...explorerCategories.map((c) => c.cat)]} value={cat} onChange={setCat} />
        {groups.map((g) => (
          <div key={g.cat} className="mb-16">
            <h2 className="mb-6 text-3xl">{g.cat}</h2>
            <div className="grid gap-6 md:grid-cols-3">
              {g.items.map((it, i) => <Reveal key={it.t} delay={i * 0.06}><ImageCard image={it.i} title={it.t} meta={g.cat} /></Reveal>)}
            </div>
          </div>
        ))}
      </div></section>
    </>
  );
}
