import Eyebrow from "../components/ui/Eyebrow";
import RegMark from "../components/ui/RegMark";
import { legalLastUpdated } from "../data/legal";
import SEO from "../components/seo/SEO";
import { breadcrumbSchema } from "../components/seo/structuredData";

export default function LegalPage({ title, sections, path }) {
  return (
    <>
      <SEO
        title={title}
        description={`${title} for Mehak Career & Creative Studio — last updated ${legalLastUpdated}.`}
        path={path}
        structuredData={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: title, path },
        ])}
      />
      <section className="grain relative overflow-hidden bg-ink text-surface">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-32 -top-32 h-[24rem] w-[24rem] rounded-full bg-secondary/25 blur-[100px]" />
          <div className="absolute -right-24 top-0 h-[20rem] w-[20rem] rounded-full bg-primary/20 blur-[100px]" />
        </div>
        <RegMark size={26} className="pointer-events-none absolute left-6 top-16 hidden text-surface/15 sm:block lg:left-12" />
        <RegMark size={26} className="pointer-events-none absolute right-6 top-16 hidden text-surface/15 sm:block lg:right-12" />

        <div className="container-px relative mx-auto max-w-3xl py-16 text-center lg:py-20">
          <Eyebrow className="justify-center">Legal</Eyebrow>
          <h1 className="mt-4 text-balance text-3xl font-semibold sm:text-4xl">{title}</h1>
          <p className="mt-3 font-mono text-xs uppercase tracking-[0.2em] text-surface/40">
            Last updated: {legalLastUpdated}
          </p>
        </div>
      </section>

      <section className="bg-surface">
        <div className="container-px mx-auto max-w-3xl py-16 lg:py-20">
          <div className="space-y-8">
            {sections.map((section) => (
              <div key={section.heading}>
                <h2 className="font-display text-lg font-semibold text-ink">
                  {section.heading}
                </h2>
                <div className="mt-2 space-y-3">
                  {section.content.map((p, i) => (
                    <p key={i} className="text-sm leading-relaxed text-ink/60">
                      {p}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
