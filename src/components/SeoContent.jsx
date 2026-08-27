import Link from "next/link";
import { MapPin, Building, ChevronRight } from "lucide-react";

export default function SeoContent({ city = "" }) {
    const location = city || "India";

    const topDistricts = [
        { name: "Jaipur", slug: "jaipur" },
        { name: "Jodhpur", slug: "jodhpur" },
        { name: "Udaipur", slug: "udaipur" },
        { name: "Kota", slug: "kota" },
        { name: "Ajmer", slug: "ajmer" },
        { name: "Bikaner", slug: "bikaner" },
        { name: "Alwar", slug: "alwar" },
        { name: "Bhilwara", slug: "bhilwara" },
        { name: "Sikar", slug: "sikar" },
        { name: "Bharatpur", slug: "bharatpur" },
        { name: "Pali", slug: "pali" },
        { name: "Sri Ganganagar", slug: "sri-ganganagar" },
        { name: "Jaisalmer", slug: "jaisalmer" },
        { name: "Churu", slug: "churu" },
        { name: "Hanumangarh", slug: "hanumangarh" },
        { name: "Jhunjhunu", slug: "jhunjhunu" },
        { name: "Nagaur", slug: "nagaur" },
        { name: "Tonk", slug: "tonk" },
        { name: "Dausa", slug: "dausa" },
        { name: "Bundi", slug: "bundi" },
        { name: "Baran", slug: "baran" },
        { name: "Jhalawar", slug: "jhalawar" },
        { name: "Sawai Madhopur", slug: "sawai-madhopur" },
        { name: "Chittorgarh", slug: "chittorgarh" },
    ];

    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": `Can you supply laboratory equipment in ${location}?`,
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": `Yes. Raj Biosis supplies CBC machines, hematology systems, biochemistry analyzers, ELISA readers, and testing kits across ${location} and nearby areas.`
                }
            },
            {
                "@type": "Question",
                "name": "What kind of lab machines and supplies do you offer?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "We offer 3-part and 5-part hematology machines, biochemistry units, RIA kits, urine strip readers, and everyday clinical lab consumables."
                }
            },
            {
                "@type": "Question",
                "name": "Do your technicians help with machine setup and staff training?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes. Our local field engineers handle complete machine setup, testing calibration, staff operational training, and ongoing AMC repairs."
                }
            },
            {
                "@type": "Question",
                "name": "Who can order machines and reagents from Raj Biosis?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Pathology laboratories, diagnostic centers, hospital testing units, clinics, and research institutions across India."
                }
            }
        ]
    };

    return (
        <section className="py-20 bg-gradient-to-b from-white via-slate-50 to-white">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(faqSchema),
                }}
            />

            <div className="container-custom">

                {/* Heading */}
                <div className="max-w-4xl mx-auto text-center">

                    <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-2 text-sm font-semibold text-slate-700 shadow-sm">
                        Pathology & Diagnostic Equipment Supplier
                    </span>

                    <h2 className="mt-6 text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900">
                        Laboratory & Diagnostic Machine Supplier in{" "}
                        <span className="text-teal-600">
                            {location}
                        </span>
                    </h2>

                    <div className="mx-auto mt-6 h-1 w-24 rounded-full bg-teal-500" />

                </div>

                {/* Content Cards */}

                <div className="mt-12 grid gap-6 md:grid-cols-2">

                    <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm hover:shadow-md transition-all duration-300">
                        <h3 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
                            <Building className="text-teal-600" size={22} />
                            <span>Reliable Diagnostic Machine Supplies</span>
                        </h3>
                        <p className="text-slate-600 leading-relaxed text-base">
                            <strong className="text-slate-900">Raj Biosis</strong> delivers reliable diagnostic machines and pathology tools across <strong>{location}</strong>. We supply cell counters, biochemistry analyzers, RIA kits, and urine readers to help clinics produce accurate test reports.
                        </p>
                    </div>

                    <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm hover:shadow-md transition-all duration-300">
                        <h3 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
                            <Building className="text-teal-600" size={22} />
                            <span>Accurate Testing & Quality Calibration</span>
                        </h3>
                        <p className="text-slate-600 leading-relaxed text-base">
                            Our main focus is giving healthcare teams easy access to high precision lab machinery. We support hospitals and diagnostic centers with tested instruments that ensure consistent patient results.
                        </p>
                    </div>

                    <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm hover:shadow-md transition-all duration-300">
                        <h3 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
                            <Building className="text-teal-600" size={22} />
                            <span>On-Site Installation & Repair Contracts</span>
                        </h3>
                        <p className="text-slate-600 leading-relaxed text-base">
                            We offer full machine setup, staff operational guidance, routine preventive checkups, and quick engineer visits. Whether setting up a new lab or upgrading old tools, our team guides you at every step.
                        </p>
                    </div>

                    <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm hover:shadow-md transition-all duration-300">
                        <h3 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
                            <Building className="text-teal-600" size={22} />
                            <span>Fast Regional Supply Network</span>
                        </h3>
                        <p className="text-slate-600 leading-relaxed text-base">
                            Raj Biosis ships equipment and temperature-controlled reagents directly to laboratories across districts, helping medical teams keep testing uninterrupted.
                        </p>
                    </div>

                </div>

                {/* Regional District Directory (For Dynamic SEO Crawling & Indexation) */}
                <div className="mt-16 rounded-3xl border border-slate-200 bg-slate-900 text-white p-8 lg:p-10 shadow-xl">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
                        <div>
                            <span className="text-teal-400 font-bold text-xs uppercase tracking-wider">Local Coverage</span>
                            <h3 className="text-2xl font-bold text-white mt-1">Local Lab Equipment Delivery by District</h3>
                        </div>
                        <span className="px-4 py-1.5 rounded-full text-xs font-semibold bg-white/10 text-slate-300 border border-white/10">
                            Direct Shipping
                        </span>
                    </div>

                    <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                        {topDistricts.map((d, i) => (
                            <Link
                                key={i}
                                href={`/${d.slug}`}
                                className="group flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-teal-500/20 hover:border-teal-400/40 transition-all text-xs font-semibold text-slate-300 hover:text-white"
                            >
                                <span className="flex items-center gap-1.5 truncate">
                                    <MapPin size={14} className="text-teal-400 shrink-0" />
                                    <span className="truncate">{d.name}</span>
                                </span>
                                <ChevronRight size={14} className="text-slate-500 group-hover:text-teal-400 shrink-0" />
                            </Link>
                        ))}
                    </div>
                </div>

                {/* FAQ */}

                <div className="mt-20">

                    <div className="text-center max-w-2xl mx-auto">

                        <span className="inline-flex items-center rounded-full border border-slate-200 bg-white px-5 py-2 text-sm font-semibold text-slate-700 shadow-sm">
                            Common Questions
                        </span>

                        <h2 className="mt-6 text-3xl font-bold text-slate-900">
                            Quick Answers to Common Queries
                        </h2>

                        <div className="mx-auto mt-4 h-1 w-20 rounded-full bg-teal-500" />

                    </div>

                    <div className="mt-12 grid gap-6 md:grid-cols-2">

                        <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm hover:shadow-md transition-all duration-300">
                            <h3 className="text-xl font-semibold text-slate-900">
                                Can you supply laboratory equipment in {location}?
                            </h3>

                            <p className="mt-3 text-slate-600 leading-relaxed text-sm">
                                Yes. Raj Biosis supplies CBC machines, hematology systems, biochemistry analyzers, ELISA readers, and testing kits across {location} and nearby areas.
                            </p>
                        </div>

                        <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm hover:shadow-md transition-all duration-300">
                            <h3 className="text-xl font-semibold text-slate-900">
                                What kind of lab machines and supplies do you offer?
                            </h3>

                            <p className="mt-3 text-slate-600 leading-relaxed text-sm">
                                We offer 3-part and 5-part hematology machines, biochemistry units, RIA kits, urine strip readers, and everyday clinical lab consumables.
                            </p>
                        </div>

                        <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm hover:shadow-md transition-all duration-300">
                            <h3 className="text-xl font-semibold text-slate-900">
                                Do your technicians help with machine setup and staff training?
                            </h3>

                            <p className="mt-3 text-slate-600 leading-relaxed text-sm">
                                Yes. Our local field engineers handle complete machine setup, testing calibration, staff operational training, and ongoing AMC repairs.
                            </p>
                        </div>

                        <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm hover:shadow-md transition-all duration-300">
                            <h3 className="text-xl font-semibold text-slate-900">
                                Who can order machines and reagents from Raj Biosis?
                            </h3>

                            <p className="mt-3 text-slate-600 leading-relaxed text-sm">
                                Pathology laboratories, diagnostic centers, hospital testing units, clinics, and research institutions across India.
                            </p>
                        </div>

                    </div>

                </div>

            </div>
        </section>
    );
}