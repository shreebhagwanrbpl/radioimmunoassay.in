"use client";

import { motion } from "framer-motion";

export default function PageBanner({
  title,
  subtitle,
}) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-white via-slate-50 to-slate-100 py-28 lg:py-36">

      {/* Decorative Background */}
      <div className="absolute -top-20 -left-20 w-80 h-80 rounded-full bg-slate-200/40 blur-[120px]" />
      <div className="absolute -bottom-20 -right-20 w-96 h-96 rounded-full bg-slate-300/20 blur-[140px]" />

      {/* Grid Pattern */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "radial-gradient(circle, #475569 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="container-custom relative z-10">

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-4xl text-center"
        >

          {/* Badge */}
          <div className="mb-8 inline-flex items-center rounded-full border border-slate-200 bg-white px-5 py-2 text-sm font-semibold text-slate-700 shadow-sm">
            Premium Biomedical Solutions
          </div>

          {/* Title */}
          <h1 className="text-5xl lg:text-7xl font-bold leading-tight tracking-tight text-slate-900">
            {title}
          </h1>

          {/* Divider */}
          <div className="mx-auto mt-8 h-1 w-24 rounded-full bg-slate-300" />

          {/* Subtitle */}
          <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-slate-600">
            {subtitle}
          </p>

        </motion.div>

      </div>

    </section>
  );
}