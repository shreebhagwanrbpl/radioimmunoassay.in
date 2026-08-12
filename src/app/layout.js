import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";

export const metadata = {
  metadataBase: new URL("https://radioimmunoassay.in"),

  title: {
    default: "Biomedical & Diagnostic Equipment Supplier in India | Raj Biosis",
    template: "%s | Raj Biosis",
  },

  description:
    "Raj Biosis is a leading supplier of CBC Machines, Hematology Analyzers, Biochemistry Analyzers, ELISA Readers, Radioimmunoassay reagents, and Pathology Laboratory Equipment across Jaipur, Jodhpur, Udaipur, Kota, and all districts in India.",

  keywords: [
    "Biomedical Equipment Supplier",
    "Laboratory Equipment Supplier",
    "CBC Machine Supplier",
    "CBC Machine Price",
    "Hematology Analyzer Supplier",
    "Biochemistry Analyzer Supplier",
    "ELISA Reader Supplier",
    "Radioimmunoassay Reagents",
    "Diagnostic Equipment Supplier India",
    "Medical Equipment Supplier Jaipur",
    "Pathology Lab Setup Supplier",
    "Biomedical Equipment Supplier Rajasthan",
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
    title: "Biomedical & Diagnostic Equipment Supplier in India | Raj Biosis",
    description:
      "Trusted supplier of CBC Machines, Hematology, Biochemistry Analyzers, and Clinical Reagents across India.",
    url: "https://radioimmunoassay.in",
    siteName: "Raj Biosis",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Raj Biosis Biomedical Equipment",
      },
    ],
    locale: "en_IN",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Biomedical Equipment Supplier in India | Raj Biosis",
    description:
      "Supplier of biomedical, pathology, and laboratory equipment across India.",
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
    "name": "Raj Biosis",
    "alternateName": "Radioimmunoassay.in",
    "url": "https://radioimmunoassay.in",
    "logo": "https://radioimmunoassay.in/logo.png",
    "description": "Supplier of Biomedical Equipment, CBC Machines, Hematology Analyzers, Biochemistry Analyzers, and Diagnostic Reagents across India.",
    "telephone": "+91-9829000000",
    "priceRange": "₹₹",
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
    "name": "Raj Biosis",
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