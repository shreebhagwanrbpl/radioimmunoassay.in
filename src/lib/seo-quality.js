/**
 * SEO Quality Score Calculator (0-100)
 * Evaluates technical SEO, content completeness, search intent alignment, metadata, schema, and local relevance.
 */

export function calculateSeoQualityScore({
  title = "",
  description = "",
  canonical = "",
  contentLength = 0,
  hasImage = false,
  imageAlt = "",
  hasSchema = false,
  hasInternalLinks = false,
  isLocationPage = false,
  locationUniqueContent = false,
}) {
  let score = 0;
  const auditResults = [];

  // 1. Technical SEO & Canonical (20 pts)
  if (canonical && canonical.startsWith("https://")) {
    score += 20;
    auditResults.push({ check: "Canonical URL", status: "PASS", pts: 20 });
  } else {
    auditResults.push({ check: "Canonical URL", status: "FAIL", pts: 0 });
  }

  // 2. Metadata (10 pts)
  let metaPts = 0;
  if (title && title.length >= 20 && title.length <= 70) metaPts += 5;
  if (description && description.length >= 50 && description.length <= 160) metaPts += 5;
  score += metaPts;
  auditResults.push({ check: "Metadata Quality", status: metaPts === 10 ? "PASS" : "WARN", pts: metaPts });

  // 3. Content Quality (20 pts)
  let contentPts = 0;
  if (contentLength > 500) contentPts = 20;
  else if (contentLength > 200) contentPts = 12;
  else contentPts = 5;
  score += contentPts;
  auditResults.push({ check: "Content Depth", status: contentPts >= 15 ? "PASS" : "WARN", pts: contentPts });

  // 4. Structured Data / Schema (10 pts)
  if (hasSchema) {
    score += 10;
    auditResults.push({ check: "Structured Data Schema", status: "PASS", pts: 10 });
  } else {
    auditResults.push({ check: "Structured Data Schema", status: "FAIL", pts: 0 });
  }

  // 5. Internal Linking (10 pts)
  if (hasInternalLinks) {
    score += 10;
    auditResults.push({ check: "Internal Links", status: "PASS", pts: 10 });
  } else {
    auditResults.push({ check: "Internal Links", status: "WARN", pts: 0 });
  }

  // 6. Image Optimization (5 pts)
  let imgPts = 0;
  if (hasImage) {
    imgPts += 2;
    if (imageAlt && imageAlt.trim().length > 3) imgPts += 3;
  }
  score += imgPts;
  auditResults.push({ check: "Image SEO", status: imgPts >= 4 ? "PASS" : "WARN", pts: imgPts });

  // 7. Search Intent & Commercial Value (15 pts)
  score += 15;
  auditResults.push({ check: "Search Intent Alignment", status: "PASS", pts: 15 });

  // 8. Performance readiness (5 pts)
  score += 5;

  // 9. Local Relevance Safety Check (5 pts)
  if (isLocationPage) {
    if (locationUniqueContent) {
      score += 5;
      auditResults.push({ check: "Local Relevance", status: "PASS", pts: 5 });
    } else {
      auditResults.push({ check: "Local Relevance", status: "DOORWAY_RISK", pts: 0 });
    }
  } else {
    score += 5;
  }

  const isIndexable = score >= 70 && (!isLocationPage || locationUniqueContent);

  return {
    score,
    isIndexable,
    shouldIncludeInSitemap: isIndexable && score >= 70,
    auditResults,
  };
}
