import ProductDetails from "@/app/items/[slug]/ProductDetails";
import { fetchProductBySlug, fetchFullCatalog } from "@/lib/data-fetcher-server";

export async function generateStaticParams() {
    try {
        const catalog = await fetchFullCatalog();
        // Limit initial static generation parameters if needed
        return catalog
            .filter((p) => p.slug)
            .slice(0, 10)
            .map((p) => ({
                district: "jaipur",
                slug: p.slug,
            }));
    } catch (e) {
        return [];
    }
}

export async function generateMetadata({ params }) {
    const { slug, district = "jaipur" } = await params;
    const product = await fetchProductBySlug(slug);

    const productName = product?.title || slug?.replace(/-/g, " ")?.replace(/\b\w/g, (c) => c.toUpperCase());
    const districtName = district?.replace(/-/g, " ")?.replace(/\b\w/g, (c) => c.toUpperCase());

    const title = `${productName} Supplier in ${districtName} | Price & Installation | Raj Biosis`;
    const description = `Buy ${productName} in ${districtName} at best price. Raj Biosis supplies CBC Machines, Hematology & Biochemistry Analyzers for laboratories and hospitals in ${districtName}. Contact for quotation.`;
    
    // Canonical points to main authoritative product page to prevent doorway duplicate content penalty
    const canonicalUrl = `https://radioimmunoassay.in/items/${slug}`;

    return {
        title,
        description,
        keywords: [
            `${productName} in ${districtName}`,
            `${productName} Supplier ${districtName}`,
            `${productName} Price ${districtName}`,
            `${productName} Dealer ${districtName}`,
            `Biomedical Equipment ${districtName}`,
            "Raj Biosis",
        ],
        alternates: {
            canonical: canonicalUrl,
        },
        openGraph: {
            title,
            description,
            url: canonicalUrl,
            siteName: "Raj Biosis",
            type: "website",
            locale: "en_IN",
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
        },
        robots: {
            index: true,
            follow: true,
        },
        metadataBase: new URL("https://radioimmunoassay.in"),
    };
}

export default async function Page({ params }) {
    const { slug, district } = await params;
    const product = await fetchProductBySlug(slug);

    return (
        <ProductDetails
            slug={slug}
            district={district}
            initialProduct={product}
        />
    );
}