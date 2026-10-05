import { createFileRoute } from "@tanstack/react-router";
import { Download } from "lucide-react";
import { img } from "@/data/campus";
import { PageHero, Reveal, SectionHeading } from "@/components/site/ui";
import { StudentHubSection } from "@/components/site/sections";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/student-hub")({
  head: () => seo("Student Hub", "Notes, question papers, timetables, exam information and the academic calendar."),
  component: Page,
});

const timetable = [
  ["Mon", "Data Structures", "Maths III", "DBMS Lab"],
  ["Tue", "Operating Systems", "DBMS", "Elective"],
  ["Wed", "Maths III", "Networks", "OS Lab"],
  ["Thu", "DBMS", "Data Structures", "Seminar"],
  ["Fri", "Networks", "Elective", "Club Hour"],
];
const calendar = [["Nov 03", "Internal Assessment I"], ["Nov 28", "Last working day — odd sem"], ["Dec 08", "Semester exams begin"], ["Jan 06", "Even semester begins"]];
const papers = ["Data Structures — 2025", "Operating Systems — 2025", "DBMS — 2024", "Computer Networks — 2024", "Mathematics III — 2024", "Digital Logic — 2023"];

function Page() {
  return (
    <>
      <PageHero eyebrow="Student Hub" title="Your academic toolkit." image={img.library} />
      <StudentHubSection />
      <section className="section-y bg-secondary"><div className="container-x grid gap-12 lg:grid-cols-2">
        <Reveal>
          <SectionHeading eyebrow="Timetable" title="This week." />
          <div className="overflow-hidden rounded-2xl border bg-card text-sm">
            {timetable.map((r) => (
              <div key={r[0]} className="grid grid-cols-4 border-b last:border-0">
                {r.map((c, i) => <div key={i} className={i ? "p-4" : "bg-forest p-4 font-semibold text-ink"}>{c}</div>)}
              </div>
            ))}
          </div>
        </Reveal>
        <Reveal>
          <SectionHeading eyebrow="Academic Calendar & Exams" title="Key dates." />
          <ul className="space-y-3">
            {calendar.map(([d, t]) => (
              <li key={d} className="flex items-center gap-6 rounded-2xl bg-card p-5"><span className="font-serif text-2xl text-forest">{d}</span><span>{t}</span></li>
            ))}
          </ul>
        </Reveal>
      </div></section>
      <section className="section-y"><div className="container-x">
        <SectionHeading eyebrow="Question Papers & Notes" title="Previous papers." />
        <div className="grid gap-3 md:grid-cols-3">
          {papers.map((p) => (
            <button key={p} className="flex items-center justify-between rounded-xl border p-5 text-left transition hover:border-gold">
              <span>{p}</span><Download className="h-4 w-4 text-gold" />
            </button>
          ))}
        </div>
      </div></section>
    </>
  );
}
