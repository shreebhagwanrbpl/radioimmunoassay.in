"use client";

import { useEffect, useState } from "react";
import {
  Microscope,
  FlaskConical,
  ShieldCheck,
  Stethoscope,
  Wrench,
  Activity,
  CheckCircle2,
  PhoneCall,
  ArrowRight,
  Sparkles,
  HelpCircle,
  ChevronDown,
} from "lucide-react";
import Link from "next/link";
import PageBanner from "@/components/PageBanner";
import SectionTitle from "@/components/SectionTitle";
import ServiceCard from "@/components/ServiceCard";
import CTASection from "@/components/CTASection";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function ServicesPage({ city = "" }) {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  const locationText = city ? `in ${city}` : "Across India";

  const defaultServices = [
    {
      title: "Biomedical & Diagnostic Equipment Sales",
      desc: "Supplier of top-tier CBC Machines, 3-Part & 5-Part Hematology Analyzers, Semi & Fully Automated Biochemistry Analyzers, and ELISA Readers.",
      features: ["Brand Warranty Included", "Pan-India Delivery", "Competitive Pricing"],
      icon: <Microscope size={30} />,
    },
    {
      title: "Radioimmunoassay & Diagnostic Reagent Supply",
      desc: "Reliable batch supply of high-sensitivity RIA kits, biochemistry reagents, hematology diluents, and clinical laboratory consumables.",
      features: ["Certified Reagent Quality", "Temperature Controlled Dispatch", "Bulk Supply Discount"],
      icon: <FlaskConical size={30} />,
    },
    {
      title: "On-Site Installation & Staff Training",
      desc: "Certified service engineers to configure, install, and calibrate diagnostic instruments at your pathology lab or hospital with hands-on staff training.",
      features: ["On-site Calibration", "Operator Certification", "User Manual & Guidelines"],
      icon: <Wrench size={30} />,
    },
    {
      title: "Preventive Maintenance & AMC Services",
      desc: "Comprehensive annual maintenance contracts (AMC) and routine calibration checks ensuring 100% uptime and test accuracy for your machines.",
      features: ["Genuine Spare Parts", "Rapid Engineer Dispatch", "Scheduled Preventive Inspections"],
      icon: <ShieldCheck size={30} />,
    },
    {
      title: "Turnkey Laboratory & Hospital Setup",
      desc: "Complete consultative assistance for setting up new pathology centers, selecting essential biomedical machinery, and lab workflow optimization.",
      features: ["Budget Optimization", "Space & Power Guidance", "Regulatory Compliance Advice"],
      icon: <Stethoscope size={30} />,
    },
    {
      title: "24/7 Technical Support & Remote Troubleshooting",
      desc: "Dedicated technical helpline and online support for quick resolution of instrument error codes, calibration adjustments, and software assistance.",
      features: ["Immediate Remote Assistance", "Qualified Field Engineers", "Pan-District Helpline"],
      icon: <Activity size={30} />,
    },
  ];

  const icons = [
    <Microscope size={30} key={1} />,
    <FlaskConical size={30} key={2} />,
    <Wrench size={30} key={3} />,
    <ShieldCheck size={30} key={4} />,
    <Stethoscope size={30} key={5} />,
    <Activity size={30} key={6} />,
  ];

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const snap = await getDoc(
          doc(db, "websites", "radioimmunoassayin", "pages", "services")
        );

        if (snap.exists() && snap.data().services?.length) {
          setServices(snap.data().services);
        } else {
          setServices(defaultServices);
        }
      } catch (error) {
        console.error("Error fetching services:", error);
        setServices(defaultServices);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  const makeLink = (path) => {
    return city ? `/${city.toLowerCase().replace(/\s+/g, "-")}${path}` : path;
  };

  const serviceFaqs = [
    {
      q: `What biomedical equipment do you install ${locationText}?`,
      a: `We supply, install, and service CBC Machines, 3-Part and 5-Part Hematology Analyzers, Biochemistry Analyzers, ELISA Readers, Urine Analyzers, and clinical reagents for laboratories and hospitals.`,
    },
    {
      q: "Do you provide Annual Maintenance Contracts (AMC)?",
      a: "Yes! We offer flexible Annual Maintenance Contracts (AMC) and Comprehensive Maintenance Contracts (CMC) to ensure your laboratory machinery maintains peak precision with minimum downtime.",
    },
    {
      q: "Are training sessions provided for lab technicians?",
      a: "Absolutely. Our certified service engineers perform full on-site installation, calibration, and provide practical operational training for your laboratory technicians.",
    },
    {
      q: "How quickly can equipment or reagents be delivered?",
      a: "We maintain ready stock of major analyzers and reagents, enabling fast dispatch across all districts within 24-48 hours.",
    },
  ];

  return (
    <>
      {/* Banner */}
      <PageBanner
        title={`Biomedical & Diagnostic Services ${city ? `- ${city}` : ""}`}
        subtitle={`Delivering trusted biomedical services, equipment supply, and technical solutions ${locationText}.`}
      />

      {/* Services Grid */}
      <section className="section-padding bg-gradient-to-b from-white via-slate-50 to-white">
        <div className="container-custom">
          {/* Section Title */}
          <SectionTitle
            badge="What We Offer"
            title={`Premium Biomedical Services ${locationText}`}
            description="Innovative healthcare technologies, laboratory equipment supply, calibration, and maintenance solutions tailored for diagnostic centres and hospitals."
            center
          />

          {/* Services Cards */}
          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {loading
              ? Array.from({ length: 6 }).map((_, index) => (
                  <div
                    key={index}
                    className="rounded-[30px] border border-slate-200 bg-white p-8 shadow-sm animate-pulse"
                  >
                    <div className="mb-7 h-16 w-16 rounded-2xl bg-slate-200"></div>
                    <div className="mb-6 h-7 w-3/4 rounded bg-slate-200"></div>
                    <div className="mb-6 h-1 w-14 rounded-full bg-slate-200"></div>
                    <div className="space-y-3">
                      <div className="h-4 rounded bg-slate-200"></div>
                      <div className="h-4 w-11/12 rounded bg-slate-200"></div>
                      <div className="h-4 w-8/12 rounded bg-slate-200"></div>
                    </div>
                  </div>
                ))
              : (services.length ? services : defaultServices).map((service, index) => (
                  <div
                    key={index}
                    className="group relative rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-slate-300 hover:shadow-2xl flex flex-col justify-between"
                  >
                    <div>
                      {/* Icon */}
                      <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-slate-200 bg-slate-100 text-slate-800 transition-all duration-300 group-hover:scale-110 group-hover:bg-slate-900 group-hover:text-white shadow-sm">
                        {service.icon || icons[index % icons.length]}
                      </div>

                      {/* Title */}
                      <h3 className="mb-3 text-2xl font-bold tracking-tight text-slate-900 leading-snug">
                        {service.title || service.name}
                      </h3>

                      {/* Divider */}
                      <div className="mb-4 h-1 w-14 rounded-full bg-slate-300 transition-all duration-300 group-hover:w-20 group-hover:bg-slate-700" />

                      {/* Description */}
                      <p className="leading-relaxed text-slate-600 text-sm">
                        {service.desc || service.description}
                      </p>

                      {/* Feature Bullet Points */}
                      {service.features && (
                        <ul className="mt-5 space-y-2 border-t border-slate-100 pt-4">
                          {service.features.map((feat, fIdx) => (
                            <li key={fIdx} className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                              <CheckCircle2 size={16} className="text-teal-600 shrink-0" />
                              <span>{feat}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>

                    {/* Quick Inquiry CTA Button */}
                    <div className="mt-8 pt-4 border-t border-slate-100">
                      <Link href={makeLink("/contact")}>
                        <button className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-slate-200 bg-slate-50 group-hover:bg-slate-900 group-hover:text-white text-slate-800 text-sm font-semibold transition-all duration-300 cursor-pointer">
                          <span>Request Quote</span>
                          <ArrowRight size={16} />
                        </button>
                      </Link>
                    </div>
                  </div>
                ))}
          </div>
        </div>
      </section>

      {/* Modern 4-Step Working Process */}
      <section className="section-padding bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white">
        <div className="container-custom">
          {/* Section Title */}
          <SectionTitle
            badge="How We Work"
            title="Streamlined Service Execution"
            description="Our step-by-step approach ensures accurate product selection, flawless installation, and uncompromised technical support."
            center
            dark
          />

          {/* Process Cards */}
          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                step: "01",
                title: "Requirement Assessment",
                desc: "Understanding your laboratory test volume and diagnostic needs to recommend optimum machinery.",
              },
              {
                step: "02",
                title: "Product Supply & Testing",
                desc: "Fast dispatch of genuine biomedical analyzers and reagents with pre-delivery quality verification.",
              },
              {
                step: "03",
                title: "On-Site Setup & Training",
                desc: "Field engineers install, calibrate the instrument, and train your laboratory staff on operation.",
              },
              {
                step: "04",
                title: "Ongoing Service & Support",
                desc: "24/7 technical hotline, rapid engineer site visits, and scheduled preventive maintenance.",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="group relative rounded-[28px] border border-white/10 bg-white/5 p-8 backdrop-blur-md shadow-xl transition-all duration-300 hover:-translate-y-2 hover:bg-white/10"
              >
                <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-teal-500/20 text-teal-400 font-extrabold text-xl border border-teal-500/30">
                  {item.step}
                </div>

                <h3 className="text-xl font-bold tracking-tight text-white mb-3">
                  {item.title}
                </h3>

                <p className="text-slate-300 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services FAQ Accordion */}
      <section className="section-padding bg-slate-50">
        <div className="container-custom max-w-4xl">
          <SectionTitle
            badge="Service FAQ"
            title="Frequently Asked Questions"
            description="Find quick answers regarding our service delivery, installation policies, and technical support."
            center
          />

          <div className="mt-12 space-y-4">
            {serviceFaqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm transition-all"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full px-6 py-5 flex items-center justify-between text-left font-bold text-slate-900 text-lg hover:bg-slate-50 transition-colors cursor-pointer"
                  >
                    <span className="flex items-center gap-3">
                      <HelpCircle size={20} className="text-teal-600 shrink-0" />
                      {faq.q}
                    </span>
                    <ChevronDown
                      size={20}
                      className={`text-slate-500 transition-transform duration-300 shrink-0 ${
                        isOpen ? "rotate-180 text-teal-600" : ""
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-6 text-slate-600 leading-relaxed border-t border-slate-100 pt-4 text-base bg-slate-50/50">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTASection city={city} />
    </>
  );
}