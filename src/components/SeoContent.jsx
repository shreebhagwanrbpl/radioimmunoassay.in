import Link from "next/link";
import { MapPin, Building, ChevronRight, ShieldCheck, Microscope, FlaskConical, Wrench } from "lucide-react";

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
                "name": `Where can I source Radioimmunoassay (RIA) kits and pathology equipment in ${location}?`,
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": `Raj Biosis Private Limited supplies certified Radioimmunoassay (RIA) reagents, thyroid assay kits (T3, T4, TSH), 3-part & 5-part hematology analyzers, biochemistry readers, and ELISA systems across ${location}.`
                }
            },
            {
                "@type": "Question",
                "name": "How are Radioimmunoassay reagents stored during shipping?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "All immunoassay kits and temperature-sensitive reagents are dispatched using cold-chain packaging (2°C to 8°C) to maintain enzymatic and antibody stability upon arrival."
                }
            },
            {
                "@type": "Question",
                "name": "Do you offer on-site machine setup, calibration, and AMC repair contracts?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes. Experienced biomedical engineers from Raj Biosis perform on-site installation, blood counter calibration, staff operational guidance, and routine preventive AMC servicing."
                }
            },
            {
                "@type": "Question",
                "name": "Can Raj Biosis assist with setting up a new pathology diagnostic laboratory?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "We provide end-to-end laboratory setup consultation, including selecting optimal 3-part or 5-part differential analyzers, biochemistry units, power setup advice, and reagent starter packages."
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

                ```
                {/* Heading */}
                <div className="max-w-4xl mx-auto text-center">

                    <span className="inline-flex items-center gap-2 rounded-full border border-teal-200 bg-teal-50 px-5 py-2 text-sm font-bold text-teal-800 shadow-sm">
                        Complete Diagnostic Laboratory Support
                    </span>

                    <h2 className="mt-6 text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900">
                        Reliable RIA, Pathology & Laboratory Equipment Solutions in{" "}
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
                            <FlaskConical className="text-teal-600" size={22} />
                            <span>RIA Kits & Endocrine Diagnostic Reagents</span>
                        </h3>

                        <p className="text-slate-600 leading-relaxed text-base">
                            <strong className="text-slate-900">Raj Biosis Private Limited</strong> supports laboratories in <strong>{location}</strong> with dependable Radioimmunoassay kits, hormone testing reagents, thyroid diagnostic products, and related laboratory consumables. Special attention is given to proper handling and temperature-controlled dispatch for sensitive diagnostic materials.
                        </p>
                    </div>

                    <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm hover:shadow-md transition-all duration-300">
                        <h3 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
                            <Microscope className="text-teal-600" size={22} />
                            <span>Hematology & Clinical Chemistry Systems</span>
                        </h3>

                        <p className="text-slate-600 leading-relaxed text-base">
                            We provide laboratory equipment including 3-part and 5-part hematology analyzers, blood cell counting systems, and clinical chemistry instruments. Our solutions are selected to help diagnostic laboratories achieve efficient testing workflows and dependable day-to-day reporting.
                        </p>
                    </div>

                    <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm hover:shadow-md transition-all duration-300">
                        <h3 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
                            <Wrench className="text-teal-600" size={22} />
                            <span>Equipment Installation, Calibration & AMC</span>
                        </h3>

                        <p className="text-slate-600 leading-relaxed text-base">
                            Our technical support services include equipment installation assistance, performance checks, routine calibration support, and preventive maintenance. Flexible AMC solutions help laboratories keep their diagnostic instruments operating smoothly while reducing unexpected interruptions.
                        </p>
                    </div>

                    <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm hover:shadow-md transition-all duration-300">
                        <h3 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
                            <Building className="text-teal-600" size={22} />
                            <span>Diagnostic Lab Planning & Setup Support</span>
                        </h3>

                        <p className="text-slate-600 leading-relaxed text-base">
                            Raj Biosis assists new and expanding laboratories with practical guidance for selecting suitable diagnostic equipment, organizing testing areas, choosing essential instruments, and preparing teams for routine laboratory operations.
                        </p>
                    </div>

                </div>

                {/* Regional District Directory */}
                <div className="mt-16 rounded-3xl border border-slate-200 bg-slate-900 text-white p-8 lg:p-10 shadow-xl">

                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-6">

                        <div>
                            <span className="text-teal-400 font-bold text-xs uppercase tracking-wider">
                                Service Network
                            </span>

                            <h3 className="text-2xl font-bold text-white mt-1">
                                Diagnostic Equipment Supply Across Nearby Districts
                            </h3>
                        </div>

                        <span className="px-4 py-1.5 rounded-full text-xs font-semibold bg-white/10 text-slate-300 border border-white/10">
                            Temperature-Controlled Product Delivery
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

                                <ChevronRight
                                    size={14}
                                    className="text-slate-500 group-hover:text-teal-400 shrink-0"
                                />
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
                            Information About Our Laboratory Products & Technical Support
                        </h2>

                        <div className="mx-auto mt-4 h-1 w-20 rounded-full bg-teal-500" />

                    </div>

                    <div className="mt-12 grid gap-6 md:grid-cols-2">

                        <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm hover:shadow-md transition-all duration-300">

                            <h3 className="text-xl font-semibold text-slate-900">
                                Which RIA and pathology products are available in {location}?
                            </h3>

                            <p className="mt-3 text-slate-600 leading-relaxed text-sm">
                                Raj Biosis provides access to a range of laboratory diagnostic products, including Radioimmunoassay reagents, hormone and thyroid testing kits, hematology analyzers, biochemistry instruments, and selected ELISA-based testing systems for laboratories in {location}.
                            </p>

                        </div>

                        <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm hover:shadow-md transition-all duration-300">

                            <h3 className="text-xl font-semibold text-slate-900">
                                How do you handle temperature-sensitive diagnostic reagents?
                            </h3>

                            <p className="mt-3 text-slate-600 leading-relaxed text-sm">
                                Products that require controlled temperatures are prepared and dispatched using suitable insulated and cold-chain packaging methods. This helps maintain appropriate storage conditions during transportation until the material reaches the laboratory.
                            </p>

                        </div>

                        <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm hover:shadow-md transition-all duration-300">

                            <h3 className="text-xl font-semibold text-slate-900">
                                Is technical assistance available after purchasing laboratory equipment?
                            </h3>

                            <p className="mt-3 text-slate-600 leading-relaxed text-sm">
                                Yes. Depending on the equipment and service requirement, our team can assist with installation coordination, operational guidance, routine maintenance, calibration-related support, and AMC services for eligible laboratory instruments.
                            </p>

                        </div>

                        <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm hover:shadow-md transition-all duration-300">

                            <h3 className="text-xl font-semibold text-slate-900">
                                Can you help with planning a new pathology or diagnostic laboratory?
                            </h3>

                            <p className="mt-3 text-slate-600 leading-relaxed text-sm">
                                Yes. We can guide laboratories through equipment selection and basic setup planning based on their intended testing requirements. Our support can include recommendations for hematology, biochemistry, electrolyte, immunoassay, and other essential diagnostic systems.
                            </p>

                        </div>

                    </div>

                </div>
                ```

            </div>

        </section>
    );
}
