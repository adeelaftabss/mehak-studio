import PlaceholderPage from "./PlaceholderPage";
import SEO from "../components/seo/SEO";

export default function NotFound() {
  return (
    <>
      <SEO title="Page Not Found" path="/404" noindex />
      <PlaceholderPage
        title="Page Not Found"
        description="The page you're looking for doesn't exist."
      />
    </>
  );
}
