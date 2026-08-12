import ProductDetails from "../../../items/[slug]/ProductDetails";

export async function generateMetadata({ params }) {
    const { slug, district = "jaipur" } = await params;

    const productName = slug
        ?.replace(/-/g, " ")
        ?.replace(/\b\w/g, (c) => c.toUpperCase());

    const districtName = district
        ?.replace(/-/g, " ")
        ?.replace(/\b\w/g, (c) => c.toUpperCase());

    const title = `${productName} Supplier & Price in ${districtName} | Raj Biosis`;

    const description = `Buy ${productName} in ${districtName} at best price. Raj Biosis is the leading supplier, dealer and distributor of ${productName} for hospitals, pathology labs, diagnostic centers & healthcare clinics in ${districtName}. Contact us for quotation, warranty & installation.`;

    const url = `https://radioimmunoassay.in/${district}/items/${slug}`;

    return {
        title,
        description,

        keywords: [
            `${productName} in ${districtName}`,
            `${productName} Supplier ${districtName}`,
            `${productName} Price ${districtName}`,
            `${productName} Dealer ${districtName}`,
            `${productName} Distributor ${districtName}`,
            `Buy ${productName} ${districtName}`,
            `Pathology Equipment ${districtName}`,
            `Biomedical Equipment ${districtName}`,
            "Raj Biosis",
        ],

        alternates: {
            canonical: url,
        },

        openGraph: {
            title,
            description,
            url,
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
    const { slug, district } = await params;

    return (
        <ProductDetails
            slug={slug}
            district={district}
        />
    );
}