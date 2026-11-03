import ServicesAccordion from "@/components/sections/ServicesAccordion";
import Pricing from "@/components/sections/Pricing";

export const metadata = {
  title: "Our Services | Antlar Elite Services",
  description: "Residential, commercial, deep, move-in/move-out, window and post-construction cleaning services across Nairobi, Kenya.",
};

export default function ServicesPage() {
  return (
    <>
      <section className="bg-brand-50 py-16 sm:py-20">
        <div className="container-wide text-center">
          <span className="eyebrow mx-auto">Our Services</span>
          <h1 className="section-heading mt-4">Cleaning Services Designed for Your Lifestyle</h1>
          <p className="mx-auto mt-4 max-w-2xl text-ink/70">
            Whatever the space, we have a service for it. Explore what&apos;s included below, or
            get in touch for a custom quote.
          </p>
        </div>
      </section>

      <div className="container-wide py-16 sm:py-24">
        <ServicesAccordion full />
      </div>

      <Pricing />
    </>
  );
}
