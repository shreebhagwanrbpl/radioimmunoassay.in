"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  ShieldCheck,
  Microscope,
  ChevronLeft,
  ChevronRight,
  FlaskConical,
  Award,
  PhoneCall,
  CheckCircle2,
  Zap,
} from "lucide-react";

export default function HeroSection({ city }) {
  const [loading, setLoading] = useState(true);
  const [heroData, setHeroData] = useState({
    title: "",
    description: "",
    button1Text: "",
    button2Text: "",
  });

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    fetch("/api/site-data?page=home", { cache: "no-store" })
      .then((r) => r.json())
      .then((d) => {
        if (d && Object.keys(d).length) setHeroData(d);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  // District Routing
  const districtSlug = city ? city.toLowerCase().replace(/\s+/g, "-") : "";

  const makeLink = (path) => {
    return districtSlug ? `/${districtSlug}${path}` : path;
  };

  const slides = [
    {
      badge: "Reliable Medical Testing Tools",
      badgeIcon: ShieldCheck,
      title: heroData.title || "Quality Diagnostic Machines & Lab Equipment",
      description:
        heroData.description ||
        "We supply easy-to-use blood test machines, biochemistry analyzers, RIA kits, and pathology tools for medical labs and hospitals.",
      visualType: "hematology",
      badgeColor: "bg-teal-50 border-teal-200 text-teal-700",
      btn1: heroData.button1Text || "View Products",
      btn1Link: makeLink("/items"),
      btn2: heroData.button2Text || "Get in Touch",
      btn2Link: makeLink("/contact"),
    },
    {
      badge: "RIA Kits & Testing Supplies",
      badgeIcon: FlaskConical,
      title: "Clean & Accurate Clinical Laboratory Reagents",
      description:
        "Get fresh radioimmunoassay kits, testing liquids, and essential laboratory supplies delivered directly to your diagnostic center with temperature control.",
      visualType: "reagents",
      badgeColor: "bg-blue-50 border-blue-200 text-blue-700",
      btn1: "See All Supplies",
      btn1Link: makeLink("/items"),
      btn2: "Ask for Prices",
      btn2Link: makeLink("/contact"),
    },
    {
      badge: "Full Lab Setup & Repair",
      badgeIcon: Award,
      title: "Simple Lab Setup & Fast Technician Assistance",
      description:
        "From picking the right instruments to on-site machine setup, staff training, and quick repair visits, we handle everything for your clinic.",
      visualType: "turnkey",
      badgeColor: "bg-indigo-50 border-indigo-200 text-indigo-700",
      btn1: "Our Services",
      btn1Link: makeLink("/services"),
      btn2: "Talk to Specialist",
      btn2Link: makeLink("/contact"),
    },
  ];

  // Auto-play Carousel timer
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6500);
    return () => clearInterval(timer);
  }, [isPaused, slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const activeSlide = slides[currentSlide];
  const BadgeIcon = activeSlide.badgeIcon;

  return (
    <section
      className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-blue-50/20 py-8 sm:py-10 lg:py-12"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Soft Decorative Glow Circles */}
      <div className="absolute top-10 left-1/4 w-80 h-80 bg-teal-100/30 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-blue-100/30 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="container-custom">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* Left Content (7 Cols) */}
          <div className="lg:col-span-7 space-y-4 sm:space-y-5">
            {/* Top Slide Progress Bar */}
            <div className="w-40 h-1 bg-slate-200 rounded-full overflow-hidden mb-2">
              <motion.div
                key={currentSlide}
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: isPaused ? 0 : 6.5, ease: "linear" }}
                className="h-full bg-slate-900"
              />
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.35 }}
                className="space-y-4 sm:space-y-4"
              >
                {/* Badge */}
                <div
                  className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full border ${activeSlide.badgeColor} text-xs sm:text-sm font-bold tracking-wide shadow-xs`}
                >
                  <BadgeIcon size={16} />
                  <span>{activeSlide.badge}</span>
                  {city && (
                    <span className="bg-slate-900 text-white px-2 py-0.5 rounded-full text-[10px] uppercase font-extrabold ml-1">
                      {city}
                    </span>
                  )}
                </div>

                {/* Main Heading */}
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-extrabold text-slate-900 leading-[1.18] tracking-tight">
                  {loading ? (
                    <div className="animate-pulse space-y-2">
                      <div className="h-9 bg-slate-200 rounded-lg w-3/4"></div>
                      <div className="h-9 bg-slate-200 rounded-lg w-1/2"></div>
                    </div>
                  ) : (
                    <>
                      {activeSlide.title}
                      {city && (
                        <span className="block mt-1 text-teal-600 font-extrabold">
                          in {city}
                        </span>
                      )}
                    </>
                  )}
                </h1>

                {/* Subtitle */}
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-xl">
                  {activeSlide.description}
                  {city && (
                    <span className="text-slate-800 font-semibold ml-1">
                      Supporting pathology centers and healthcare teams in {city}.
                    </span>
                  )}
                </p>

                {/* Action Buttons */}
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <Link href={activeSlide.btn1Link}>
                    <button className="inline-flex items-center justify-center gap-2 px-6 py-2.5 sm:py-3 rounded-xl bg-slate-900 text-white font-bold text-sm sm:text-base shadow-md hover:bg-slate-800 hover:shadow-lg transition-all duration-300 cursor-pointer">
                      <span>{activeSlide.btn1}</span>
                      <ArrowRight size={16} />
                    </button>
                  </Link>

                  <Link href={activeSlide.btn2Link}>
                    <button className="inline-flex items-center justify-center gap-2 px-6 py-2.5 sm:py-3 rounded-xl border border-slate-300 bg-white text-slate-800 font-bold text-sm sm:text-base shadow-xs hover:bg-slate-50 hover:border-slate-400 transition-all duration-300 cursor-pointer">
                      <PhoneCall size={16} className="text-teal-600" />
                      <span>{activeSlide.btn2}</span>
                    </button>
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Permanent Stats Row */}
            <div className="grid grid-cols-3 gap-3 sm:gap-4 pt-4 mt-4 border-t border-slate-200">
              <div className="border-l-3 border-teal-500 pl-3">
                <div className="text-2xl sm:text-3xl font-black text-slate-900">10+</div>
                <div className="text-[11px] sm:text-xs text-slate-500 font-medium">Years Helping Labs</div>
              </div>
              <div className="border-l-3 border-blue-500 pl-3">
                <div className="text-2xl sm:text-3xl font-black text-slate-900">500+</div>
                <div className="text-[11px] sm:text-xs text-slate-500 font-medium">Machines Installed</div>
              </div>
              <div className="border-l-3 border-indigo-500 pl-3">
                <div className="text-2xl sm:text-3xl font-black text-slate-900">100%</div>
                <div className="text-[11px] sm:text-xs text-slate-500 font-medium">Tested Quality</div>
              </div>
            </div>
          </div>

          {/* Right Column: Animated Medical Graphic Showcase (5 Cols) */}
          <div className="lg:col-span-5 relative flex flex-col items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.04 }}
                transition={{ duration: 0.35 }}
                className="w-full"
              >
                {activeSlide.visualType === "hematology" && (
                  <div className="relative rounded-2xl sm:rounded-3xl border border-slate-200/80 bg-white/95 backdrop-blur-xl p-5 sm:p-6 shadow-xl space-y-4">
                    {/* Header */}
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3.5">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-teal-50 border border-teal-100 flex items-center justify-center text-teal-600 shadow-xs">
                          <Microscope size={22} />
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-900 text-base">
                            Blood Testing Machine
                          </h4>
                          <p className="text-[11px] text-slate-500 font-medium">
                            Automatic 3-Part & 5-Part Cell Counters
                          </p>
                        </div>
                      </div>
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-teal-100 text-teal-800 border border-teal-200">
                        Tested
                      </span>
                    </div>

                    {/* Animated Pulse Wave Visual */}
                    <div className="relative h-28 sm:h-32 rounded-xl bg-slate-900 overflow-hidden p-3.5 flex flex-col justify-between shadow-inner">
                      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-[size:1.25rem_1.25rem]" />

                      <div className="relative z-10 flex items-center justify-between text-[11px] text-teal-400 font-mono">
                        <span>STATUS: READY</span>
                        <span className="flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-ping" />
                          TESTING
                        </span>
                      </div>

                      {/* Laser Scanline */}
                      <div className="relative z-10 my-auto">
                        <svg className="w-full h-12 stroke-teal-400 fill-none stroke-2" viewBox="0 0 400 60">
                          <path d="M0,30 Q30,30 50,10 T90,50 T130,30 T170,10 T210,50 T250,30 T300,20 T350,40 T400,30" />
                        </svg>
                      </div>

                      <div className="relative z-10 flex items-center justify-between text-[10px] text-slate-400 font-mono">
                        <span>HIGH ACCURACY</span>
                        <span>FAST SPEED</span>
                      </div>
                    </div>

                    {/* Data Chips */}
                    <div className="grid grid-cols-2 gap-2.5">
                      <div className="p-2.5 sm:p-3 rounded-xl bg-slate-50 border border-slate-100">
                        <span className="text-[11px] text-slate-500 font-medium block">WBC Count</span>
                        <span className="text-base font-extrabold text-slate-900">7.4 × 10³/µL</span>
                      </div>
                      <div className="p-2.5 sm:p-3 rounded-xl bg-slate-50 border border-slate-100">
                        <span className="text-[11px] text-slate-500 font-medium block">Hemoglobin</span>
                        <span className="text-base font-extrabold text-slate-900">14.6 g/dL</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-slate-600 font-medium pt-0.5">
                      <CheckCircle2 size={15} className="text-teal-600 shrink-0" />
                      <span>Includes On-site Setup, Calibration & Engineer Care</span>
                    </div>
                  </div>
                )}

                {activeSlide.visualType === "reagents" && (
                  <div className="relative rounded-2xl sm:rounded-3xl border border-slate-200/80 bg-white/95 backdrop-blur-xl p-5 sm:p-6 shadow-xl space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3.5">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shadow-xs">
                          <FlaskConical size={22} />
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-900 text-base">
                            Lab Reagents & Kits
                          </h4>
                          <p className="text-[11px] text-slate-500 font-medium">
                            RIA & Chemical Testing Supplies
                          </p>
                        </div>
                      </div>
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-100 text-blue-800 border border-blue-200">
                        Fresh Stock
                      </span>
                    </div>

                    <div className="p-4 rounded-xl bg-gradient-to-br from-blue-50 via-teal-50 to-white border border-blue-100 space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          <Zap size={15} className="text-blue-600" />
                          <span className="text-[11px] font-bold text-slate-800 uppercase tracking-wider">
                            Cold-Chain Shipping
                          </span>
                        </div>
                        <span className="text-[11px] font-bold text-blue-600">Verified</span>
                      </div>

                      <div className="space-y-1.5">
                        <div className="flex justify-between text-xs font-bold text-slate-700">
                          <span>Testing Purity</span>
                          <span>99.9%</span>
                        </div>
                        <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-blue-500 to-teal-500 w-[99.9%]" />
                        </div>
                      </div>

                      <p className="text-[11px] text-slate-600 leading-relaxed">
                        Formulated for high precision and consistent repeatability.
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-2.5">
                      <div className="p-2.5 sm:p-3 rounded-xl bg-slate-50 border border-slate-100">
                        <span className="text-[11px] text-slate-500 font-medium block">Cold Storage</span>
                        <span className="text-sm font-extrabold text-slate-900">2°C to 8°C Safe</span>
                      </div>
                      <div className="p-2.5 sm:p-3 rounded-xl bg-slate-50 border border-slate-100">
                        <span className="text-[11px] text-slate-500 font-medium block">Fast Dispatch</span>
                        <span className="text-sm font-extrabold text-slate-900">24-48 Hours</span>
                      </div>
                    </div>
                  </div>
                )}

                {activeSlide.visualType === "turnkey" && (
                  <div className="relative rounded-2xl sm:rounded-3xl border border-slate-200/80 bg-white/95 backdrop-blur-xl p-5 sm:p-6 shadow-xl space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3.5">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 shadow-xs">
                          <Award size={22} />
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-900 text-base">
                            Full Lab Setup Service
                          </h4>
                          <p className="text-[11px] text-slate-500 font-medium">
                            Machine Setup & Staff Training
                          </p>
                        </div>
                      </div>
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-indigo-100 text-indigo-800 border border-indigo-200">
                        On-Site
                      </span>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-900 text-white space-y-2.5 shadow-md">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono text-teal-400 uppercase tracking-widest">
                          DIRECT_HELPLINE
                        </span>
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      </div>

                      <h5 className="text-sm sm:text-base font-bold text-white">
                        Complete On-Site Training & AMC Support
                      </h5>

                      <p className="text-[11px] text-slate-300 leading-relaxed">
                        Our technicians handle machine installation, test calibration, and staff operation training.
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-2.5">
                      <div className="p-2.5 sm:p-3 rounded-xl bg-slate-50 border border-slate-100">
                        <span className="text-[11px] text-slate-500 font-medium block">Path Labs Built</span>
                        <span className="text-base font-extrabold text-slate-900">150+ Labs</span>
                      </div>
                      <div className="p-2.5 sm:p-3 rounded-xl bg-slate-50 border border-slate-100">
                        <span className="text-[11px] text-slate-500 font-medium block">Repair Response</span>
                        <span className="text-base font-extrabold text-slate-900">Same Day</span>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Slider Dots & Navigation Controls */}
            <div className="flex items-center justify-between w-full px-2 mt-4">
              <div className="flex items-center gap-1.5">
                {slides.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentSlide(idx)}
                    className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                      currentSlide === idx ? "w-6 bg-slate-900" : "w-2 bg-slate-300 hover:bg-slate-400"
                    }`}
                    aria-label={`Slide ${idx + 1}`}
                  />
                ))}
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={prevSlide}
                  className="w-8 h-8 rounded-full border border-slate-200 bg-white hover:bg-slate-100 text-slate-800 flex items-center justify-center transition-all shadow-xs cursor-pointer"
                  aria-label="Previous"
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  onClick={nextSlide}
                  className="w-8 h-8 rounded-full border border-slate-200 bg-white hover:bg-slate-100 text-slate-800 flex items-center justify-center transition-all shadow-xs cursor-pointer"
                  aria-label="Next"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
