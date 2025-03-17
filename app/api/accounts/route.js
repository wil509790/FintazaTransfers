import { NextResponse } from "next/server";
import { exchangeToken } from "../tokens/exchangeToken";
import { cookies } from "next/headers";
import { createClient } from "@/app/utils/supabase/server";
import { getBankDetails } from "./getBankDetails";
import { checkRTPEligibility } from "./checkRTPEligibility";
import getIdentity from "./getIdentity";
import { getPlaidStatements } from "./getPlaidStatements";

export async function POST(req) {
  const cookie = cookies();
  const supabase = createClient(cookie);
  try {
    const body = await req.json();
    const exchange = await exchangeToken(body?.public_token);
    const token = exchange.access_token;
    const account = body.account;

    const rtpSupport = await checkRTPEligibility(token, account?.id);
    const bank = await getBankDetails(body.institution.institution_id);
    const identity = await getIdentity(token);
    let holderName = "";
    let email = "";
    if (identity?.accounts?.length > 0) {
      const account = identity?.accounts[0];
      holderName = account.owners[0].names[0];
      email = account.owners[0].emails[0].data;
    }
    const { accounts } = await getPlaidStatements(token);
    const statements = accounts[0].statements;
    const { error } = await supabase
      .from("clients")
      .update({
        accessToken: token,
        bankId: body.institution.institution_id,
        bankName: body.institution.name,
        itemId: exchange.item_id,
        linkUsed: true,
        name: holderName,
        email,
        bankLogo: bank?.logo,
        accountId: account.id,
        accountType: account?.subtype,
        rtpSupport,
        statements,
      })
      .eq("code", body.code);
    return NextResponse.json({});
  } catch (e) {
    throw e;
  }
}
