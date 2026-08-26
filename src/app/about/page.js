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
                badge="Who We Are"
                title={`Your Dependable Partner for Pathology & Lab Supplies ${locationText}`}
                description="We help clinics, pathology labs, and medical centers get reliable diagnostic machinery and hassle-free repair support."
              />

              <p className="text-slate-600 text-lg leading-relaxed">
                At <strong className="text-slate-900">Raj Biosis</strong>, we make it easy for diagnostic centers and hospitals {city ? `in ${city}` : "across India"} to access quality lab equipment and fresh testing reagents.
              </p>

              <p className="text-slate-600 text-lg leading-relaxed">
                Our goal is to ensure every pathology clinic gets tested machines, clear advice on lab setup, quick operational training for technicians, and fast visits when a machine needs servicing.
              </p>

              {/* Quick Checklist */}
              <div className="grid sm:grid-cols-2 gap-4 pt-4 border-t border-slate-200">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="text-teal-600 shrink-0" size={20} />
                  <span className="text-slate-800 font-semibold text-sm">Tested Diagnostic Machines</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="text-teal-600 shrink-0" size={20} />
                  <span className="text-slate-800 font-semibold text-sm">On-Site Engineer Setup</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="text-teal-600 shrink-0" size={20} />
                  <span className="text-slate-800 font-semibold text-sm">Clear Staff Training</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="text-teal-600 shrink-0" size={20} />
                  <span className="text-slate-800 font-semibold text-sm">Fast Repair Support</span>
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
              <h3 className="text-2xl font-bold text-white mb-4">Our Core Purpose</h3>
              <p className="text-slate-300 leading-relaxed text-base">
                To make laboratory testing simple and reliable {city ? `in ${city}` : "nationwide"} by delivering easy-to-operate diagnostic machines, RIA supplies, and quick repair help that keeps clinics running every day.
              </p>
            </div>

            <div className="rounded-[32px] border border-slate-200 bg-gradient-to-br from-teal-600 to-blue-700 text-white p-8 lg:p-10 shadow-xl relative overflow-hidden">
              <div className="w-14 h-14 rounded-2xl bg-white/20 border border-white/30 text-white flex items-center justify-center mb-6">
                <Compass size={30} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Our Long-Term Goal</h3>
              <p className="text-teal-50 leading-relaxed text-base">
                To be the most trusted and helpful medical equipment provider in India, known for honest prices, dependable testing supplies, and friendly local service.
              </p>
            </div>

          </div>

          {/* Core Values Section */}
          <div>
            <SectionTitle
              badge="Our Strengths"
              title="Why Labs Depend On Us"
              description="Built on clear testing accuracy, fair pricing, and straightforward technical support."
              center
            />

            <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="w-12 h-12 rounded-xl bg-slate-100 text-slate-800 flex items-center justify-center mb-4">
                  <Microscope size={24} />
                </div>
                <h4 className="text-xl font-bold text-slate-900 mb-2">Consistent Accuracy</h4>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Every blood counter and biochemistry machine is calibrated before delivery so test results stay accurate.
                </p>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="w-12 h-12 rounded-xl bg-slate-100 text-slate-800 flex items-center justify-center mb-4">
                  <Wrench size={24} />
                </div>
                <h4 className="text-xl font-bold text-slate-900 mb-2">Local Technician Help</h4>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Friendly field technicians handle setup, staff guidance, regular checkups, and fast problem solving.
                </p>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="w-12 h-12 rounded-xl bg-slate-100 text-slate-800 flex items-center justify-center mb-4">
                  <Sparkles size={24} />
                </div>
                <h4 className="text-xl font-bold text-slate-900 mb-2">Complete Supply Catalog</h4>
                <p className="text-slate-600 text-sm leading-relaxed">
                  From full automatic analyzers to RIA chemicals, pipettes, and everyday testing strips under one roof.
                </p>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="w-12 h-12 rounded-xl bg-slate-100 text-slate-800 flex items-center justify-center mb-4">
                  <Users size={24} />
                </div>
                <h4 className="text-xl font-bold text-slate-900 mb-2">Trusted Reputation</h4>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Relied upon by pathology laboratories, hospital testing units, and healthcare clinics across the region.
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