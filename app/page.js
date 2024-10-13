import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import SignIn from "./components/signIn";
import { createClient } from "./utils/supabase/server";

export default async function Home() {
  const dd = cookies();
  const supabase = createClient(dd);
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (user) redirect("/dashboard");

  return (<SignIn />);
}
