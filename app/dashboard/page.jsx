"use client";
import { useRouter } from "next/navigation";
import SignOutButton from "../components/signoutButton";
import DashboardComponent from "../components/dashboard";
import { useEffect, useState } from "react";
import { createClient } from "../utils/supabase/client";
import Sidebar from "../components/sidebar";

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
        <Sidebar user={user}>
          <DashboardComponent user={user} />
        </Sidebar>
      </div>
    );
}
