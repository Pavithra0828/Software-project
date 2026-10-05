import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, MapPin, Phone } from "lucide-react";
import { img } from "@/data/campus";
import { PageHero } from "@/components/site/ui";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/contact")({
  head: () => seo("Contact", "Get in touch with the campus office — address, phone and enquiry form."),
  component: Page,
});

function Page() {
  const [sent, setSent] = useState(false);
  const field = "w-full rounded-xl border bg-card px-4 py-3 outline-none focus:border-gold";
  return (
    <>
      <PageHero eyebrow="Contact" title="Say hello." image={img.transport} />
      <section className="section-y"><div className="container-x grid gap-16 lg:grid-cols-2">
        <div className="space-y-8">
          {[[MapPin, "Campus Road, Your City — 600000"], [Phone, "+91 00000 00000"], [Mail, "hello@campuslife360.edu"]].map(([I, t]: any) => (
            <div key={t} className="flex items-center gap-4"><span className="grid h-12 w-12 place-items-center rounded-full bg-forest text-ink"><I className="h-5 w-5" /></span><p className="text-lg">{t}</p></div>
          ))}
          <p className="text-sm text-muted-foreground">Sample contact details.</p>
        </div>
        {sent ? (
          <div className="rounded-3xl bg-secondary p-10"><h2 className="text-3xl">Thank you.</h2><p className="mt-2 text-muted-foreground">This is a demo form — nothing was sent.</p></div>
        ) : (
          <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="space-y-4">
            <input required placeholder="Name" className={field} />
            <input required type="email" placeholder="Email" className={field} />
            <textarea required rows={5} placeholder="Message" className={field} />
            <button className="rounded-full bg-forest px-8 py-4 font-semibold text-ink transition hover:bg-charcoal">Send message</button>
          </form>
        )}
      </div></section>
    </>
  );
}
