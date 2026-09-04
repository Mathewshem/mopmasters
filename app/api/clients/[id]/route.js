import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";
import { ADMIN_COOKIE_NAME, isValidAdminSession } from "@/lib/auth";

function checkAuth(request) {
  const cookie = request.cookies.get(ADMIN_COOKIE_NAME)?.value;
  return isValidAdminSession(cookie);
}

export async function PATCH(request, { params }) {
  if (!checkAuth(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = params;
  const updates = await request.json().catch(() => ({}));

  const allowed = ["name", "email", "phone", "service", "message", "status"];
  const payload = {};
  for (const key of allowed) {
    if (key in updates) payload[key] = updates[key];
  }

  try {
    const supabase = getSupabaseAdmin();
    const { data, error } = await supabase
      .from("clients")
      .update(payload)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return NextResponse.json({ client: data });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Could not update client." }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  if (!checkAuth(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = params;

  try {
    const supabase = getSupabaseAdmin();
    const { error } = await supabase.from("clients").delete().eq("id", id);
    if (error) throw error;
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Could not delete client." }, { status: 500 });
  }
}
