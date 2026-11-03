import BlogPreview from "@/components/sections/BlogPreview";

export const metadata = {
  title: "Blog | Antlar Elite Services",
  description: "Cleaning tips, tricks and professional advice from the Antlar team in Nairobi, Kenya.",
};

export default function BlogPage() {
  return (
    <>
      <section className="bg-brand-50 py-16 sm:py-20">
        <div className="container-wide text-center">
          <span className="eyebrow mx-auto">Cleaning Tips & Tricks</span>
          <h1 className="section-heading mt-4">Professional Advice for a Cleaner, Healthier Home</h1>
        </div>
      </section>

      <div className="container-wide py-16 sm:py-24">
        <BlogPreview full />
      </div>
    </>
  );
}
