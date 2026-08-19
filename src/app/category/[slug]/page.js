import { CATEGORY_DEFINITIONS } from "@/lib/constants";
import { fetchProductsByCategory, fetchCategoryList } from "@/lib/data-fetcher-server";
import ProductCard from "@/components/ProductCard";
import PageBanner from "@/components/PageBanner";
import SectionTitle from "@/components/SectionTitle";
import CTASection from "@/components/CTASection";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ShieldCheck, Truck, Award, CheckCircle2, ChevronRight } from "lucide-react";

export async function generateStaticParams() {
    const categories = await fetchCategoryList();
    return categories.map((cat) => ({
        slug: cat.slug,
    }));
}

export async function generateMetadata({ params }) {
    const { slug } = await params;
    const catDef = CATEGORY_DEFINITIONS[slug];

    const title = catDef?.title || `${slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())} Supplier in India | Raj Biosis`;
    const description = catDef?.description || `Explore ${slug.replace(/-/g, " ")} equipment, analyzers, and reagents supplied by Raj Biosis across India. Certified quality, warranty, and installation.`;
    const url = `https://radioimmunoassay.in/category/${slug}`;

    return {
        title,
        description,
        keywords: catDef?.keywords || [slug.replace(/-/g, " "), "Biomedical Equipment Supplier"],
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

export default async function CategoryPage({ params }) {
    const { slug } = await params;
    const catDef = CATEGORY_DEFINITIONS[slug];
    const categoryName = catDef?.name || slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
    const products = await fetchProductsByCategory(slug);
    const allCategories = await fetchCategoryList();

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
                "name": "Categories",
                "item": "https://radioimmunoassay.in/items"
            },
            {
                "@type": "ListItem",
                "position": 3,
                "name": categoryName,
                "item": `https://radioimmunoassay.in/category/${slug}`
            }
        ]
    };

    const collectionSchema = {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "name": `${categoryName} Catalog`,
        "description": catDef?.description || `Biomedical ${categoryName} equipment for laboratories and hospitals.`,
        "url": `https://radioimmunoassay.in/category/${slug}`,
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(breadcrumbSchema),
                }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(collectionSchema),
                }}
            />

            <PageBanner
                title={`${categoryName} Supplier in India`}
                subtitle={catDef?.description || `Explore certified ${categoryName} instruments, analyzers, and reagents.`}
            />

            <section className="section-padding bg-slate-50">
                <div className="container-custom">
                    
                    {/* Category Informational Hub */}
                    {catDef && (
                        <div className="mb-14 rounded-3xl border border-slate-200 bg-white p-8 lg:p-10 shadow-md">
                            <div className="grid lg:grid-cols-12 gap-8 items-center">
                                <div className="lg:col-span-8 space-y-4">
                                    <span className="inline-block rounded-full bg-teal-50 px-4 py-1.5 text-xs font-bold text-teal-700 uppercase tracking-wide">
                                        Biomedical Category Authority
                                    </span>
                                    <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                                        About {categoryName}
                                    </h2>
                                    <p className="text-slate-600 leading-relaxed text-base">
                                        {catDef.details}
                                    </p>
                                    <div className="pt-4 border-t border-slate-100 grid sm:grid-cols-2 gap-3">
                                        {catDef.applications?.map((app, idx) => (
                                            <div key={idx} className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                                                <CheckCircle2 size={16} className="text-teal-600 shrink-0" />
                                                <span>{app}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="lg:col-span-4 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 text-white p-6 space-y-4">
                                    <div className="flex items-center gap-3">
                                        <Award className="text-teal-400" size={24} />
                                        <h3 className="font-bold text-lg text-white">Quality Guarantee</h3>
                                    </div>
                                    <p className="text-xs text-slate-300 leading-relaxed">
                                        All {categoryName} instruments supplied by Raj Biosis include manufacturer warranty, engineer installation, and staff training.
                                    </p>
                                    <div className="pt-2">
                                        <Link href="/contact">
                                            <button className="w-full py-2.5 rounded-xl bg-teal-500 hover:bg-teal-600 text-white font-semibold text-xs transition-colors">
                                                Request Category Quote
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Products Grid */}
                    <div>
                        <SectionTitle
                            badge="Product Catalog"
                            title={`Available ${categoryName} Products (${products.length})`}
                            description={`Select an analyzer or reagent below to view detailed specifications, user manuals, and price quotation.`}
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
                                    Contact Raj Biosis directly for custom models of {categoryName}.
                                </p>
                                <Link href="/contact">
                                    <button className="mt-4 px-6 py-2.5 rounded-xl bg-slate-900 text-white font-semibold text-xs">
                                        Inquire Custom Requirements
                                    </button>
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Related Categories Navigation */}
                    <div className="mt-16 pt-12 border-t border-slate-200">
                        <h3 className="text-lg font-bold text-slate-900 mb-6">
                            Browse Related Diagnostic Categories
                        </h3>
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                            {allCategories.map((cat) => (
                                <Link
                                    key={cat.slug}
                                    href={`/category/${cat.slug}`}
                                    className={`p-4 rounded-2xl border text-center transition-all ${
                                        cat.slug === slug
                                            ? "border-teal-500 bg-teal-50 text-teal-800 font-bold shadow-sm"
                                            : "border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:shadow-sm"
                                    }`}
                                >
                                    <span className="text-xs font-semibold block">{cat.name}</span>
                                    <span className="text-[10px] text-slate-400 mt-1 block">Explore Category</span>
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
