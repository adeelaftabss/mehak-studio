import { business } from "../../data/siteConfig";

const SITE_URL = "https://www.mehakstudio.com"; // TODO: update to your real production domain

export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: business.legalName,
    alternateName: business.displayName,
    description: business.shortDescription,
    url: SITE_URL,
    telephone: business.phone,
    email: business.email,
    image: `${SITE_URL}/brand/logo-512.png`,
    address: {
      "@type": "PostalAddress",
      streetAddress: business.address.line2,
      addressLocality: business.address.city,
      addressCountry: business.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: business.address.lat,
      longitude: business.address.lng,
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "10:00",
      closes: "19:00",
    },
    priceRange: "$$",
  };
}

export function breadcrumbSchema(items) {
  // items: [{ name: "Home", path: "/" }, { name: "Services", path: "/services" }, ...]
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };
}

export function serviceSchema(service) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: service.title,
    name: service.title,
    description: service.description,
    provider: {
      "@type": "ProfessionalService",
      name: business.legalName,
    },
    areaServed: {
      "@type": "City",
      name: "Islamabad",
    },
    category: service.category,
  };
}

export function articleSchema(post) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      "@type": "Organization",
      name: business.legalName,
    },
    publisher: {
      "@type": "Organization",
      name: business.legalName,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/brand/logo-512.png`,
      },
    },
    mainEntityOfPage: `${SITE_URL}/blog/${post.slug}`,
  };
}

export function faqPageSchema(faqGroups) {
  const allQuestions = faqGroups.flatMap((g) => g.items);
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: allQuestions.map((q) => ({
      "@type": "Question",
      name: q.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: q.answer,
      },
    })),
  };
}
