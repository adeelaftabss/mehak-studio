import Hero from "../components/sections/Hero";
import ServicesPreview from "../components/sections/ServicesPreview";
import WhyUs from "../components/sections/WhyUs";
import Process from "../components/sections/Process";
import TestimonialsPreview from "../components/sections/TestimonialsPreview";
import CTA from "../components/sections/CTA";
import SEO from "../components/seo/SEO";
import { localBusinessSchema } from "../components/seo/structuredData";

export default function Home() {
  return (
    <>
      <SEO
        path="/"
        title={null}
        description="Mehak Career & Creative Studio — graphic design, printing, branding, ATS resumes, social media content and digital growth services in Islamabad, Pakistan."
        structuredData={localBusinessSchema()}
      />
      <Hero />
      <ServicesPreview />
      <WhyUs />
      <Process />
      <TestimonialsPreview />
      <CTA />
    </>
  );
}
