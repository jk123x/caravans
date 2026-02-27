import crypto from "crypto";

const TOKEN_TTL_MS = 24 * 60 * 60 * 1000; // 24 hours

function getSecret(): string {
  const secret = process.env.DOWNLOAD_SECRET;
  if (!secret) throw new Error("DOWNLOAD_SECRET not set");
  return secret;
}

function sign(expiry: number): string {
  return crypto
    .createHmac("sha256", getSecret())
    .update(String(expiry))
    .digest("hex");
}

export function generateDownloadToken(): { token: string; exp: number } {
  const exp = Date.now() + TOKEN_TTL_MS;
  return { token: sign(exp), exp };
}

export function verifyDownloadToken(token: string, exp: number): boolean {
  if (!token || !exp) return false;
  if (Date.now() > exp) return false;
  const expected = sign(exp);
  return crypto.timingSafeEqual(
    Buffer.from(token, "hex"),
    Buffer.from(expected, "hex")
  );
}
