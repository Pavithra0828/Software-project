import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { RotateCcw, Search } from "lucide-react";
import { buildings } from "@/data/campus";
import { Campus3D } from "@/components/site/ui";
import { BuildingPanel } from "@/components/site/sections";
import { seo } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/campus-3d")({
  head: () => seo("Interactive 3D Campus", "Fly through a 3D model of the campus, search locations and open building details."),
  component: Page,
});

function Page() {
  const [sel, setSel] = useState<string | null>(null);
  const [q, setQ] = useState("");
  const list = buildings.filter((b) => b.name.toLowerCase().includes(q.toLowerCase()));
  return (
    <section className="relative h-[100svh] min-h-[600px] bg-forest">
      <Campus3D interactive selected={sel} onSelect={(id) => setSel(id || null)} />
      <div className="absolute left-4 top-24 w-[calc(100%-2rem)] max-w-xs rounded-2xl bg-charcoal/80 p-4 text-ink backdrop-blur md:left-8">
        <p className="eyebrow mb-3">Find a location</p>
        <div className="flex items-center gap-2 rounded-full bg-ink/10 px-4 py-2">
          <Search className="h-4 w-4 text-gold" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Library, labs…" className="w-full bg-transparent text-sm outline-none placeholder:text-ink/40" />
        </div>
        <ul className="mt-3 space-y-1">
          {list.map((b) => (
            <li key={b.id}><button onClick={() => setSel(b.id)} className={cn("w-full rounded-lg px-3 py-2 text-left text-sm transition", sel === b.id ? "bg-gold text-charcoal" : "hover:bg-ink/10")}>{b.name}</button></li>
          ))}
        </ul>
        <button onClick={() => setSel(null)} className="mt-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-gold"><RotateCcw className="h-3.5 w-3.5" />Reset view</button>
      </div>
      <div className="absolute bottom-4 right-4 left-4 flex justify-end md:left-auto md:bottom-8 md:right-8">
        <BuildingPanel id={sel} onClose={() => setSel(null)} />
      </div>
    </section>
  );
}
