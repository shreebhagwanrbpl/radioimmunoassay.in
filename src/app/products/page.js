import ProductsPage from "@/app/items/page";

export const metadata = {
  title: "Biomedical Equipment Catalog | CBC Machines, Analyzers & Reagents | Raj Biosis",
  description: "Browse certified CBC Machines, 3-Part & 5-Part Hematology Analyzers, Biochemistry Analyzers, ELISA Readers and pathology lab consumables available across India.",
  alternates: {
    canonical: "https://radioimmunoassay.in/items",
  },
};

export default function Page(props) {
  return <ProductsPage {...props} />;
}