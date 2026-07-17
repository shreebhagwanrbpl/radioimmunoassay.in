export default function TrustedBrands() {
  const brands = [
    "HealthCare+",
    "BioMed Labs",
    "MediCore",
    "Life Diagnostics",
    "Care Plus",
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-slate-50 via-white to-slate-50 border-y border-slate-200">
      <div className="container-custom">

        {/* Heading */}
        <div className="text-center">

          <span className="inline-flex items-center rounded-full border border-slate-200 bg-white px-5 py-2 text-sm font-semibold text-slate-700 shadow-sm">
            Trusted Partners
          </span>

          <h2 className="mt-6 text-3xl lg:text-4xl font-bold tracking-tight text-slate-900">
            Trusted by Healthcare & Biomedical Organizations
          </h2>

          <div className="mx-auto mt-5 h-1 w-20 rounded-full bg-slate-300" />

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600">
            Delivering reliable biomedical solutions and laboratory technologies
            trusted by hospitals, diagnostic centres, healthcare institutions,
            and research laboratories across India.
          </p>

        </div>

        {/* Brands */}
        <div className="mt-14 grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-5">

          {brands.map((brand, index) => (

            <div
              key={index}
              className="group flex h-28 items-center justify-center rounded-3xl border border-slate-200 bg-white p-6 text-center shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-slate-300 hover:shadow-xl"
            >
              <span className="text-lg font-semibold tracking-wide text-slate-700 transition-colors duration-300 group-hover:text-slate-900">
                {brand}
              </span>
            </div>

          ))}

        </div>

      </div>
    </section>
  );
}