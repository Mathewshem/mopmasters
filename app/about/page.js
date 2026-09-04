import Link from "next/link";
import Image from "next/image";
import Stats from "@/components/sections/Stats";
import Testimonials from "@/components/sections/Testimonials";
import { images, company } from "@/lib/siteData";
import { IconArrowRight, IconLeaf, IconShield, IconClock, IconStar } from "@/components/Icons";

export const metadata = {
  title: "About Us | MopMasters Cleaning Services",
  description: "Learn about MopMasters Cleaning Services, a dedicated team of cleaning professionals serving Nairobi, Kenya.",
};

const values = [
  { icon: IconLeaf, title: "Eco-Friendly Products", text: "We use plant-based, non-toxic cleaning products that are safe for kids, pets and the environment." },
  { icon: IconShield, title: "Vetted & Trusted Team", text: "Every cleaner is background-checked, trained and insured, so you can welcome us with confidence." },
  { icon: IconClock, title: "Reliable & On Time", text: "We respect your schedule — our teams arrive on time and complete every job thoroughly." },
  { icon: IconStar, title: "Satisfaction Guaranteed", text: "Not happy with a spot? Tell us within 24 hours and we'll re-clean it at no extra cost." },
];

export default function AboutPage() {
  return (
    <>
      <section className="bg-brand-50 py-16 sm:py-20">
        <div className="container-wide text-center">
          <span className="eyebrow mx-auto">About MopMasters</span>
          <h1 className="section-heading mt-4">
            Kenya&apos;s Trusted Partner for Spotless Homes & Offices
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-ink/70">
            MopMasters Cleaning Services was founded to bring reliable, thorough and affordable
            cleaning to families and businesses across Kenya — one spotless space at a time.
          </p>
          <p className="mx-auto mt-3 max-w-2xl font-semibold text-brand-700">{company.intro}</p>
        </div>
      </section>

      <Stats />

      <section className="container-wide grid gap-10 py-16 sm:py-24 lg:grid-cols-2 lg:items-center">
        <Image
          src={images.aboutAndCta}
          alt="MopMasters cleaning team"
          width={900}
          height={700}
          className="w-full rounded-xl2 object-cover"
        />
        <div>
          <span className="eyebrow">Our Story</span>
          <h2 className="section-heading mt-4">
            We Are a Dedicated Team of Cleaning Professionals
          </h2>
          <p className="mt-4 text-ink/70">
            What started as a small residential cleaning crew has grown into a full-service
            cleaning company trusted by hundreds of Nairobi households and businesses. We
            believe a clean space is the foundation of a healthy, productive life — so we built
            MopMasters around consistency, trust and genuine care for every home and office we
            enter.
          </p>
          <p className="mt-4 text-ink/70">
            Today our trained teams handle everything from a quick weekly tidy-up to full
            post-construction cleans, always using safe products and a detailed checklist so
            nothing gets missed.
          </p>
          <Link href="/contact" className="btn-primary mt-6">
            Work With Us <IconArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-24">
        <div className="container-wide">
          <div className="mx-auto max-w-2xl text-center">
            <span className="eyebrow mx-auto">Why Choose Us</span>
            <h2 className="section-heading mt-4">What Makes MopMasters Different</h2>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v) => (
              <div key={v.title} className="card text-center">
                <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-brand-500 text-white">
                  <v.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 font-display text-lg font-bold text-ink">{v.title}</h3>
                <p className="mt-2 text-sm text-ink/60">{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Testimonials />
    </>
  );
}
