import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";
import { ADMIN_COOKIE_NAME, isValidAdminSession } from "@/lib/auth";

function checkAuth(request) {
  const cookie = request.cookies.get(ADMIN_COOKIE_NAME)?.value;
  return isValidAdminSession(cookie);
}

export async function GET(request) {
  if (!checkAuth(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const supabase = getSupabaseAdmin();
    const { data, error } = await supabase
      .from("clients")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;
    return NextResponse.json({ clients: data });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Could not load clients." }, { status: 500 });
  }
}

export async function POST(request) {
  if (!checkAuth(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json().catch(() => ({}));
  const { name, email, phone, service, message, status } = body;

  if (!name) {
    return NextResponse.json({ error: "A name is required." }, { status: 400 });
  }

  try {
    const supabase = getSupabaseAdmin();
    const { data, error } = await supabase
      .from("clients")
      .insert({
        name,
        email: email || null,
        phone: phone || null,
        service: service || null,
        message: message || null,
        status: status || "new",
      })
      .select()
      .single();

    if (error) throw error;
    return NextResponse.json({ client: data });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Could not add client." }, { status: 500 });
  }
}
