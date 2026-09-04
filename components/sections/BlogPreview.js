import Link from "next/link";
import { blogPosts } from "@/lib/siteData";
import { IconArrowRight, IconArrowUpRight, IconSparkle } from "../Icons";

export default function BlogPreview({ full = false }) {
  const list = full ? blogPosts : blogPosts.slice(0, 3);

  return (
    <section className="py-16 sm:py-24">
      <div className="container-wide">
        {!full && (
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <span className="eyebrow">Cleaning Tips & Tricks</span>
              <h2 className="section-heading mt-4 max-w-xl">
                Professional Advice for a Cleaner, Healthier Home
              </h2>
            </div>
            <Link href="/blog" className="btn-primary">
              View More Blog <IconArrowRight className="h-4 w-4" />
            </Link>
          </div>
        )}

        <div className={`grid gap-6 ${full ? "sm:grid-cols-2 lg:grid-cols-3" : "mt-10 sm:grid-cols-2 lg:grid-cols-3"}`}>
          {list.map((post) => (
            <article key={post.slug} className="group card overflow-hidden !p-0">
              <div className="relative flex h-44 items-center justify-center bg-gradient-to-br from-brand-500 to-leaf-500">
                <IconSparkle className="h-12 w-12 text-white/80" />
                <span className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full bg-white text-brand-600 transition group-hover:bg-ink group-hover:text-white">
                  <IconArrowUpRight className="h-4 w-4" />
                </span>
              </div>
              <div className="p-6">
                <p className="text-xs text-ink/50">
                  {post.date} · {post.author}
                </p>
                <h3 className="mt-2 font-display text-lg font-bold text-ink">{post.title}</h3>
                <p className="mt-2 text-sm text-ink/60">{post.excerpt}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
