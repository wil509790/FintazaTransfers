import { NextResponse } from "next/server";
import { downloadPlaidStatements } from "./downloadStatements";
import { createClient } from "@/app/utils/supabase/server";
import { cookies } from "next/headers";
import isUserAuthorized from "../isAuthorized";

export async function POST(req) {
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
    const { id, statement_id } = await req.json();
    const { data: client, error } = await supabase
      .from("clients")
      .select("accessToken")
      .eq("id", id)
      .single();
    const data = await downloadPlaidStatements(client.accessToken, statement_id);
    if (error) {
      return NextResponse.json(error, { status: 400 });
    }
    return new NextResponse(Buffer.from(data));
  } catch (e) {
    throw e;
  }
}
