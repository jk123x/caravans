import { redirect } from "next/navigation";
import { generateDownloadToken, verifyDownloadToken } from "@/lib/download-token";
import { SuccessClient } from "./success-client";

type Props = {
  searchParams: Promise<{ session_id?: string; token?: string; exp?: string }>;
};

export default async function SuccessPage({ searchParams }: Props) {
  const params = await searchParams;

  // Flow 1: Stripe redirects here with a session_id.
  // Generate a signed download token and redirect to the tokenized URL.
  if (params.session_id && !params.token) {
    const { token, exp } = generateDownloadToken();
    redirect(`/success?token=${token}&exp=${exp}`);
  }

  // Flow 2: Tokenized URL — verify the signature and expiry.
  const token = params.token ?? "";
  const exp = Number(params.exp);
  const verified = verifyDownloadToken(token, exp);

  const downloadUrl = verified
    ? `/api/download?token=${token}&exp=${exp}`
    : "";

  return <SuccessClient verified={verified} downloadUrl={downloadUrl} />;
}
