"use client";

import { motion } from "framer-motion";
import {
  Users,
  FlaskConical,
  BadgeCheck,
  Building2,
} from "lucide-react";

export default function StatsSection() {
  const stats = [
    {
      icon: <Building2 size={34} />,
      number: "10+",
      label: "Years Experience",
    },
    {
      icon: <FlaskConical size={34} />,
      number: "500+",
      label: "Biomedical Products",
    },
    {
      icon: <Users size={34} />,
      number: "200+",
      label: "Trusted Clients",
    },
    {
      icon: <BadgeCheck size={34} />,
      number: "100%",
      label: "Quality Assurance",
    },
  ];

  return (
    <section className="section-padding bg-gradient-to-b from-slate-50 via-white to-slate-50">
      <div className="container-custom">

        <div className="rounded-[40px] border border-slate-200 bg-white p-10 lg:p-16 shadow-xl">

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">

            {stats.map((item, index) => (

              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.12,
                }}
                viewport={{ once: true }}
                className="group rounded-3xl border border-slate-200 bg-white p-8 text-center transition-all duration-300 hover:-translate-y-2 hover:border-slate-300 hover:shadow-xl"
              >

                {/* Icon */}
                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl border border-slate-200 bg-slate-100 text-slate-700 transition-all duration-300 group-hover:bg-slate-900 group-hover:text-white">
                  {item.icon}
                </div>

                {/* Number */}
                <h3 className="text-4xl lg:text-5xl font-bold tracking-tight text-slate-900">
                  {item.number}
                </h3>

                {/* Divider */}
                <div className="mx-auto mt-4 h-1 w-12 rounded-full bg-slate-300 transition-all duration-300 group-hover:w-20 group-hover:bg-slate-700" />

                {/* Label */}
                <p className="mt-5 text-lg font-medium text-slate-600">
                  {item.label}
                </p>

              </motion.div>

            ))}

          </div>

        </div>

      </div>
    </section>
  );
}