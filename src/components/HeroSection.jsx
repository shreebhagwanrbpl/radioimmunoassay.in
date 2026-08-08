"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

import CBG from "../components/img/CBG.png";

import {
  ArrowRight,
  ShieldCheck,
  Microscope,
  BadgeCheck,
} from "lucide-react";

export default function HeroSection({ city }) {
  const [loading, setLoading] = useState(true);

  const [heroData, setHeroData] = useState({
    title: "",
    description: "",
    button1Text: "",
    button2Text: "",
  });

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
  const districtSlug = city
    ? city.toLowerCase().replace(/\s+/g, "-")
    : "";

  const makeLink = (path) => {
    return districtSlug ? `/${districtSlug}${path}` : path;
  };

  return (
    <section className="gradient-bg overflow-hidden">
      <div className="container-custom min-h-[85vh] py-20 lg:py-0 grid lg:grid-cols-2 gap-14 items-center">

        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, y: 70 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-slate-100 border border-slate-200 text-slate-700 px-4 py-2 rounded-full text-sm font-semibold mb-7 shadow-sm">
            <ShieldCheck size={18} className="text-slate-600" />
            Trusted Biomedical Systems
          </div>

          {/* Title */}
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold leading-tight text-slate-900">
            {loading ? (
              <div className="animate-pulse space-y-4">
                <div className="h-12 bg-slate-200 rounded-xl w-[80%]"></div>
                <div className="h-12 bg-slate-200 rounded-xl w-[60%]"></div>
                <div className="h-12 bg-slate-200 rounded-xl w-[70%]"></div>
              </div>
            ) : (
              <>
                {heroData.title}

                {city && (
                  <>
                    <br />
                    <span className="text-2xl lg:text-4xl font-semibold text-slate-600">
                      in {city}
                    </span>
                  </>
                )}
              </>
            )}
          </h1>

          {/* Description */}
          {loading ? (
            <div className="animate-pulse mt-7 space-y-3">
              <div className="h-4 bg-slate-200 rounded-full w-full"></div>
              <div className="h-4 bg-slate-200 rounded-full w-[90%]"></div>
              <div className="h-4 bg-slate-200 rounded-full w-[75%]"></div>
            </div>
          ) : (
            <p className="mt-7 text-slate-600 text-lg leading-8 max-w-xl">
              {heroData.description}
              {city && (
                <>
                  {" "}
                  across <strong className="text-slate-800">{city}</strong>
                </>
              )}
            </p>
          )}

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-10">
            {loading ? (
              <>
                <div className="animate-pulse h-12 w-44 bg-slate-200 rounded-xl"></div>
                <div className="animate-pulse h-12 w-36 bg-slate-200 rounded-xl"></div>
              </>
            ) : (
              <>
                <Link href={makeLink("/services")}>
                  <button className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-xl bg-slate-900 text-white font-semibold shadow-lg hover:bg-slate-800 hover:shadow-xl transition-all duration-300">
                    {heroData.button1Text || "Explore Services"}
                    <ArrowRight size={18} />
                  </button>
                </Link>

                <Link href={makeLink("/contact")}>
                  <button className="inline-flex items-center justify-center px-8 py-3 rounded-xl border border-slate-300 bg-white text-slate-800 font-semibold shadow-sm hover:bg-slate-50 hover:border-slate-400 transition-all duration-300">
                    {heroData.button2Text || "Contact Us"}
                  </button>
                </Link>
              </>
            )}
          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-10 mt-14">

            <div className="border-l-4 border-slate-300 pl-4">
              <h3 className="text-3xl font-bold text-slate-900">
                10+
              </h3>
              <p className="text-slate-500 mt-1">
                Years Experience
              </p>
            </div>

            <div className="border-l-4 border-slate-300 pl-4">
              <h3 className="text-3xl font-bold text-slate-900">
                500+
              </h3>
              <p className="text-slate-500 mt-1">
                Products Delivered
              </p>
            </div>

            <div className="border-l-4 border-slate-300 pl-4">
              <h3 className="text-3xl font-bold text-slate-900">
                100%
              </h3>
              <p className="text-slate-500 mt-1">
                Quality Assurance
              </p>
            </div>

          </div>
        </motion.div>

        {/* Right Side */}
        <motion.div
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          {/* Image Card */}
          <div className="bg-white border border-slate-200 rounded-[40px] p-5 shadow-2xl">
            <Image
              src={CBG}
              alt="Raj Biosis"
              width={1200}
              height={900}
              className="rounded-[30px] object-cover object-[20%_center] h-[350px] sm:h-[450px] lg:h-[550px] w-full"
            />
          </div>

          {/* Floating Card 1 */}
          <div
            className="absolute top-10 -left-10 hidden lg:flex items-center gap-4 bg-white border border-slate-200 rounded-3xl px-6 py-5 shadow-xl backdrop-blur-sm"
            style={{ marginTop: "-27px" }}
          >
            <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center">
              <Microscope size={26} className="text-slate-700" />
            </div>

            <div>
              <h4 className="font-bold text-slate-900">
                Modern Labs
              </h4>
              <p className="text-sm text-slate-500">
                Precision Equipment
              </p>
            </div>
          </div>

          {/* Floating Card 2 */}
          <div className="absolute bottom-10 -right-8 hidden lg:flex items-center gap-4 bg-white border border-slate-200 rounded-3xl px-6 py-5 shadow-xl backdrop-blur-sm">
            <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center">
              <BadgeCheck size={26} className="text-slate-700" />
            </div>

            <div>
              <h4 className="font-bold text-slate-900">
                Trusted Quality
              </h4>
              <p className="text-sm text-slate-500">
                Certified Solutions
              </p>
            </div>
          </div>

          {/* Decorative Glow */}
          <div className="absolute -top-8 -right-8 w-36 h-36 bg-slate-200/40 blur-3xl rounded-full -z-10"></div>
          <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-slate-100/60 blur-3xl rounded-full -z-10"></div>

        </motion.div>

      </div>
    </section>
  );
}