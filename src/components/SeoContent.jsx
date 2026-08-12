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
                "name": `Do you supply biomedical equipment in ${location}?`,
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": `Yes. Raj Biosis is a premier supplier of CBC Machines, Hematology Analyzers, Biochemistry Analyzers, ELISA Readers and diagnostic equipment in ${location} and across all major districts.`
                }
            },
            {
                "@type": "Question",
                "name": "Which laboratory instruments do you provide?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "We offer 3-Part and 5-Part Hematology Analyzers, Fully & Semi Automated Biochemistry Analyzers, Radioimmunoassay Reagents, Urine Analyzers, and clinical laboratory consumables."
                }
            },
            {
                "@type": "Question",
                "name": "Do you provide installation and technical support?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes. Our expert field engineers perform full on-site installation, machine calibration, operator staff training, and preventive maintenance."
                }
            },
            {
                "@type": "Question",
                "name": "Who can purchase biomedical equipment from Raj Biosis?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Hospitals, pathology labs, diagnostic centers, medical colleges, research institutes, and healthcare clinics of all scales."
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
                        Biomedical & Laboratory Equipment Hub
                    </span>

                    <h2 className="mt-6 text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900">
                        Biomedical Equipment Supplier in{" "}
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
                            <span>Pathology & Hospital Equipment Supplier</span>
                        </h3>
                        <p className="text-slate-600 leading-relaxed text-base">
                            <strong className="text-slate-900">Raj Biosis</strong> is a trusted supplier of biomedical and laboratory equipment in <strong>{location}</strong>. We provide CBC Machines, Hematology Analyzers, Biochemistry Analyzers, Urine Analyzers, ELISA Readers and diagnostic instruments for hospitals, pathology laboratories and healthcare facilities.
                        </p>
                    </div>

                    <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm hover:shadow-md transition-all duration-300">
                        <h3 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
                            <Building className="text-teal-600" size={22} />
                            <span>Precision & Clinical Calibration</span>
                        </h3>
                        <p className="text-slate-600 leading-relaxed text-base">
                            Our mission is to deliver reliable, high-quality laboratory equipment to healthcare professionals across India. We work with hospitals, diagnostic centres, research laboratories, and medical institutions to provide advanced biomedical solutions that improve patient care and diagnostic accuracy.
                        </p>
                    </div>

                    <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm hover:shadow-md transition-all duration-300">
                        <h3 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
                            <Building className="text-teal-600" size={22} />
                            <span>Installation & Technical AMC Support</span>
                        </h3>
                        <p className="text-slate-600 leading-relaxed text-base">
                            We provide installation assistance, product guidance, application training, preventive maintenance, and technical support for a wide range of laboratory instruments. Whether you are establishing a new diagnostic laboratory or upgrading your existing facility, our specialists help you choose the right biomedical equipment for your requirements.
                        </p>
                    </div>

                    <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm hover:shadow-md transition-all duration-300">
                        <h3 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
                            <Building className="text-teal-600" size={22} />
                            <span>District-wide Delivery Network</span>
                        </h3>
                        <p className="text-slate-600 leading-relaxed text-base">
                            Raj Biosis supplies biomedical equipment across multiple districts and cities, helping healthcare providers enhance laboratory productivity, testing efficiency and diagnostic excellence through dependable healthcare technologies.
                        </p>
                    </div>

                </div>

                {/* Regional District Directory (For Dynamic SEO Crawling & Indexation) */}
                <div className="mt-16 rounded-3xl border border-slate-200 bg-slate-900 text-white p-8 lg:p-10 shadow-xl">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
                        <div>
                            <span className="text-teal-400 font-bold text-xs uppercase tracking-wider">Local Coverage</span>
                            <h3 className="text-2xl font-bold text-white mt-1">Biomedical Equipment Supply by District</h3>
                        </div>
                        <span className="px-4 py-1.5 rounded-full text-xs font-semibold bg-white/10 text-slate-300 border border-white/10">
                            Fast Local Dispatch
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
                            Frequently Asked Questions
                        </span>

                        <h2 className="mt-6 text-3xl font-bold text-slate-900">
                            Got Questions? We Have Answers.
                        </h2>

                        <div className="mx-auto mt-4 h-1 w-20 rounded-full bg-teal-500" />

                    </div>

                    <div className="mt-12 grid gap-6 md:grid-cols-2">

                        <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm hover:shadow-md transition-all duration-300">
                            <h3 className="text-xl font-semibold text-slate-900">
                                Do you supply biomedical equipment across India & in {location}?
                            </h3>

                            <p className="mt-3 text-slate-600 leading-relaxed text-sm">
                                Yes. We supply biomedical and laboratory equipment across multiple districts and cities throughout India, serving hospitals, laboratories, research centres and healthcare institutions.
                            </p>
                        </div>

                        <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm hover:shadow-md transition-all duration-300">
                            <h3 className="text-xl font-semibold text-slate-900">
                                Which laboratory instruments do you provide?
                            </h3>

                            <p className="mt-3 text-slate-600 leading-relaxed text-sm">
                                We offer CBC Machines, Hematology Analyzers, Biochemistry Analyzers, ELISA Readers, Urine Analyzers and a comprehensive range of diagnostic laboratory equipment.
                            </p>
                        </div>

                        <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm hover:shadow-md transition-all duration-300">
                            <h3 className="text-xl font-semibold text-slate-900">
                                Do you provide installation and technical support?
                            </h3>

                            <p className="mt-3 text-slate-600 leading-relaxed text-sm">
                                Yes. We provide installation assistance, application guidance, operator training and technical support depending on the equipment and project requirements.
                            </p>
                        </div>

                        <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm hover:shadow-md transition-all duration-300">
                            <h3 className="text-xl font-semibold text-slate-900">
                                Who can purchase biomedical equipment?
                            </h3>

                            <p className="mt-3 text-slate-600 leading-relaxed text-sm">
                                Our products are suitable for hospitals, pathology laboratories, diagnostic centres, medical colleges, research institutions and healthcare organizations of all sizes.
                            </p>
                        </div>

                    </div>

                </div>

            </div>
        </section>
    );
}