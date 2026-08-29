"use client";

import { motion } from "framer-motion";
import {
  Microscope,
  FlaskConical,
  ShieldCheck,
  Stethoscope,
} from "lucide-react";

import SectionTitle from "./SectionTitle";
import ServiceCard from "./ServiceCard";

export default function ServicesPreview() {
  const services = [
    {
      icon: <FlaskConical size={30} />,
      title: "Radioimmunoassay Kits",
      description:
        "Certified RIA reagents, thyroid panels (T3/T4/TSH), cortisol assays, and immunoassay calibrators delivered in thermal cold-chain packaging.",
    },
    {
      icon: <Microscope size={30} />,
      title: "3-Part & 5-Part Cell Counters",
      description:
        "High-throughput differential hematology analyzers and blood cell counters calibrated for accurate CBC clinical diagnostics.",
    },
    {
      icon: <ShieldCheck size={30} />,
      title: "Biomedical Engineer AMC Care",
      description:
        "Routine parameter calibration, optical checkups, and fast emergency repair dispatches by experienced field technicians.",
    },
    {
      icon: <Stethoscope size={30} />,
      title: "Turnkey Pathology Setup",
      description:
        "Facility layout guidance, analyzer selection, power backup advisory, and hands-on operational training for laboratory staff.",
    },
  ];

  return (
    <section className="section-padding bg-gradient-to-b from-white via-slate-50 to-white">
      <div className="container-custom">

        {/* Section Title */}
        <SectionTitle
          badge="Core Diagnostic Offerings"
          title="Specialized Solutions For Pathology Laboratories"
          description="From certified Radioimmunoassay reagents and blood cell counters to on-site engineer calibration and turnkey lab setup."
          center
        />

        {/* Services Grid */}
        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">

          {services.map((service, index) => (

            <motion.div
              key={index}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: index * 0.12,
              }}
              viewport={{ once: true }}
              className="h-full"
            >

              <ServiceCard
                icon={service.icon}
                title={service.title}
                description={service.description}
              />

            </motion.div>

          ))}

        </div>

      </div>
    </section>
  );
}