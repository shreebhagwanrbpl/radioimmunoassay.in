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
        subtitle={`Delivering trusted diagnostic and biomedical technologies with innovation, quality, and healthcare precision ${locationText}.`}
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
                <p className="text-slate-600 font-medium mt-1">Healthcare Excellence</p>
                <p className="text-xs text-slate-400 mt-3 leading-relaxed">
                  Decade-long legacy of supplying certified biomedical instruments & lab setup solutions.
                </p>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-slate-900 text-white p-7 shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group">
                <div className="w-14 h-14 rounded-2xl bg-white/10 text-teal-400 flex items-center justify-center mb-5 group-hover:bg-teal-500 group-hover:text-white transition-all">
                  <Microscope size={28} />
                </div>
                <h3 className="text-3xl font-extrabold text-white">500+</h3>
                <p className="text-slate-300 font-medium mt-1">Products Delivered</p>
                <p className="text-xs text-slate-400 mt-3 leading-relaxed">
                  CBC Analyzers, Hematology, Biochemistry, and ELISA Readers installed across labs.
                </p>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group">
                <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-5 group-hover:bg-blue-600 group-hover:text-white transition-all">
                  <Building2 size={28} />
                </div>
                <h3 className="text-3xl font-extrabold text-slate-900">50+ Districts</h3>
                <p className="text-slate-600 font-medium mt-1">Regional Coverage</p>
                <p className="text-xs text-slate-400 mt-3 leading-relaxed">
                  Pan-India distribution network ensuring fast delivery and local service engineers.
                </p>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-gradient-to-br from-teal-500 to-blue-600 text-white p-7 shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group">
                <div className="w-14 h-14 rounded-2xl bg-white/20 text-white flex items-center justify-center mb-5 group-hover:bg-white group-hover:text-teal-600 transition-all">
                  <ShieldCheck size={28} />
                </div>
                <h3 className="text-3xl font-extrabold text-white">100%</h3>
                <p className="text-teal-100 font-medium mt-1">Quality Assurance</p>
                <p className="text-xs text-teal-100/80 mt-3 leading-relaxed">
                  Strict quality checks, genuine manufacturer warranties, and ongoing maintenance support.
                </p>
              </div>

            </div>

            {/* Right 6 Cols: Main Company Overview */}
            <div className="lg:col-span-6 space-y-6">
              
              <SectionTitle
                badge="Who We Are"
                title={`Trusted Partner in Biomedical & Diagnostics ${locationText}`}
                description="We provide advanced diagnostic and biomedical solutions focused on healthcare innovation, laboratory precision, and modern medical excellence."
              />

              <p className="text-slate-600 text-lg leading-relaxed">
                At <strong className="text-slate-900">Raj Biosis</strong>, we are committed to delivering premium-quality healthcare and biomedical technologies that enhance diagnostic accuracy, laboratory performance, and overall medical efficiency {city ? `in ${city}` : "across India"}.
              </p>

              <p className="text-slate-600 text-lg leading-relaxed">
                Our mission is to empower healthcare professionals, pathology labs, diagnostic centers, and hospitals with certified equipment, expert consultation, prompt technical support, and genuine reagents tailored for precise clinical outcomes.
              </p>

              {/* Quick Checklist */}
              <div className="grid sm:grid-cols-2 gap-4 pt-4 border-t border-slate-200">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="text-teal-600 shrink-0" size={20} />
                  <span className="text-slate-800 font-semibold text-sm">Certified Lab Machines</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="text-teal-600 shrink-0" size={20} />
                  <span className="text-slate-800 font-semibold text-sm">Expert Field Installation</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="text-teal-600 shrink-0" size={20} />
                  <span className="text-slate-800 font-semibold text-sm">Operator Staff Training</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="text-teal-600 shrink-0" size={20} />
                  <span className="text-slate-800 font-semibold text-sm">Rapid Maintenance Support</span>
                </div>
              </div>

            </div>

          </div>

          {/* Mission & Vision Split Section */}
          <div className="grid md:grid-cols-2 gap-8">
            
            <div className="rounded-[32px] border border-slate-200 bg-gradient-to-br from-slate-900 to-slate-800 text-white p-8 lg:p-10 shadow-xl relative overflow-hidden">
              <div className="w-14 h-14 rounded-2xl bg-teal-500/20 border border-teal-500/30 text-teal-400 flex items-center justify-center mb-6">
                <Target size={30} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Our Mission</h3>
              <p className="text-slate-300 leading-relaxed text-base">
                To revolutionize laboratory diagnostics {city ? `in ${city}` : "nationwide"} by providing high-precision biomedical devices, affordable testing instruments, and seamless technical services that empower healthcare providers to save lives through fast, accurate diagnostics.
              </p>
            </div>

            <div className="rounded-[32px] border border-slate-200 bg-gradient-to-br from-teal-600 to-blue-700 text-white p-8 lg:p-10 shadow-xl relative overflow-hidden">
              <div className="w-14 h-14 rounded-2xl bg-white/20 border border-white/30 text-white flex items-center justify-center mb-6">
                <Compass size={30} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Our Vision</h3>
              <p className="text-teal-50 leading-relaxed text-base">
                To become the most reliable and customer-centric biomedical supplier in India, recognized for bringing innovative laboratory technologies, transparent pricing, uncompromised quality assurance, and dedicated local after-sales service.
              </p>
            </div>

          </div>

          {/* Core Values Section */}
          <div>
            <SectionTitle
              badge="Our Core Pillars"
              title="What Sets Raj Biosis Apart"
              description="Built on principles of clinical accuracy, reliability, and dedicated customer care."
              center
            />

            <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="w-12 h-12 rounded-xl bg-slate-100 text-slate-800 flex items-center justify-center mb-4">
                  <Microscope size={24} />
                </div>
                <h4 className="text-xl font-bold text-slate-900 mb-2">High Precision</h4>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Every Hematology, Biochemistry, and CBC instrument undergoes calibration testing for exact clinical results.
                </p>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="w-12 h-12 rounded-xl bg-slate-100 text-slate-800 flex items-center justify-center mb-4">
                  <Wrench size={24} />
                </div>
                <h4 className="text-xl font-bold text-slate-900 mb-2">On-Site Support</h4>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Experienced engineers handle installation, operator training, preventive checkups, and quick troubleshooting.
                </p>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="w-12 h-12 rounded-xl bg-slate-100 text-slate-800 flex items-center justify-center mb-4">
                  <Sparkles size={24} />
                </div>
                <h4 className="text-xl font-bold text-slate-900 mb-2">Complete Catalog</h4>
                <p className="text-slate-600 text-sm leading-relaxed">
                  From fully automated analyzers to reagents, micro-pipettes, and lab consumables under one roof.
                </p>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="w-12 h-12 rounded-xl bg-slate-100 text-slate-800 flex items-center justify-center mb-4">
                  <Users size={24} />
                </div>
                <h4 className="text-xl font-bold text-slate-900 mb-2">Client Trust</h4>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Trusted by hundreds of pathology laboratories, multi-specialty hospitals, and research institutes.
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