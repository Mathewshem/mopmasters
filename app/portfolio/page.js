import Link from "next/link";
import Image from "next/image";
import { portfolioItems, images } from "@/lib/siteData";
import { IconArrowRight, IconArrowUpRight } from "@/components/Icons";

export const metadata = {
  title: "Portfolio | MopMasters Cleaning Services",
  description: "A look at recent residential and commercial cleaning projects completed by MopMasters across Kenya.",
};

export default function PortfolioPage() {
  return (
    <>
      <section className="bg-brand-50 py-16 sm:py-20">
        <div className="container-wide text-center">
          <span className="eyebrow mx-auto">Our Portfolio</span>
          <h1 className="section-heading mt-4">Recent Work Across Kenya</h1>
          <p className="mx-auto mt-4 max-w-2xl text-ink/70">
            A snapshot of the homes and businesses we&apos;ve helped keep spotless. Ask us for
            references from any of these locations.
          </p>
        </div>
      </section>

      <section className="container-wide py-16 sm:py-24">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {portfolioItems.map((item, index) => (
            <div key={item.title} className="group card overflow-hidden !p-0">
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={images.portfolio[index] || images.portfolio[0]}
                  alt={item.title}
                  width={700}
                  height={480}
                  className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                />
                <span className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full bg-white text-brand-600 transition group-hover:bg-ink group-hover:text-white">
                  <IconArrowUpRight className="h-4 w-4" />
                </span>
                <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-brand-700">
                  {item.category}
                </span>
              </div>
              <div className="p-6">
                <h3 className="font-display text-lg font-bold text-ink">{item.title}</h3>
                <p className="mt-2 text-sm text-ink/60">{item.location}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-14 text-center">
          <p className="text-ink/70">Have a space that needs the MopMasters touch?</p>
          <Link href="/contact" className="btn-primary mt-4">
            Start Your Project <IconArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
