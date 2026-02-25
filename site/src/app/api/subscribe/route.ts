import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const apiKey = process.env.KIT_API_KEY;

  if (!apiKey) {
    console.error("KIT_API_KEY not set");
    return NextResponse.json(
      { error: "Email service not configured" },
      { status: 500 }
    );
  }

  const { email, firstName, formId, tags } = await request.json();

  if (!email || !formId) {
    return NextResponse.json(
      { error: "Email and formId are required" },
      { status: 400 }
    );
  }

  const res = await fetch(`https://api.convertkit.com/v3/forms/${formId}/subscribe`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      api_key: apiKey,
      email,
      first_name: firstName || undefined,
      tags: tags || [],
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    console.error("Kit API error:", res.status, body);
    return NextResponse.json(
      { error: "Failed to subscribe" },
      { status: 502 }
    );
  }

  return NextResponse.json({ success: true });
}
