import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { food, img } from "@/data/campus";
import { PageHero, Pills } from "@/components/site/ui";
import { FoodMenu } from "@/components/site/sections";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/food")({
  head: () => seo("Food & Canteen", "Today's canteen menu with prices and veg indicators for breakfast, lunch, snacks and drinks."),
  component: Page,
});

function Page() {
  const [cat, setCat] = useState("All");
  return (
    <>
      <PageHero eyebrow="Food & Canteen" title="Good Food. Good Breaks." text="Open 7:30 AM – 9:00 PM. Sample menu and prices." image={img.canteen} />
      <section className="section-y bg-forest text-ink"><div className="container-x max-w-4xl">
        <Pills light items={["All", "Breakfast", "Lunch", "Snacks", "Drinks"]} value={cat} onChange={setCat} />
        <FoodMenu items={food.filter((f) => cat === "All" || f.category === cat)} />
      </div></section>
    </>
  );
}
