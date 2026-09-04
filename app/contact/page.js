import ContactSection from "@/components/sections/ContactSection";
import AreasServed from "@/components/sections/AreasServed";

export const metadata = {
  title: "Contact Us | MopMasters Cleaning Services",
  description: "Get a quick cleaning estimate or book a service with MopMasters Cleaning Services in Nairobi, Kenya.",
};

export default function ContactPage() {
  return (
    <>
      <section className="bg-brand-50 py-16 sm:py-20">
        <div className="container-wide text-center">
          <span className="eyebrow mx-auto">Contact Us</span>
          <h1 className="section-heading mt-4">Have Questions or Ready to Book?</h1>
          <p className="mx-auto mt-4 max-w-2xl text-ink/70">
            We&apos;re here to help! Get in touch with our friendly team for a free, no-obligation
            quote.
          </p>
        </div>
      </section>

      <div className="container-wide py-16 sm:py-24">
        <ContactSection />
      </div>

      <AreasServed />
    </>
  );
}
