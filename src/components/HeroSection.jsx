"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import {
  ArrowRight,
  ShieldCheck,
  Microscope,
  BadgeCheck,
  ChevronLeft,
  ChevronRight,
  Activity,
  FlaskConical,
  Award,
  Sparkles,
  PhoneCall,
  CheckCircle2,
  Zap,
  TrendingUp,
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
    const fetchHeroData = async () => {
      try {
        const snap = await getDoc(
          doc(db, "websites", "radioimmunoassayin", "pages", "home")
        );

        if (snap.exists()) {
          setHeroData(snap.data());
        }
      } catch (error) {
        console.error("Error fetching hero data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHeroData();
  }, []);

  // District Routing
  const districtSlug = city ? city.toLowerCase().replace(/\s+/g, "-") : "";

  const makeLink = (path) => {
    return districtSlug ? `/${districtSlug}${path}` : path;
  };

  const slides = [
    {
      badge: "Trusted Biomedical Systems",
      badgeIcon: ShieldCheck,
      title: heroData.title || "Advanced Diagnostic & Biomedical Equipment",
      description:
        heroData.description ||
        "Empowering diagnostic centers, pathology labs, and hospitals with state-of-the-art CBC Machines, Hematology, Biochemistry Analyzers, and ELISA Readers.",
      visualType: "hematology",
      badgeColor: "bg-teal-50 border-teal-200 text-teal-700",
      btn1: heroData.button1Text || "Explore Catalogue",
      btn1Link: makeLink("/items"),
      btn2: heroData.button2Text || "Contact Us",
      btn2Link: makeLink("/contact"),
    },
    {
      badge: "Radioimmunoassay & Reagents",
      badgeIcon: FlaskConical,
      title: "High-Precision Clinical Diagnostic Reagents",
      description:
        "Comprehensive inventory of radioimmunoassay kits, clinical reagents, lab consumables, and immunoassay instruments designed for exact clinical results.",
      visualType: "reagents",
      badgeColor: "bg-blue-50 border-blue-200 text-blue-700",
      btn1: "Browse Products",
      btn1Link: makeLink("/items"),
      btn2: "Request Quotation",
      btn2Link: makeLink("/contact"),
    },
    {
      badge: "Turnkey Hospital Solutions",
      badgeIcon: Award,
      title: "Complete Pathology & Laboratory Setup",
      description:
        "End-to-end guidance, equipment selection, professional installation, staff operator training, and 24/7 technical support for diagnostic centers.",
      visualType: "turnkey",
      badgeColor: "bg-indigo-50 border-indigo-200 text-indigo-700",
      btn1: "Explore Services",
      btn1Link: makeLink("/services"),
      btn2: "Book Consultation",
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
      className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-blue-50/30 py-12 lg:py-20"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Soft Decorative Glow Circles */}
      <div className="absolute top-10 left-1/4 w-96 h-96 bg-teal-100/40 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-100/40 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="container-custom">
        <div className="grid lg:grid-cols-12 gap-12 items-center min-h-[580px]">
          {/* Left Content (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Top Slide Progress Bar */}
            <div className="w-full max-w-xs h-1.5 bg-slate-200 rounded-full overflow-hidden mb-6">
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
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 30 }}
                transition={{ duration: 0.4 }}
                className="space-y-6"
              >
                {/* Badge */}
                <div
                  className={`inline-flex items-center gap-2.5 px-4 py-2 rounded-full border ${activeSlide.badgeColor} text-sm font-bold tracking-wide shadow-sm`}
                >
                  <BadgeIcon size={18} />
                  <span>{activeSlide.badge}</span>
                  {city && (
                    <span className="bg-slate-900 text-white px-2.5 py-0.5 rounded-full text-xs uppercase font-extrabold ml-1">
                      {city}
                    </span>
                  )}
                </div>

                {/* Main Heading */}
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-[1.15] tracking-tight">
                  {loading ? (
                    <div className="animate-pulse space-y-3">
                      <div className="h-12 bg-slate-200 rounded-xl w-3/4"></div>
                      <div className="h-12 bg-slate-200 rounded-xl w-1/2"></div>
                    </div>
                  ) : (
                    <>
                      {activeSlide.title}
                      {city && (
                        <span className="block mt-2 text-teal-600 font-extrabold">
                          in {city}
                        </span>
                      )}
                    </>
                  )}
                </h1>

                {/* Subtitle */}
                <p className="text-slate-600 text-lg leading-relaxed max-w-xl">
                  {activeSlide.description}
                  {city && (
                    <span className="text-slate-800 font-semibold ml-1">
                      Serving hospitals & diagnostic laboratories across {city}.
                    </span>
                  )}
                </p>

                {/* Action Buttons */}
                <div className="flex flex-wrap items-center gap-4 pt-4">
                  <Link href={activeSlide.btn1Link}>
                    <button className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-slate-900 text-white font-bold text-base shadow-lg hover:bg-slate-800 hover:shadow-xl transition-all duration-300 cursor-pointer">
                      <span>{activeSlide.btn1}</span>
                      <ArrowRight size={18} />
                    </button>
                  </Link>

                  <Link href={activeSlide.btn2Link}>
                    <button className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl border border-slate-300 bg-white text-slate-800 font-bold text-base shadow-sm hover:bg-slate-50 hover:border-slate-400 transition-all duration-300 cursor-pointer">
                      <PhoneCall size={18} className="text-teal-600" />
                      <span>{activeSlide.btn2}</span>
                    </button>
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Permanent Stats Row */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-slate-200">
              <div className="border-l-4 border-teal-500 pl-4">
                <div className="text-3xl font-extrabold text-slate-900">10+</div>
                <div className="text-xs sm:text-sm text-slate-500 font-semibold mt-0.5">Years Experience</div>
              </div>
              <div className="border-l-4 border-blue-500 pl-4">
                <div className="text-3xl font-extrabold text-slate-900">500+</div>
                <div className="text-xs sm:text-sm text-slate-500 font-semibold mt-0.5">Products Delivered</div>
              </div>
              <div className="border-l-4 border-indigo-500 pl-4">
                <div className="text-3xl font-extrabold text-slate-900">100%</div>
                <div className="text-xs sm:text-sm text-slate-500 font-semibold mt-0.5">Quality Assurance</div>
              </div>
            </div>
          </div>

          {/* Right Column: Animated Medical Graphic Showcase (Light Theme) (5 Cols) */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.4 }}
                className="w-full"
              >
                {activeSlide.visualType === "hematology" && (
                  <div className="relative rounded-[36px] border border-slate-200/80 bg-white/90 backdrop-blur-xl p-8 shadow-2xl space-y-6">
                    {/* Header */}
                    <div className="flex items-center justify-between border-b border-slate-100 pb-5">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-2xl bg-teal-50 border border-teal-100 flex items-center justify-center text-teal-600 shadow-sm">
                          <Microscope size={26} />
                        </div>
                        <div>
                          <h4 className="font-extrabold text-slate-900 text-lg">
                            Hematology Analyzer
                          </h4>
                          <p className="text-xs text-slate-500 font-medium">
                            3-Part & 5-Part Differential
                          </p>
                        </div>
                      </div>
                      <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-teal-100 text-teal-800 border border-teal-200">
                        Live Scanner
                      </span>
                    </div>

                    {/* Animated Pulse Wave Visual (GIF feel via SVG animation) */}
                    <div className="relative h-40 rounded-2xl bg-slate-900 overflow-hidden p-4 flex flex-col justify-between shadow-inner">
                      {/* Grid Background */}
                      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-[size:1.5rem_1.5rem]" />
                      
                      <div className="relative z-10 flex items-center justify-between text-xs text-teal-400 font-mono">
                        <span>PULSE_READOUT: OPTIMAL</span>
                        <span className="flex items-center gap-1">
                          <span className="w-2 h-2 rounded-full bg-teal-400 animate-ping" />
                          SAMPLING
                        </span>
                      </div>

                      {/* Animated Laser Scanline */}
                      <div className="relative z-10 my-auto">
                        <svg className="w-full h-16 stroke-teal-400 fill-none stroke-2" viewBox="0 0 400 60">
                          <path d="M0,30 Q30,30 50,10 T90,50 T130,30 T170,10 T210,50 T250,30 T300,20 T350,40 T400,30" />
                        </svg>
                        <div className="absolute top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-teal-300 to-transparent animate-[ping_2s_infinite]" />
                      </div>

                      <div className="relative z-10 flex items-center justify-between text-[11px] text-slate-400 font-mono">
                        <span>ACCURACY: 99.85%</span>
                        <span>SPEED: 60 TESTS/HR</span>
                      </div>
                    </div>

                    {/* Data Chips */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
                        <span className="text-xs text-slate-500 font-semibold block">WBC Count</span>
                        <span className="text-lg font-extrabold text-slate-900">7.4 × 10³/µL</span>
                      </div>
                      <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
                        <span className="text-xs text-slate-500 font-semibold block">Hemoglobin</span>
                        <span className="text-lg font-extrabold text-slate-900">14.6 g/dL</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-slate-600 font-semibold pt-1">
                      <CheckCircle2 size={16} className="text-teal-600 shrink-0" />
                      <span>Certified Manufacturer Warranty & On-site Calibration</span>
                    </div>
                  </div>
                )}

                {activeSlide.visualType === "reagents" && (
                  <div className="relative rounded-[36px] border border-slate-200/80 bg-white/90 backdrop-blur-xl p-8 shadow-2xl space-y-6">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-5">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shadow-sm">
                          <FlaskConical size={26} />
                        </div>
                        <div>
                          <h4 className="font-extrabold text-slate-900 text-lg">
                            Clinical Reagent Hub
                          </h4>
                          <p className="text-xs text-slate-500 font-medium">
                            RIA & Biochemistry Kits
                          </p>
                        </div>
                      </div>
                      <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-blue-100 text-blue-800 border border-blue-200">
                        Pan-India Stock
                      </span>
                    </div>

                    {/* Interactive Graphic */}
                    <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-50 via-teal-50 to-white border border-blue-100 space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Zap size={18} className="text-blue-600" />
                          <span className="text-xs font-extrabold text-slate-800 uppercase tracking-wider">
                            Cold Chain Dispatch
                          </span>
                        </div>
                        <span className="text-xs font-bold text-blue-600">Active Batch</span>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between text-xs font-bold text-slate-700">
                          <span>Immunoassay Sensitivity</span>
                          <span>99.9%</span>
                        </div>
                        <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-blue-500 to-teal-500 w-[99.9%]" />
                        </div>
                      </div>

                      <p className="text-xs text-slate-600 leading-relaxed pt-1">
                        Formulated for precise radioimmunoassay & biochemistry diagnostic analyzers.
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
                        <span className="text-xs text-slate-500 font-semibold block">Temp Controlled</span>
                        <span className="text-base font-extrabold text-slate-900">2°C to 8°C</span>
                      </div>
                      <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
                        <span className="text-xs text-slate-500 font-semibold block">Delivery Dispatch</span>
                        <span className="text-base font-extrabold text-slate-900">Within 24 Hours</span>
                      </div>
                    </div>
                  </div>
                )}

                {activeSlide.visualType === "turnkey" && (
                  <div className="relative rounded-[36px] border border-slate-200/80 bg-white/90 backdrop-blur-xl p-8 shadow-2xl space-y-6">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-5">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 shadow-sm">
                          <Award size={26} />
                        </div>
                        <div>
                          <h4 className="font-extrabold text-slate-900 text-lg">
                            Turnkey Lab Installation
                          </h4>
                          <p className="text-xs text-slate-500 font-medium">
                            Setup, Calibration & AMC
                          </p>
                        </div>
                      </div>
                      <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-indigo-100 text-indigo-800 border border-indigo-200">
                        24/7 Service
                      </span>
                    </div>

                    <div className="p-6 rounded-2xl bg-slate-900 text-white space-y-4 shadow-xl">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono text-teal-400 uppercase tracking-widest">
                          ENGINEER_HELPLINE
                        </span>
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                      </div>

                      <h5 className="text-xl font-extrabold text-white">
                        Full Field Support & Operator Training
                      </h5>

                      <p className="text-xs text-slate-300 leading-relaxed">
                        Experienced biomedical engineers available across all districts for immediate troubleshooting and routine calibration.
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
                        <span className="text-xs text-slate-500 font-semibold block">Labs Configured</span>
                        <span className="text-lg font-extrabold text-slate-900">150+ Setup</span>
                      </div>
                      <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
                        <span className="text-xs text-slate-500 font-semibold block">Response Time</span>
                        <span className="text-lg font-extrabold text-slate-900">&lt; 4 Hours</span>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Slider Dots & Navigation Controls */}
            <div className="absolute -bottom-10 flex items-center justify-between w-full px-2">
              <div className="flex items-center gap-2">
                {slides.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentSlide(idx)}
                    className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                      currentSlide === idx ? "w-8 bg-slate-900" : "w-2.5 bg-slate-300 hover:bg-slate-400"
                    }`}
                    aria-label={`Slide ${idx + 1}`}
                  />
                ))}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={prevSlide}
                  className="w-9 h-9 rounded-full border border-slate-200 bg-white hover:bg-slate-100 text-slate-800 flex items-center justify-center transition-all shadow-sm cursor-pointer"
                  aria-label="Previous"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  onClick={nextSlide}
                  className="w-9 h-9 rounded-full border border-slate-200 bg-white hover:bg-slate-100 text-slate-800 flex items-center justify-center transition-all shadow-sm cursor-pointer"
                  aria-label="Next"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
