"use client";

import { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

import {
  ShieldCheck,
  Truck,
  BadgeCheck,
  PackageCheck,
  ChevronDown,
  ChevronRight,
} from "lucide-react";

import PageBanner from "@/components/PageBanner";
import SectionTitle from "@/components/SectionTitle";
import CTASection from "@/components/CTASection";

export default function ProductsPage() {

  const products = [

    {
      category: "Electrolyte Reagents",
      title: "Roche 9180 Electrolyte Reagent",
      image: "/images/product-1.jpg",
      description:
        "High precision electrolyte reagent for Roche analyzers.",
      brand: "Roche",
      model: "9180",
      slug: "roche-9180-electrolyte-reagent",
    },

    {
      category: "Electrolyte Reagents",
      title: "ERBA EC 90 Reagent",
      image: "/images/product-2.jpg",
      description:
        "Premium quality electrolyte reagent.",
      brand: "ERBA",
      model: "EC90",
      slug: "erba-ec90",
    },

    {
      category: "Rapid Test Kits",
      title: "COVID Rapid Test Kit",
      image: "/images/product-3.jpg",
      description:
        "Fast and reliable rapid testing solution.",
      brand: "Bio",
      model: "RT-100",
      slug: "covid-kit",
    },

    {
      category: "Rapid Test Kits",
      title: "Dengue Rapid Kit",
      image: "/images/product-4.jpg",
      description:
        "High sensitivity dengue rapid test.",
      brand: "Bio",
      model: "DG200",
      slug: "dengue-kit",
    },

    {
      category: "Hematology",
      title: "Hematology Reagent",
      image: "/images/product-5.jpg",
      description:
        "Premium hematology solution.",
      brand: "Mindray",
      model: "BC5300",
      slug: "hematology",
    },

  ];

  const [search, setSearch] =
    useState("");

  const [openedCategory, setOpenedCategory] =
    useState("");

  const [activeCategory, setActiveCategory] =
    useState("");

  const filteredProducts =
    useMemo(() => {

      return products.filter((item) => {

        const text = `
        ${item.title}
        ${item.brand}
        ${item.category}
        `.toLowerCase();

        return text.includes(
          search.toLowerCase()
        );

      });

    }, [search]);

  const groupedProducts =
    useMemo(() => {

      const obj = {};

      filteredProducts.forEach((item) => {

        if (!obj[item.category]) {

          obj[item.category] = [];

        }

        obj[item.category].push(item);

      });

      return obj;

    }, [filteredProducts]);

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

    setTimeout(() => {

      const el =
        document.getElementById(slug);

      if (el) {

        el.scrollIntoView({

          behavior: "smooth",

          block: "start",

        });

      }

    }, 250);

  };

  return (
    <>
      <PageBanner
        title="Our Products"
        subtitle="Explore advanced biomedical and diagnostic equipment designed for modern healthcare excellence."
      />

      <section className="py-24 bg-slate-50">

        <div className="max-w-7xl mx-auto px-5">

          <SectionTitle
            badge="Featured Products"
            title="Premium Biomedical Equipment"
            description="Discover premium diagnostic products for hospitals and laboratories."
            center
          />

          <div className="grid lg:grid-cols-[320px_1fr] gap-10 mt-16">

            {/* ======================
                LEFT SIDEBAR
          ====================== */}

            <aside className="sticky top-28 h-fit rounded-[32px] border border-slate-200 bg-white p-7 shadow-2xl">

              {/* Heading */}
              <div className="mb-6">

                <span className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-700">
                  Product Categories
                </span>

                <h2 className="mt-5 text-3xl font-bold tracking-tight text-slate-900">
                  Categories
                </h2>

              </div>

              {/* Search */}
              <div className="relative">

                <input
                  type="text"
                  placeholder="Search Product..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 px-5 text-slate-900 placeholder:text-slate-400 outline-none transition-all duration-300 focus:border-slate-700 focus:bg-white focus:ring-4 focus:ring-slate-200"
                />

              </div>

              {/* Categories */}
              <div className="mt-8 space-y-4">

                {categories.map((category) => (

                  <div
                    key={category}
                    className="overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all duration-300"
                  >

                    {/* Category Button */}
                    <button
                      onClick={() => toggleCategory(category)}
                      className={`flex w-full items-center justify-between px-5 py-4 transition-all duration-300 ${activeCategory === category
                        ? "bg-slate-900 text-white"
                        : "hover:bg-slate-50 text-slate-800"
                        }`}
                    >

                      <span className="flex items-center gap-3 font-semibold">

                        <div
                          className={`flex h-8 w-8 items-center justify-center rounded-lg transition ${activeCategory === category
                            ? "bg-white/20"
                            : "bg-slate-100"
                            }`}
                        >
                          {openedCategory === category ? (
                            <ChevronDown size={16} />
                          ) : (
                            <ChevronRight size={16} />
                          )}
                        </div>

                        {category}

                      </span>

                      <span
                        className={`rounded-full px-3 py-1 text-xs font-bold ${activeCategory === category
                          ? "bg-white/20 text-white"
                          : "bg-slate-100 text-slate-700"
                          }`}
                      >
                        {groupedProducts[category].length}
                      </span>

                    </button>

                    {/* Products */}
                    <div
                      className="overflow-hidden transition-all duration-300"
                      style={{
                        maxHeight:
                          openedCategory === category
                            ? groupedProducts[category].length * 50 + "px"
                            : "0px",
                      }}
                    >

                      {groupedProducts[category].map((item) => (

                        <button
                          key={item.slug}
                          onClick={() =>
                            scrollToProduct(item.slug, category)
                          }
                          className="block w-full border-t border-slate-100 px-6 py-3 text-left text-sm text-slate-600 transition-all duration-200 hover:bg-slate-50 hover:text-slate-900"
                        >
                          {item.title}
                        </button>

                      ))}

                    </div>

                  </div>

                ))}

              </div>

            </aside>

            {/* ======================
                RIGHT SIDE
          ====================== */}

            <div>

              <div className="space-y-16">

                {Object.entries(groupedProducts).map(([category, list]) => (

                  <section
                    key={category}
                    id={category.replace(/\s+/g, "-").toLowerCase()}
                  >

                    {/* Category Header */}
                    <div className="mb-10 flex flex-col gap-4 border-b border-slate-200 pb-6 sm:flex-row sm:items-center sm:justify-between">

                      <div>

                        <span className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-700">
                          Product Category
                        </span>

                        <h2 className="mt-5 text-4xl font-bold tracking-tight text-slate-900">
                          {category}
                        </h2>

                      </div>

                      <div className="rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-600 shadow-sm">
                        {list.length} Products
                      </div>

                    </div>

                    {/* Products */}
                    <div className="space-y-8">

                      {list.map((product) => (

                        <div
                          key={product.slug}
                          id={product.slug}
                          className="group rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-2xl"
                        >

                          <div className="grid items-center gap-8 lg:grid-cols-[260px_1fr_190px]">

                            {/* Image */}
                            <div className="flex h-[240px] items-center justify-center rounded-3xl border border-slate-200 bg-slate-100 p-6 overflow-hidden">

                              <Image
                                src={product.image}
                                alt={product.title}
                                width={240}
                                height={240}
                                className="max-h-[190px] object-contain transition-transform duration-500 group-hover:scale-105"
                              />

                            </div>

                            {/* Content */}
                            <div>

                              <h3 className="text-3xl font-bold tracking-tight text-slate-900">
                                {product.title}
                              </h3>

                              <div className="mt-4 h-1 w-16 rounded-full bg-slate-300 transition-all duration-300 group-hover:w-24 group-hover:bg-slate-700" />

                              <p className="mt-6 leading-8 text-slate-600">
                                {product.description}
                              </p>

                              {/* Product Details */}
                              <div className="mt-8 grid gap-4 sm:grid-cols-2">

                                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">

                                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                                    Brand
                                  </p>

                                  <p className="mt-2 text-lg font-bold text-slate-900">
                                    {product.brand}
                                  </p>

                                </div>

                                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">

                                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                                    Model
                                  </p>

                                  <p className="mt-2 text-lg font-bold text-slate-900">
                                    {product.model}
                                  </p>

                                </div>

                              </div>

                            </div>

                            {/* CTA */}
                            <div className="flex items-center justify-center lg:justify-end">

                              <Link
                                href={`/products/${product.slug}`}
                                className="w-full lg:w-auto"
                              >

                                <button className="w-full rounded-2xl bg-slate-900 px-8 py-4 font-semibold text-white shadow-lg transition-all duration-300 hover:bg-slate-800 hover:shadow-xl lg:w-auto">
                                  View Details
                                </button>

                              </Link>

                            </div>

                          </div>

                        </div>

                      ))}

                    </div>

                  </section>

                ))}

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* ===========================
            WHY CHOOSE US
      =========================== */}

      <section className="py-24 bg-gradient-to-b from-white via-slate-50 to-white">

        <div className="max-w-7xl mx-auto px-5">

          <SectionTitle
            badge="Why Choose Our Products"
            title="Trusted Quality & Innovation"
            description="Every biomedical product is manufactured to meet international quality standards, delivering reliable performance, long-term durability, and professional customer support."
            center
          />

          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">

            {[
              {
                icon: <ShieldCheck size={32} />,
                title: "Certified Quality",
                desc: "Premium biomedical products tested under strict international quality standards for dependable performance.",
              },

              {
                icon: <Truck size={32} />,
                title: "Fast Delivery",
                desc: "Secure packaging and efficient nationwide delivery for hospitals, laboratories, and healthcare facilities.",
              },

              {
                icon: <BadgeCheck size={32} />,
                title: "Trusted Support",
                desc: "Expert consultation, technical guidance, and responsive customer assistance whenever you need it.",
              },

              {
                icon: <PackageCheck size={32} />,
                title: "Premium Equipment",
                desc: "High-performance biomedical and laboratory equipment designed for modern healthcare environments.",
              },

            ].map((item, index) => (

              <div
                key={index}
                className="group rounded-[30px] border border-slate-200 bg-white p-8 text-center shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-slate-300 hover:shadow-2xl"
              >

                {/* Icon */}
                <div className="mx-auto mb-7 flex h-20 w-20 items-center justify-center rounded-3xl border border-slate-200 bg-slate-100 text-slate-700 transition-all duration-300 group-hover:bg-slate-900 group-hover:text-white">
                  {item.icon}
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold tracking-tight text-slate-900">
                  {item.title}
                </h3>

                {/* Divider */}
                <div className="mx-auto mt-4 mb-5 h-1 w-14 rounded-full bg-slate-300 transition-all duration-300 group-hover:w-20 group-hover:bg-slate-700" />

                {/* Description */}
                <p className="leading-8 text-slate-600">
                  {item.desc}
                </p>

              </div>

            ))}

          </div>

        </div>

      </section>

      {/* CTA */}

      <CTASection />

    </>

  );

}