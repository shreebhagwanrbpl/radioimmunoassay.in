import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";

export const metadata = {
  metadataBase: new URL("https://radioimmunoassay.in"),

  title: {
    default: "Radioimmunoassay Reagents & Pathology Analyzer Supplier | Raj Biosis",
    template: "%s | Raj Biosis",
  },

  description:
    "Raj Biosis is India's leading distributor of Radioimmunoassay (RIA) kits, hormone assay testing reagents, 3-Part & 5-Part hematology cell counters, fully automated biochemistry analyzers, and pathology laboratory equipment with on-site calibration & AMC support.",

  keywords: [
    "Radioimmunoassay Reagents Supplier",
    "RIA Kits Manufacturer India",
    "Hormone Assay Kits Supplier",
    "Thyroid Testing RIA Kits",
    "Hematology Analyzer Price India",
    "3 Part Cell Counter Supplier",
    "5 Part Differential Analyzer",
    "Biochemistry Analyzer Supplier",
    "ELISA Reader & Washer Distributor",
    "Pathology Laboratory Equipment Setup",
    "Raj Biosis Diagnostic Equipment",
    "Medical Equipment AMC & Repair Rajasthan",
  ],

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  openGraph: {
    title: "Radioimmunoassay Reagents & Pathology Analyzer Supplier | Raj Biosis",
    description:
      "Premier supplier of Radioimmunoassay (RIA) reagents, blood cell counters, biochemistry analyzers, and clinical diagnostic setups across India.",
    url: "https://radioimmunoassay.in",
    siteName: "Raj Biosis Private Limited",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Raj Biosis Radioimmunoassay & Laboratory Equipment",
      },
    ],
    locale: "en_IN",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Radioimmunoassay & Diagnostic Analyzer Supplier | Raj Biosis",
    description:
      "High-precision Radioimmunoassay kits, clinical analyzers, and turnkey lab setup across India.",
    images: ["/logo.png"],
  },

  alternates: {
    canonical: "https://radioimmunoassay.in",
  },
};

export default function RootLayout({ children }) {
  const jsonLdOrganization = {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    "name": "Raj Biosis Private Limited",
    "alternateName": "Radioimmunoassay.in",
    "url": "https://radioimmunoassay.in",
    "logo": "https://radioimmunoassay.in/logo.png",
    "description": "Authorized distributor of Radioimmunoassay (RIA) reagents, hormone assay kits, 3-part & 5-part hematology counters, biochemistry analyzers, and pathology laboratory setup in India.",
    "telephone": "+91-9829000000",
    "priceRange": "₹₹₹",
    "address": {
      "@type": "PostalAddress",
      "addressRegion": "Rajasthan",
      "addressCountry": "IN"
    },
    "areaServed": [
      "Jaipur", "Jodhpur", "Udaipur", "Kota", "Ajmer", "Bikaner", "Alwar", "Bhilwara", "Sikar", "Bharatpur", "Pali", "Sri Ganganagar", "India"
    ],
    "sameAs": [
      "https://radioimmunoassay.in"
    ]
  };

  const jsonLdWebSite = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Radioimmunoassay.in - Raj Biosis",
    "url": "https://radioimmunoassay.in",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://radioimmunoassay.in/items?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLdOrganization),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLdWebSite),
          }}
        />
      </head>
      <body className="antialiased">
        <Navbar />

        <main>
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 3000,
            }}
          />

          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}