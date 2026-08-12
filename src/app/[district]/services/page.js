import ServicesPage from "@/app/services/page";

export async function generateMetadata({ params }) {
  const { district = "jaipur" } = await params;
  const city = district
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());

  return {
    title: `Biomedical & Lab Services in ${city} | Installation & Maintenance | Raj Biosis`,
    description: `Biomedical equipment supply, on-site installation, calibration, and Annual Maintenance Contracts (AMC) in ${city}. Contact Raj Biosis for diagnostic lab setup in ${city}.`,
    alternates: {
      canonical: `https://radioimmunoassay.in/${district}/services`,
    },
  };
}

export default async function Page({ params }) {
  const { district = "jaipur" } = await params;

  const city = district
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());

  return <ServicesPage city={city} />;
}