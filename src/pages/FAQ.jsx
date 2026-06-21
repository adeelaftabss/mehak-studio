import { FaWhatsapp } from "react-icons/fa";
import Eyebrow from "../components/ui/Eyebrow";
import RegMark from "../components/ui/RegMark";
import Button from "../components/ui/Button";
import Accordion from "../components/ui/Accordion";
import { faqGroups } from "../data/faq";
import { business } from "../data/siteConfig";
import SEO from "../components/seo/SEO";
import { breadcrumbSchema, faqPageSchema } from "../components/seo/structuredData";

export default function FAQ() {
  const whatsappUrl = `https://wa.me/${business.whatsappNumber}?text=${encodeURIComponent(
    "Hi Mehak Studio! I have a question that wasn't covered in your FAQ."
  )}`;

  return (
    <>
      <SEO
        title="FAQs"
        description="Answers to common questions about working with Mehak Studio — pricing, turnaround, languages, and more."
        path="/faq"
        structuredData={[
          faqPageSchema(faqGroups),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "FAQs", path: "/faq" },
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
          <Eyebrow className="justify-center">FAQs</Eyebrow>
          <h1 className="mt-4 text-balance text-4xl font-semibold sm:text-5xl">
            Frequently Asked Questions
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-balance text-sm text-surface/60 sm:text-base">
            Answers to common questions about getting started, pricing,
            turnaround and more.
          </p>
        </div>
      </section>

      {/* FAQ groups */}
      <section className="bg-surface">
        <div className="container-px mx-auto max-w-3xl py-16 lg:py-20">
          <div className="space-y-10">
            {faqGroups.map((group) => (
              <div key={group.title}>
                <h2 className="mb-4 font-display text-lg font-semibold text-ink">
                  {group.title}
                </h2>
                <Accordion items={group.items} />
              </div>
            ))}
          </div>

          {/* Still have questions */}
          <div className="mt-12 rounded-2xl border border-dashed border-ink/15 bg-white p-6 text-center sm:p-8">
            <h3 className="font-display text-sm font-semibold text-ink">
              Still have questions?
            </h3>
            <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-ink/55">
              We're happy to help with anything not covered here — reach out
              directly and we'll get back to you.
            </p>
            <div className="mt-4 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button to="/contact" variant="primary">
                Contact Us
              </Button>
              <Button href={whatsappUrl} variant="outline">
                <FaWhatsapp size={18} /> WhatsApp
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
