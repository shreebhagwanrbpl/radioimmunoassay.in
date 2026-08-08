"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const pathname = usePathname();

  const pathParts = pathname
    .split("/")
    .filter(Boolean);

  const staticRoutes = [
    "about",
    "services",
    "items",
    "contact",
  ];

  const district =
    pathParts.length > 0 &&
      !staticRoutes.includes(pathParts[0])
      ? pathParts[0]
      : "";

  const makeLink = (path) => {
    if (!district) return path;

    if (path === "/") {
      return `/${district}`;
    }

    return `/${district}${path}`;
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Products", path: "/items" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur-2xl shadow-sm">
      <div className="container-custom flex h-20 items-center justify-between">

        {/* Logo */}
        <Link
          href={makeLink("/")}
          className="group"
        >
          <h1 className="text-2xl font-bold tracking-tight">
            <span className="text-slate-900 group-hover:text-slate-700 transition-colors">
              Raj
            </span>{" "}
            <span className="text-slate-500 group-hover:text-slate-600 transition-colors">
              Biosis
            </span>
          </h1>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden lg:flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-2 shadow-sm">

          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={makeLink(link.path)}
              className="rounded-full px-5 py-2 text-[15px] font-medium text-slate-700 transition-all duration-300 hover:bg-white hover:text-slate-900 hover:shadow-sm"
            >
              {link.name}
            </Link>
          ))}

        </nav>

        {/* Desktop CTA */}
        <div className="hidden lg:block">

          <Link href={makeLink("/contact")}>

            <button className="inline-flex items-center justify-center rounded-full bg-slate-900 px-7 py-3 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:bg-slate-800 hover:shadow-xl">
              Get Quote
            </button>

          </Link>

        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="lg:hidden flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white shadow-sm transition hover:bg-slate-100"
        >
          {menuOpen ? (
            <X size={24} className="text-slate-700" />
          ) : (
            <Menu size={24} className="text-slate-700" />
          )}
        </button>

      </div>

      {/* Mobile Menu */}
      <div
        className={`overflow-hidden transition-all duration-300 lg:hidden ${menuOpen ? "max-h-[500px]" : "max-h-0"
          }`}
      >

        <div className="border-t border-slate-200 bg-white px-6 py-6 shadow-lg">

          <nav className="flex flex-col gap-3">

            {navLinks.map((link) => (

              <Link
                key={link.name}
                href={makeLink(link.path)}
                onClick={() => setMenuOpen(false)}
                className="rounded-xl px-4 py-3 font-medium text-slate-700 transition-all duration-300 hover:bg-slate-100 hover:text-slate-900"
              >
                {link.name}
              </Link>

            ))}

            <Link
              href={makeLink("/contact")}
              onClick={() => setMenuOpen(false)}
              className="mt-3"
            >

              <button className="w-full rounded-xl bg-slate-900 px-6 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:bg-slate-800">
                Get Quote
              </button>

            </Link>

          </nav>

        </div>

      </div>
    </header>
  );
}