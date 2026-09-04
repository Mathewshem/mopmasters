import Link from "next/link";
import { pricingPlans } from "@/lib/siteData";
import { IconArrowRight, IconCheck, IconMedal } from "../Icons";

const TIER_STYLES = {
  bronze: { badge: "bg-amber-100 text-amber-700", ring: "text-amber-500" },
  silver: { badge: "bg-slate-200 text-slate-700", ring: "text-slate-400" },
  gold: { badge: "bg-yellow-100 text-yellow-700", ring: "text-yellow-500" },
};

export default function Pricing() {
  return (
    <section className="bg-white py-16 sm:py-24">
      <div className="container-wide">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow mx-auto">Our Pricing Plans</span>
          <h2 className="section-heading mt-4">Flexible Plans for Every Home</h2>
          <p className="mt-3 text-ink/70">
            Choose the tier that fits your space — Bronze, Silver or Gold. Contact us for a
            tailored quote in Kenyan Shillings.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {pricingPlans.map((plan) => {
            const style = TIER_STYLES[plan.tier] || TIER_STYLES.bronze;
            return (
              <div
                key={plan.name}
                className={`rounded-xl2 border-2 p-8 ${
                  plan.highlighted ? "border-brand-500 bg-brand-50 shadow-soft" : "border-black/5 bg-sand"
                }`}
              >
                <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide ${style.badge}`}>
                  <IconMedal className={`h-4 w-4 ${style.ring}`} /> {plan.tier}
                </span>
                <h3 className="mt-4 font-display text-xl font-bold text-ink">{plan.name}</h3>
                <p className="mt-2 text-sm text-ink/60">{plan.description}</p>
                <ul className="mt-6 space-y-3">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-ink/80">
                      <IconCheck className="mt-0.5 h-4 w-4 shrink-0 text-brand-500" /> {f}
                    </li>
                  ))}
                </ul>
                <p className="mt-8 font-display text-lg font-bold text-ink">
                  Contact Us for Pricing
                </p>
                <Link
                  href="/contact"
                  className={plan.highlighted ? "btn-primary mt-4 w-full justify-center" : "btn-secondary mt-4 w-full justify-center"}
                >
                  Get a Quote <IconArrowRight className="h-4 w-4" />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
