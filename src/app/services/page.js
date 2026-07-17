"use client";
import {
  Microscope,
  FlaskConical,
  ShieldCheck,
  Stethoscope,
  Wrench,
  Activity,
} from "lucide-react";

import PageBanner from "@/components/PageBanner";
import SectionTitle from "@/components/SectionTitle";
import ServiceCard from "@/components/ServiceCard";
import CTASection from "@/components/CTASection";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
export default function ServicesPage() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const icons = [
    <Microscope size={30} />,
    <FlaskConical size={30} />,
    <ShieldCheck size={30} />,
    <Stethoscope size={30} />,
    <Wrench size={30} />,
    <Activity size={30} />,
  ];
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const snap = await getDoc(
          doc(
            db,
            "websites",
            "centralbiomedicals",
            "pages",
            "services"
          )
        );

        if (snap.exists()) {
          setServices(snap.data().services || []);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);
  return (
    <>
      {/* Banner */}
      <PageBanner
        title="Our Services"
        subtitle="Delivering trusted biomedical and diagnostic services with innovation, precision, and healthcare excellence."
      />

      {/* Services Grid */}
      <section className="section-padding bg-gradient-to-b from-white via-slate-50 to-white">
        <div className="container-custom">

          {/* Section Title */}
          <SectionTitle
            badge="What We Offer"
            title="Premium Biomedical Services"
            description="We provide innovative healthcare technologies, laboratory equipment, and trusted biomedical solutions tailored for hospitals, diagnostic centres, and research laboratories."
            center
          />

          {/* Services */}
          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">

            {loading
              ? Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={index}
                  className="rounded-[30px] border border-slate-200 bg-white p-8 shadow-sm animate-pulse"
                >

                  {/* Icon */}
                  <div className="mb-7 h-16 w-16 rounded-2xl bg-slate-200"></div>

                  {/* Title */}
                  <div className="mb-6 h-7 w-3/4 rounded bg-slate-200"></div>

                  {/* Divider */}
                  <div className="mb-6 h-1 w-14 rounded-full bg-slate-200"></div>

                  {/* Description */}
                  <div className="space-y-3">
                    <div className="h-4 rounded bg-slate-200"></div>
                    <div className="h-4 w-11/12 rounded bg-slate-200"></div>
                    <div className="h-4 w-8/12 rounded bg-slate-200"></div>
                  </div>

                </div>
              ))
              : services.map((service, index) => (

                <ServiceCard
                  key={index}
                  icon={icons[index]}
                  title={service.title}
                  description={service.desc}
                />

              ))}

          </div>

        </div>
      </section>

      {/* Working Process */}
      <section className="section-padding bg-gradient-to-b from-slate-50 via-white to-slate-50">
        <div className="container-custom">

          {/* Section Title */}
          <SectionTitle
            badge="How We Work"
            title="Simple & Professional Process"
            description="We follow a streamlined approach to deliver reliable biomedical equipment, laboratory technologies, and healthcare solutions with quality and precision."
            center
          />

          {/* Process Cards */}
          <div className="mt-16 grid gap-8 lg:grid-cols-3">

            {[
              {
                step: "01",
                title: "Consultation",
                desc:
                  "Understanding your healthcare, laboratory, and diagnostic requirements to recommend the most suitable biomedical solutions.",
              },
              {
                step: "02",
                title: "Implementation",
                desc:
                  "Supplying, installing, and configuring biomedical equipment with professional guidance and technical expertise.",
              },
              {
                step: "03",
                title: "Support",
                desc:
                  "Providing training, maintenance, and dependable after-sales support to ensure long-term performance.",
              },
            ].map((item, index) => (

              <div
                key={index}
                className="group relative overflow-hidden rounded-[30px] border border-slate-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-slate-300 hover:shadow-2xl"
              >

                {/* Background Step Number */}
                <div className="absolute right-6 top-4 text-7xl font-bold text-slate-100 transition-all duration-300 group-hover:text-slate-200">
                  {item.step}
                </div>

                {/* Small Step Badge */}
                <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-slate-200 bg-slate-100 text-lg font-bold text-slate-700 transition-all duration-300 group-hover:bg-slate-900 group-hover:text-white">
                  {item.step}
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold tracking-tight text-slate-900">
                  {item.title}
                </h3>

                {/* Divider */}
                <div className="mt-4 mb-5 h-1 w-14 rounded-full bg-slate-300 transition-all duration-300 group-hover:w-20 group-hover:bg-slate-700" />

                {/* Description */}
                <p className="leading-8 text-slate-600">
                  {item.desc}
                </p>

              </div>

            ))}

          </div>

        </div>
      </section>

      {/* CTA */}
      <CTASection />
    </>
  );
}