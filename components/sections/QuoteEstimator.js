"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { images } from "@/lib/siteData";

const RATES_PER_SQFT = {
  "Home Cleaning": { "Standard Cleaning": 25, "Deep Cleaning": 40 },
  "Office Cleaning": { "Standard Cleaning": 20, "Deep Cleaning": 35 },
  "Move-In / Move-Out": { "Standard Cleaning": 35, "Deep Cleaning": 50 },
  "Post-Construction": { "Standard Cleaning": 45, "Deep Cleaning": 65 },
};

const MINIMUM_CHARGE = 2500;

function formatKES(amount) {
  return `KES ${amount.toLocaleString("en-KE")}`;
}

export default function QuoteEstimator({ onUseQuote }) {
  const [type, setType] = useState("Home Cleaning");
  const [complexity, setComplexity] = useState("Deep Cleaning");
  const [sqft, setSqft] = useState(90);

  const total = useMemo(() => {
    const rate = RATES_PER_SQFT[type][complexity];
    return Math.max(MINIMUM_CHARGE, Math.round(sqft * rate));
  }, [type, complexity, sqft]);

  return (
    <div className="card grid gap-8 !p-8 lg:grid-cols-2 lg:items-center">
      <div>
        <h3 className="font-display text-2xl font-bold text-ink">Get a Quick Estimate</h3>
        <p className="mt-2 text-sm text-ink/60">
          Ballpark pricing in Kenyan Shillings. Have questions or ready to book? Reach out and
          we&apos;ll confirm the exact quote for your space.
        </p>

        <div className="mt-6 space-y-5">
          <label className="block">
            <span className="text-sm font-semibold text-ink">Type of Cleaning</span>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="mt-2 w-full rounded-xl border border-black/10 bg-sand px-4 py-3 text-sm text-ink focus:border-brand-500 focus:outline-none"
            >
              {Object.keys(RATES_PER_SQFT).map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className="text-sm font-semibold text-ink">Complexity</span>
            <select
              value={complexity}
              onChange={(e) => setComplexity(e.target.value)}
              className="mt-2 w-full rounded-xl border border-black/10 bg-sand px-4 py-3 text-sm text-ink focus:border-brand-500 focus:outline-none"
            >
              <option>Standard Cleaning</option>
              <option>Deep Cleaning</option>
            </select>
          </label>

          <label className="block">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-ink">Square Footage</span>
              <span className="rounded-full bg-brand-500 px-2.5 py-0.5 text-xs font-bold text-white">
                {sqft}
              </span>
            </div>
            <input
              type="range"
              min={20}
              max={500}
              step={10}
              value={sqft}
              onChange={(e) => setSqft(Number(e.target.value))}
              className="mt-3 w-full accent-brand-500"
            />
          </label>
        </div>

        <button
          type="button"
          onClick={() => onUseQuote?.({ type, complexity, sqft, total })}
          className="btn-primary mt-6 w-full justify-between !px-6"
        >
          <span>Use This Quote</span>
          <span>{formatKES(total)}</span>
        </button>
      </div>

      <div className="hidden overflow-hidden rounded-xl2 lg:block">
        <Image
          src={images.contactHero}
          alt="MopMasters cleaner ready to help"
          width={700}
          height={800}
          className="h-full w-full object-cover"
        />
      </div>
    </div>
  );
}
