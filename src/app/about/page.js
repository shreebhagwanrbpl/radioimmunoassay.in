import PageBanner from "@/components/PageBanner";
import SectionTitle from "@/components/SectionTitle";
import CTASection from "@/components/CTASection";
import Link from "next/link";
import {
  ShieldCheck,
  Award,
  Users,
  Target,
  Compass,
  CheckCircle2,
  Microscope,
  Wrench,
  Sparkles,
  Building2,
} from "lucide-react";

export default function AboutPage({ city = "" }) {
  const locationText = city ? `in ${city}` : "Across India";

  const makeLink = (path) => {
    return city ? `/${city.toLowerCase().replace(/\s+/g, "-")}${path}` : path;
  };

  return (
    <>
      {/* Banner */}
      <PageBanner
        title={`About Raj Biosis ${city ? `- ${city}` : ""}`}
        subtitle={`Supplying reliable blood testing machines, RIA reagents, and complete diagnostic setup care ${locationText}.`}
      />

      {/* Main Content Section */}
      <section className="section-padding bg-gradient-to-b from-white via-slate-50 to-white">
        <div className="container-custom space-y-20">

          {/* Top Feature Grid (Replaces old static image with dynamic feature card array) */}
          <div className="grid lg:grid-cols-12 gap-12 items-center">

            {/* Left 6 Cols: Stats & Core Pillars Card Grid */}
            <div className="lg:col-span-6 grid sm:grid-cols-2 gap-6">

              <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group">
                <div className="w-14 h-14 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center mb-5 group-hover:bg-teal-600 group-hover:text-white transition-all">
                  <Award size={28} />
                </div>
                <h3 className="text-3xl font-extrabold text-slate-900">10+ Years</h3>
                <p className="text-slate-600 font-medium mt-1">Proven Experience</p>
                <p className="text-xs text-slate-400 mt-3 leading-relaxed">
                  Over ten years of supplying pathology labs with tested instruments and reliable repair support.
                </p>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-slate-900 text-white p-7 shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group">
                <div className="w-14 h-14 rounded-2xl bg-white/10 text-teal-400 flex items-center justify-center mb-5 group-hover:bg-teal-500 group-hover:text-white transition-all">
                  <Microscope size={28} />
                </div>
                <h3 className="text-3xl font-extrabold text-white">500+</h3>
                <p className="text-slate-300 font-medium mt-1">Machines Delivered</p>
                <p className="text-xs text-slate-400 mt-3 leading-relaxed">
                  Cell counters, biochemistry machines, urine readers, and RIA kits installed in labs.
                </p>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group">
                <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-5 group-hover:bg-blue-600 group-hover:text-white transition-all">
                  <Building2 size={28} />
                </div>
                <h3 className="text-3xl font-extrabold text-slate-900">50+ Districts</h3>
                <p className="text-slate-600 font-medium mt-1">Prompt Delivery</p>
                <p className="text-xs text-slate-400 mt-3 leading-relaxed">
                  Extensive regional network for quick product dispatch and local technician visits.
                </p>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-gradient-to-br from-teal-500 to-blue-600 text-white p-7 shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group">
                <div className="w-14 h-14 rounded-2xl bg-white/20 text-white flex items-center justify-center mb-5 group-hover:bg-white group-hover:text-teal-600 transition-all">
                  <ShieldCheck size={28} />
                </div>
                <h3 className="text-3xl font-extrabold text-white">100%</h3>
                <p className="text-teal-100 font-medium mt-1">Guaranteed Quality</p>
                <p className="text-xs text-teal-100/80 mt-3 leading-relaxed">
                  Thorough machine testing, genuine supplier guarantees, and helpful routine maintenance.
                </p>
              </div>

            </div>

            {/* Right 6 Cols: Main Company Overview */}
            <div className="lg:col-span-6 space-y-6">

              <SectionTitle
                badge="About Raj Biosis"
                title={`Advanced Laboratory & Diagnostic Solutions ${locationText}`}
                description="Raj Biosis Private Limited supports pathology and diagnostic laboratories with specialized testing products, laboratory analyzers, diagnostic reagents, and dependable technical service solutions."
              />

              <p className="text-slate-600 text-lg leading-relaxed">
                <strong className="text-slate-900">Raj Biosis Private Limited</strong> works with pathology laboratories and healthcare facilities to provide reliable diagnostic technologies and laboratory solutions {city ? `throughout ${city}` : "across different regions of India"}. Our focus is on helping laboratories access suitable equipment and essential diagnostic products for their routine testing requirements.
              </p>

              <p className="text-slate-600 text-lg leading-relaxed">
                From hormone and immunoassay testing requirements to hematology, biochemistry, and laboratory support services, we offer practical solutions for modern diagnostic workflows. Our services also include guidance for equipment installation, maintenance support, calibration requirements, and appropriate handling of temperature-sensitive diagnostic products.
              </p>

              {/* Quick Checklist */}

              <div className="grid sm:grid-cols-2 gap-4 pt-4 border-t border-slate-200">

                ```
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="text-teal-600 shrink-0" size={20} />
                  <span className="text-slate-800 font-semibold text-sm">
                    Diagnostic Reagents & Testing Solutions
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <CheckCircle2 className="text-teal-600 shrink-0" size={20} />
                  <span className="text-slate-800 font-semibold text-sm">
                    Hematology & Laboratory Analyzers
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <CheckCircle2 className="text-teal-600 shrink-0" size={20} />
                  <span className="text-slate-800 font-semibold text-sm">
                    Installation, Service & Maintenance Support
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <CheckCircle2 className="text-teal-600 shrink-0" size={20} />
                  <span className="text-slate-800 font-semibold text-sm">
                    Controlled Handling of Sensitive Products
                  </span>
                </div>
                ```

              </div>

            </div>


          </div>

          {/* Mission & Vision Split Section */}
          <div className="grid md:grid-cols-2 gap-8">

            <div className="rounded-[32px] border border-slate-200 bg-gradient-to-br from-slate-900 to-slate-800 text-white p-8 lg:p-10 shadow-xl relative overflow-hidden">
              <div className="w-14 h-14 rounded-2xl bg-teal-500/20 border border-teal-500/30 text-teal-400 flex items-center justify-center mb-6">
                <Target size={30} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Our Core Mission</h3>
              <p className="text-slate-300 leading-relaxed text-base">
                To elevate diagnostic testing standards {city ? `in ${city}` : "throughout India"} by delivering ultra-pure Radioimmunoassay reagents, high-throughput analyzers, and expert technical maintenance that keeps healthcare units operational 24/7.
              </p>
            </div>

            <div className="rounded-[32px] border border-slate-200 bg-gradient-to-br from-teal-600 to-blue-700 text-white p-8 lg:p-10 shadow-xl relative overflow-hidden">
              <div className="w-14 h-14 rounded-2xl bg-white/20 border border-white/30 text-white flex items-center justify-center mb-6">
                <Compass size={30} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Our Strategic Vision</h3>
              <p className="text-teal-50 leading-relaxed text-base">
                To remain India's premier destination for specialized immunoassay reagents and clinical diagnostic instruments, recognized for strict quality assurance, transparent pricing, and regional field engineer availability.
              </p>
            </div>

          </div>

          {/* Core Values Section */}
          <div>
            <SectionTitle
              badge="Our Strengths"
              title="Supporting Laboratories Beyond Equipment Supply"
              description="Practical diagnostic solutions backed by dependable products, technical expertise, and long-term laboratory support."
              center
            />

            <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">


              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center mb-4">
                  <Microscope size={24} />
                </div>

                <h4 className="text-xl font-bold text-slate-900 mb-2">
                  Reliable Testing Performance
                </h4>

                <p className="text-slate-600 text-sm leading-relaxed">
                  We help laboratories choose dependable diagnostic instruments designed to support consistent sample processing and efficient routine testing across hematology and clinical chemistry applications.
                </p>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center mb-4">
                  <Wrench size={24} />
                </div>

                <h4 className="text-xl font-bold text-slate-900 mb-2">
                  Dedicated Technical Assistance
                </h4>

                <p className="text-slate-600 text-sm leading-relaxed">
                  Our technical support extends beyond product delivery, with assistance for installation, equipment operation, routine servicing, maintenance planning, and laboratory workflow requirements.
                </p>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center mb-4">
                  <Sparkles size={24} />
                </div>

                <h4 className="text-xl font-bold text-slate-900 mb-2">
                  Solutions for Modern Laboratories
                </h4>

                <p className="text-slate-600 text-sm leading-relaxed">
                  Our product range covers essential diagnostic requirements, including immunoassay products, hematology systems, clinical chemistry equipment, ELISA solutions, and selected laboratory consumables.
                </p>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="w-12 h-12 rounded-xl bg-slate-100 text-slate-800 flex items-center justify-center mb-4">
                  <Users size={24} />
                </div>

                <h4 className="text-xl font-bold text-slate-900 mb-2">
                  Focused on Laboratory Needs
                </h4>

                <p className="text-slate-600 text-sm leading-relaxed">
                  We work with diagnostic laboratories and healthcare facilities by understanding their testing requirements and helping them identify suitable products and support options for their operations.
                </p>
              </div>


            </div>
          </div>


        </div>
      </section>

      {/* CTA */}
      <CTASection city={city} />
    </>
  );
}
