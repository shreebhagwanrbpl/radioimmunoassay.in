export const WEBSITE_ID = "radioimmunoassayin";
export const COMPANY_ID = process.env.SQLITE_COMPANY_ID || process.env.COMPANY_ID || "rajbiosis";

export function normalizeDomainId(value = "") {
  return String(value).trim().toLowerCase().replace(/^https?:\/\//, "").replace(/^www\./, "").replace(/[.\-\s]/g, "");
}

export function isItemVisibleOnWebsite(item = {}) {
  if (item.isPublished === false) return false;
  if (["inactive", "draft"].includes(String(item.status || "").toLowerCase())) return false;
  if (Array.isArray(item.websiteIds) && item.websiteIds.length === 0) return false;
  if (item.websiteIds == null) return true;
  const target = normalizeDomainId(WEBSITE_ID);
  return item.websiteIds.some((id) => {
    const normalized = normalizeDomainId(id);
    return normalized === "all" || normalized === target;
  });
}

export function makeSlug(text = "") {
  return String(text).toLowerCase().trim().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-");
}

export function resolveImageUrl(url) {
  if (!url || typeof url !== "string") return "";
  const trimmed = url.trim();
  if (!trimmed) return "";
  if (
    trimmed.startsWith("http://") ||
    trimmed.startsWith("https://") ||
    trimmed.startsWith("data:") ||
    trimmed.startsWith("blob:")
  ) {
    return trimmed;
  }
  const adminBase = (
    (typeof process !== "undefined" && (
      process.env?.NEXT_PUBLIC_ADMIN_API_BASE_URL ||
      process.env?.ADMIN_API_BASE_URL ||
      process.env?.ADMIN_API_URL ||
      process.env?.SQLITE_ADMIN_API_URL
    )) || "https://admin.rajbiosis.app"
  ).replace(/\/$/, "");

  if (trimmed.startsWith("/uploads/") || trimmed.startsWith("uploads/")) {
    const cleanPath = trimmed.startsWith("/") ? trimmed : `/${trimmed}`;
    return `${adminBase}${cleanPath}`;
  }

  if (trimmed.startsWith("/")) {
    return trimmed;
  }

  return `/${trimmed}`;
}
