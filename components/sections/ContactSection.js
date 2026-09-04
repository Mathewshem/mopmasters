"use client";

import { useState } from "react";
import QuoteEstimator from "./QuoteEstimator";
import { IconArrowRight, IconMapPin, IconPhone, IconMail, IconClock } from "../Icons";
import { company } from "@/lib/siteData";

const initialForm = { name: "", email: "", phone: "", service: "Home Cleaning", message: "" };

export default function ContactSection() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const [errorMsg, setErrorMsg] = useState("");

  function handleUseQuote({ type, complexity, sqft, total }) {
    setForm((f) => ({
      ...f,
      service: type,
      message: `Requesting a ${complexity.toLowerCase()} for approximately ${sqft} sq ft. Estimated total: KES ${total.toLocaleString(
        "en-KE"
      )}.`,
    }));
    document.getElementById("contact-form")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong.");
      setStatus("sent");
      setForm(initialForm);
    } catch (err) {
      setStatus("error");
      setErrorMsg(err.message);
    }
  }

  return (
    <div className="space-y-16">
      <QuoteEstimator onUseQuote={handleUseQuote} />

      <div id="contact-form" className="grid gap-10 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <span className="eyebrow">Contact Us</span>
          <h2 className="section-heading mt-4">Let&apos;s Get Your Space Spotless</h2>
          <p className="mt-3 text-ink/70">
            Send us your details and our team will get back to you with a confirmed quote and
            booking time — usually within a few hours.
          </p>

          <ul className="mt-8 space-y-4 text-sm text-ink/80">
            <li className="flex items-start gap-3">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-brand-500 text-white">
                <IconMapPin className="h-4 w-4" />
              </span>
              {company.address}
            </li>
            <li className="flex items-start gap-3">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-brand-500 text-white">
                <IconPhone className="h-4 w-4" />
              </span>
              <a href={company.phoneHref} className="hover:text-brand-600">{company.phone}</a>
            </li>
            <li className="flex items-start gap-3">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-brand-500 text-white">
                <IconMail className="h-4 w-4" />
              </span>
              <a href={`mailto:${company.email}`} className="hover:text-brand-600">{company.email}</a>
            </li>
            <li className="flex items-start gap-3">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-brand-500 text-white">
                <IconClock className="h-4 w-4" />
              </span>
              {company.hours}
            </li>
          </ul>
        </div>

        <form onSubmit={handleSubmit} className="card lg:col-span-3">
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="block">
              <span className="text-sm font-semibold text-ink">Full Name</span>
              <input
                required
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="mt-2 w-full rounded-xl border border-black/10 bg-sand px-4 py-3 text-sm focus:border-brand-500 focus:outline-none"
                placeholder="Jane Wanjiru"
              />
            </label>
            <label className="block">
              <span className="text-sm font-semibold text-ink">Phone Number</span>
              <input
                required
                type="tel"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="mt-2 w-full rounded-xl border border-black/10 bg-sand px-4 py-3 text-sm focus:border-brand-500 focus:outline-none"
                placeholder="07XX XXX XXX"
              />
            </label>
          </div>

          <label className="mt-5 block">
            <span className="text-sm font-semibold text-ink">Email Address</span>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="mt-2 w-full rounded-xl border border-black/10 bg-sand px-4 py-3 text-sm focus:border-brand-500 focus:outline-none"
              placeholder="jane@example.com"
            />
          </label>

          <label className="mt-5 block">
            <span className="text-sm font-semibold text-ink">Service Needed</span>
            <select
              value={form.service}
              onChange={(e) => setForm({ ...form, service: e.target.value })}
              className="mt-2 w-full rounded-xl border border-black/10 bg-sand px-4 py-3 text-sm focus:border-brand-500 focus:outline-none"
            >
              <option>Home Cleaning</option>
              <option>Office Cleaning</option>
              <option>Deep Cleaning</option>
              <option>Move-In / Move-Out</option>
              <option>Window & Glass Cleaning</option>
              <option>Post-Construction</option>
            </select>
          </label>

          <label className="mt-5 block">
            <span className="text-sm font-semibold text-ink">Message</span>
            <textarea
              rows={4}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="mt-2 w-full rounded-xl border border-black/10 bg-sand px-4 py-3 text-sm focus:border-brand-500 focus:outline-none"
              placeholder="Tell us about your space and preferred date..."
            />
          </label>

          <button type="submit" disabled={status === "sending"} className="btn-primary mt-6 w-full justify-center disabled:opacity-60">
            {status === "sending" ? "Sending..." : "Send Request"} <IconArrowRight className="h-4 w-4" />
          </button>

          {status === "sent" && (
            <p className="mt-4 rounded-xl bg-brand-50 px-4 py-3 text-sm font-semibold text-brand-700">
              Thank you! Your request has been received — we&apos;ll be in touch shortly.
            </p>
          )}
          {status === "error" && (
            <p className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-600">
              {errorMsg || "Something went wrong. Please call or WhatsApp us instead."}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
