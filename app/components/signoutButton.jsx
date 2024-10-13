"use client";
import { useRouter } from "next/navigation";
import { createClient } from "../utils/supabase/client";

export default function SignOutButton() {
  const supabase = createClient();
  const router = useRouter();

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      router.push("/signin");
    }
  };

  return (
    <a
      href="#"
      onClick={signOut}
      className="text-sm hover:text-blue-500 cursor-pointer"
    >
      Sign Out
    </a>
  );
}
