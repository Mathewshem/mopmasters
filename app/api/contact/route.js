import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";

export async function POST(request) {
  const body = await request.json().catch(() => ({}));
  const { name, email, phone, service, message } = body;

  if (!name || !phone) {
    return NextResponse.json(
      { error: "Please share at least your name and phone number." },
      { status: 400 }
    );
  }

  try {
    const supabase = getSupabaseAdmin();
    const { error } = await supabase.from("clients").insert({
      name,
      email: email || null,
      phone,
      service: service || null,
      message: message || null,
      status: "new",
    });

    if (error) throw error;

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "We couldn't save your request right now. Please call or WhatsApp us instead." },
      { status: 500 }
    );
  }
}
