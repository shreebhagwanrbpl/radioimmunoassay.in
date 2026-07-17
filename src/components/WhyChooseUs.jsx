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
      title: "Advanced Technology",
      description:
        "Modern biomedical and diagnostic equipment for accurate healthcare solutions.",
    },
    {
      icon: <ShieldCheck size={30} />,
      title: "Trusted Quality",
      description:
        "Reliable and certified diagnostic systems with premium quality standards.",
    },
    {
      icon: <HeartPulse size={30} />,
      title: "Healthcare Focused",
      description:
        "Delivering healthcare-driven biomedical solutions with precision and care.",
    },
    {
      icon: <BadgeCheck size={30} />,
      title: "Expert Support",
      description:
        "Professional consultation and technical support for all medical needs.",
    },
  ];

  return (
    <section className="section-padding bg-gradient-to-b from-white via-slate-50 to-white">
      <div className="container-custom">

        {/* Section Title */}
        <SectionTitle
          badge="Why Choose Us"
          title="Trusted Biomedical Excellence"
          description="We deliver innovative diagnostic technologies, advanced laboratory equipment, and dependable biomedical solutions backed by quality, expertise, and exceptional customer support."
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