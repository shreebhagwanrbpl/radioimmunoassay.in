"use client";

import { motion } from "framer-motion";
import SectionTitle from "./SectionTitle";

export default function Testimonials() {
  const reviews = [
    {
      name: "Dr. R. K. Shekhawat",
      role: "Director, Apex Pathology Laboratories",
      review:
        "The 5-part hematology analyzer installed by Raj Biosis has performed flawlessly for over two years. Their biomedical engineer calibrated optical sensitivity on day one.",
    },
    {
      name: "Virendra Rathore",
      role: "Chief Biochemist, City Clinical Diagnostics",
      review:
        "We source our Radioimmunoassay (RIA) thyroid kits and hormone assay controls exclusively from Raj Biosis. Temperature-monitored shipping preserves assay precision every single batch.",
    },
    {
      name: "Dr. Meenakshi Sundaram",
      role: "Consultant Pathologist, Care Diagnostics",
      review:
        "Raj Biosis handled our complete laboratory expansion from analyzer selection to staff operational training. Excellent preventive AMC service with zero testing downtime.",
    },
  ];

  return (
    <section className="section-padding bg-gradient-to-b from-white via-slate-50 to-white">
      <div className="container-custom">

        {/* Section Title */}
        <SectionTitle
          badge="Verified Client Endorsements"
          title="Trusted By Pathologists & Clinical Directors"
          description="Direct operational experiences from pathology laboratories, hospital diagnostic centers, and reference testing units across India."
          center
        />

        {/* Testimonials */}
        <div className="mt-16 grid gap-8 lg:grid-cols-3">

          {reviews.map((item, index) => (

            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: index * 0.12,
              }}
              viewport={{ once: true }}
              className="group rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-slate-300 hover:shadow-2xl"
            >

              {/* Quote Icon */}
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-slate-200 bg-slate-100 text-3xl font-bold text-slate-700 transition-all duration-300 group-hover:bg-slate-900 group-hover:text-white">
                “
              </div>

              {/* Stars */}
              <div className="mb-5 text-lg tracking-wide text-amber-500">
                ★★★★★
              </div>

              {/* Review */}
              <p className="leading-8 italic text-slate-600">
                "{item.review}"
              </p>

              {/* Divider */}
              <div className="mt-8 h-px bg-slate-200" />

              {/* User */}
              <div className="mt-6">

                <h4 className="text-xl font-bold text-slate-900">
                  {item.name}
                </h4>

                <p className="mt-1 text-slate-500">
                  {item.role}
                </p>

              </div>

            </motion.div>

          ))}

        </div>

      </div>
    </section>
  );
}