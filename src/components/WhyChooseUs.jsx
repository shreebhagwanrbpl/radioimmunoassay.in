"use client";

import { motion } from "framer-motion";
import {
  ShieldCheck,
  Microscope,
  HeartPulse,
  BadgeCheck,
} from "lucide-react";

import SectionTitle from "./SectionTitle";

export default function WhyChooseUs() {
  const features = [
    {
      icon: <Microscope size={30} />,
      title: "Verified Testing Precision",
      description:
        "Every 3-part & 5-part hematology counter and biochemistry unit is pre-calibrated to deliver strict analytical accuracy for patient reports.",
    },
    {
      icon: <ShieldCheck size={30} />,
      title: "Certified RIA Reagent Purity",
      description:
        "Fresh radioimmunoassay kits and hormone assay reagents tested for lot-to-lot consistency and maximum binding specificity.",
    },
    {
      icon: <HeartPulse size={30} />,
      title: "Cold-Chain Direct Shipping",
      description:
        "Temperature-monitored refrigerated dispatch for immunoassay kits, controls, and calibrators to preserve enzymatic and isotope integrity.",
    },
    {
      icon: <BadgeCheck size={30} />,
      title: "On-Site Engineer Support",
      description:
        "Dedicated biomedical technicians for on-site machine commissioning, staff operational guidance, and rapid AMC maintenance visits.",
    },
  ];

  return (
    <section className="section-padding bg-gradient-to-b from-white via-slate-50 to-white">
      <div className="container-custom">

        {/* Section Title */}
        <SectionTitle
          badge="Why Clinical Labs Trust Raj Biosis"
          title="Uncompromising Analytical Precision & Technical Care"
          description="We empower pathology centers with certified Radioimmunoassay supplies, high-throughput blood analyzers, and responsive field engineer service."
          center
        />

        {/* Feature Cards */}
        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">

          {features.map((item, index) => (

            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: index * 0.12,
              }}
              viewport={{ once: true }}
              className="group rounded-[30px] border border-slate-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-slate-300 hover:shadow-2xl"
            >

              {/* Icon */}
              <div className="mb-7 flex h-16 w-16 items-center justify-center rounded-2xl border border-slate-200 bg-slate-100 text-slate-700 transition-all duration-300 group-hover:bg-slate-900 group-hover:text-white">
                {item.icon}
              </div>

              {/* Title */}
              <h3 className="text-2xl font-bold tracking-tight text-slate-900">
                {item.title}
              </h3>

              {/* Divider */}
              <div className="mt-4 mb-5 h-1 w-14 rounded-full bg-slate-300 transition-all duration-300 group-hover:w-20 group-hover:bg-slate-700" />

              {/* Description */}
              <p className="leading-8 text-slate-600">
                {item.description}
              </p>

            </motion.div>

          ))}

        </div>

      </div>
    </section>
  );
}