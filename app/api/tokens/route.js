import { NextResponse } from "next/server";
import { createLinkToken } from "./createToken";

export async function GET(request) {
  try {
    const { link_token } = await createLinkToken(["liabilities"]);
    return NextResponse.json({ linkToken: link_token });
  } catch (e) {
    throw e;
  }
}
