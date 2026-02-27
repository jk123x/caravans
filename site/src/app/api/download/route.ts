import { NextRequest, NextResponse } from "next/server";
import { readFile } from "fs/promises";
import path from "path";
import { verifyDownloadToken } from "@/lib/download-token";

const PDF_PATH = path.join(process.cwd(), "private", "caravan-solar-guide.pdf");

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const token = searchParams.get("token") ?? "";
  const exp = Number(searchParams.get("exp"));

  if (!verifyDownloadToken(token, exp)) {
    return NextResponse.json(
      { error: "Invalid or expired download link" },
      { status: 403 }
    );
  }

  let pdf: Buffer;
  try {
    pdf = await readFile(PDF_PATH);
  } catch {
    console.error("PDF not found at", PDF_PATH);
    return NextResponse.json({ error: "File not found" }, { status: 500 });
  }

  return new NextResponse(new Uint8Array(pdf), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition":
        'attachment; filename="caravan-solar-guide.pdf"',
      "Cache-Control": "no-store",
    },
  });
}
