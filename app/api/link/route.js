import { createClient } from "@/app/utils/supabase/server";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

export async function GET(req) {
  const cookie = cookies();
  const supabase = createClient(cookie);
  try {
    const code = uuidv4()
    const linkAccountUrl = `${process.env.APP_URL}/setup-account/?code=${code}`;
    const { error, data } = await supabase
      .from("clients")
      .insert({ linkAccountUrl, code }).select('linkAccountUrl')
    return NextResponse.json(data[0]);
  } catch (e) {
    throw e;
  }
}
