"use client";

import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

export default function Footer() {
  const [contactInfo, setContactInfo] =
    useState([]);
  const [loading, setLoading] = useState(true);
  const [districtData, setDistrictData] =
    useState(null);

  const pathname = usePathname();

  const pathParts = pathname
    .split("/")
    .filter(Boolean);

  const staticRoutes = [
    "about",
    "services",
    "products",
    "contact",
    "items",
  ];

  const district =
    pathParts.length > 0 &&
      !staticRoutes.includes(pathParts[0])
      ? pathParts[0]
      : "";

  useEffect(() => {
    const loadContact = async () => {
      try {
        const snap = await getDoc(
          doc(
            db,
            "websites",
            "centralbiomedicals",
            "pages",
            "contact"
          )
        );

        if (snap.exists()) {
          setContactInfo(
            snap.data().contactInfo || []
          );
        }

        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };

    loadContact();
  }, []);

  useEffect(() => {
    const loadDistrict = async () => {
      if (!district) return;

      try {
        const snap = await getDoc(
          doc(
            db,
            "websites",
            "centralbiomedicals",
            "districts",
            district
          )
        );

        if (snap.exists()) {
          setDistrictData(snap.data());
        }
      } catch (err) {
        console.log(err);
      }
    };

    loadDistrict();
  }, [district]);

  const phone =
    contactInfo.find(
      (x) => x.label === "Phone Number"
    )?.value || "";

  const email =
    contactInfo.find(
      (x) => x.label === "Email Address"
    )?.value || "";

  const address =
    contactInfo.find(
      (x) => x.label === "Office Address"
    )?.value || "";

  const dynamicAddress =
    districtData
      ? `${districtData.district}, ${districtData.state}, India`
      : address;

  const makeLink = (path) => {
    if (!district) return path;

    if (path === "/") {
      return `/${district}`;
    }

    return `/${district}${path}`;
  };
  if (loading) {
    return (
      <footer className="bg-white border-t border-slate-200">
        <div className="container-custom py-16">

          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-10">

            {[...Array(4)].map((_, i) => (
              <div key={i}>
                <div className="h-8 w-40 bg-slate-200 rounded animate-pulse mb-6" />

                {[...Array(5)].map((_, j) => (
                  <div
                    key={j}
                    className="h-5 bg-slate-200 rounded animate-pulse mb-4"
                  />
                ))}
              </div>
            ))}

          </div>

          <div className="border-t border-slate-200 mt-12 pt-6">
            <div className="h-5 w-72 bg-slate-200 rounded animate-pulse" />
          </div>

        </div>
      </footer>
    );
  }
  return (
    <footer className="bg-gradient-to-b from-white to-slate-100 border-t border-slate-200">
      <div className="container-custom py-16">

        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-12">

          {/* Company */}
          <div>

            <h2 className="text-3xl font-bold tracking-tight">
              <span className="text-slate-900">
                Central
              </span>{" "}
              <span className="text-slate-600">
                Biomedicals
              </span>
            </h2>

            <p className="mt-6 text-slate-600 leading-8">
              Delivering trusted biomedical and diagnostic
              solutions with innovation, precision,
              reliability, and healthcare excellence for
              hospitals, laboratories, and medical
              institutions.
            </p>

            <div className="flex gap-3 mt-8">

              <div className="w-11 h-11 rounded-xl bg-white border border-slate-200 shadow-sm flex items-center justify-center hover:bg-slate-900 hover:text-white transition-all duration-300 cursor-pointer">
                <Phone size={18} />
              </div>

              <div className="w-11 h-11 rounded-xl bg-white border border-slate-200 shadow-sm flex items-center justify-center hover:bg-slate-900 hover:text-white transition-all duration-300 cursor-pointer">
                <Mail size={18} />
              </div>

              <div className="w-11 h-11 rounded-xl bg-white border border-slate-200 shadow-sm flex items-center justify-center hover:bg-slate-900 hover:text-white transition-all duration-300 cursor-pointer">
                <MapPin size={18} />
              </div>

            </div>

          </div>

          {/* Quick Links */}
          <div>

            <h3 className="text-xl font-bold text-slate-900 mb-6">
              Quick Links
            </h3>

            <div className="flex flex-col gap-4">

              <Link
                href={makeLink("/")}
                className="text-slate-600 hover:text-slate-900 transition-colors"
              >
                Home
              </Link>

              <Link
                href={makeLink("/about")}
                className="text-slate-600 hover:text-slate-900 transition-colors"
              >
                About Us
              </Link>

              <Link
                href={makeLink("/services")}
                className="text-slate-600 hover:text-slate-900 transition-colors"
              >
                Services
              </Link>

              <Link
                href={makeLink("/items")}
                className="text-slate-600 hover:text-slate-900 transition-colors"
              >
                Products
              </Link>

              <Link
                href={makeLink("/contact")}
                className="text-slate-600 hover:text-slate-900 transition-colors"
              >
                Contact
              </Link>

            </div>

          </div>

          {/* Services */}
          <div>

            <h3 className="text-xl font-bold text-slate-900 mb-6">
              Our Services
            </h3>

            <div className="space-y-4 text-slate-600">

              <p>Diagnostic Equipment</p>
              <p>Biomedical Instruments</p>
              <p>Laboratory Solutions</p>
              <p>Hospital Equipment</p>
              <p>Annual Maintenance</p>
              <p>Technical Support</p>

            </div>

          </div>

          {/* Contact */}
          <div>

            <h3 className="text-xl font-bold text-slate-900 mb-6">
              Contact Information
            </h3>

            <div className="space-y-6">

              <div className="flex items-start gap-4">

                <div className="w-11 h-11 rounded-xl bg-slate-100 flex items-center justify-center flex-shrink-0">
                  <MapPin size={18} className="text-slate-700" />
                </div>

                <p className="text-slate-600 leading-7">
                  {dynamicAddress}
                </p>

              </div>

              <div className="flex items-center gap-4">

                <div className="w-11 h-11 rounded-xl bg-slate-100 flex items-center justify-center">
                  <Phone size={18} className="text-slate-700" />
                </div>

                <a
                  href={`tel:${phone}`}
                  className="text-slate-600 hover:text-slate-900 transition-colors"
                >
                  {phone}
                </a>

              </div>

              <div className="flex items-center gap-4">

                <div className="w-11 h-11 rounded-xl bg-slate-100 flex items-center justify-center">
                  <Mail size={18} className="text-slate-700" />
                </div>

                <a
                  href={`mailto:${email}`}
                  className="text-slate-600 hover:text-slate-900 transition-colors break-all"
                >
                  {email}
                </a>

              </div>

            </div>

          </div>

        </div>

        {/* Bottom */}

        <div className="mt-14 pt-8 border-t border-slate-200 flex flex-col lg:flex-row items-center justify-between gap-4">

          <p className="text-slate-500 text-center lg:text-left">
            © 2026 <span className="font-semibold text-slate-800">Central Biomedicals</span>. All Rights Reserved.
          </p>

          <p className="text-slate-500 text-center">
            Delivering Precision • Innovation • Quality Healthcare
          </p>

        </div>

      </div>
    </footer>
  );
}