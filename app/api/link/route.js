import { createClient } from "@/app/utils/supabase/server";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

export async function GET(req) {
  const cookie = cookies();
  const supabase = createClient(cookie);
  try {
    const linkAccountUrl = `http://localhost:3000/?code=${uuidv4()}`;
    const { error, data } = await supabase
      .from("clients")
      .insert({ linkAccountUrl }).select('linkAccountUrl')
    return NextResponse.json(data[0]);
  } catch (e) {
    throw e;
  }
}
