import { cache } from "react";
import { WEBSITE_ID, isItemVisibleOnWebsite, makeSlug } from "./catalog-utils.js";
import { fetchLiveCatalogFromVPS, fetchLiveSiteDataFromVPS } from "./admin-api.js";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const fetchFullCatalog = cache(async () => {
  try {
    const list = await fetchLiveCatalogFromVPS(WEBSITE_ID);
    return Array.isArray(list) ? list.filter((p) => isItemVisibleOnWebsite(p)) : [];
  } catch (e) {
    console.error("[data-fetcher-server] fetchFullCatalog error:", e);
    return [];
  }
});

export const getProductBySlug = cache(async (slug) => {
  const catalog = await fetchFullCatalog();
  const target = decodeURIComponent(String(slug || "")).toLowerCase().trim();
  return (
    catalog.find((p) => {
      const pSlug = String(p.slug || "").toLowerCase();
      const pTitleSlug = makeSlug(p.title || p.name || "").toLowerCase();
      const pId = String(p.id || p.uid || "").toLowerCase();
      return pSlug === target || pTitleSlug === target || pId === target;
    }) || null
  );
});

export const fetchProductBySlug = getProductBySlug;

export const getAllCategories = cache(async () => {
  const map = new Map();
  const catalog = await fetchFullCatalog();
  catalog.forEach((p) => {
    const name = String(p.category || "").trim() || "General";
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
  const target = String(slug || "").toLowerCase();
  return categories.find((c) => c.slug === target || makeSlug(c.name) === target) || null;
});

export const fetchProductsByCategory = cache(async (slug) => {
  const target = String(slug || "").toLowerCase();
  const cat = (await getAllCategories()).find((c) => c.slug === target || makeSlug(c.name) === target);
  return cat ? cat.products : [];
});

export const getAllBrands = cache(async () => {
  const map = new Map();
  const catalog = await fetchFullCatalog();
  catalog.forEach((p) => {
    const name = String(p.brand || "").trim();
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
  const target = String(slug || "").toLowerCase();
  const brand = (await getAllBrands()).find((b) => b.slug === target || makeSlug(b.name) === target);
  return brand ? brand.products : [];
});

export const fetchDistrictsList = cache(async () => {
  try {
    const data = await fetchLiveSiteDataFromVPS(WEBSITE_ID, "districts");
    return Array.isArray(data) ? data : data?.districts || data?.data || [];
  } catch (e) {
    console.error("[data-fetcher-server] fetchDistrictsList error:", e);
    return [];
  }
});

export const fetchDistricts = fetchDistrictsList;

export const fetchSiteData = cache(async (page) => {
  try {
    return await fetchLiveSiteDataFromVPS(WEBSITE_ID, page);
  } catch (e) {
    console.error(`[data-fetcher-server] fetchSiteData(${page}) error:`, e);
    return null;
  }
});

export const fetchHomeData = () => fetchSiteData("home");
export const fetchContactData = () => fetchSiteData("contact");
export const fetchServicesData = () => fetchSiteData("services");
export const fetchAboutData = () => fetchSiteData("about");
export const fetchDistrictData = (district) =>
  district ? fetchLiveSiteDataFromVPS(WEBSITE_ID, "district", { district }) : null;

export { makeSlug };

