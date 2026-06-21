import Eyebrow from "../components/ui/Eyebrow";
import RegMark from "../components/ui/RegMark";
import ContactForm from "../components/sections/ContactForm";
import ContactInfo from "../components/sections/ContactInfo";
import SEO from "../components/seo/SEO";
import { breadcrumbSchema, localBusinessSchema } from "../components/seo/structuredData";

export default function Contact() {
  return (
    <>
      <SEO
        title="Contact Us"
        description="Get in touch with Mehak Career & Creative Studio in F-7 Markaz, Islamabad — call, WhatsApp, or send a message to start your project."
        path="/contact"
        structuredData={[
          localBusinessSchema(),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Contact", path: "/contact" },
          ]),
        ]}
      />
      {/* Header */}
      <section className="grain relative overflow-hidden bg-ink text-surface">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-32 -top-32 h-[26rem] w-[26rem] rounded-full bg-secondary/25 blur-[100px]" />
          <div className="absolute -right-24 top-0 h-[22rem] w-[22rem] rounded-full bg-primary/20 blur-[100px]" />
        </div>
        <RegMark size={26} className="pointer-events-none absolute left-6 top-20 hidden text-surface/15 sm:block lg:left-12" />
        <RegMark size={26} className="pointer-events-none absolute right-6 top-20 hidden text-surface/15 sm:block lg:right-12" />

        <div className="container-px relative mx-auto max-w-4xl py-20 text-center lg:py-28">
          <Eyebrow className="justify-center">Contact Us</Eyebrow>
          <h1 className="mt-4 text-balance text-4xl font-semibold sm:text-5xl">
            Let's start your project
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-balance text-sm text-surface/60 sm:text-base">
            Send us a message, call, or stop by our studio in F-7 Markaz,
            Islamabad — we're happy to help.
          </p>
        </div>
      </section>

      {/* Form + info */}
      <section className="bg-surface">
        <div className="container-px mx-auto max-w-7xl py-16 lg:py-20">
          <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr]">
            <ContactForm />
            <ContactInfo />
          </div>
        </div>
      </section>
    </>
  );
}
