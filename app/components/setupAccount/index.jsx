"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default async function SetupAccountComponent() {
    const params = useSearchParams()
    const code = params.get('code');
    console.log({params: params.get('code')})
  return (
    <main className="flex min-h-screen bg-white items-center justify-between ">
      {/* <div className="flex items-center justify-center gap-5"></div> */}
        <div className="mx-auto max-w-7xl lg:grid lg:grid-cols-12 lg:gap-x-8 lg:px-8">
          <div className="px-6 pb-24 pt-10 sm:pb-32 lg:col-span-7 lg:px-0 lg:pb-56 lg:pt-48 xl:col-span-6">
            <div className="mx-auto max-w-2xl lg:mx-0">
              Your logo
              <p className="mt-6 text-lg leading-8 text-gray-600">
                Open your account to see your cleints, payments and more
              </p>
              <div className="mt-10 flex items-center gap-x-6">
                <Link href={"/signin"}>
                  <button
                    className={"text-white bg-blue-600 p-2 px-4 rounded-xl"}
                  >
                    LInk Your Account
                  </button>
                </Link>
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
