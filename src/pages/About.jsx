import AboutHero from "../components/sections/AboutHero";
import MissionVision from "../components/sections/MissionVision";
import WhatWeDo from "../components/sections/WhatWeDo";
import WhyChooseUs from "../components/sections/WhyChooseUs";
import Commitment from "../components/sections/Commitment";
import SEO from "../components/seo/SEO";
import { breadcrumbSchema } from "../components/seo/structuredData";

export default function About() {
  return (
    <>
      <SEO
        title="About Us"
        description="Learn about Mehak Career & Creative Studio — our mission, vision, and what makes our design, career, and digital services different."
        path="/about"
        structuredData={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ])}
      />
      <AboutHero />
      <MissionVision />
      <WhatWeDo />
      <WhyChooseUs />
      <Commitment />
    </>
  );
}
