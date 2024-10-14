import { createClient } from "@/app/utils/supabase/server";
import { cookies } from "next/headers";

export default async function isUserAuthorized() {
  const cookie = cookies();
  const supabase = createClient(cookie);

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  return user;
}
