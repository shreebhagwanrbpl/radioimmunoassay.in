import { BRAND_DEFINITIONS } from "@/lib/constants";
import { fetchProductsByBrand, fetchBrandList } from "@/lib/data-fetcher-server";
import ProductCard from "@/components/ProductCard";
import PageBanner from "@/components/PageBanner";
import SectionTitle from "@/components/SectionTitle";
import CTASection from "@/components/CTASection";
import Link from "next/link";
import { Award, ShieldCheck } from "lucide-react";

export async function generateStaticParams() {
    const brands = await fetchBrandList();
    return brands.map((b) => ({
        slug: b.slug,
    }));
}

export async function generateMetadata({ params }) {
    const { slug } = await params;
    const brandDef = BRAND_DEFINITIONS[slug];

    const brandName = brandDef?.name || slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
    const title = `${brandName} Authorized Equipment & Reagent Dealer in India | Raj Biosis`;
    const description = `Authorized supplier and distributor of ${brandName} biomedical equipment, analyzers, and reagents across India. Complete range with warranty and installation.`;
    const url = `https://radioimmunoassay.in/brand/${slug}`;

    return {
        title,
        description,
        keywords: [`${brandName} Supplier`, `${brandName} Analyzer`, `${brandName} Dealer India`, "Raj Biosis"],
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
        metadataBase: new URL("https://radioimmunoassay.in"),
    };
}

export default async function BrandPage({ params }) {
    const { slug } = await params;
    const brandDef = BRAND_DEFINITIONS[slug];
    const brandName = brandDef?.name || slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
    const products = await fetchProductsByBrand(slug);
    const allBrands = await fetchBrandList();

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
                "name": "Brands",
                "item": "https://radioimmunoassay.in/items"
            },
            {
                "@type": "ListItem",
                "position": 3,
                "name": brandName,
                "item": `https://radioimmunoassay.in/brand/${slug}`
            }
        ]
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(breadcrumbSchema),
                }}
            />

            <PageBanner
                title={`${brandName} Biomedical & Diagnostic Products`}
                subtitle={brandDef?.description || `Explore ${brandName} clinical analyzers, diagnostic reagents, and laboratory systems.`}
            />

            <section className="section-padding bg-slate-50">
                <div className="container-custom">
                    
                    {/* Brand Banner Card */}
                    <div className="mb-12 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="space-y-2">
                            <span className="inline-block rounded-full bg-teal-50 px-3.5 py-1 text-xs font-bold text-teal-700 uppercase">
                                Manufacturer Brand Hub
                            </span>
                            <h2 className="text-2xl font-extrabold text-slate-900">
                                {brandName} Diagnostic Products
                            </h2>
                            <p className="text-slate-600 text-sm max-w-2xl leading-relaxed">
                                Raj Biosis provides genuine {brandName} analyzers, reagents, and spares with certified engineer support across all medical districts.
                            </p>
                        </div>
                        <div className="shrink-0">
                            <Link href="/contact">
                                <button className="px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs shadow-md transition-all">
                                    Request {brandName} Pricing
                                </button>
                            </Link>
                        </div>
                    </div>

                    {/* Products Grid */}
                    <SectionTitle
                        badge="Catalog"
                        title={`${brandName} Equipment & Reagents (${products.length})`}
                        description={`Click any ${brandName} product below for full specifications and price quotation.`}
                    />

                    {products.length > 0 ? (
                        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                            {products.map((product) => (
                                <ProductCard key={product.uid || product.slug} product={product} />
                            ))}
                        </div>
                    ) : (
                        <div className="mt-10 rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center">
                            <p className="text-slate-600 font-medium">
                                Contact Raj Biosis for availability of specific {brandName} models.
                            </p>
                        </div>
                    )}

                    {/* Brands Grid */}
                    <div className="mt-16 pt-12 border-t border-slate-200">
                        <h3 className="text-lg font-bold text-slate-900 mb-6">
                            Featured Manufacturer Brands
                        </h3>
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                            {allBrands.map((b) => (
                                <Link
                                    key={b.slug}
                                    href={`/brand/${b.slug}`}
                                    className={`p-4 rounded-2xl border text-center transition-all ${
                                        b.slug === slug
                                            ? "border-teal-500 bg-teal-50 text-teal-800 font-bold shadow-sm"
                                            : "border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:shadow-sm"
                                    }`}
                                >
                                    <span className="text-xs font-semibold block">{b.name}</span>
                                </Link>
                            ))}
                        </div>
                    </div>

                </div>
            </section>

            <CTASection />
        </>
    );
}
