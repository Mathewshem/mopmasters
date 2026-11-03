import Link from "next/link";
import Image from "next/image";
import { company, services, images } from "@/lib/siteData";
import {
  IconArrowRight,
  IconMapPin,
  IconPhone,
  IconMail,
  IconFacebook,
  IconInstagram,
  IconTwitter,
  IconLinkedin,
} from "./Icons";

export default function Footer() {
  return (
    <footer className="bg-sand pt-16">
      <div className="container-wide">
        <div className="relative overflow-hidden rounded-xl2 bg-brand-500">
          <div className="grid gap-8 p-8 sm:p-12 lg:grid-cols-2 lg:items-center">
            <div className="relative hidden overflow-hidden rounded-xl2 lg:block">
              <Image
                src={images.aboutAndCta}
                alt="Antlar Elite Services cleaner at work"
                width={700}
                height={560}
                className="h-56 w-full object-cover"
              />
            </div>
            <div>
              <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">
                Join Hundreds of Happy Clients — Book Today
              </h2>
              <p className="mt-4 text-white/85">
                Booking is easy. Fill in our quick form, call us directly, or message us on WhatsApp.
                Choose your plan and pick a date and time that works for you.
              </p>
              <Link href="/contact" className="btn-dark mt-6">
                Book a Cleaning Now <IconArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="container-wide mt-16 grid gap-10 pb-10 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-2">
            <Image src="/logo.png" alt="Antlar Elite Services logo" width={44} height={44} />
            <span className="font-display text-xl font-bold tracking-tight text-brand-600">
              Antlar <span className="text-leaf-500">Elite Services</span>
            </span>
          </div>
          <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-leaf-500">
            {company.tagline}
          </p>
          <p className="mt-4 text-sm text-ink/70">
            At Antlar Elite Services we provide professional cleaning services for homes and offices
            across Nairobi. Our team is dedicated to making every space spotless, healthy and welcoming.
          </p>
          <div className="mt-5 flex gap-3">
            {[
              [IconFacebook, company.social.facebook, "Facebook"],
              [IconInstagram, company.social.instagram, "Instagram"],
              [IconTwitter, company.social.twitter, "Twitter"],
              [IconLinkedin, company.social.linkedin, "LinkedIn"],
            ].map(([Icon, href, label]) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="grid h-9 w-9 place-items-center rounded-full bg-white text-brand-600 shadow-soft transition hover:bg-brand-500 hover:text-white"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-display text-base font-bold text-ink">Quick Links</h3>
          <ul className="mt-4 space-y-2 text-sm text-ink/70">
            <li><Link href="/" className="hover:text-brand-600">Home</Link></li>
            <li><Link href="/about" className="hover:text-brand-600">About Us</Link></li>
            <li><Link href="/services" className="hover:text-brand-600">Services</Link></li>
            <li><Link href="/contact" className="hover:text-brand-600">Contact Us</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-display text-base font-bold text-ink">Services</h3>
          <ul className="mt-4 space-y-2 text-sm text-ink/70">
            {services.slice(0, 5).map((s) => (
              <li key={s.slug}>
                <Link href={`/services#${s.slug}`} className="hover:text-brand-600">
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-display text-base font-bold text-ink">Get In Touch</h3>
          <ul className="mt-4 space-y-3 text-sm text-ink/70">
            <li className="flex items-start gap-2">
              <IconMapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-500" /> {company.address}
            </li>
            <li className="flex items-center gap-2">
              <IconPhone className="h-4 w-4 shrink-0 text-brand-500" />
              <a href={company.phoneHref} className="hover:text-brand-600">{company.phone}</a>
            </li>
            <li className="flex items-center gap-2">
              <IconMail className="h-4 w-4 shrink-0 text-brand-500" />
              <a href={`mailto:${company.email}`} className="hover:text-brand-600">{company.email}</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-black/5">
        <div className="container-wide flex flex-col items-center justify-between gap-2 py-6 text-xs text-ink/60 sm:flex-row">
          <p>© {new Date().getFullYear()} Antlar Elite Services. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span>Nairobi, Kenya</span>
            <Link href="/admin" className="hover:text-brand-600">Admin</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
