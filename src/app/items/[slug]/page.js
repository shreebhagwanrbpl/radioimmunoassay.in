import ProductDetails from "./ProductDetails";
import { fetchProductBySlug, fetchFullCatalog } from "@/lib/data-fetcher-server";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
    try {
        const catalog = await fetchFullCatalog();
        return catalog
            .filter((p) => p.slug)
            .map((p) => ({
                slug: p.slug,
            }));
    } catch (e) {
        console.error("Error generating static params for products:", e);
        return [];
    }
}

export async function generateMetadata({ params }) {
    const { slug } = await params;
    const product = await fetchProductBySlug(slug);

    const productName = product?.title || slug?.replace(/-/g, " ")?.replace(/\b\w/g, (c) => c.toUpperCase());
    const brand = product?.brand ? `${product.brand} ` : "";
    const category = product?.category || "Biomedical Equipment";
    const description = product?.description
        ? `${product.description.slice(0, 150)}... Buy ${productName} from Raj Biosis, leading supplier in India.`
        : `Buy ${productName} (${brand}${category}) at best price in India. Trusted supplier, dealer and distributor for pathology labs, hospitals and diagnostic centers. Contact Raj Biosis for instant quotation.`;

    const url = `https://radioimmunoassay.in/items/${slug}`;
    const mainImage = product?.images?.[0] || product?.image || "https://radioimmunoassay.in/logo.png";

    return {
        title: `${productName} Supplier in India | Price, Specs & Dealer | Raj Biosis`,
        description,
        keywords: [
            productName,
            `${productName} Supplier`,
            `${productName} Dealer`,
            `${productName} Price`,
            `${productName} Distributor`,
            `${productName} Specification`,
            `${brand}${productName}`,
            `${category} Supplier India`,
            "Biomedical Equipment Supplier",
            "Raj Biosis",
        ],
        alternates: {
            canonical: url,
        },
        openGraph: {
            title: `${productName} Supplier in India | Raj Biosis`,
            description,
            url,
            siteName: "Raj Biosis",
            type: "website",
            locale: "en_IN",
            images: [
                {
                    url: mainImage,
                    width: 1200,
                    height: 630,
                    alt: productName,
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title: `${productName} | Raj Biosis`,
            description,
            images: [mainImage],
        },
        robots: {
            index: true,
            follow: true,
            googleBot: {
                index: true,
                follow: true,
                "max-video-preview": -1,
                "max-image-preview": "large",
                "max-snippet": -1,
            },
        },
        metadataBase: new URL("https://radioimmunoassay.in"),
    };
}

export default async function Page({ params }) {
    const { slug } = await params;
    const product = await fetchProductBySlug(slug);

    if (!product && process.env.NODE_ENV === "production") {
        // Fall back gracefully if product slug not found
    }

    const productName = product?.title || slug?.replace(/-/g, " ")?.replace(/\b\w/g, (c) => c.toUpperCase());
    const mainImage = product?.images?.[0] || product?.image || "https://radioimmunoassay.in/logo.png";

    const productSchema = {
        "@context": "https://schema.org",
        "@type": "Product",
        "name": productName,
        "image": [mainImage],
        "description": product?.description || `High precision ${productName} supplied by Raj Biosis across India.`,
        "sku": product?.model || slug,
        "mpn": product?.model || slug,
        "brand": {
            "@type": "Brand",
            "name": product?.brand || "Raj Biosis"
        },
        "offers": {
            "@type": "Offer",
            "url": `https://radioimmunoassay.in/items/${slug}`,
            "priceCurrency": "INR",
            "price": "Contact for Quotation",
            "availability": "https://schema.org/InStock",
            "seller": {
                "@type": "Organization",
                "name": "Raj Biosis Private Limited"
            }
        }
    };

    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://radioimmunoassay.in"
            },
            {
                "@type": "ListItem",
                "position": 2,
                "name": "Products",
                "item": "https://radioimmunoassay.in/items"
            },
            {
                "@type": "ListItem",
                "position": 3,
                "name": productName,
                "item": `https://radioimmunoassay.in/items/${slug}`
            }
        ]
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(productSchema),
                }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(breadcrumbSchema),
                }}
            />
            <ProductDetails slug={slug} initialProduct={product} />
        </>
    );
}