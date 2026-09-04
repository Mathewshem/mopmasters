"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  IconArrowRight,
  IconPhone,
  IconMail,
} from "@/components/Icons";

const STATUS_OPTIONS = ["new", "contacted", "booked", "completed", "cancelled"];

const STATUS_STYLES = {
  new: "bg-brand-100 text-brand-700",
  contacted: "bg-amber-100 text-amber-700",
  booked: "bg-blue-100 text-blue-700",
  completed: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-600",
};

const emptyForm = { name: "", email: "", phone: "", service: "", message: "", status: "new" };

export default function ClientsDashboard() {
  const router = useRouter();
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [menuOpenId, setMenuOpenId] = useState(null);
  const [modal, setModal] = useState(null); // "add" | "edit" | null
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [saving, setSaving] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    loadClients();
  }, []);

  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpenId(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  async function loadClients() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/clients");
      if (res.status === 401) {
        router.push("/admin");
        return;
      }
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Could not load clients.");
      setClients(data.clients || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  function openAddModal() {
    setForm(emptyForm);
    setEditingId(null);
    setModal("add");
  }

  function openEditModal(client) {
    setForm({
      name: client.name || "",
      email: client.email || "",
      phone: client.phone || "",
      service: client.service || "",
      message: client.message || "",
      status: client.status || "new",
    });
    setEditingId(client.id);
    setModal("edit");
    setMenuOpenId(null);
  }

  async function handleDelete(client) {
    setMenuOpenId(null);
    if (!confirm(`Delete ${client.name}? This can't be undone.`)) return;

    const previous = clients;
    setClients((cs) => cs.filter((c) => c.id !== client.id));
    const res = await fetch(`/api/clients/${client.id}`, { method: "DELETE" });
    if (!res.ok) {
      setClients(previous);
      alert("Could not delete this client. Please try again.");
    }
  }

  async function handleSave(e) {
    e.preventDefault();
    setSaving(true);
    try {
      if (modal === "add") {
        const res = await fetch("/api/clients", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Could not add client.");
        setClients((cs) => [data.client, ...cs]);
      } else {
        const res = await fetch(`/api/clients/${editingId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Could not update client.");
        setClients((cs) => cs.map((c) => (c.id === editingId ? data.client : c)));
      }
      setModal(null);
    } catch (err) {
      alert(err.message);
    } finally {
      setSaving(false);
    }
  }

  const filtered = useMemo(() => {
    if (!query.trim()) return clients;
    const q = query.toLowerCase();
    return clients.filter(
      (c) =>
        c.name?.toLowerCase().includes(q) ||
        c.email?.toLowerCase().includes(q) ||
        c.phone?.toLowerCase().includes(q) ||
        c.service?.toLowerCase().includes(q)
    );
  }, [clients, query]);

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-ink">Client Enquiries</h1>
          <p className="mt-1 text-sm text-ink/60">
            Every booking request from the website lands here. Add walk-in or phone clients
            manually too.
          </p>
        </div>
        <button onClick={openAddModal} type="button" className="btn-primary">
          Add Client <IconArrowRight className="h-4 w-4" />
        </button>
      </div>

      <div className="mt-6">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by name, phone, email or service..."
          className="w-full max-w-md rounded-xl border border-black/10 bg-white px-4 py-3 text-sm focus:border-brand-500 focus:outline-none"
        />
      </div>

      <div className="mt-6 overflow-hidden rounded-xl2 bg-white shadow-soft">
        {loading ? (
          <p className="p-8 text-center text-sm text-ink/60">Loading clients...</p>
        ) : error ? (
          <p className="p-8 text-center text-sm text-red-600">{error}</p>
        ) : filtered.length === 0 ? (
          <div className="p-12 text-center">
            <p className="font-display text-lg font-bold text-ink">No clients yet</p>
            <p className="mt-1 text-sm text-ink/60">
              New booking requests from your contact page will show up here automatically.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead className="bg-brand-50 text-xs uppercase tracking-wide text-ink/50">
                <tr>
                  <th className="px-5 py-3">Client</th>
                  <th className="px-5 py-3">Contact</th>
                  <th className="px-5 py-3">Service</th>
                  <th className="px-5 py-3">Status</th>
                  <th className="px-5 py-3">Received</th>
                  <th className="px-5 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/5">
                {filtered.map((client) => (
                  <tr key={client.id} className="align-top">
                    <td className="px-5 py-4">
                      <p className="font-display font-bold text-ink">{client.name}</p>
                      {client.message && (
                        <p className="mt-1 max-w-xs truncate text-xs text-ink/50" title={client.message}>
                          {client.message}
                        </p>
                      )}
                    </td>
                    <td className="px-5 py-4 text-ink/70">
                      {client.phone && (
                        <p className="flex items-center gap-1.5">
                          <IconPhone className="h-3.5 w-3.5 text-brand-500" /> {client.phone}
                        </p>
                      )}
                      {client.email && (
                        <p className="mt-1 flex items-center gap-1.5">
                          <IconMail className="h-3.5 w-3.5 text-brand-500" /> {client.email}
                        </p>
                      )}
                    </td>
                    <td className="px-5 py-4 text-ink/70">{client.service || "—"}</td>
                    <td className="px-5 py-4">
                      <span className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${STATUS_STYLES[client.status] || "bg-gray-100 text-gray-600"}`}>
                        {client.status}
                      </span>
                    </td>
                    <td className="px-5 py-4 whitespace-nowrap text-ink/60">
                      {client.created_at ? new Date(client.created_at).toLocaleDateString("en-KE", { day: "2-digit", month: "short", year: "numeric" }) : "—"}
                    </td>
                    <td className="relative px-5 py-4 text-right">
                      <button
                        type="button"
                        onClick={() => setMenuOpenId(menuOpenId === client.id ? null : client.id)}
                        className="grid h-8 w-8 place-items-center rounded-full text-ink/60 hover:bg-brand-50"
                        aria-label="Row actions"
                      >
                        &#8942;
                      </button>
                      {menuOpenId === client.id && (
                        <div ref={menuRef} className="absolute right-5 z-10 mt-1 w-36 overflow-hidden rounded-xl border border-black/5 bg-white text-left shadow-soft">
                          <button
                            type="button"
                            onClick={() => openEditModal(client)}
                            className="block w-full px-4 py-2.5 text-sm text-ink hover:bg-brand-50"
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDelete(client)}
                            className="block w-full px-4 py-2.5 text-sm text-red-600 hover:bg-red-50"
                          >
                            Delete
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-lg rounded-xl2 bg-white p-6 shadow-soft sm:p-8">
            <h2 className="font-display text-xl font-bold text-ink">
              {modal === "add" ? "Add Client" : "Edit Client"}
            </h2>
            <form onSubmit={handleSave} className="mt-5 space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="text-sm font-semibold text-ink">Name</span>
                  <input
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="mt-2 w-full rounded-xl border border-black/10 bg-sand px-4 py-2.5 text-sm focus:border-brand-500 focus:outline-none"
                  />
                </label>
                <label className="block">
                  <span className="text-sm font-semibold text-ink">Phone</span>
                  <input
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="mt-2 w-full rounded-xl border border-black/10 bg-sand px-4 py-2.5 text-sm focus:border-brand-500 focus:outline-none"
                  />
                </label>
              </div>

              <label className="block">
                <span className="text-sm font-semibold text-ink">Email</span>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="mt-2 w-full rounded-xl border border-black/10 bg-sand px-4 py-2.5 text-sm focus:border-brand-500 focus:outline-none"
                />
              </label>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="text-sm font-semibold text-ink">Service</span>
                  <input
                    value={form.service}
                    onChange={(e) => setForm({ ...form, service: e.target.value })}
                    className="mt-2 w-full rounded-xl border border-black/10 bg-sand px-4 py-2.5 text-sm focus:border-brand-500 focus:outline-none"
                  />
                </label>
                <label className="block">
                  <span className="text-sm font-semibold text-ink">Status</span>
                  <select
                    value={form.status}
                    onChange={(e) => setForm({ ...form, status: e.target.value })}
                    className="mt-2 w-full rounded-xl border border-black/10 bg-sand px-4 py-2.5 text-sm capitalize focus:border-brand-500 focus:outline-none"
                  >
                    {STATUS_OPTIONS.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </label>
              </div>

              <label className="block">
                <span className="text-sm font-semibold text-ink">Notes / Message</span>
                <textarea
                  rows={3}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="mt-2 w-full rounded-xl border border-black/10 bg-sand px-4 py-2.5 text-sm focus:border-brand-500 focus:outline-none"
                />
              </label>

              <div className="flex justify-end gap-3 pt-2">
                <button type="button" onClick={() => setModal(null)} className="btn-secondary !px-5 !py-2.5">
                  Cancel
                </button>
                <button type="submit" disabled={saving} className="btn-primary !px-5 !py-2.5 disabled:opacity-60">
                  {saving ? "Saving..." : "Save Client"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
