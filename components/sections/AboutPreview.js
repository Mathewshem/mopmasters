import Image from "next/image";
import Link from "next/link";
import { images } from "@/lib/siteData";
import { IconArrowRight, IconStar } from "../Icons";

export default function AboutPreview() {
  return (
    <section className="container-wide py-16 sm:py-24">
      <div className="relative overflow-hidden rounded-xl2">
        <Image
          src={images.homeAbout}
          alt="MopMasters cleaning team at work"
          width={1400}
          height={840}
          className="h-[420px] w-full object-cover"
        />
        <div className="absolute bottom-4 left-4 right-4 rounded-xl2 bg-white p-6 shadow-soft sm:bottom-8 sm:left-8 sm:right-auto sm:max-w-lg sm:p-8">
          <span className="eyebrow">
            <IconStar className="h-3.5 w-3.5" /> About Us
          </span>
          <h2 className="mt-4 font-display text-2xl font-bold text-ink sm:text-3xl">
            A Dedicated Team of Cleaning Professionals Committed to Homes and Businesses Across Kenya
          </h2>
          <Link href="/about" className="btn-primary mt-6">
            Learn More About Us <IconArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
