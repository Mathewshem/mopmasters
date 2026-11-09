import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";
import { ADMIN_COOKIE_NAME, isValidAdminSession } from "@/lib/auth";

function checkAuth(request) {
  const cookie = request.cookies.get(ADMIN_COOKIE_NAME)?.value;
  return isValidAdminSession(cookie);
}

const PREFIX = "AES";

function formatInvoiceNumber(seq) {
  return `${PREFIX}-${new Date().getFullYear()}-${String(seq).padStart(4, "0")}`;
}

// Next sequence = highest existing number for this year + 1. (Counting rows
// breaks after any invoice is deleted and causes duplicate-number errors.)
async function nextSequence(supabase) {
  const year = new Date().getFullYear();
  const { data, error } = await supabase
    .from("invoices")
    .select("invoice_number")
    .like("invoice_number", `%-${year}-%`);
  if (error) throw error;
  let max = 0;
  for (const row of data || []) {
    const n = parseInt(String(row.invoice_number).split("-").pop(), 10);
    if (Number.isFinite(n) && n > max) max = n;
  }
  return max + 1;
}

function describeError(err) {
  const msg = err?.message || "Unknown error";
  if (err?.code === "42P01" || /does not exist|schema cache/i.test(msg)) {
    return "The invoices table is missing in Supabase. Run supabase/schema.sql in the Supabase SQL Editor.";
  }
  return msg;
}

export async function GET(request) {
  if (!checkAuth(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const supabase = getSupabaseAdmin();
    const { data, error } = await supabase
      .from("invoices")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;
    return NextResponse.json({ invoices: data });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: `Could not load invoices: ${describeError(err)}` }, { status: 500 });
  }
}

export async function POST(request) {
  if (!checkAuth(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json().catch(() => ({}));
  const {
    clientId,
    clientName,
    clientEmail,
    clientPhone,
    clientAddress,
    items,
    tax,
    notes,
    status,
    dueDate,
  } = body;

  if (!clientName || !Array.isArray(items) || items.length === 0) {
    return NextResponse.json(
      { error: "A client name and at least one line item are required." },
      { status: 400 }
    );
  }

  const subtotal = items.reduce(
    (sum, item) => sum + Number(item.quantity || 0) * Number(item.unitPrice || 0),
    0
  );
  const taxAmount = Number(tax || 0);
  const total = subtotal + taxAmount;

  try {
    const supabase = getSupabaseAdmin();

    let seq = await nextSequence(supabase);
    let data = null;
    let error = null;
    for (let attempt = 0; attempt < 5; attempt++) {
      ({ data, error } = await supabase
        .from("invoices")
        .insert({
          invoice_number: formatInvoiceNumber(seq),
          client_id: clientId || null,
          client_name: clientName,
          client_email: clientEmail || null,
          client_phone: clientPhone || null,
          client_address: clientAddress || null,
          items,
          subtotal,
          tax: taxAmount,
          total,
          notes: notes || null,
          status: status || "draft",
          due_date: dueDate || null,
        })
        .select()
        .single());
      if (error?.code === "23505") { seq += 1; continue; } // duplicate number, retry
      break;
    }

    if (error) throw error;
    return NextResponse.json({ invoice: data });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: `Could not create invoice: ${describeError(err)}` }, { status: 500 });
  }
}
