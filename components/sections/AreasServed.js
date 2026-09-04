import { areasServed, company } from "@/lib/siteData";
import { IconMapPin, IconPhone, IconMail } from "../Icons";

export default function AreasServed() {
  return (
    <section className="py-16 sm:py-24">
      <div className="container-wide">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow mx-auto">Our Coverage</span>
          <h2 className="section-heading mt-4">Areas We Serve Across Kenya</h2>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {areasServed.map((area) => (
            <div key={area.name} className="card text-center">
              <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-brand-500 text-white">
                <IconMapPin className="h-6 w-6" />
              </div>
              <h3 className="mt-4 font-display text-lg font-bold text-ink">{area.name}</h3>
              <p className="mt-2 text-sm text-ink/60">{area.description}</p>
              <div className="mt-4 space-y-1 border-t border-black/5 pt-4 text-xs text-ink/60">
                <p className="flex items-center justify-center gap-1.5">
                  <IconPhone className="h-3.5 w-3.5 text-brand-500" /> {company.phone}
                </p>
                <p className="flex items-center justify-center gap-1.5">
                  <IconMail className="h-3.5 w-3.5 text-brand-500" /> {company.email}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
