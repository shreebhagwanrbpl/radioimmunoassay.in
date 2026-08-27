import { fetchFullCatalog, fetchCategoryList, fetchBrandList } from "@/lib/data-fetcher-server";
import { TOP_DISTRICTS } from "@/lib/constants";
import { calculateSeoQualityScore } from "@/lib/seo-quality";

export default async function sitemap() {
    const baseUrl = "https://radioimmunoassay.in";
    const urls = [];

    // 1. Core High-Priority Static Pages
    urls.push(
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: "daily",
            priority: 1.0,
        },
        {
            url: `${baseUrl}/items`,
            lastModified: new Date(),
            changeFrequency: "daily",
            priority: 0.95,
        },
        {
            url: `${baseUrl}/about`,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 0.8,
        },
        {
            url: `${baseUrl}/services`,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 0.8,
        },
        {
            url: `${baseUrl}/contact`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.7,
        }
    );

    try {
        // 2. High-Value Category Landing Pages
        const categories = await fetchCategoryList();
        categories.forEach((cat) => {
            urls.push({
                url: `${baseUrl}/category/${cat.slug}`,
                lastModified: new Date(),
                changeFrequency: "weekly",
                priority: 0.9,
            });
        });

        // 3. Manufacturer Brand Pages
        const brands = await fetchBrandList();
        brands.forEach((brand) => {
            urls.push({
                url: `${baseUrl}/brand/${brand.slug}`,
                lastModified: new Date(),
                changeFrequency: "weekly",
                priority: 0.85,
            });
        });

        // 4. District Location Landing Hubs (Legitimate Location Value)
        TOP_DISTRICTS.forEach((district) => {
            urls.push({
                url: `${baseUrl}/${district.slug}`,
                lastModified: new Date(),
                changeFrequency: "weekly",
                priority: 0.85,
            });
        });

        // 5. Authoritative Product Pages (Filtered by Quality Gate)
        const products = await fetchFullCatalog();

        products.forEach((product) => {
            if (!product.slug) return;

            const canonicalUrl = `${baseUrl}/items/${product.slug}`;
            const qualityEval = calculateSeoQualityScore({
                title: product.title || "",
                description: product.description || product.desc || "",
                canonical: canonicalUrl,
                contentLength: (product.description || "").length + 200,
                hasImage: Boolean(product.image || product.images?.length),
                imageAlt: product.title || "",
                hasSchema: true,
                hasInternalLinks: true,
            });

            if (qualityEval.shouldIncludeInSitemap) {
                urls.push({
                    url: canonicalUrl,
                    lastModified: new Date(),
                    changeFrequency: "weekly",
                    priority: 0.9,
                });
            }
        });
    } catch (error) {
        console.error("Sitemap Generation Error:", error);
    }

    return urls;
}