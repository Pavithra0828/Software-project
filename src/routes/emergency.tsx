import { createFileRoute } from "@tanstack/react-router";
import { Phone, ShieldAlert } from "lucide-react";
import { emergency } from "@/data/campus";
import { Reveal } from "@/components/site/ui";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/emergency")({
  head: () => seo("Emergency", "Campus security, medical and emergency contact numbers."),
  component: Page,
});

function Page() {
  return (
    <section className="min-h-screen bg-charcoal pb-24 pt-40 text-ink"><div className="container-x">
      <ShieldAlert className="h-10 w-10 text-gold" />
      <h1 className="mt-6 text-5xl md:text-7xl">Help, right away.</h1>
      <p className="mt-4 max-w-lg text-ink/70">Tap a number to call. Sample campus numbers shown.</p>
      <div className="mt-14 grid gap-4 md:grid-cols-3">
        {emergency.map((e, i) => (
          <Reveal key={e.name} delay={(i % 3) * 0.06}>
            <a href={`tel:${e.phone.replace(/\s/g, "")}`} className="group block rounded-2xl border border-ink/15 p-6 transition hover:border-gold hover:bg-ink/5">
              <p className="text-xs uppercase tracking-widest text-ink/50">{e.note}</p>
              <p className="mt-2 font-serif text-2xl">{e.name}</p>
              <p className="mt-4 flex items-center gap-2 text-lg text-gold"><Phone className="h-4 w-4" />{e.phone}</p>
            </a>
          </Reveal>
        ))}
      </div>
    </div></section>
  );
}
