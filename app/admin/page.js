"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { IconArrowRight, IconShield } from "@/components/Icons";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Login failed.");
      router.push("/admin/dashboard");
      router.refresh();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="flex min-h-[70vh] items-center justify-center bg-brand-50 px-4 py-16">
      <div className="card w-full max-w-sm text-center">
        <div className="mx-auto flex items-center justify-center gap-2">
          <Image src="/logo.png" alt="MopMasters logo" width={40} height={40} />
        </div>
        <div className="mx-auto mt-4 grid h-12 w-12 place-items-center rounded-full bg-brand-500 text-white">
          <IconShield className="h-6 w-6" />
        </div>
        <h1 className="mt-4 font-display text-xl font-bold text-ink">Admin Login</h1>
        <p className="mt-1 text-sm text-ink/60">Sign in to manage client enquiries.</p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4 text-left">
          <label className="block">
            <span className="text-sm font-semibold text-ink">Password</span>
            <input
              required
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-2 w-full rounded-xl border border-black/10 bg-sand px-4 py-3 text-sm focus:border-brand-500 focus:outline-none"
              placeholder="••••••••"
            />
          </label>

          {error && (
            <p className="rounded-xl bg-red-50 px-4 py-2 text-sm font-semibold text-red-600">{error}</p>
          )}

          <button type="submit" disabled={loading} className="btn-primary w-full justify-center disabled:opacity-60">
            {loading ? "Signing in..." : "Sign In"} <IconArrowRight className="h-4 w-4" />
          </button>
        </form>
      </div>
    </section>
  );
}
