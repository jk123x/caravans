import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { SITE } from "@/lib/config";

const KIT_BASE = "https://api.kit.com/v4";

function verifyStripeSignature(
  payload: string,
  header: string,
  secret: string
): boolean {
  const parts: Record<string, string> = {};
  for (const pair of header.split(",")) {
    const [key, value] = pair.split("=");
    parts[key] = value;
  }

  const timestamp = parts["t"];
  const sig = parts["v1"];
  if (!timestamp || !sig) return false;

  const age = Math.abs(Date.now() / 1000 - Number(timestamp));
  if (age > 300) return false;

  const expected = crypto
    .createHmac("sha256", secret)
    .update(`${timestamp}.${payload}`)
    .digest("hex");

  return crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(sig));
}

export async function POST(request: NextRequest) {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  const kitApiKey = process.env.KIT_API_KEY;

  if (!webhookSecret || !kitApiKey) {
    console.error("STRIPE_WEBHOOK_SECRET or KIT_API_KEY not set");
    return NextResponse.json({ error: "Not configured" }, { status: 500 });
  }

  const body = await request.text();
  const signature = request.headers.get("stripe-signature") ?? "";

  if (!verifyStripeSignature(body, signature, webhookSecret)) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  const event = JSON.parse(body);

  if (event.type !== "checkout.session.completed") {
    return NextResponse.json({ received: true });
  }

  const session = event.data.object;
  const email: string | undefined = session.customer_details?.email;
  const name: string | undefined = session.customer_details?.name;

  if (!email) {
    console.error("No email in checkout session", session.id);
    return NextResponse.json({ received: true });
  }

  const kitHeaders = {
    "Content-Type": "application/json",
    "X-Kit-Api-Key": kitApiKey,
  };

  try {
    const subRes = await fetch(`${KIT_BASE}/subscribers`, {
      method: "POST",
      headers: kitHeaders,
      body: JSON.stringify({
        email_address: email,
        first_name: name?.split(" ")[0] || undefined,
      }),
    });

    if (!subRes.ok) {
      throw new Error(`Create subscriber failed (${subRes.status})`);
    }

    const { subscriber } = await subRes.json();

    await fetch(
      `${KIT_BASE}/forms/${SITE.kitFormIds.purchase}/subscribers/${subscriber.id}`,
      { method: "POST", headers: kitHeaders }
    );

    await fetch(`${KIT_BASE}/subscribers/${subscriber.id}/tags`, {
      method: "POST",
      headers: kitHeaders,
      body: JSON.stringify({ tag: "purchased" }),
    });
  } catch (err) {
    console.error("Kit API error in webhook:", err);
  }

  return NextResponse.json({ received: true });
}
