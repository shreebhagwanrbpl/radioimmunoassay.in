import { fetchFullCatalog as fetchFullCatalogRaw } from "./data-fetcher";
import { cache } from "react";
import { CATEGORY_DEFINITIONS, BRAND_DEFINITIONS } from "./constants";

// Global in-memory cache for the server process to bypass Next.js 2MB limit
let cachedCatalog = null;
let cachedCatalogTimestamp = 0;
const CACHE_TTL = 3600 * 1000; // 1 hour in milliseconds

async function getCachedCatalog() {
  const now = Date.now();
  if (cachedCatalog && (now - cachedCatalogTimestamp) < CACHE_TTL) {
    return cachedCatalog;
  }

  const data = await fetchFullCatalogRaw();
  cachedCatalog = data;
  cachedCatalogTimestamp = now;
  return data;
}

export const fetchFullCatalog = cache(async () => {
  return await getCachedCatalog();
});

export const fetchProductBySlug = cache(async (slug) => {
  if (!slug) return null;
  const catalog = await getCachedCatalog();
  const normalizedSlug = slug.toLowerCase().trim();
  return catalog.find((p) => (p.slug || "").toLowerCase() === normalizedSlug) || null;
});

export const fetchProductsByCategory = cache(async (categorySlug) => {
  if (!categorySlug) return [];
  const catalog = await getCachedCatalog();
  const catDef = CATEGORY_DEFINITIONS[categorySlug];
  const targetName = catDef ? catDef.name.toLowerCase() : categorySlug.replace(/-/g, " ").toLowerCase();
  
  return catalog.filter((p) => {
    const pCat = (p.category || "").toLowerCase();
    const pSubCat = (p.subCategory || "").toLowerCase();
    return pCat.includes(targetName) || pSubCat.includes(targetName) || targetName.includes(pCat);
  });
});

export const fetchProductsByBrand = cache(async (brandSlug) => {
  if (!brandSlug) return [];
  const catalog = await getCachedCatalog();
  const brandDef = BRAND_DEFINITIONS[brandSlug];
  const brandName = brandDef ? brandDef.name.toLowerCase() : brandSlug.replace(/-/g, " ").toLowerCase();

  return catalog.filter((p) => {
    const pBrand = (p.brand || "").toLowerCase();
    const pTitle = (p.title || "").toLowerCase();
    return pBrand.includes(brandName) || pTitle.includes(brandName);
  });
});

export const fetchCategoryList = cache(async () => {
  const catalog = await getCachedCatalog();
  const categoryMap = new Map();

  // Add defined categories
  Object.keys(CATEGORY_DEFINITIONS).forEach((slug) => {
    categoryMap.set(slug, {
      slug,
      name: CATEGORY_DEFINITIONS[slug].name,
      description: CATEGORY_DEFINITIONS[slug].description,
      count: 0,
    });
  });

  // Tally counts from catalog
  catalog.forEach((product) => {
    const catName = product.category || "General";
    const slug = catName.toLowerCase().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-");
    if (!categoryMap.has(slug)) {
      categoryMap.set(slug, {
        slug,
        name: catName,
        description: `High precision ${catName} equipment for laboratories and hospitals.`,
        count: 1,
      });
    } else {
      categoryMap.get(slug).count += 1;
    }
  });

  return Array.from(categoryMap.values());
});

export const fetchBrandList = cache(async () => {
  const catalog = await getCachedCatalog();
  const brandMap = new Map();

  Object.keys(BRAND_DEFINITIONS).forEach((slug) => {
    brandMap.set(slug, {
      slug,
      name: BRAND_DEFINITIONS[slug].name,
      description: BRAND_DEFINITIONS[slug].description,
      count: 0,
    });
  });

  catalog.forEach((product) => {
    if (product.brand) {
      const slug = product.brand.toLowerCase().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-");
      if (!brandMap.has(slug)) {
        brandMap.set(slug, {
          slug,
          name: product.brand,
          description: `Certified ${product.brand} biomedical and diagnostic instruments.`,
          count: 1,
        });
      } else {
        brandMap.get(slug).count += 1;
      }
    }
  });

  return Array.from(brandMap.values());
});
