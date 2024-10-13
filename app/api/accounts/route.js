import { NextResponse } from "next/server";
import { exchangeToken } from "../tokens/exchangeToken";
import { cookies } from "next/headers";
import { createClient } from "@/app/utils/supabase/server";
import { getBankDetails } from "./getBankDetails";
import { checkRTPEligibility } from "./checkRTPEligibility";

export async function POST(req) {
  const cookie = cookies();
  const supabase = createClient(cookie);
  try {
    const body = await req.json();
    const exchange = await exchangeToken(body?.public_token);
    const token = exchange.access_token;
    const account = body.account;

    const rtpSupport = await checkRTPEligibility(token, account?.id);
    if (!rtpSupport) {
      return NextResponse.json({
        status: "RTP_NOT_SUPPORTED",
        message:
          "Your account is not supporting Real Time Payments, please select another account",
      });
    }
    const bank = await getBankDetails(body.institution.institution_id);
    const { error } = await supabase
      .from("clients")
      .update({
        accessToken: token,
        bankId: body.institution.institution_id,
        bankName: body.institution.name,
        itemId: exchange.item_id,
        linkUsed: true,
        name: body.account?.name,
        bankLogo: bank?.logo,
        accountId: account.id,
      })
      .eq("code", body.code);
    return NextResponse.json({});
  } catch (e) {
    throw e;
  }
}
