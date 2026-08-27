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
      title: "Diagnostic Machine Supply",
      desc: "Top quality CBC cell counters, 3-part and 5-part hematology analyzers, biochemistry units, and urine strip readers.",
      features: ["Genuine Manufacturer Warranty", "Direct Location Shipping", "Fair Clear Prices"],
      icon: <Microscope size={30} />,
    },
    {
      title: "RIA Kits & Testing Chemical Supply",
      desc: "Fresh, temperature-safe radioimmunoassay kits, biochemistry reagents, diluents, and everyday lab supplies.",
      features: ["Verified Kit Purity", "Temperature Safe Shipping", "Bulk Order Savings"],
      icon: <FlaskConical size={30} />,
    },
    {
      title: "On-Site Installation & Staff Training",
      desc: "Our field technicians set up, calibrate, and test your diagnostic tools at your lab while teaching your staff simple operating steps.",
      features: ["On-Site Calibration", "Staff Operation Guide", "Full Manual Provided"],
      icon: <Wrench size={30} />,
    },
    {
      title: "Regular Maintenance & AMC Repair Contracts",
      desc: "Routine preventive maintenance checkups and AMC repair contracts to ensure 100% machine uptime and clear test reports.",
      features: ["Original Replacement Parts", "Fast Technician Visits", "Scheduled Maintenance Checks"],
      icon: <ShieldCheck size={30} />,
    },
    {
      title: "New Pathology & Clinic Setup",
      desc: "Help choosing appropriate machines, arranging workflow space, and getting your new pathology center ready for daily testing.",
      features: ["Budget Plan Advice", "Space & Power Guidance", "Setup Consultation"],
      icon: <Stethoscope size={30} />,
    },
    {
      title: "Direct Helpline & Quick Repair Assistance",
      desc: "Friendly helpline and rapid remote support to guide your technicians through machine codes, calibration settings, and basic fixes.",
      features: ["Quick Phone Guidance", "Skilled Field Technicians", "Pan-District Helpline"],
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
      q: `What diagnostic machines do you install ${locationText}?`,
      a: `We supply and set up CBC cell counters, 3-part and 5-part hematology units, biochemistry analyzers, RIA kits, ELISA readers, and urine strip analyzers for clinics and hospitals.`,
    },
    {
      q: "Do you offer Annual Maintenance Contracts (AMC) for machines?",
      a: "Yes! We provide flexible AMC and repair plans so your laboratory machines run without unexpected breakdowns.",
    },
    {
      q: "Do you train lab staff to operate the new machines?",
      a: "Yes. Our technicians install the machine on-site, test accuracy, and provide step-by-step practical training for your lab staff.",
    },
    {
      q: "How quickly can equipment and RIA kits be delivered?",
      a: "We maintain ready stock of popular machines and reagents, enabling fast dispatch within 24 to 48 hours.",
    },
  ];

  return (
    <>
      {/* Banner */}
      <PageBanner
        title={`Laboratory & Diagnostic Services ${city ? `- ${city}` : ""}`}
        subtitle={`Supplying reliable lab machinery, testing chemicals, and on-site repair support ${locationText}.`}
      />

      {/* Services Grid */}
      <section className="section-padding bg-gradient-to-b from-white via-slate-50 to-white">
        <div className="container-custom">
          {/* Section Title */}
          <SectionTitle
            badge="What We Do"
            title={`Complete Services for Medical Testing Labs ${locationText}`}
            description="From machine delivery and fresh RIA kits to full installation, technician training, and fast repair visits."
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
                          <span>Ask For Price</span>
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
            badge="Our Process"
            title="Simple 4-Step Working Approach"
            description="We help you select the right machine, deliver it safely, set it up on site, and care for it long term."
            center
            dark
          />

          {/* Process Cards */}
          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                step: "01",
                title: "Understanding Your Needs",
                desc: "We review your daily test counts to recommend the most cost-effective machinery.",
              },
              {
                step: "02",
                title: "Testing & Safe Delivery",
                desc: "Pre-delivery inspection of analyzers and temperature-controlled shipping of reagents.",
              },
              {
                step: "03",
                title: "Setup & Staff Training",
                desc: "Field engineers install instruments, test calibration, and train your staff on daily operation.",
              },
              {
                step: "04",
                title: "Ongoing Support & AMC",
                desc: "Prompt phone help, quick field repair visits, and regular maintenance checks.",
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
            badge="Common Questions"
            title="Clear Answers About Our Services"
            description="Learn how we handle machine delivery, technician visits, staff training, and maintenance contracts."
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