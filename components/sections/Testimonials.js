import { testimonials } from "@/lib/siteData";
import { IconStar, IconQuote } from "../Icons";
import { InitialAvatar } from "../Illustrations";

export default function Testimonials({ full = false }) {
  const list = full ? testimonials : testimonials.slice(0, 3);

  return (
    <section className="bg-ink py-16 sm:py-24">
      <div className="container-wide">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow mx-auto bg-brand-500/20 text-brand-300">Testimonials</span>
          <h2 className="mt-4 font-display text-3xl font-bold text-white sm:text-4xl">
            Happy Customers, Clean Spaces
          </h2>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((t) => (
            <figure key={t.name} className="card">
              <IconQuote className="h-6 w-6 text-brand-300" />
              <div className="mt-3 flex text-yellow-400">
                {Array.from({ length: 5 }).map((_, i) => (
                  <IconStar key={i} className="h-4 w-4" />
                ))}
              </div>
              <blockquote className="mt-3 text-sm text-ink/75">&ldquo;{t.quote}&rdquo;</blockquote>
              <figcaption className="mt-5 flex items-center gap-3 border-t border-black/5 pt-4">
                <InitialAvatar name={t.name} className="h-10 w-10" />
                <div>
                  <p className="font-display text-sm font-bold text-ink">{t.name}</p>
                  <p className="text-xs text-ink/50">{t.role}</p>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
