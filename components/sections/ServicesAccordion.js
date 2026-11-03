"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { services, images } from "@/lib/siteData";
import { IconArrowUpRight, IconCheck } from "../Icons";
import {
  IconBroom,
  IconBuilding,
  IconSparkle,
  IconBox,
  IconWindow,
  IconHardHat,
  IconBug,
  IconTrash,
  IconTree,
} from "../Icons";

const ICONS = {
  "residential-cleaning": IconBroom,
  "commercial-office-cleaning": IconBuilding,
  "deep-cleaning": IconSparkle,
  "move-in-move-out-cleaning": IconBox,
  "window-glass-cleaning": IconWindow,
  "post-construction-cleaning": IconHardHat,
  fumigation: IconBug,
  "janitorial-bin-provision": IconTrash,
  landscaping: IconTree,
};

export default function ServicesAccordion({ full = false }) {
  const [openSlug, setOpenSlug] = useState(services[1].slug);
  const list = full ? services : services.slice(0, 5);

  return (
    <div className="mt-10 divide-y divide-black/5">
      {list.map((service) => {
        const isOpen = openSlug === service.slug;
        const Icon = ICONS[service.slug];
        return (
          <div key={service.slug} id={service.slug} className={isOpen ? "rounded-xl2 bg-brand-50 px-4 py-6 sm:px-6" : "px-4 py-6 sm:px-6"}>
            <button
              type="button"
              onClick={() => setOpenSlug(isOpen ? null : service.slug)}
              className="flex w-full items-center justify-between gap-4 text-left"
            >
              <span className="flex items-center gap-4">
                <span className="font-display text-sm font-bold text-brand-500">{service.number}</span>
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-brand-500 text-white">
                  <Icon className="h-5 w-5" />
                </span>
                <span className="font-display text-lg font-bold text-ink sm:text-xl">
                  {service.title}
                </span>
              </span>
              <IconArrowUpRight className={`h-5 w-5 shrink-0 text-ink/60 transition ${isOpen ? "rotate-180" : ""}`} />
            </button>

            {isOpen && (
              <div className="mt-4 pl-0 sm:pl-[88px]">
                <p className="max-w-2xl text-ink/70">{service.description}</p>
                <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                  {service.bullets.map((b) => (
                    <li key={b} className="flex items-center gap-2 text-sm text-ink/80">
                      <IconCheck className="h-4 w-4 shrink-0 text-brand-500" /> {b}
                    </li>
                  ))}
                </ul>
                <div className="mt-5 overflow-hidden rounded-xl2 max-w-2xl">
                  <Image
                    src={images.homeService}
                    alt={`${service.title} by Antlar`}
                    width={900}
                    height={420}
                    className="h-56 w-full object-cover"
                  />
                </div>
                <Link href="/contact" className="btn-primary mt-5">
                  Get a Quote
                </Link>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
