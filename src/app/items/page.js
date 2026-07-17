"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import {
  ShieldCheck,
  Truck,
  BadgeCheck,
  PackageCheck,
  Search,
  ChevronDown,
  ChevronRight,
  ChevronUp,
} from "lucide-react";

import { db } from "@/lib/firebase";
import {
  doc,
  getDoc,
  getDocs,
  collection,
} from "firebase/firestore";
import { usePathname } from "next/navigation";

import PageBanner from "@/components/PageBanner";
import SectionTitle from "@/components/SectionTitle";
import CTASection from "@/components/CTASection";

const makeSlug = (text = "") =>
  text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-");



export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [categorySearch, setCategorySearch] =
    useState("");

  const [productSearch, setProductSearch] =
    useState("");
  const [loading, setLoading] = useState(true);



  const [openedCategory, setOpenedCategory] =
    useState("");

  const [activeCategory, setActiveCategory] =
    useState("");

  const [pendingScroll, setPendingScroll] =
    useState(null);

  const [loadedImages, setLoadedImages] =
    useState({});

  const [showTopButton, setShowTopButton] =
    useState(false);

  const pathname = usePathname();

  const pathParts = pathname
    .split("/")
    .filter(Boolean);

  const district =
    pathParts[0] === "items"
      ? null
      : pathParts[0];

  useEffect(() => {
    const fetchProducts = async () => {
      try {

        const categorySnap = await getDocs(
          collection(
            db,
            "websites",
            "centralbiomedicals",
            "pages",
            "categoryproducts",
            "categories"
          )
        );

        const allProducts = [];

        categorySnap.forEach((categoryDoc) => {

          const data = categoryDoc.data();

          const categoryProducts =
            (data.products || [])
              .filter(
                (p) => p.isPublished !== false
              )
              .map((item, index) => ({
                ...item,
                uid: `${categoryDoc.id}-${index}`,
                category:
                  data.category ||
                  categoryDoc.id,
                slug:
                  item.slug ||
                  makeSlug(item.title),
              }));

          allProducts.push(
            ...categoryProducts
          );

        });

        const oldSnap = await getDoc(
          doc(
            db,
            "websites",
            "centralbiomedicals",
            "pages",
            "products"
          )
        );

        if (oldSnap.exists()) {

          const oldProducts =
            (oldSnap.data().products || [])
              .filter(
                (p) => p.isPublished !== false
              )
              .map((item, index) => ({
                ...item,
                uid: `other-${index}`,
                category:
                  "Other Products",
                slug:
                  item.slug ||
                  makeSlug(item.title),
              }));

          allProducts.push(
            ...oldProducts
          );

        }
        console.log("ALL PRODUCTS", allProducts);
        setProducts(allProducts);

      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter((item) => {
      const text = `
      ${item.title}
      ${item.brand}
      ${item.model}
      ${item.category}
      `
        .toLowerCase();

      return text.includes(
        productSearch.toLowerCase()
      );
    });
  }, [products, productSearch]);

  const groupedProducts = useMemo(() => {
    const obj = {};

    filteredProducts.forEach((item) => {
      if (!obj[item.category]) {
        obj[item.category] = [];
      }

      obj[item.category].push(item);
    });

    return obj;
  }, [filteredProducts]);

  const sortedGroupedProducts =
    useMemo(() => {

      const entries =
        Object.entries(
          groupedProducts
        );

      entries.sort(([a], [b]) => {

        if (
          a === "Other Products"
        )
          return 1;

        if (
          b === "Other Products"
        )
          return -1;

        return a.localeCompare(b);

      });

      return Object.fromEntries(
        entries
      );

    }, [groupedProducts]);
  const categories =
    Object.keys(groupedProducts);

  const toggleCategory = (category) => {
    if (openedCategory === category) {
      setOpenedCategory("");
      return;
    }

    setOpenedCategory(category);
  };

  const scrollToProduct = (
    slug,
    category
  ) => {
    setOpenedCategory(category);
    setActiveCategory(category);
    setPendingScroll(slug);
  };

  useEffect(() => {
    if (!pendingScroll) return;

    const timer = setTimeout(() => {
      const el =
        document.getElementById(
          pendingScroll
        );

      if (el) {
        el.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }

      setPendingScroll(null);
    }, 300);

    return () => clearTimeout(timer);
  }, [openedCategory, pendingScroll]);

  useEffect(() => {
    const handleScroll = () => {
      setShowTopButton(
        window.scrollY > 500
      );
    };

    window.addEventListener(
      "scroll",
      handleScroll
    );

    return () =>
      window.removeEventListener(
        "scroll",
        handleScroll
      );
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (loading) {
    return (
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-8">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="h-[420px] rounded-[32px] bg-gray-100 animate-pulse"
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      {/* Banner */}
      <PageBanner
        title="Our Products"
        subtitle="Explore advanced biomedical and diagnostic equipment designed for modern healthcare excellence."
      />

      {/* Products */}
      <section className="section-padding bg-white">
        <div className="container-custom">

          <SectionTitle
            badge="Featured Products"
            title="Premium Biomedical Equipment"
            description="Discover high-quality diagnostic and biomedical technologies tailored for laboratories, healthcare institutions, and modern diagnostics."
            center
          />
        </div>

        {/* Search */}
        <div className="relative mx-auto mt-6 max-w-2xl px-4 lg:mt-10 lg:px-0">

          <Search
            size={22}
            className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 transition-colors duration-300"
          />

          <input
            type="text"
            placeholder="Search products..."
            value={productSearch}
            onChange={(e) => setProductSearch(e.target.value)}
            className="h-16 w-full rounded-2xl border border-slate-200 bg-white pl-14 pr-5 text-slate-900 placeholder:text-slate-400 shadow-sm outline-none transition-all duration-300 focus:border-slate-700 focus:bg-white focus:ring-4 focus:ring-slate-200"
          />

        </div>

        {/* Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[320px_minmax(0,1fr)] gap-6 lg:gap-10 mt-8 lg:mt-16 items-start px-4 lg:px-0">
          <aside
            className="
lg:sticky
lg:top-24
self-start
rounded-2xl lg:rounded-3xl
border
border-slate-200
bg-white
shadow-lg lg:shadow-xl
p-4 lg:p-6
"
          >
            <h3 className="text-2xl font-bold mb-6">
              Categories
            </h3>

            <div className="space-y-3">
              {Object.keys(sortedGroupedProducts)
                .filter((category) =>
                  category
                    .toLowerCase()
                    .includes(
                      categorySearch.toLowerCase()
                    )
                )
                .map((category) => (
                  <div
                    key={category}
                    className="border rounded-2xl overflow-hidden border-slate-200"
                  >
                    <button
                      onClick={() =>
                        toggleCategory(category)
                      }
                      className={`w-full px-5 py-4 flex justify-between items-center transition-all

                        ${activeCategory ===
                          category
                          ? "bg-sky-700 text-white"
                          : "bg-white hover:bg-slate-50"
                        }
                        `}
                    >

                      <span className="flex items-center gap-3">

                        {openedCategory ===
                          category ? (
                          <ChevronDown size={18} />
                        ) : (
                          <ChevronRight size={18} />
                        )}

                        {category}

                      </span>

                      <span className="text-sm font-semibold">

                        {
                          groupedProducts[
                            category
                          ].length
                        }

                      </span>

                    </button>

                    <div
                      className={`overflow-y-auto transition-all duration-300 ${openedCategory === category
                        ? "max-h-72"
                        : "max-h-0 overflow-hidden"
                        } custom-scrollbar`}
                    >

                      {groupedProducts[
                        category
                      ].map((item) => (

                        <button
                          key={item.uid}
                          onClick={() =>
                            scrollToProduct(
                              item.slug,
                              category
                            )
                          }
                          className="block w-full text-left px-6 py-3 border-t border-slate-100 hover:bg-slate-50"
                        >

                          {item.title}

                        </button>

                      ))}

                    </div>

                  </div>

                ))}

            </div>

          </aside>



          {/* ==========================
                RIGHT SIDE START
            ========================== */}

          <div className="space-y-16">
            {filteredProducts.length === 0 ? (

              <div className="rounded-[32px] border border-slate-200 bg-white p-10 lg:p-16 text-center shadow-2xl">

                {/* Icon */}
                <div className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-full border border-slate-200 bg-slate-100 text-5xl">
                  🔍
                </div>

                {/* Title */}
                <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-slate-900">
                  Product Not Found
                </h2>

                {/* Divider */}
                <div className="mx-auto mt-5 h-1 w-20 rounded-full bg-slate-300" />

                {/* Description */}
                <p className="mx-auto mt-6 max-w-2xl leading-8 text-slate-600">
                  We couldn't find any products matching{" "}
                  <span className="font-semibold text-slate-900">
                    "{productSearch}"
                  </span>
                  . Please try another keyword or browse the available product
                  categories.
                </p>

                {/* Button */}
                <button
                  onClick={() => setProductSearch("")}
                  className="mt-10 rounded-2xl bg-slate-900 px-8 py-4 font-semibold text-white shadow-lg transition-all duration-300 hover:bg-slate-800 hover:shadow-xl"
                >
                  View All Products
                </button>

              </div>

            ) : (

              Object.entries(groupedProducts).map(
                ([category, list]) => (

                  <section
                    key={category}
                    id={category
                      .replace(/\s+/g, "-")
                      .toLowerCase()}
                  >

                    {/* Category Header */}

                    <div className="mb-8 flex flex-col gap-4 border-b border-slate-200 pb-6 sm:flex-row sm:items-center sm:justify-between">

                      <div>

                        <span className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-700">
                          Product Category
                        </span>

                        <h2 className="mt-5 text-4xl font-bold tracking-tight text-slate-900">
                          {category}
                        </h2>

                      </div>

                      <div className="inline-flex items-center rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-600 shadow-sm">
                        {list.length} Products
                      </div>

                    </div>

                    {/* Product List */}

                    <div className="space-y-8">

                      {list.map((product) => (

                        <div
                          key={product.uid}
                          id={product.slug}
                          className="group rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-2xl"
                        >

                          <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-[250px_1fr_190px] lg:gap-8">

                            {/* Image */}

                            <div className="relative flex h-[200px] sm:h-[240px] items-center justify-center overflow-hidden rounded-3xl border border-slate-200 bg-slate-100">

                              {!loadedImages[product.uid] && (
                                <div className="absolute inset-0 animate-pulse bg-slate-200" />
                              )}

                              <img
                                src={
                                  product.images?.[0] ||
                                  product.image ||
                                  "/placeholder.jpg"
                                }
                                alt={product.title}
                                onLoad={() =>
                                  setLoadedImages((prev) => ({
                                    ...prev,
                                    [product.uid]: true,
                                  }))
                                }
                                onError={(e) => {
                                  e.currentTarget.src = "/placeholder.jpg";
                                }}
                                className={`max-h-[190px] object-contain p-5 transition-all duration-500 group-hover:scale-105 ${loadedImages[product.uid]
                                  ? "opacity-100"
                                  : "opacity-0"
                                  }`}
                              />

                            </div>

                            {/* Content */}

                            <div>

                              <h3 className="text-3xl font-bold tracking-tight text-slate-900">
                                {product.title}
                              </h3>

                              {/* Divider */}

                              <div className="mt-4 h-1 w-16 rounded-full bg-slate-300 transition-all duration-300 group-hover:w-24 group-hover:bg-slate-700" />

                              <p className="mt-6 leading-8 text-slate-600">
                                {product.description ||
                                  product.desc ||
                                  "Premium biomedical equipment designed for hospitals, laboratories, and diagnostic centres."}
                              </p>

                              {/* Details */}

                              <div className="mt-8 grid gap-4 sm:grid-cols-2">

                                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                                    Brand
                                  </p>
                                  <p className="mt-2 text-lg font-bold text-slate-900">
                                    {product.brand || "N/A"}
                                  </p>
                                </div>

                                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                                    Model
                                  </p>
                                  <p className="mt-2 text-lg font-bold text-slate-900">
                                    {product.model || "N/A"}
                                  </p>
                                </div>

                                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                                    Instrument
                                  </p>
                                  <p className="mt-2 text-lg font-bold text-slate-900">
                                    {product.instrument || "N/A"}
                                  </p>
                                </div>

                                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                                    Category
                                  </p>
                                  <p className="mt-2 text-lg font-bold text-slate-900">
                                    {product.category}
                                  </p>
                                </div>

                              </div>

                            </div>

                            {/* CTA */}

                            <div className="flex items-center justify-center lg:justify-end">

                              <Link
                                href={
                                  district
                                    ? `/${district}/items/${product.slug}`
                                    : `/items/${product.slug}`
                                }
                                className="w-full lg:w-auto"
                              >

                                <button className="w-full rounded-2xl bg-slate-900 px-8 py-4 font-semibold text-white shadow-lg transition-all duration-300 hover:bg-slate-800 hover:shadow-xl lg:w-auto">
                                  Get Quote
                                </button>

                              </Link>

                            </div>

                          </div>

                        </div>

                      ))}

                    </div>

                  </section>

                ))
            )}

          </div>

        </div>

      </section>

      {/* Why Choose Products */}
      <section className="section-padding bg-gradient-to-b from-slate-50 via-white to-slate-50">

        <div className="container-custom">

          <SectionTitle
            badge="Why Our Products"
            title="Trusted Quality & Innovation"
            description="We provide biomedical products designed for exceptional performance, reliability, precision, and long-term healthcare excellence."
            center
          />

          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">

            {[
              {
                icon: <ShieldCheck size={30} />,
                title: "Certified Quality",
                desc: "International quality standards with reliable performance.",
              },
              {
                icon: <Truck size={30} />,
                title: "Fast Delivery",
                desc: "Safe and timely delivery across hospitals and laboratories.",
              },
              {
                icon: <BadgeCheck size={30} />,
                title: "Trusted Support",
                desc: "Professional consultation and dependable technical support.",
              },
              {
                icon: <PackageCheck size={30} />,
                title: "Premium Equipment",
                desc: "Advanced biomedical instruments for modern diagnostics.",
              },
            ].map((item, index) => (

              <div
                key={index}
                className="group rounded-[30px] border border-slate-200 bg-white p-8 text-center shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-slate-300 hover:shadow-2xl"
              >

                {/* Icon */}
                <div className="mx-auto mb-7 flex h-16 w-16 items-center justify-center rounded-2xl border border-slate-200 bg-slate-100 text-slate-700 transition-all duration-300 group-hover:bg-slate-900 group-hover:text-white">
                  {item.icon}
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold tracking-tight text-slate-900">
                  {item.title}
                </h3>

                {/* Divider */}
                <div className="mx-auto mt-4 mb-5 h-1 w-14 rounded-full bg-slate-300 transition-all duration-300 group-hover:w-20 group-hover:bg-slate-700" />

                {/* Description */}
                <p className="leading-7 text-slate-600">
                  {item.desc}
                </p>

              </div>

            ))}

          </div>

        </div>

      </section>
      {/* CTA */}

      <CTASection />

      {/* Back To Top */}

      {showTopButton && (

        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 flex h-14 w-14 items-center justify-center rounded-full border border-slate-200 bg-slate-900 text-white shadow-2xl transition-all duration-300 hover:-translate-y-1 hover:scale-110 hover:bg-slate-800"
          aria-label="Scroll to top"
        >
          <ChevronUp size={22} />
        </button>

      )}

    </>

  );

}