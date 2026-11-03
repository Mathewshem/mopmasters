"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const TABS = [
  { href: "/admin/dashboard", label: "Clients" },
  { href: "/admin/dashboard/invoices", label: "Invoices" },
];

export default function AdminShell({ children }) {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin");
    router.refresh();
  }

  return (
    <div className="min-h-screen bg-brand-50">
      <header className="border-b border-black/5 bg-white">
        <div className="container-wide flex h-20 items-center justify-between">
          <div className="flex items-center gap-2">
            <Image src="/logo.png" alt="Antlar Elite Services logo" width={36} height={36} />
            <span className="font-display text-lg font-bold text-ink">Antlar Admin</span>
          </div>
          <button onClick={handleLogout} type="button" className="btn-secondary !px-4 !py-2 text-xs">
            Log Out
          </button>
        </div>
        <div className="container-wide flex gap-1 pb-0">
          {TABS.map((tab) => {
            const active = pathname === tab.href;
            return (
              <Link
                key={tab.href}
                href={tab.href}
                className={`border-b-2 px-4 py-3 font-display text-sm font-semibold transition ${
                  active ? "border-brand-500 text-brand-600" : "border-transparent text-ink/60 hover:text-ink"
                }`}
              >
                {tab.label}
              </Link>
            );
          })}
        </div>
      </header>

      <main className="container-wide py-10">{children}</main>
    </div>
  );
}
