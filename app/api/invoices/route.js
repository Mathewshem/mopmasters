import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";
import { ADMIN_COOKIE_NAME, isValidAdminSession } from "@/lib/auth";

function checkAuth(request) {
  const cookie = request.cookies.get(ADMIN_COOKIE_NAME)?.value;
  return isValidAdminSession(cookie);
}

function generateInvoiceNumber(existingCount) {
  const year = new Date().getFullYear();
  const seq = String(existingCount + 1).padStart(4, "0");
  return `MM-${year}-${seq}`;
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
    return NextResponse.json({ error: "Could not load invoices." }, { status: 500 });
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

    const { count } = await supabase
      .from("invoices")
      .select("id", { count: "exact", head: true });

    const invoiceNumber = generateInvoiceNumber(count || 0);

    const { data, error } = await supabase
      .from("invoices")
      .insert({
        invoice_number: invoiceNumber,
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
      .single();

    if (error) throw error;
    return NextResponse.json({ invoice: data });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Could not create invoice." }, { status: 500 });
  }
}
