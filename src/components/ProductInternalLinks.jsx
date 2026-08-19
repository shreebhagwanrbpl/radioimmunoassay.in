import Link from "next/link";
import { TOP_DISTRICTS, CATEGORY_DEFINITIONS } from "@/lib/constants";
import { MapPin, Tag, Building2, ChevronRight, Layers } from "lucide-react";

export default function ProductInternalLinks({ product, currentDistrict = null }) {
  if (!product) return null;

  const productName = product.title || "Biomedical Equipment";
  const categoryName = product.category || "Biomedical Equipment";
  const brandName = product.brand || "";

  // Match category slug
  const matchedCatSlug = Object.keys(CATEGORY_DEFINITIONS).find((slug) =>
    CATEGORY_DEFINITIONS[slug].name.toLowerCase() === categoryName.toLowerCase() ||
    categoryName.toLowerCase().includes(slug.replace(/-/g, " "))
  ) || "hematology-analyzer";

  const brandSlug = brandName ? brandName.toLowerCase().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-") : "";

  return (
    <div className="mt-16 rounded-3xl border border-slate-200 bg-gradient-to-b from-slate-50 to-white p-8 shadow-sm">
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-200">
        <div className="p-2.5 rounded-xl bg-teal-50 text-teal-700">
          <Layers size={22} />
        </div>
        <div>
          <h3 className="text-xl font-bold text-slate-900">
            Explore Related Equipment & Regional Availability
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Internal links and diagnostic resources for {productName}
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8 text-sm">
        {/* Category & Brand Hubs */}
        <div className="space-y-3">
          <h4 className="font-semibold text-slate-900 flex items-center gap-2">
            <Tag size={16} className="text-teal-600" />
            Equipment Categories
          </h4>
          <ul className="space-y-2 text-slate-600">
            <li>
              <Link
                href={`/category/${matchedCatSlug}`}
                className="hover:text-teal-600 hover:underline flex items-center gap-1.5 transition-colors"
              >
                <ChevronRight size={14} className="text-slate-400" />
                <span>{categoryName} Catalog</span>
              </Link>
            </li>
            <li>
              <Link
                href="/items"
                className="hover:text-teal-600 hover:underline flex items-center gap-1.5 transition-colors"
              >
                <ChevronRight size={14} className="text-slate-400" />
                <span>All Biomedical Equipment</span>
              </Link>
            </li>
            {brandName && (
              <li>
                <Link
                  href={`/brand/${brandSlug}`}
                  className="hover:text-teal-600 hover:underline flex items-center gap-1.5 transition-colors"
                >
                  <ChevronRight size={14} className="text-slate-400" />
                  <span>{brandName} Analyzers & Reagents</span>
                </Link>
              </li>
            )}
          </ul>
        </div>

        {/* Regional District Hubs */}
        <div className="space-y-3 md:col-span-2">
          <h4 className="font-semibold text-slate-900 flex items-center gap-2">
            <MapPin size={16} className="text-teal-600" />
            Regional Supply & Service Districts
          </h4>
          <p className="text-xs text-slate-500 leading-relaxed mb-3">
            We deliver and service {productName} across major healthcare hubs:
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {TOP_DISTRICTS.slice(0, 12).map((dist) => (
              <Link
                key={dist.slug}
                href={`/${dist.slug}`}
                className="px-3 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-teal-50 hover:border-teal-200 hover:text-teal-800 text-xs font-medium transition-all flex items-center gap-1.5"
              >
                <MapPin size={12} className="text-slate-400" />
                <span>{dist.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
