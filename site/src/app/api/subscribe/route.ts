import { NextRequest, NextResponse } from "next/server";

const KIT_BASE = "https://api.kit.com/v4";

function kitHeaders(apiKey: string) {
  return {
    "Content-Type": "application/json",
    "X-Kit-Api-Key": apiKey,
  };
}

async function createSubscriber(
  apiKey: string,
  email: string,
  firstName?: string
) {
  const res = await fetch(`${KIT_BASE}/subscribers`, {
    method: "POST",
    headers: kitHeaders(apiKey),
    body: JSON.stringify({
      email_address: email,
      first_name: firstName || undefined,
    }),
  });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Create subscriber failed (${res.status}): ${body}`);
  }
  return res.json();
}

async function addToForm(apiKey: string, formId: string, email: string) {
  const res = await fetch(`${KIT_BASE}/forms/${formId}/subscribers`, {
    method: "POST",
    headers: kitHeaders(apiKey),
    body: JSON.stringify({ email_address: email }),
  });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Add to form failed (${res.status}): ${body}`);
  }
}

async function applyTags(apiKey: string, email: string, tagNames: string[]) {
  if (!tagNames.length) return;

  const res = await fetch(`${KIT_BASE}/tags?per_page=1000`, {
    headers: kitHeaders(apiKey),
  });
  if (!res.ok) return;

  const { tags } = await res.json();
  const tagMap = new Map(
    tags.map((t: { id: number; name: string }) => [t.name, t.id])
  );

  await Promise.all(
    tagNames
      .filter((name) => tagMap.has(name))
      .map((name) =>
        fetch(`${KIT_BASE}/tags/${tagMap.get(name)}/subscribers`, {
          method: "POST",
          headers: kitHeaders(apiKey),
          body: JSON.stringify({ email_address: email }),
        })
      )
  );
}

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

  try {
    await createSubscriber(apiKey, email, firstName);
    await addToForm(apiKey, formId, email);
    await applyTags(apiKey, email, tags || []);
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Kit API error:", err);
    return NextResponse.json({ error: "Failed to subscribe" }, { status: 502 });
  }
}
