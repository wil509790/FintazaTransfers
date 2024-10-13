import { NextResponse } from "next/server";
import { createLinkToken } from "./createToken";
import { headers } from "next/headers";
import { cookies } from "next/headers";
import { createClient } from "@/app/utils/supabase/server";
export async function GET(req) {
  const code = headers().get("code");
  const cookie = cookies();
  const supabase = createClient(cookie);

  const { data: client, error } = await supabase
    .from("clients")
    .select()
    .eq("code", code)
    .single();
  if (client?.id) {
    if (client?.linkUsed) {
      return NextResponse.json({
        status: "used",
        message: "This link has been used, please request another one",
      });
    }

    try {
      const { link_token } = await createLinkToken();
      return NextResponse.json({ linkToken: link_token });
    } catch (e) {
      throw e;
    }
  } else {
    return NextResponse.json({ message: "Incorrect code" }, { status: 404 });
  }
}
