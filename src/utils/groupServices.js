import { services, serviceCategories } from "../data/siteConfig";

// Returns an array of { category, items } in the order defined by
// serviceCategories (excluding "All").
export function groupServicesByCategory() {
  return serviceCategories
    .filter((c) => c !== "All")
    .map((category) => ({
      category,
      items: services.filter((s) => s.category === category),
    }))
    .filter((group) => group.items.length > 0);
}
