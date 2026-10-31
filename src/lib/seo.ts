const siteName = "Francis Xavier Engineering College";

export const seo = (title: string, description: string) => {
  const pageTitle = title === siteName ? siteName : `${title} — ${siteName}`;
  return {
    meta: [
      { title: pageTitle },
      { name: "description", content: description },
      { property: "og:title", content: pageTitle },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  };
};
