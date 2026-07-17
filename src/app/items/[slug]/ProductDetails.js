"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import toast from "react-hot-toast";

import { usePathname } from "next/navigation";

import {
    FaPlay,
    FaShareAlt,
    FaWhatsapp,
    FaFacebook,
    FaInstagram,
    FaLink,
} from "react-icons/fa";

import {
    doc,
    getDoc,
    getDocs,
    addDoc,
    collection,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
const makeSlug = (text = "") =>
    text
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-");
export default function ProductDetails({ slug }) {
    const [product, setProduct] = useState(null);
    const [imageLoaded, setImageLoaded] = useState(false);
    const [selectedImage, setSelectedImage] = useState("");
    const [selectedMedia, setSelectedMedia] = useState("image");
    const [showShare, setShowShare] = useState(false);

    const shareRef = useRef();
    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
    });

    const [submitting, setSubmitting] =
        useState(false);
    const pathname = usePathname();

    const pathParts = pathname
        .split("/")
        .filter(Boolean);

    const city =
        pathParts.length > 1
            ? pathParts[0]
            : "India";

    const cityName =
        city.charAt(0).toUpperCase() +
        city.slice(1);

    useEffect(() => {
        const loadProduct = async () => {
            try {

                // NORMAL PRODUCTS
                const snap = await getDoc(
                    doc(
                        db,
                        "websites",
                        "centralbiomedicals",
                        "pages",
                        "products"
                    )
                );

                let allProducts = [];

                if (snap.exists()) {
                    allProducts = (snap.data().products || []).map((item) => ({
                        ...item,
                        slug:
                            item.slug ||
                            item.productSlug ||
                            makeSlug(item.title),
                    }));
                }

                // CATEGORY PRODUCTS
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

                categorySnap.forEach((docSnap) => {
                    const data = docSnap.data();

                    if (data.products?.length) {
                        allProducts.push(
                            ...(data.products || []).map((item) => ({
                                ...item,
                                slug:
                                    item.slug ||
                                    item.productSlug ||
                                    makeSlug(item.title),
                            }))
                        );
                    }
                });

                const found = allProducts.find(
                    (p) => p.slug === slug
                );
                console.log("URL SLUG:", slug);

                allProducts.forEach((p) => {
                    console.log("PRODUCT:", p.title);
                    console.log("PRODUCT SLUG:", p.slug);
                });
                console.log("SLUG FROM URL:", slug);
                console.log(
                    "TOTAL PRODUCTS:",
                    allProducts.length
                );
                console.log(
                    "FOUND PRODUCT:",
                    found
                );

                setProduct(found || null);

                if (found) {

                    if (
                        found.images?.length > 0
                    ) {
                        setSelectedImage(
                            found.images[0]
                        );
                    } else {
                        setSelectedImage(
                            found.image || ""
                        );
                    }

                    setSelectedMedia("image");
                }

            } catch (error) {
                console.error(error);
            }
        };

        loadProduct();
    }, [slug]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const phoneRegex = /^[6-9]\d{9}$/;
        const emailRegex =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!form.name.trim()) {
            return toast.error(
                "Name is required"
            );
        }

        if (!emailRegex.test(form.email)) {
            return toast.error(
                "Enter valid email"
            );
        }

        if (!phoneRegex.test(form.phone)) {
            return toast.error(
                "Enter valid mobile number"
            );
        }

        try {
            setSubmitting(true);

            await addDoc(
                collection(
                    db,
                    "websitesQueries",
                    "centralbiomedicals",
                    "productQueries"
                ),
                {
                    ...form,
                    productName: product.title,
                    productSlug: product.slug,
                    brand: product.brand || "",
                    model: product.model || "",
                    createdAt: new Date(),
                }
            );

            toast.success(
                "Your enquiry has been submitted successfully."
            );

            setForm({
                name: "",
                email: "",
                phone: "",
            });
        } catch (error) {
            console.error(error);
            toast.error(
                "Something went wrong"
            );
        } finally {
            setSubmitting(false);
        }
    };
    const productSchema = product
        ? {
            "@context": "https://schema.org",
            "@type": "Product",
            name: product.title,
            image: product.image ? [product.image] : [],
            description:
                product.desc ||
                product.description ||
                product.title,
            brand: {
                "@type": "Brand",
                name: product.brand || "Central Biomedicals",
            },
        }
        : null;

    const faqSchema = product
        ? {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
                {
                    "@type": "Question",
                    name: `What is ${product.title} used for?`,
                    acceptedAnswer: {
                        "@type": "Answer",
                        text: `${product.title} is used in hospitals, pathology labs and diagnostic centres.`,
                    },
                },
                {
                    "@type": "Question",
                    name: "Do you provide installation support?",
                    acceptedAnswer: {
                        "@type": "Answer",
                        text: "Yes, installation and technical support are available.",
                    },
                },
            ],
        }
        : null;

    const handleCopy = async () => {
        await navigator.clipboard.writeText(window.location.href);
        toast.success("Link Copied");
        setShowShare(false);
    };

    const handleWhatsapp = () => {
        const shareText = `🔬 ${product?.title}

${product?.desc}

🌐 ${window.location.href}`;

        window.open(
            `https://wa.me/?text=${encodeURIComponent(shareText)}`,
            "_blank"
        );
    };

    const handleFacebook = () => {
        window.open(
            `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                window.location.href
            )}`,
            "_blank"
        );
    };

    const handleInstagram = async () => {
        await navigator.clipboard.writeText(window.location.href);
        toast.success("Instagram direct sharing available nahi hai. Link copied.");
    };

    const handleNativeShare = async () => {
        if (navigator.share) {
            await navigator.share({
                title: product.title,
                text: product.desc,
                url: window.location.href,
            });
        } else {
            setShowShare(!showShare);
        }
    };

    useEffect(() => {
        const close = (e) => {
            if (
                shareRef.current &&
                !shareRef.current.contains(e.target)
            ) {
                setShowShare(false);
            }
        };

        document.addEventListener("mousedown", close);

        return () =>
            document.removeEventListener("mousedown", close);
    }, []);

    if (!product) {
        return (
            <section className="py-10 md:py-20 bg-slate-50">
                <div className="container-custom">

                    <div className="grid gap-12 lg:grid-cols-2">

                        {/* Image Skeleton */}
                        <div className="rounded-[36px] border border-slate-200 bg-white p-6 shadow-sm">

                            <div className="flex h-[420px] md:h-[520px] items-center justify-center rounded-[28px] bg-slate-100 animate-pulse" />

                        </div>

                        {/* Content Skeleton */}
                        <div className="rounded-[36px] border border-slate-200 bg-white p-8 shadow-sm">

                            {/* Badge */}
                            <div className="mb-6 h-10 w-36 rounded-full bg-slate-200 animate-pulse" />

                            {/* Title */}
                            <div className="mb-4 h-12 w-4/5 rounded-xl bg-slate-200 animate-pulse" />
                            <div className="mb-8 h-12 w-2/3 rounded-xl bg-slate-200 animate-pulse" />

                            {/* Divider */}
                            <div className="mb-8 h-1 w-20 rounded-full bg-slate-200 animate-pulse" />

                            {/* Paragraph */}
                            {[...Array(5)].map((_, i) => (
                                <div
                                    key={i}
                                    className={`mb-4 h-5 rounded-lg bg-slate-200 animate-pulse ${i === 4 ? "w-3/4" : "w-full"
                                        }`}
                                />
                            ))}

                            {/* Feature Cards */}
                            <div className="mt-10 grid gap-4 sm:grid-cols-2">

                                {[1, 2].map((item) => (
                                    <div
                                        key={item}
                                        className="rounded-2xl border border-slate-200 bg-slate-50 p-5"
                                    >
                                        <div className="mb-4 h-12 w-12 rounded-xl bg-slate-200 animate-pulse" />
                                        <div className="mb-3 h-5 w-3/4 rounded bg-slate-200 animate-pulse" />
                                        <div className="h-4 w-full rounded bg-slate-200 animate-pulse" />
                                        <div className="mt-2 h-4 w-2/3 rounded bg-slate-200 animate-pulse" />
                                    </div>
                                ))}

                            </div>

                        </div>

                    </div>
                    <div className="mt-16 grid gap-8 lg:grid-cols-[600px_1fr]">

                        {/* Left Card Skeleton */}
                        <div className="rounded-[32px] border border-slate-200 bg-white p-6 md:p-8 shadow-sm">

                            {/* Badge */}
                            <div className="mb-6 h-10 w-36 rounded-full bg-slate-200 animate-pulse" />

                            {/* Title */}
                            <div className="mb-8 h-10 w-56 rounded-xl bg-slate-200 animate-pulse" />

                            {/* Form Fields */}
                            {[...Array(4)].map((_, i) => (
                                <div
                                    key={i}
                                    className="mb-5 h-14 rounded-2xl bg-slate-100 animate-pulse"
                                />
                            ))}

                            {/* Button */}
                            <div className="mt-8 h-14 w-full rounded-2xl bg-slate-200 animate-pulse" />

                        </div>

                        {/* Right Card Skeleton */}
                        <div className="rounded-[32px] border border-slate-200 bg-white p-6 md:p-8 shadow-sm">

                            {/* Badge */}
                            <div className="mb-6 h-10 w-40 rounded-full bg-slate-200 animate-pulse" />

                            {/* Title */}
                            <div className="mb-8 h-10 w-64 rounded-xl bg-slate-200 animate-pulse" />

                            {/* Divider */}
                            <div className="mb-8 h-1 w-20 rounded-full bg-slate-200 animate-pulse" />

                            {/* Paragraph */}
                            {[...Array(6)].map((_, i) => (
                                <div
                                    key={i}
                                    className={`mb-4 h-5 rounded-lg bg-slate-200 animate-pulse ${i === 5 ? "w-3/4" : "w-full"
                                        }`}
                                />
                            ))}

                            {/* Info Cards */}
                            <div className="mt-8 grid gap-4 sm:grid-cols-2">

                                {[1, 2].map((item) => (
                                    <div
                                        key={item}
                                        className="rounded-2xl border border-slate-200 bg-slate-50 p-5"
                                    >
                                        <div className="mb-4 h-10 w-10 rounded-xl bg-slate-200 animate-pulse" />
                                        <div className="mb-3 h-5 w-2/3 rounded bg-slate-200 animate-pulse" />
                                        <div className="h-4 w-full rounded bg-slate-200 animate-pulse" />
                                    </div>
                                ))}

                            </div>

                        </div>

                    </div>

                </div>
            </section>
        );
    }
    return (
        <section className="py-10 md:py-20 bg-slate-50">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(productSchema),
                }}
            />

            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(faqSchema),
                }}
            />
            <div className="container-custom">
                <div className="mb-6 text-sm text-slate-500">
                    Home / Products / {product.title}
                </div>
                {/* Top Section */}

                <div className="grid lg:grid-cols-2 gap-12">
                    {/* Product Image */}

                    <div>

                        <div className="group relative h-[340px] sm:h-[420px] md:h-[500px] lg:h-[580px] overflow-hidden rounded-[36px] border border-slate-200 bg-white shadow-2xl transition-all duration-300 hover:shadow-[0_30px_90px_rgba(15,23,42,0.15)]">

                            {selectedMedia === "video" && product.video ? (

                                <div className="flex h-full items-center justify-center bg-slate-50 p-6">

                                    <video
                                        controls
                                        autoPlay
                                        className="h-full w-full rounded-2xl object-contain"
                                    >
                                        <source
                                            src={product.video}
                                            type="video/mp4"
                                        />
                                    </video>

                                </div>

                            ) : (

                                <>
                                    {/* Skeleton */}
                                    {!imageLoaded && (
                                        <div className="absolute inset-0 flex items-center justify-center bg-slate-100 animate-pulse">

                                            <div className="h-40 w-40 rounded-3xl bg-slate-200" />

                                        </div>
                                    )}

                                    {/* Image */}
                                    <Image
                                        src={selectedImage || product.image}
                                        alt={product.title}
                                        fill
                                        priority
                                        onLoad={() => setImageLoaded(true)}
                                        className={`object-contain p-6 transition-all duration-500 group-hover:scale-105 ${imageLoaded ? "opacity-100" : "opacity-0"
                                            }`}
                                    />
                                </>

                            )}

                        </div>

                        <div className="mt-6 flex flex-wrap gap-4">

                            {(product.images?.length
                                ? product.images
                                : [product.image]
                            ).map((img, index) => (

                                <button
                                    key={index}
                                    onClick={() => {
                                        setSelectedImage(img);
                                        setSelectedMedia("image");
                                    }}
                                    className={`group overflow-hidden rounded-2xl border-2 bg-white p-1 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${selectedMedia === "image" &&
                                        selectedImage === img
                                        ? "border-slate-900"
                                        : "border-slate-200"
                                        }`}
                                >

                                    <Image
                                        src={img}
                                        alt={`Product Image ${index + 1}`}
                                        width={80}
                                        height={80}
                                        className="h-20 w-20 rounded-xl object-cover transition-transform duration-300 group-hover:scale-105"
                                    />

                                </button>

                            ))}

                            {/* Video */}
                            {product.video && (

                                <button
                                    onClick={() => setSelectedMedia("video")}
                                    className={`group flex h-[90px] w-[90px] flex-col items-center justify-center rounded-2xl border-2 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${selectedMedia === "video"
                                        ? "border-slate-900"
                                        : "border-slate-200"
                                        }`}
                                >

                                    <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 transition-all duration-300 group-hover:bg-slate-900 group-hover:text-white">
                                        <FaPlay size={16} />
                                    </div>

                                    <span className="text-xs font-medium text-slate-600">
                                        Video
                                    </span>

                                </button>

                            )}

                            {/* PDF */}
                            {product.pdf && (

                                <a
                                    href={product.pdf}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group flex h-[90px] w-[90px] flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                                >

                                    <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-lg transition-all duration-300 group-hover:bg-slate-900 group-hover:text-white">
                                        📄
                                    </div>

                                    <span className="text-xs font-medium text-slate-600">
                                        PDF
                                    </span>

                                </a>

                            )}

                        </div>

                    </div>

                    {/* Product Details */}

                    <div>

                        <div className="flex justify-between items-start gap-4 relative">

                            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-slate-900">
                                {product.title}
                            </h1>

                            <div
                                ref={shareRef}
                                className="relative"
                            >

                                <button
                                    onClick={handleNativeShare}
                                    className="w-12 h-12 rounded-full border bg-white shadow flex items-center justify-center hover:bg-slate-100"
                                >
                                    <FaShareAlt size={18} />
                                </button>

                                {showShare && (

                                    <div className="absolute right-0 top-14 w-56 bg-white rounded-xl shadow-xl border p-2 z-50">

                                        <button
                                            onClick={handleCopy}
                                            className="w-full text-left px-3 py-2 hover:bg-slate-100 rounded flex items-center gap-2"
                                        >
                                            <FaLink />
                                            Copy Link
                                        </button>

                                        <button
                                            onClick={handleWhatsapp}
                                            className="w-full text-left px-3 py-2 hover:bg-slate-100 rounded flex items-center gap-2"
                                        >
                                            <FaWhatsapp className="text-green-600" />
                                            WhatsApp
                                        </button>

                                        <button
                                            onClick={handleFacebook}
                                            className="w-full text-left px-3 py-2 hover:bg-slate-100 rounded flex items-center gap-2"
                                        >
                                            <FaFacebook className="text-blue-600" />
                                            Facebook
                                        </button>

                                        <button
                                            onClick={handleInstagram}
                                            className="w-full text-left px-3 py-2 hover:bg-slate-100 rounded flex items-center gap-2"
                                        >
                                            <FaInstagram className="text-pink-600" />
                                            Instagram
                                        </button>

                                    </div>

                                )}

                            </div>

                        </div>

                        <div className="mt-6 rounded-[30px] border border-slate-200 bg-white p-6 md:mt-8 md:p-8 shadow-xl">

                            <h3 className="text-2xl font-bold tracking-tight text-slate-900">
                                Product Specifications
                            </h3>

                            <div className="mt-4 h-1 w-20 rounded-full bg-slate-300" />

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
                                        Capacity
                                    </p>
                                    <p className="mt-2 text-lg font-bold text-slate-900">
                                        {product.capacity || "N/A"}
                                    </p>
                                </div>

                                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                                        Throughput
                                    </p>
                                    <p className="mt-2 text-lg font-bold text-slate-900">
                                        {product.throughput || "N/A"}
                                    </p>
                                </div>

                                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                                        Usage
                                    </p>
                                    <p className="mt-2 text-lg font-bold text-slate-900">
                                        {product.usage || "N/A"}
                                    </p>
                                </div>

                                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                                        Automation
                                    </p>
                                    <p className="mt-2 text-lg font-bold text-slate-900">
                                        {product.automation || "N/A"}
                                    </p>
                                </div>

                                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                                        Availability
                                    </p>
                                    <p className="mt-2 text-lg font-bold text-slate-900">
                                        {product.availability || "N/A"}
                                    </p>
                                </div>

                            </div>

                        </div>
                    </div>

                </div>

                {/* Description + Form */}

                <div className="mt-16">
                    <div className="grid grid-cols-1 lg:grid-cols-[500px_1fr] xl:grid-cols-[600px_1fr] gap-6 md:gap-8">

                        {/* Quote Form */}

                        <div className="h-fit rounded-[32px] border border-slate-200 bg-white p-6 md:p-8 shadow-2xl lg:sticky lg:top-24">

                            {/* Heading */}
                            <h2 className="text-3xl font-bold tracking-tight text-slate-900">
                                Request a Quote
                            </h2>

                            <div className="mt-4 h-1 w-20 rounded-full bg-slate-300" />

                            {/* Product */}
                            <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                                <p className="text-sm font-medium text-slate-500">
                                    Product
                                </p>

                                <p className="mt-2 text-lg font-bold text-slate-900">
                                    {product.title}
                                </p>
                            </div>

                            {/* Form */}
                            <form
                                onSubmit={handleSubmit}
                                className="mt-8 space-y-5"
                            >

                                <input
                                    type="text"
                                    placeholder="Your Name"
                                    value={form.name}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            name: e.target.value,
                                        })
                                    }
                                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-slate-900 placeholder:text-slate-400 outline-none transition-all duration-300 focus:border-slate-700 focus:bg-white focus:ring-4 focus:ring-slate-200"
                                />

                                <input
                                    type="email"
                                    placeholder="Email Address"
                                    value={form.email}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            email: e.target.value,
                                        })
                                    }
                                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-slate-900 placeholder:text-slate-400 outline-none transition-all duration-300 focus:border-slate-700 focus:bg-white focus:ring-4 focus:ring-slate-200"
                                />

                                <input
                                    type="tel"
                                    placeholder="Phone Number"
                                    maxLength={10}
                                    value={form.phone}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            phone: e.target.value.replace(/\D/g, ""),
                                        })
                                    }
                                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-slate-900 placeholder:text-slate-400 outline-none transition-all duration-300 focus:border-slate-700 focus:bg-white focus:ring-4 focus:ring-slate-200"
                                />

                                <button
                                    type="submit"
                                    disabled={submitting}
                                    className="w-full rounded-2xl bg-slate-900 px-6 py-4 font-semibold text-white shadow-lg transition-all duration-300 hover:bg-slate-800 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60"
                                >
                                    {submitting ? "Submitting..." : "Get Quote"}
                                </button>

                            </form>

                        </div>
                        {/* Description */}

                        <div className="bg-white rounded-[24px] md:rounded-[32px] p-5 sm:p-6 md:p-10 shadow-[0_20px_60px_rgba(0,0,0,0.08)]">

                            <h3 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-slate-900">
                                Product Description
                            </h3>

                            <p className="text-slate-600 leading-7 md:leading-9 text-base md:text-lg">
                                {product.desc ||
                                    product.description ||
                                    "No description available."}
                            </p>

                            {/* Specifications Table */}

                            <div className="mt-10 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-xl">

                                <div className="overflow-x-auto">

                                    <table className="w-full">

                                        <tbody>

                                            {[
                                                { label: "Brand", value: product.brand || "N/A" },
                                                { label: "Model", value: product.model || "N/A" },
                                                { label: "Usage", value: product.usage || "N/A" },
                                                { label: "Automation", value: product.automation || "N/A" },
                                                { label: "Capacity", value: product.capacity || "N/A" },
                                                { label: "Throughput", value: product.throughput || "N/A" },
                                            ].map((row, index) => (

                                                <tr
                                                    key={row.label}
                                                    className={`transition-colors duration-300 hover:bg-slate-50 ${index !== 5 ? "border-b border-slate-200" : ""
                                                        }`}
                                                >

                                                    <td className="w-[35%] bg-slate-50 px-6 py-5 text-sm font-semibold uppercase tracking-wider text-slate-600">
                                                        {row.label}
                                                    </td>

                                                    <td className="px-6 py-5 text-base font-medium text-slate-900">
                                                        {row.value}
                                                    </td>

                                                </tr>

                                            ))}

                                        </tbody>

                                    </table>

                                </div>

                            </div>

                            {/* SEO Content */}

                            <div className="mt-14 space-y-8">

                                {[
                                    {
                                        title: `Why Choose Central Biomedicals in ${cityName}?`,
                                        content: `Central Biomedicals is a trusted supplier and distributor of ${product.title} in ${cityName}. We provide high-quality biomedical and laboratory equipment for hospitals, pathology laboratories, diagnostic centres, research institutions, and healthcare facilities with dependable technical support and professional service.`,
                                    },
                                    {
                                        title: `Features of ${product.title}`,
                                        content: `${product.title} delivers reliable performance, accurate test results, easy operation, long service life, and efficient workflow. It is designed to meet the demanding requirements of modern hospitals and diagnostic laboratories.`,
                                    },
                                    {
                                        title: `Applications of ${product.title}`,
                                        content: `${product.title} is widely used in hospitals, pathology laboratories, diagnostic centres, blood banks, research institutes, medical colleges, and healthcare facilities where precision and reliability are essential.`,
                                    },
                                    {
                                        title: `${product.title} Supplier in ${cityName}`,
                                        content: `Central Biomedicals supplies ${product.title} in ${cityName} with professional consultation, installation support, operator guidance, and dependable after-sales service for healthcare organizations.`,
                                    },
                                    {
                                        title: `${product.title} Dealer in ${cityName}`,
                                        content: `As a trusted dealer of ${product.title} in ${cityName}, we provide biomedical equipment, laboratory instruments, diagnostic analyzers, and healthcare devices to hospitals, pathology labs, and research centres.`,
                                    },
                                    {
                                        title: `${product.title} Distributor in ${cityName}`,
                                        content: `Looking for a reliable distributor of ${product.title} in ${cityName}? We offer competitive pricing, fast delivery, installation assistance, preventive maintenance, and technical guidance.`,
                                    },
                                    {
                                        title: `Buy ${product.title} in ${cityName}`,
                                        content: `Purchase high-quality ${product.title} in ${cityName} at competitive prices. Contact Central Biomedicals for the latest quotation, product availability, and expert recommendations.`,
                                    },
                                    {
                                        title: `${product.title} Price in ${cityName}`,
                                        content: `The price of ${product.title} depends on the brand, model, specifications, and optional features. Contact our experts for the latest pricing, availability, and delivery schedule.`,
                                    },
                                ].map((section, index) => (

                                    <div
                                        key={index}
                                        className="group rounded-[30px] border border-slate-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-xl"
                                    >

                                        {/* Heading */}
                                        <h3 className="text-2xl font-bold tracking-tight text-slate-900">
                                            {section.title}
                                        </h3>

                                        {/* Divider */}
                                        <div className="mt-4 mb-6 h-1 w-16 rounded-full bg-slate-300 transition-all duration-300 group-hover:w-24 group-hover:bg-slate-700" />

                                        {/* Content */}
                                        <p className="leading-8 text-slate-600">
                                            {section.content}
                                        </p>

                                    </div>

                                ))}

                            </div>

                            {/* FAQ Section */}

                            <div className="mt-14">

                                {/* Heading */}
                                <div className="text-center">

                                    <span className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-5 py-2 text-sm font-semibold text-slate-700">
                                        Frequently Asked Questions
                                    </span>

                                    <h3 className="mt-6 text-4xl font-bold tracking-tight text-slate-900">
                                        Frequently Asked Questions
                                    </h3>

                                    <div className="mx-auto mt-5 h-1 w-20 rounded-full bg-slate-300" />

                                </div>

                                {/* FAQ Cards */}
                                <div className="mt-12 space-y-6">

                                    {[
                                        {
                                            question: `What is ${product.title} used for in ${cityName}?`,
                                            answer: `${product.title} is widely used in hospitals, pathology laboratories, diagnostic centres, and healthcare facilities for accurate and reliable diagnostic applications.`,
                                        },
                                        {
                                            question: `What is the price of ${product.title} in ${cityName}?`,
                                            answer: `The price depends on the model, brand, and specifications. Contact us to receive the latest quotation and availability.`,
                                        },
                                        {
                                            question: `Are you an authorized supplier of ${product.title}?`,
                                            answer: `Yes. We supply genuine biomedical and laboratory equipment from trusted manufacturers with reliable technical support.`,
                                        },
                                        {
                                            question: `Can hospitals in ${cityName} order this product?`,
                                            answer: `Yes. Hospitals, pathology laboratories, diagnostic centres, research institutes, and healthcare facilities can purchase this product from us.`,
                                        },
                                        {
                                            question: "Do you provide installation support?",
                                            answer: `Yes. Installation assistance, operator guidance, and technical support are available depending on the product and project requirements.`,
                                        },
                                        {
                                            question: "Can I request a quotation?",
                                            answer: `Absolutely. Submit the enquiry form on this page and our team will provide pricing, product details, and expert recommendations.`,
                                        },
                                        {
                                            question: "Do you provide warranty?",
                                            answer: `Warranty coverage depends on the manufacturer and the selected product model. Our team will explain the warranty terms before purchase.`,
                                        },
                                        {
                                            question: "Do you deliver across India?",
                                            answer: `Yes. We supply biomedical equipment across India with secure packaging, reliable logistics, and timely delivery.`,
                                        },
                                        {
                                            question: "How can I contact Central Biomedicals?",
                                            answer: `You can submit the enquiry form, call our support team, or email us for product information, quotations, and technical assistance.`,
                                        },
                                    ].map((faq, index) => (

                                        <div
                                            key={index}
                                            className="group rounded-[28px] border border-slate-200 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-xl"
                                        >

                                            {/* Question */}
                                            <h4 className="text-xl font-bold tracking-tight text-slate-900">
                                                {faq.question}
                                            </h4>

                                            {/* Divider */}
                                            <div className="mt-4 mb-5 h-1 w-14 rounded-full bg-slate-300 transition-all duration-300 group-hover:w-20 group-hover:bg-slate-700" />

                                            {/* Answer */}
                                            <p className="leading-8 text-slate-600">
                                                {faq.answer}
                                            </p>

                                        </div>

                                    ))}

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </div>
        </section>
    );
}