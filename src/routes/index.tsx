import { createFileRoute } from "@tanstack/react-router";
import { LanguageProvider } from "@/i18n/LanguageContext";
import { TopBar } from "@/components/wedding/TopBar";
import { Hero } from "@/components/wedding/Hero";
import { DateScratchCard } from "@/components/wedding/DateScratchCard";
import { Families } from "@/components/wedding/Families";
import { Celebrations } from "@/components/wedding/Celebrations";
import { Venues } from "@/components/wedding/Venues";
import { FamilyHelp } from "@/components/wedding/FamilyHelp";
import { Closing } from "@/components/wedding/Closing";
import { SiteFooter } from "@/components/wedding/SiteFooter";

const title = "Abhimanyu & Aashi · The Wedding · 7–13 December 2026";
const description =
  "With love, you are invited to the wedding of Abhimanyu & Aashi — celebrations in Ludhiana and Moga, Punjab, 7–13 December 2026. Hosted by the Saidha Family.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <LanguageProvider>
      <div className="relative">
        <TopBar />
        <main>
          <Hero />
          <DateScratchCard />
          <Families />
          <div className="px-[3vw]">
            <div className="hairline mx-auto max-w-4xl" />
          </div>
          <Celebrations />
          <div className="px-[3vw]">
            <div className="mx-auto max-w-[1440px] rounded-3xl border border-gold-soft/60 bg-cream-soft/40 shadow-[0_20px_60px_-20px_rgba(148,100,32,0.1)] backdrop-blur-sm">
              <Venues />
              <FamilyHelp />
            </div>
          </div>
          <Closing />
        </main>
        <SiteFooter />
      </div>
    </LanguageProvider>
  );
}
