import { Helmet } from "react-helmet-async";
import { business } from "../../data/siteConfig";

const SITE_URL = "https://www.mehakstudio.com"; // TODO: update to your real production domain

/**
 * Drop this into any page to set its title, description, canonical URL,
 * Open Graph / Twitter tags, and (optionally) JSON-LD structured data.
 *
 * Usage:
 *   <SEO title="About Us" description="..." path="/about" />
 */
export default function SEO({
  title,
  description,
  path = "",
  image = "/brand/logo-512.png",
  type = "website",
  structuredData,
  noindex = false,
}) {
  const fullTitle = title ? `${title} | ${business.displayName}` : `${business.displayName} | ${business.tagline}`;
  const desc = description || business.shortDescription;
  const url = `${SITE_URL}${path}`;
  const imageUrl = image.startsWith("http") ? image : `${SITE_URL}${image}`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={desc} />
      <link rel="canonical" href={url} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={desc} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:locale" content="en_PK" />
      <meta property="og:site_name" content={business.displayName} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={desc} />
      <meta name="twitter:image" content={imageUrl} />

      {structuredData &&
        (Array.isArray(structuredData) ? structuredData : [structuredData]).map((data, i) => (
          <script key={i} type="application/ld+json">
            {JSON.stringify(data)}
          </script>
        ))}
    </Helmet>
  );
}
