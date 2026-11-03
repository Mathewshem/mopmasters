import Link from "next/link";
import Image from "next/image";
import { company, images } from "@/lib/siteData";
import { IconArrowRight, IconStar } from "../Icons";
import { InitialAvatar } from "../Illustrations";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-brand-50 via-sand to-leaf-400/10">
      <div className="container-wide grid items-center gap-12 py-16 lg:grid-cols-2 lg:py-24">
        <div>
          <span className="eyebrow">
            <IconStar className="h-3.5 w-3.5" /> Spotless Spaces, Trusted Hands
          </span>
          <h1 className="mt-5 font-display text-4xl font-bold leading-tight text-ink sm:text-5xl lg:text-6xl">
            Professional Cleaning Services You Can{" "}
            <span className="text-brand-500">Count On</span>
          </h1>
          <p className="mt-5 max-w-xl text-base text-ink/70 sm:text-lg">
            Antlar brings peace of mind to every space we clean. Eco-friendly products,
            vetted cleaners, and genuine attention to every corner.
          </p>
          <p className="mt-3 max-w-xl text-base font-semibold text-brand-700 sm:text-lg">
            {company.intro}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link href="/contact" className="btn-primary">
              Book Your Cleaning Today <IconArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/services" className="btn-secondary">
              Our Services
            </Link>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-6">
            <div className="flex items-center gap-2">
              <span className="font-display text-2xl font-bold text-ink">4.9</span>
              <div>
                <div className="flex text-yellow-400">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <IconStar key={i} className="h-4 w-4" />
                  ))}
                </div>
                <p className="text-xs text-ink/60">120+ Google reviews</p>
              </div>
            </div>
            <div className="flex -space-x-3">
              {["Achieng O.", "Brian K.", "Wanjiru M.", "Kevin O."].map((n) => (
                <InitialAvatar key={n} name={n} className="h-10 w-10 border-2 border-sand" />
              ))}
            </div>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-md">
          <div className="overflow-hidden rounded-xl2 shadow-soft">
            <Image
              src={images.homeHero}
              alt="Antlar professional cleaner at work"
              width={700}
              height={800}
              priority
              className="h-[420px] w-full object-cover sm:h-[520px]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
