import Link from "next/link";
import Hero from "@/components/sections/Hero";
import Stats from "@/components/sections/Stats";
import AboutPreview from "@/components/sections/AboutPreview";
import ServicesAccordion from "@/components/sections/ServicesAccordion";
import Pricing from "@/components/sections/Pricing";
import Testimonials from "@/components/sections/Testimonials";
import AreasServed from "@/components/sections/AreasServed";
import BlogPreview from "@/components/sections/BlogPreview";
import { IconArrowRight } from "@/components/Icons";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Stats />
      <AboutPreview />

      <section className="container-wide py-16 sm:py-24">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="eyebrow">Our Services</span>
            <h2 className="section-heading mt-4 max-w-xl">
              Cleaning Services Designed for Your Lifestyle
            </h2>
          </div>
          <Link href="/services" className="btn-primary">
            View All Services <IconArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <ServicesAccordion />
      </section>

      <Pricing />
      <Testimonials />
      <AreasServed />
      <BlogPreview />
    </>
  );
}
