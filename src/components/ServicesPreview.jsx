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
      icon: <Microscope size={30} />,
      title: "Analyzer Supply",
      description:
        "Blood cell counters, biochemistry units, and urine testing machines delivered ready to test.",
    },
    {
      icon: <FlaskConical size={30} />,
      title: "RIA & Lab Supplies",
      description:
        "Radioimmunoassay kits, diluents, and clinical chemicals delivered in temperature-safe packaging.",
    },
    {
      icon: <ShieldCheck size={30} />,
      title: "Machine Repairs & AMC",
      description:
        "Regular calibration checkups and fast repair support to keep lab devices running smoothly.",
    },
    {
      icon: <Stethoscope size={30} />,
      title: "New Lab Guidance",
      description:
        "Practical help choosing machines, space planning, and training your lab staff.",
    },
  ];

  return (
    <section className="section-padding bg-gradient-to-b from-white via-slate-50 to-white">
      <div className="container-custom">

        {/* Section Title */}
        <SectionTitle
          badge="Key Solutions"
          title="Complete Services For Diagnostic Labs"
          description="From machinery supply and testing chemicals to machine installation, staff guidance, and routine repairs."
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