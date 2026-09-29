import { cache } from "react";
import { fetchFullCatalog as fetchFullCatalogClient, makeSlug, fetchDistrictsList } from "./data-fetcher";

export const fetchFullCatalog = cache(async () => fetchFullCatalogClient());

export const getProductBySlug = cache(async (slug) => {
  const catalog = await fetchFullCatalog();
  return catalog.find((p) => p.slug === slug || makeSlug(p.title) === slug) || null;
});

export const fetchProductBySlug = getProductBySlug;

export const getAllCategories = cache(async () => {
  const map = new Map();
  const catalog = await fetchFullCatalog();
  catalog.forEach((p) => {
    const name = p.category || "General";
    const slug = makeSlug(name);
    if (!map.has(slug)) {
      map.set(slug, { name, slug, count: 0, products: [] });
    }
    const cat = map.get(slug);
    cat.count++;
    cat.products.push(p);
  });
  return [...map.values()];
});

export const fetchCategoryList = getAllCategories;

export const getCategoryBySlug = cache(async (slug) => {
  const categories = await getAllCategories();
  return categories.find((c) => c.slug === slug) || null;
});

export const fetchProductsByCategory = cache(async (slug) => {
  const cat = (await getAllCategories()).find((c) => c.slug === slug);
  return cat ? cat.products : [];
});

export const getAllBrands = cache(async () => {
  const map = new Map();
  const catalog = await fetchFullCatalog();
  catalog.forEach((p) => {
    const name = p.brand || "";
    if (!name) return;
    const slug = makeSlug(name);
    if (!map.has(slug)) {
      map.set(slug, { name, slug, count: 0, products: [] });
    }
    const b = map.get(slug);
    b.count++;
    b.products.push(p);
  });
  return [...map.values()];
});

export const fetchBrandList = getAllBrands;

export const fetchProductsByBrand = cache(async (slug) => {
  const brand = (await getAllBrands()).find((b) => b.slug === slug);
  return brand ? brand.products : [];
});

export { fetchDistrictsList, makeSlug };
