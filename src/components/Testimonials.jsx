"use client";

import { motion } from "framer-motion";
import SectionTitle from "./SectionTitle";

export default function Testimonials() {
  const reviews = [
    {
      name: "Dr. Rajesh Kumar",
      role: "Pathology Lab Owner",
      review:
        "The cell counter we bought from Raj Biosis works smoothly every day. Their technician came on the same day for machine setup.",
    },
    {
      name: "Amit Sharma",
      role: "Diagnostic Center Manager",
      review:
        "We regularly order RIA kits and biochemistry reagents here. The delivery is always fast and temperature controlled.",
    },
    {
      name: "Neha Verma",
      role: "Senior Lab Technician",
      review:
        "Clear guidance and easy operational training for our team. Great after-sales repair support whenever needed.",
    },
  ];

  return (
    <section className="section-padding bg-gradient-to-b from-white via-slate-50 to-white">
      <div className="container-custom">

        {/* Section Title */}
        <SectionTitle
          badge="Client Feedback"
          title="What Lab Directors & Doctors Say"
          description="Real feedback from pathology clinics, hospitals, and diagnostic testing centers using our equipment."
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