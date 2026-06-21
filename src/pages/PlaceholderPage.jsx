import Eyebrow from "../components/ui/Eyebrow";
import Button from "../components/ui/Button";

// Used for pages that will be built out in later phases.
// Keeps navigation fully functional during Phase 1.
export default function PlaceholderPage({ title, description }) {
  return (
    <section className="container-px mx-auto flex min-h-[60vh] max-w-3xl flex-col items-center justify-center py-24 text-center">
      <Eyebrow className="justify-center">Coming Soon</Eyebrow>
      <h1 className="mt-4 text-balance text-3xl font-semibold text-ink sm:text-4xl">
        {title}
      </h1>
      <p className="mt-4 max-w-md text-sm leading-relaxed text-ink/55">
        {description ||
          "This page is part of the next build phase and will be filled in shortly."}
      </p>
      <Button to="/" variant="outline" className="mt-8">
        Back to Home
      </Button>
    </section>
  );
}
