import { createClient } from "@/app/utils/supabase/server";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import isUserAuthorized from "../isAuthorized";

export async function GET(req) {
  const cookie = cookies();
  const supabase = createClient(cookie);

  const user = await isUserAuthorized();
  if (!user) {
    return NextResponse.json(
      { message: "User not authorized" },
      { status: 403 }
  );
  }
  try {
    const { error, data } = await supabase
      .from("clients")
      .select(
        "name, created_at, accountId, bankName, linkUsed, id, accountType, email, bankLogo, rtpSupport"
      )
      .eq("linkUsed", true);
    return NextResponse.json(data);
  } catch (e) {
    throw e;
  }
}
