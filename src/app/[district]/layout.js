export async function generateMetadata({ params }) {
  const { district = "jaipur" } = await params;

  const districtName = district
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());

  const url = `https://radioimmunoassay.in/${district}`;
  const title = `Biomedical & Diagnostic Equipment Supplier in ${districtName} | Raj Biosis`;
  const description = `Raj Biosis is the leading supplier of CBC Machines, Hematology Analyzers, Biochemistry Analyzers, ELISA Readers and pathology lab equipment in ${districtName}. Contact for quotation, installation and technical service.`;

  return {
    title,
    description,
    keywords: [
      `Biomedical Equipment Supplier ${districtName}`,
      `CBC Machine Price ${districtName}`,
      `Hematology Analyzer ${districtName}`,
      `Biochemistry Analyzer ${districtName}`,
      `Diagnostic Equipment ${districtName}`,
      `Pathology Equipment Supplier ${districtName}`,
      `Laboratory Equipment Dealer ${districtName}`,
      "Raj Biosis",
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
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: "Raj Biosis",
      type: "website",
      locale: "en_IN",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    metadataBase: new URL("https://radioimmunoassay.in"),
  };
}

export default async function DistrictLayout({ children, params }) {
  const { district = "jaipur" } = await params;
  const districtName = district
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    "name": `Raj Biosis - Biomedical Equipment Supplier (${districtName})`,
    "url": `https://radioimmunoassay.in/${district}`,
    "logo": "https://radioimmunoassay.in/logo.png",
    "description": `Supplier of Biomedical Equipment, CBC Machines, Hematology Analyzers, and Diagnostic Reagents in ${districtName}.`,
    "telephone": "+91-9983123469",
    "address": {
      "@type": "PostalAddress",
      "addressRegion": "Rajasthan",
      "addressCountry": "IN"
    },
    "areaServed": districtName,
    "priceRange": "₹₹",
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://radioimmunoassay.in"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": `${districtName} Biomedical Hub`,
        "item": `https://radioimmunoassay.in/${district}`
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />
      {children}
    </>
  );
}