"use client";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import LinkAccount from "../dashboard/users/linkAccount";

export default function SetupAccountComponent() {
  const params = useSearchParams();
  const [token, setToken] = useState();
  const [error, setError] = useState();
  const [success, setSuccess] = useState();
  const code = params.get("code");

  const handleGetToken = async () => {
    if(!code){
      setError("Invalid request, the link might be broken");
      return
    }
    setError("");
    setSuccess("");
    try {
      const { data } = await axios.get("/api/tokens", { headers: { code } });
      if (data?.linkToken) {
        setToken(data?.linkToken);
      }
      if (data?.status) {
        setError(data?.message);
      }
    } catch (e) {
      setError("There was something wrong, the link might be expired");
    }
  };
  return (
    <main className="flex min-h-screen bg-white ">
      {/* <div className="flex items-center justify-center gap-5"></div> */}
      <div className=" max-w-7xl lg:grid lg:grid-cols-12 lg:gap-x-8 lg:px-8">
        <div className="px-6 pb-24 ml-10 pt-10 sm:pb-32 lg:col-span-7 lg:px-0 lg:pb-56 lg:pt-48 xl:col-span-6">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h3 className=" font-extrabold">Your logo</h3>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Link your account to securely borrow and lend money through
              Fintaza Group Financial. By linking your account, the platform can
              charge recurring payments or send funds directly to your account
              for lending purposes.
            </p>
            {error && (
              <p className="mt-6 text-lg leading-8 text-red-500">{error}</p>
            )}
            {success && (
              <p className="mt-6 text-lg leading-8 text-green-600">{success}</p>
            )}
            <div className="mt-10 flex items-center gap-x-6">
              <button
                onClick={handleGetToken}
                className={"text-white bg-blue-600 p-2 px-4 rounded-xl"}
              >
                LInk Your Account
              </button>

              {token && (
                <LinkAccount
                  setError={setError}
                  setSuccess={setSuccess}
                  code={code}
                  setToken={setToken}
                  token={token}
                />
              )}
            </div>
          </div>
        </div>
        <div className="relative lg:col-span-5 lg:-mr-8 xl:absolute xl:inset-0 xl:left-1/2 xl:mr-0">
          <img
            alt=""
            src="https://images.unsplash.com/photo-1498758536662-35b82cd15e29?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2102&q=80"
            className="aspect-[3/2] w-full bg-gray-50 object-cover lg:absolute lg:inset-0 lg:aspect-auto lg:h-full"
          />
        </div>
      </div>
    </main>
  );
}
