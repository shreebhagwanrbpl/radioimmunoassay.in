import Image from "next/image";

import PageBanner from "@/components/PageBanner";
import SectionTitle from "@/components/SectionTitle";
import DDS from "@/components/img/Dds.png";

export default function AboutPage() {
  return (
    <>
      {/* Banner */}
      <PageBanner
        title="About Central Biomedicals"
        subtitle="Delivering trusted diagnostic and biomedical technologies with innovation, quality, and healthcare precision."
      />

      {/* About Section */}
      <section className="section-padding bg-gradient-to-b from-white via-slate-50 to-white">
        <div className="container-custom grid items-center gap-16 lg:grid-cols-2">

          {/* Left Image */}
          <div className="relative">

            <div className="overflow-hidden rounded-[40px] border border-slate-200 bg-white p-8 shadow-2xl">

              <div className="flex h-[600px] items-center justify-center rounded-[30px] bg-slate-100">

                <Image
                  src={DDS}
                  alt="About Central Biomedicals"
                  width={1200}
                  height={900}
                  className="max-h-full max-w-full object-contain transition-transform duration-500 hover:scale-105"
                />

              </div>

            </div>

            {/* Experience Card */}
            <div className="absolute bottom-8 left-8 hidden lg:block">

              <div className="rounded-3xl border border-slate-200 bg-white px-8 py-6 shadow-2xl">

                <h3 className="text-4xl font-bold text-slate-900">
                  10+
                </h3>

                <div className="mt-3 h-1 w-14 rounded-full bg-slate-300" />

                <p className="mt-3 text-slate-500">
                  Years of Excellence
                </p>

              </div>

            </div>

            {/* Decorative Glow */}
            <div className="absolute -top-10 -right-10 h-36 w-36 rounded-full bg-slate-200/40 blur-3xl -z-10" />
            <div className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-slate-100/70 blur-3xl -z-10" />

          </div>

          {/* Right Content */}
          <div>

            <SectionTitle
              badge="Who We Are"
              title="Trusted Partner in Biomedical & Diagnostics"
              description="We provide advanced diagnostic and biomedical solutions focused on healthcare innovation, laboratory precision, and modern medical excellence."
            />

            <p className="mt-8 text-lg leading-8 text-slate-600">
              At <strong className="text-slate-900">Central Biomedicals</strong>,
              we are committed to delivering premium-quality healthcare and
              biomedical technologies that enhance diagnostic accuracy,
              laboratory performance, and overall medical efficiency.
            </p>

            <p className="mt-6 text-lg leading-8 text-slate-600">
              Our mission is to empower healthcare professionals with trusted
              equipment, expert consultation, reliable technical support, and
              innovative biomedical solutions tailored to hospitals,
              laboratories, diagnostic centres, and research institutions.
            </p>

            {/* Feature Cards */}
            <div className="mt-10 grid gap-6 sm:grid-cols-2">

              <div className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">

                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-slate-200 bg-slate-100 text-slate-700 transition-all duration-300 group-hover:bg-slate-900 group-hover:text-white">
                  ✓
                </div>

                <h4 className="text-xl font-bold text-slate-900">
                  Premium Equipment
                </h4>

                <p className="mt-3 leading-7 text-slate-600">
                  High-performance diagnostic and laboratory technologies
                  from trusted manufacturers.
                </p>

              </div>

              <div className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">

                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-slate-200 bg-slate-100 text-slate-700 transition-all duration-300 group-hover:bg-slate-900 group-hover:text-white">
                  ✓
                </div>

                <h4 className="text-xl font-bold text-slate-900">
                  Expert Support
                </h4>

                <p className="mt-3 leading-7 text-slate-600">
                  Professional consultation, installation assistance,
                  training, and dependable after-sales service.
                </p>

              </div>

            </div>

          </div>

        </div>
      </section>
    </>
  );
}