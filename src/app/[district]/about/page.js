import AboutPage from "@/app/about/page";

export async function generateMetadata({ params }) {
  const { district = "jaipur" } = await params;
  const city = district
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());

  return {
    title: `About Raj Biosis ${city} | Leading Biomedical Supplier in ${city}`,
    description: `Learn about Raj Biosis in ${city}. Trusted supplier of CBC Machines, Hematology & Biochemistry Analyzers, and pathology laboratory setup in ${city}.`,
    alternates: {
      canonical: `https://radioimmunoassay.in/${district}/about`,
    },
  };
}

export default async function Page({ params }) {
  const { district = "jaipur" } = await params;

  const city = district
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());

  return <AboutPage city={city} />;
}