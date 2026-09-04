"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { IconArrowRight, IconDownload, IconTrashSmall } from "@/components/Icons";
import { downloadInvoicePdf } from "@/lib/generateInvoicePdf";

const STATUS_OPTIONS = ["draft", "sent", "paid"];
const STATUS_STYLES = {
  draft: "bg-gray-100 text-gray-600",
  sent: "bg-amber-100 text-amber-700",
  paid: "bg-green-100 text-green-700",
};

const emptyLineItem = () => ({ description: "", quantity: 1, unitPrice: 0 });

const emptyForm = {
  clientId: "",
  clientName: "",
  clientEmail: "",
  clientPhone: "",
  clientAddress: "",
  items: [emptyLineItem()],
  tax: 0,
  notes: "",
  status: "draft",
  dueDate: "",
};

function formatKES(amount) {
  return `KES ${Number(amount || 0).toLocaleString("en-KE", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

export default function InvoicesDashboard() {
  const router = useRouter();
  const [invoices, setInvoices] = useState([]);
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [menuOpenId, setMenuOpenId] = useState(null);
  const [modal, setModal] = useState(null); // "add" | "edit" | null
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [clientMode, setClientMode] = useState("existing"); // "existing" | "manual"
  const menuRef = useRef(null);

  useEffect(() => {
    loadInvoices();
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

  async function loadInvoices() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/invoices");
      if (res.status === 401) {
        router.push("/admin");
        return;
      }
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Could not load invoices.");
      setInvoices(data.invoices || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function loadClients() {
    try {
      const res = await fetch("/api/clients");
      if (!res.ok) return;
      const data = await res.json();
      setClients(data.clients || []);
    } catch {
      // Non-fatal — manual entry still works if this fails.
    }
  }

  function openAddModal() {
    setForm(emptyForm);
    setEditingId(null);
    setClientMode(clients.length ? "existing" : "manual");
    setModal("add");
  }

  function openEditModal(invoice) {
    setForm({
      clientId: invoice.client_id || "",
      clientName: invoice.client_name || "",
      clientEmail: invoice.client_email || "",
      clientPhone: invoice.client_phone || "",
      clientAddress: invoice.client_address || "",
      items: Array.isArray(invoice.items) && invoice.items.length ? invoice.items : [emptyLineItem()],
      tax: invoice.tax || 0,
      notes: invoice.notes || "",
      status: invoice.status || "draft",
      dueDate: invoice.due_date || "",
    });
    setEditingId(invoice.id);
    setClientMode(invoice.client_id ? "existing" : "manual");
    setModal("edit");
    setMenuOpenId(null);
  }

  function handleClientPick(clientId) {
    const client = clients.find((c) => c.id === clientId);
    setForm((f) => ({
      ...f,
      clientId,
      clientName: client?.name || "",
      clientEmail: client?.email || "",
      clientPhone: client?.phone || "",
    }));
  }

  function updateLineItem(index, key, value) {
    setForm((f) => {
      const items = [...f.items];
      items[index] = { ...items[index], [key]: value };
      return { ...f, items };
    });
  }

  function addLineItem() {
    setForm((f) => ({ ...f, items: [...f.items, emptyLineItem()] }));
  }

  function removeLineItem(index) {
    setForm((f) => ({ ...f, items: f.items.filter((_, i) => i !== index) }));
  }

  const subtotal = useMemo(
    () => form.items.reduce((sum, i) => sum + Number(i.quantity || 0) * Number(i.unitPrice || 0), 0),
    [form.items]
  );
  const total = subtotal + Number(form.tax || 0);

  async function handleDelete(invoice) {
    setMenuOpenId(null);
    if (!confirm(`Delete invoice ${invoice.invoice_number}? This can't be undone.`)) return;

    const previous = invoices;
    setInvoices((list) => list.filter((i) => i.id !== invoice.id));
    const res = await fetch(`/api/invoices/${invoice.id}`, { method: "DELETE" });
    if (!res.ok) {
      setInvoices(previous);
      alert("Could not delete this invoice. Please try again.");
    }
  }

  async function handleSave(e) {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = {
        clientId: clientMode === "existing" ? form.clientId || null : null,
        clientName: form.clientName,
        clientEmail: form.clientEmail,
        clientPhone: form.clientPhone,
        clientAddress: form.clientAddress,
        items: form.items.filter((i) => i.description.trim() !== ""),
        tax: Number(form.tax || 0),
        notes: form.notes,
        status: form.status,
        dueDate: form.dueDate,
      };

      if (payload.items.length === 0) {
        throw new Error("Add at least one line item.");
      }

      if (modal === "add") {
        const res = await fetch("/api/invoices", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Could not create invoice.");
        setInvoices((list) => [data.invoice, ...list]);
      } else {
        const res = await fetch(`/api/invoices/${editingId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Could not update invoice.");
        setInvoices((list) => list.map((i) => (i.id === editingId ? data.invoice : i)));
      }
      setModal(null);
    } catch (err) {
      alert(err.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-ink">Invoices</h1>
          <p className="mt-1 text-sm text-ink/60">
            Create an invoice for an existing client or a one-off customer, then download it as
            a PDF to send yourself.
          </p>
        </div>
        <button onClick={openAddModal} type="button" className="btn-primary">
          New Invoice <IconArrowRight className="h-4 w-4" />
        </button>
      </div>

      <div className="mt-6 overflow-hidden rounded-xl2 bg-white shadow-soft">
        {loading ? (
          <p className="p-8 text-center text-sm text-ink/60">Loading invoices...</p>
        ) : error ? (
          <p className="p-8 text-center text-sm text-red-600">{error}</p>
        ) : invoices.length === 0 ? (
          <div className="p-12 text-center">
            <p className="font-display text-lg font-bold text-ink">No invoices yet</p>
            <p className="mt-1 text-sm text-ink/60">Create your first invoice to get started.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead className="bg-brand-50 text-xs uppercase tracking-wide text-ink/50">
                <tr>
                  <th className="px-5 py-3">Invoice #</th>
                  <th className="px-5 py-3">Client</th>
                  <th className="px-5 py-3">Total</th>
                  <th className="px-5 py-3">Status</th>
                  <th className="px-5 py-3">Issued</th>
                  <th className="px-5 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/5">
                {invoices.map((invoice) => (
                  <tr key={invoice.id} className="align-top">
                    <td className="px-5 py-4 font-display font-bold text-ink">{invoice.invoice_number}</td>
                    <td className="px-5 py-4 text-ink/70">
                      <p className="font-semibold text-ink">{invoice.client_name}</p>
                      {invoice.client_phone && <p className="text-xs text-ink/50">{invoice.client_phone}</p>}
                    </td>
                    <td className="px-5 py-4 text-ink/70">{formatKES(invoice.total)}</td>
                    <td className="px-5 py-4">
                      <span className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${STATUS_STYLES[invoice.status] || "bg-gray-100 text-gray-600"}`}>
                        {invoice.status}
                      </span>
                    </td>
                    <td className="px-5 py-4 whitespace-nowrap text-ink/60">
                      {invoice.issue_date
                        ? new Date(invoice.issue_date).toLocaleDateString("en-KE", { day: "2-digit", month: "short", year: "numeric" })
                        : "—"}
                    </td>
                    <td className="relative px-5 py-4 text-right">
                      <button
                        type="button"
                        onClick={() => setMenuOpenId(menuOpenId === invoice.id ? null : invoice.id)}
                        className="grid h-8 w-8 place-items-center rounded-full text-ink/60 hover:bg-brand-50"
                        aria-label="Row actions"
                      >
                        &#8942;
                      </button>
                      {menuOpenId === invoice.id && (
                        <div ref={menuRef} className="absolute right-5 z-10 mt-1 w-44 overflow-hidden rounded-xl border border-black/5 bg-white text-left shadow-soft">
                          <button
                            type="button"
                            onClick={() => {
                              downloadInvoicePdf(invoice);
                              setMenuOpenId(null);
                            }}
                            className="flex w-full items-center gap-2 px-4 py-2.5 text-sm text-ink hover:bg-brand-50"
                          >
                            <IconDownload className="h-4 w-4" /> Download PDF
                          </button>
                          <button
                            type="button"
                            onClick={() => openEditModal(invoice)}
                            className="block w-full px-4 py-2.5 text-sm text-ink hover:bg-brand-50"
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDelete(invoice)}
                            className="flex w-full items-center gap-2 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50"
                          >
                            <IconTrashSmall className="h-4 w-4" /> Delete
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
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/40 p-4">
          <div className="my-8 w-full max-w-2xl rounded-xl2 bg-white p-6 shadow-soft sm:p-8">
            <h2 className="font-display text-xl font-bold text-ink">
              {modal === "add" ? "New Invoice" : "Edit Invoice"}
            </h2>

            <form onSubmit={handleSave} className="mt-5 space-y-5">
              <div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setClientMode("existing")}
                    className={`rounded-full px-4 py-1.5 text-xs font-semibold ${clientMode === "existing" ? "bg-brand-500 text-white" : "bg-brand-50 text-brand-700"}`}
                  >
                    Existing Client
                  </button>
                  <button
                    type="button"
                    onClick={() => setClientMode("manual")}
                    className={`rounded-full px-4 py-1.5 text-xs font-semibold ${clientMode === "manual" ? "bg-brand-500 text-white" : "bg-brand-50 text-brand-700"}`}
                  >
                    New / One-off Customer
                  </button>
                </div>

                {clientMode === "existing" ? (
                  <label className="mt-3 block">
                    <span className="text-sm font-semibold text-ink">Select Client</span>
                    <select
                      value={form.clientId}
                      onChange={(e) => handleClientPick(e.target.value)}
                      className="mt-2 w-full rounded-xl border border-black/10 bg-sand px-4 py-2.5 text-sm focus:border-brand-500 focus:outline-none"
                    >
                      <option value="">Choose a client from your contacts...</option>
                      {clients.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.name} {c.phone ? `— ${c.phone}` : ""}
                        </option>
                      ))}
                    </select>
                  </label>
                ) : null}

                <div className="mt-3 grid gap-4 sm:grid-cols-2">
                  <label className="block">
                    <span className="text-sm font-semibold text-ink">Client Name</span>
                    <input
                      required
                      value={form.clientName}
                      onChange={(e) => setForm({ ...form, clientName: e.target.value })}
                      className="mt-2 w-full rounded-xl border border-black/10 bg-sand px-4 py-2.5 text-sm focus:border-brand-500 focus:outline-none"
                    />
                  </label>
                  <label className="block">
                    <span className="text-sm font-semibold text-ink">Phone</span>
                    <input
                      value={form.clientPhone}
                      onChange={(e) => setForm({ ...form, clientPhone: e.target.value })}
                      className="mt-2 w-full rounded-xl border border-black/10 bg-sand px-4 py-2.5 text-sm focus:border-brand-500 focus:outline-none"
                    />
                  </label>
                  <label className="block">
                    <span className="text-sm font-semibold text-ink">Email</span>
                    <input
                      type="email"
                      value={form.clientEmail}
                      onChange={(e) => setForm({ ...form, clientEmail: e.target.value })}
                      className="mt-2 w-full rounded-xl border border-black/10 bg-sand px-4 py-2.5 text-sm focus:border-brand-500 focus:outline-none"
                    />
                  </label>
                  <label className="block">
                    <span className="text-sm font-semibold text-ink">Address (optional)</span>
                    <input
                      value={form.clientAddress}
                      onChange={(e) => setForm({ ...form, clientAddress: e.target.value })}
                      className="mt-2 w-full rounded-xl border border-black/10 bg-sand px-4 py-2.5 text-sm focus:border-brand-500 focus:outline-none"
                    />
                  </label>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-ink">Line Items</span>
                  <button type="button" onClick={addLineItem} className="text-xs font-semibold text-brand-600 hover:underline">
                    + Add item
                  </button>
                </div>
                <div className="mt-2 space-y-2">
                  {form.items.map((item, index) => (
                    <div key={index} className="grid grid-cols-12 items-center gap-2">
                      <input
                        placeholder="Description"
                        value={item.description}
                        onChange={(e) => updateLineItem(index, "description", e.target.value)}
                        className="col-span-6 rounded-xl border border-black/10 bg-sand px-3 py-2 text-sm focus:border-brand-500 focus:outline-none"
                      />
                      <input
                        type="number"
                        min="0"
                        placeholder="Qty"
                        value={item.quantity}
                        onChange={(e) => updateLineItem(index, "quantity", e.target.value)}
                        className="col-span-2 rounded-xl border border-black/10 bg-sand px-3 py-2 text-sm focus:border-brand-500 focus:outline-none"
                      />
                      <input
                        type="number"
                        min="0"
                        placeholder="Unit Price (KES)"
                        value={item.unitPrice}
                        onChange={(e) => updateLineItem(index, "unitPrice", e.target.value)}
                        className="col-span-3 rounded-xl border border-black/10 bg-sand px-3 py-2 text-sm focus:border-brand-500 focus:outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => removeLineItem(index)}
                        className="col-span-1 grid h-9 w-9 place-items-center rounded-full text-red-500 hover:bg-red-50"
                        aria-label="Remove item"
                      >
                        &times;
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <label className="block">
                  <span className="text-sm font-semibold text-ink">Tax (KES)</span>
                  <input
                    type="number"
                    min="0"
                    value={form.tax}
                    onChange={(e) => setForm({ ...form, tax: e.target.value })}
                    className="mt-2 w-full rounded-xl border border-black/10 bg-sand px-4 py-2.5 text-sm focus:border-brand-500 focus:outline-none"
                  />
                </label>
                <label className="block">
                  <span className="text-sm font-semibold text-ink">Due Date</span>
                  <input
                    type="date"
                    value={form.dueDate}
                    onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
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
                <span className="text-sm font-semibold text-ink">Notes (optional)</span>
                <textarea
                  rows={2}
                  value={form.notes}
                  onChange={(e) => setForm({ ...form, notes: e.target.value })}
                  className="mt-2 w-full rounded-xl border border-black/10 bg-sand px-4 py-2.5 text-sm focus:border-brand-500 focus:outline-none"
                  placeholder="Payment instructions, thank-you note, etc."
                />
              </label>

              <div className="rounded-xl bg-brand-50 p-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-ink/70">Subtotal</span>
                  <span className="font-semibold text-ink">{formatKES(subtotal)}</span>
                </div>
                <div className="mt-1 flex justify-between">
                  <span className="text-ink/70">Tax</span>
                  <span className="font-semibold text-ink">{formatKES(form.tax)}</span>
                </div>
                <div className="mt-2 flex justify-between border-t border-black/10 pt-2 font-display text-base font-bold text-ink">
                  <span>Total</span>
                  <span>{formatKES(total)}</span>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button type="button" onClick={() => setModal(null)} className="btn-secondary !px-5 !py-2.5">
                  Cancel
                </button>
                <button type="submit" disabled={saving} className="btn-primary !px-5 !py-2.5 disabled:opacity-60">
                  {saving ? "Saving..." : "Save Invoice"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
