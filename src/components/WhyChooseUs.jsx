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
      title: "Proven Test Accuracy",
      description:
        "High quality testing instruments checked thoroughly to ensure clear and trustworthy results.",
    },
    {
      icon: <ShieldCheck size={30} />,
      title: "Fair & Honest Pricing",
      description:
        "Direct supply without hidden costs so diagnostic centers get genuine value for money.",
    },
    {
      icon: <HeartPulse size={30} />,
      title: "Fast Local Delivery",
      description:
        "Quick dispatch of machines, RIA kits, and testing chemicals directly to your location.",
    },
    {
      icon: <BadgeCheck size={30} />,
      title: "Direct Technical Help",
      description:
        "Friendly local engineers ready to visit your lab for installation, training, and maintenance.",
    },
  ];

  return (
    <section className="section-padding bg-gradient-to-b from-white via-slate-50 to-white">
      <div className="container-custom">

        {/* Section Title */}
        <SectionTitle
          badge="Why Work With Us"
          title="Simple, Reliable & Honest Service"
          description="We provide easy-to-use testing machines, fresh lab reagents, and fast technician support so your clinic runs without any downtime."
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