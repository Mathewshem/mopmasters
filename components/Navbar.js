"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { navLinks, company } from "@/lib/siteData";
import { IconMenu, IconClose, IconPhone } from "./Icons";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-sand/90 backdrop-blur">
      <div className="container-wide flex h-20 items-center justify-between">
        <Link href="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
          <Image src="/logo.png" alt="Antlar Elite Services logo" width={48} height={48} priority />
          <span className="flex flex-col leading-tight">
            <span className="font-display text-xl font-bold tracking-tight text-brand-600 sm:text-2xl">
              Antlar <span className="text-leaf-500">Elite Services</span>
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`font-display text-sm font-semibold transition hover:text-brand-600 ${
                  active ? "text-brand-600" : "text-ink/80"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-500 text-white">
            <IconPhone className="h-5 w-5" />
          </div>
          <div className="leading-tight">
            <p className="text-xs text-ink/60">Call Now</p>
            <a href={company.phoneHref} className="font-display text-sm font-bold text-ink">
              {company.phone}
            </a>
          </div>
        </div>

        <button
          type="button"
          className="grid h-10 w-10 place-items-center rounded-full border border-black/10 text-ink lg:hidden"
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <IconClose className="h-5 w-5" /> : <IconMenu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-black/5 bg-sand lg:hidden">
          <nav className="container-wide flex flex-col gap-1 py-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-3 font-display text-sm font-semibold text-ink hover:bg-brand-50"
              >
                {link.label}
              </Link>
            ))}
            <a href={company.phoneHref} className="mt-2 btn-primary justify-center">
              <IconPhone className="h-4 w-4" /> {company.phone}
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
