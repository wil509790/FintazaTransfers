"use client";
import { useRouter } from "next/navigation";
import SignOutButton from "../components/signoutButton";
import DashboardComponent from "../components/dashboard";
import { useEffect, useState } from "react";
import { createClient } from "../utils/supabase/client";

export default function Dashboard() {
  const [user, setUser] = useState();
  const router = useRouter();
  const supabase = createClient();
  const handleGetUser = async () => {
    const { data, error } = await supabase.auth.getUser();
    if (data?.user) {
      setUser(data?.user);
    } else {
      router.push("/");
    }
  };

  useEffect(() => {
    handleGetUser();
  }, []);
  if (user)
    return (
      <div className="h-screen ">
        <div className="flex justify-end gap-5 items-center mt-2 pr-10">
          <h2>{user.email}</h2>
          <SignOutButton />
        </div>
        <DashboardComponent user={user} />
      </div>
    );
}
