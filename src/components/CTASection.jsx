"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  PhoneCall,
} from "lucide-react";

export default function CTASection({ city }) {

  const pathname = usePathname();

  const staticRoutes = [
    "about",
    "services",
    "products",
    "contact",
    "items",
    "enquiry",
  ];

  const pathParts = pathname
    .split("/")
    .filter(Boolean);

  const urlDistrict =
    pathParts.length > 0 &&
      !staticRoutes.includes(pathParts[0])
      ? pathParts[0]
      : "";

  const districtSlug = city
    ? city.toLowerCase().replace(/\s+/g, "-")
    : urlDistrict;

  const makeLink = (path) => {
    if (!districtSlug) return path;

    if (path === "/") {
      return `/${districtSlug}`;
    }

    return `/${districtSlug}${path}`;
  };

  return (
    <section className="section-padding bg-white">
      <div className="container-custom">

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-[42px] border border-slate-200 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 p-10 lg:p-20 shadow-2xl"
        >
          {/* Decorative Background */}
          <div className="absolute -top-20 -left-20 w-80 h-80 bg-white/5 rounded-full blur-[120px]" />
          <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-slate-300/10 rounded-full blur-[120px]" />

          <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">

            {/* Left Content */}
            <div>

              <span className="inline-flex items-center px-5 py-2 rounded-full bg-white/10 border border-white/20 text-teal-300 text-sm font-bold backdrop-blur-sm mb-6">
                Consultation & Technical Support
              </span>

              <h2 className="text-4xl lg:text-5xl font-extrabold leading-tight text-white tracking-tight">
                Upgrade Your Diagnostic
                <br />
                Laboratory Setup Today
              </h2>

              <p className="mt-6 text-slate-300 text-lg leading-relaxed max-w-xl">
                Connect with Raj Biosis for certified Radioimmunoassay (RIA) kits, high-throughput hematology analyzers, and customized AMC maintenance plans.
              </p>

            </div>

            {/* Right Card */}
            <div className="flex lg:justify-end">

              <div className="w-full max-w-md rounded-[32px] bg-white border border-slate-200 p-8 shadow-2xl">

                <div className="w-16 h-16 rounded-2xl bg-teal-50 border border-teal-100 flex items-center justify-center mb-6">
                  <PhoneCall size={30} className="text-teal-700" />
                </div>

                <h3 className="text-2xl font-bold text-slate-900">
                  Request Quotation
                </h3>

                <p className="mt-3 text-slate-600 leading-relaxed text-sm">
                  Get exact price details, technical specification sheets, and on-site engineer installation schedules for your facility.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 mt-8">

                  <Link
                    href={makeLink("/contact")}
                    className="flex-1"
                  >
                    <button className="w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-900 px-6 py-4 font-bold text-white shadow-lg transition-all duration-300 hover:bg-slate-800 hover:shadow-xl cursor-pointer">
                      Send Inquiry
                      <ArrowRight size={18} />
                    </button>
                  </Link>

                  <a
                    href="tel:+919829000000"
                    className="inline-flex items-center justify-center rounded-2xl border border-slate-300 bg-white px-6 py-4 font-bold text-slate-800 transition-all duration-300 hover:bg-slate-50 hover:border-slate-400 cursor-pointer"
                  >
                    Call Engineer
                  </a>

                </div>

              </div>

            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
}