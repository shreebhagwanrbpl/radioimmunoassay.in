export default function SeoContent({ city = "" }) {
    const location = city || "India";

    return (
        <section className="py-24 bg-gradient-to-b from-white via-slate-50 to-white">
            <div className="container-custom">

                {/* Heading */}
                <div className="max-w-4xl mx-auto text-center">

                    <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-2 text-sm font-semibold text-slate-700 shadow-sm">
                        Biomedical Equipment Supplier
                    </span>

                    <h2 className="mt-6 text-4xl lg:text-5xl font-bold tracking-tight text-slate-900">
                        Biomedical Equipment Supplier in{" "}
                        <span className="text-slate-600">
                            {location}
                        </span>
                    </h2>

                    <div className="mx-auto mt-6 h-1 w-24 rounded-full bg-slate-300" />

                </div>

                {/* Content */}

                <div className="mt-12 grid gap-6">

                    <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm hover:shadow-lg transition-all duration-300">

                        <p className="text-lg leading-8 text-slate-600">
                            <strong className="text-slate-900">
                                Raj Biosis
                            </strong>{" "}
                            is a trusted supplier of biomedical and laboratory equipment in{" "}
                            <strong>{location}</strong>. We provide CBC Machines,
                            Hematology Analyzers, Biochemistry Analyzers, Urine
                            Analyzers, ELISA Readers and diagnostic instruments for
                            hospitals, pathology laboratories and healthcare facilities.
                        </p>

                    </div>

                    <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm hover:shadow-lg transition-all duration-300">

                        <p className="text-lg leading-8 text-slate-600">
                            Our mission is to deliver reliable, high-quality laboratory
                            equipment to healthcare professionals across India. We work
                            with hospitals, diagnostic centres, research laboratories,
                            and medical institutions to provide advanced biomedical
                            solutions that improve patient care and diagnostic accuracy.
                        </p>

                    </div>

                    <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm hover:shadow-lg transition-all duration-300">

                        <p className="text-lg leading-8 text-slate-600">
                            We provide installation assistance, product guidance,
                            application training, preventive maintenance, and technical
                            support for a wide range of laboratory instruments. Whether
                            you are establishing a new diagnostic laboratory or upgrading
                            your existing facility, our specialists help you choose the
                            right biomedical equipment for your requirements.
                        </p>

                    </div>

                    <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm hover:shadow-lg transition-all duration-300">

                        <p className="text-lg leading-8 text-slate-600">
                            Raj Biosis supplies biomedical equipment across
                            multiple districts and cities, helping healthcare providers
                            enhance laboratory productivity, testing efficiency and
                            diagnostic excellence through dependable healthcare
                            technologies.
                        </p>

                    </div>

                </div>

                {/* FAQ */}

                <div className="mt-20">

                    <div className="text-center">

                        <span className="inline-flex items-center rounded-full border border-slate-200 bg-white px-5 py-2 text-sm font-semibold text-slate-700 shadow-sm">
                            Frequently Asked Questions
                        </span>

                        <h2 className="mt-6 text-4xl font-bold text-slate-900">
                            Frequently Asked Questions
                        </h2>

                        <div className="mx-auto mt-5 h-1 w-20 rounded-full bg-slate-300" />

                    </div>

                    <div className="mt-12 grid gap-6">

                        <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm hover:shadow-md transition-all duration-300">
                            <h3 className="text-xl font-semibold text-slate-900">
                                Do you supply biomedical equipment across India?
                            </h3>

                            <p className="mt-3 text-slate-600 leading-7">
                                Yes. We supply biomedical and laboratory equipment across
                                multiple districts and cities throughout India, serving
                                hospitals, laboratories, research centres and healthcare
                                institutions.
                            </p>
                        </div>

                        <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm hover:shadow-md transition-all duration-300">
                            <h3 className="text-xl font-semibold text-slate-900">
                                Which laboratory instruments do you provide?
                            </h3>

                            <p className="mt-3 text-slate-600 leading-7">
                                We offer CBC Machines, Hematology Analyzers,
                                Biochemistry Analyzers, ELISA Readers, Urine
                                Analyzers and a comprehensive range of diagnostic
                                laboratory equipment.
                            </p>
                        </div>

                        <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm hover:shadow-md transition-all duration-300">
                            <h3 className="text-xl font-semibold text-slate-900">
                                Do you provide installation and technical support?
                            </h3>

                            <p className="mt-3 text-slate-600 leading-7">
                                Yes. We provide installation assistance, application
                                guidance, operator training and technical support depending
                                on the equipment and project requirements.
                            </p>
                        </div>

                        <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm hover:shadow-md transition-all duration-300">
                            <h3 className="text-xl font-semibold text-slate-900">
                                Who can purchase biomedical equipment?
                            </h3>

                            <p className="mt-3 text-slate-600 leading-7">
                                Our products are suitable for hospitals, pathology
                                laboratories, diagnostic centres, medical colleges,
                                research institutions and healthcare organizations of all
                                sizes.
                            </p>
                        </div>

                    </div>

                </div>

            </div>
        </section>
    );
}