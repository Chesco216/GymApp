import { Header } from "../../common/components/Header";
import { LandingHero } from "./LandingHero";
import { LandingFeatures } from "./LandingFeatures";
import { LandingSteps } from "./LandingSteps";
import { LandingFinalCta, LandingFooter } from "./LandingFooter";
import "./LandingHero.css";
import "./LandingFeatures.css";
import "./LandingSteps.css";
import "./LandingFooter.css";

export const LandingPage = () => {
  return (
    <div className='landing-page'>
      <Header />
      <main>
        <LandingHero />
        <LandingFeatures />
        <LandingSteps />
        <LandingFinalCta />
      </main>
      <LandingFooter />
    </div>
  );
};
