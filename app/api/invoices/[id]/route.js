import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";
import { ADMIN_COOKIE_NAME, isValidAdminSession } from "@/lib/auth";

function checkAuth(request) {
  const cookie = request.cookies.get(ADMIN_COOKIE_NAME)?.value;
  return isValidAdminSession(cookie);
}

export async function GET(request, { params }) {
  if (!checkAuth(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const supabase = getSupabaseAdmin();
    const { data, error } = await supabase
      .from("invoices")
      .select("*")
      .eq("id", params.id)
      .single();

    if (error) throw error;
    return NextResponse.json({ invoice: data });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Invoice not found." }, { status: 404 });
  }
}

export async function PATCH(request, { params }) {
  if (!checkAuth(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = params;
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

  const payload = {};
  if (clientId !== undefined) payload.client_id = clientId || null;
  if (clientName !== undefined) payload.client_name = clientName;
  if (clientEmail !== undefined) payload.client_email = clientEmail || null;
  if (clientPhone !== undefined) payload.client_phone = clientPhone || null;
  if (clientAddress !== undefined) payload.client_address = clientAddress || null;
  if (notes !== undefined) payload.notes = notes || null;
  if (status !== undefined) payload.status = status;
  if (dueDate !== undefined) payload.due_date = dueDate || null;

  if (Array.isArray(items)) {
    const subtotal = items.reduce(
      (sum, item) => sum + Number(item.quantity || 0) * Number(item.unitPrice || 0),
      0
    );
    const taxAmount = Number(tax || 0);
    payload.items = items;
    payload.subtotal = subtotal;
    payload.tax = taxAmount;
    payload.total = subtotal + taxAmount;
  }

  try {
    const supabase = getSupabaseAdmin();
    const { data, error } = await supabase
      .from("invoices")
      .update(payload)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return NextResponse.json({ invoice: data });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Could not update invoice." }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  if (!checkAuth(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const supabase = getSupabaseAdmin();
    const { error } = await supabase.from("invoices").delete().eq("id", params.id);
    if (error) throw error;
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Could not delete invoice." }, { status: 500 });
  }
}
