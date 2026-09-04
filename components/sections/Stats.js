import { stats } from "@/lib/siteData";

export default function Stats() {
  return (
    <section className="container-wide -mt-8 relative z-10">
      <div className="grid grid-cols-2 gap-4 rounded-xl2 bg-white p-6 shadow-soft sm:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="text-center sm:text-left">
            <p className="text-xs font-semibold uppercase tracking-wide text-ink/50">{s.label}</p>
            <p className="mt-2 font-display text-3xl font-bold text-brand-600">{s.value}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
