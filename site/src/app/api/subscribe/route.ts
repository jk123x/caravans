import { NextRequest, NextResponse } from "next/server";
import { SITE } from "@/lib/config";

const KIT_BASE = "https://api.kit.com/v4";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const VALID_FORM_IDS = new Set<string>(Object.values(SITE.kitFormIds));

const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 5;
const rateLimitMap = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = rateLimitMap.get(ip) ?? [];
  const recent = timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW_MS);

  if (recent.length >= RATE_LIMIT_MAX) {
    rateLimitMap.set(ip, recent);
    return true;
  }

  recent.push(now);
  rateLimitMap.set(ip, recent);
  return false;
}

function getClientIp(request: NextRequest): string {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown"
  );
}

function resolveTagsForForm(
  formId: string,
  clientTags: unknown
): string[] {
  const config = SITE.kitFormTags[formId];
  if (!config) return [];

  if (config.fixed) return config.fixed;

  if (config.allowed && Array.isArray(clientTags)) {
    return clientTags.filter(
      (t): t is string => typeof t === "string" && config.allowed!.test(t)
    );
  }

  return [];
}

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
  const ip = getClientIp(request);
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many requests. Try again in a minute." },
      { status: 429 }
    );
  }

  const apiKey = process.env.KIT_API_KEY;
  if (!apiKey) {
    console.error("KIT_API_KEY not set");
    return NextResponse.json(
      { error: "Email service not configured" },
      { status: 500 }
    );
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { email, firstName, formId, tags: clientTags } = body as {
    email?: string;
    firstName?: string;
    formId?: string;
    tags?: unknown;
  };

  if (!email || typeof email !== "string" || !EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  if (!formId || typeof formId !== "string" || !VALID_FORM_IDS.has(formId)) {
    return NextResponse.json({ error: "Invalid form" }, { status: 400 });
  }

  const tags = resolveTagsForForm(formId, clientTags);

  try {
    await createSubscriber(
      apiKey,
      email,
      typeof firstName === "string" ? firstName : undefined
    );
    await addToForm(apiKey, formId, email);
    await applyTags(apiKey, email, tags);
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Kit API error:", err);
    return NextResponse.json(
      { error: "Failed to subscribe" },
      { status: 502 }
    );
  }
}
