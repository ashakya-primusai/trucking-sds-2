import { FontProvider } from "@/components/font-provider";
import { HeroBackgroundProvider } from "@/components/hero-background-provider";
import { TypeScaleProvider } from "@/components/type-scale-provider";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/sections/hero";
import { SocialProof } from "@/components/sections/social-proof";
import { BentoShowcase } from "@/components/sections/bento-showcase";
import { PainPoints } from "@/components/sections/pain-points";
import { AIDeepDive, BellaAISection } from "@/components/sections/ai-deep-dive";
import { StatsStrip } from "@/components/sections/stats-strip";
import { Testimonial } from "@/components/sections/testimonial";
import { Integrations } from "@/components/sections/integrations";
import { FinalCTA } from "@/components/sections/final-cta";

export default function Home() {
  return (
    <TypeScaleProvider>
      <FontProvider>
        <HeroBackgroundProvider>
          <Nav />
          <main>
            <Hero />
            <SocialProof />
            <PainPoints />
            <BentoShowcase />
            <AIDeepDive />
            <BellaAISection />
            <FinalCTA />
          </main>
          <Footer />
        </HeroBackgroundProvider>
      </FontProvider>
    </TypeScaleProvider>
  );
}
