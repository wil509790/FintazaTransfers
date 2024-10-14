"use client";
import { BanknotesIcon, HomeIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname } from "next/navigation";
import SignOutButton from "./signoutButton";

const navigation = [
  { name: "Clients", href: "/dashboard", icon: HomeIcon },
  // { name: "Transfers", href: "/dashboard/transfers", icon: BanknotesIcon },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Sidebar({ user, children }) {
  const pathname = usePathname();

  return (
    <div className="flex">
      <div className="flex grow h-screen w-64 max-w-64 flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6">
        <div className="flex h-16 shrink-0 items-center">
          {/* <img
            alt="Your Company"
            src="/images/logo.png"
            className="h-8 w-auto"
          /> */}
          Your Logo
        </div>
        <nav className="flex flex-1 flex-col">
          <ul role="list" className="flex flex-1 flex-col gap-y-7">
            <li>
              <ul role="list" className="-mx-2 space-y-1">
                {navigation.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className={classNames(
                        item.href === pathname
                          ? "bg-gray-50 text-primary"
                          : "text-gray-700 hover:bg-gray-50 hover:text-primary",
                        "group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6"
                      )}
                    >
                      <item.icon
                        aria-hidden="true"
                        className={classNames(
                          item.href === pathname
                            ? "text-primary"
                            : "text-gray-400 group-hover:text-primary",
                          "h-6 w-6 shrink-0"
                        )}
                      />
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>

            <li className="-mx-6 mt-auto">
              <a
                href="#"
                className="flex items-center gap-x-4 px-4 py-3 text-sm font-semibold leading-6 text-gray-900 hover:bg-gray-50"
              >
                {/* <img
                  alt=""
                //   src={session?.user?.image}
                  className="h-8 w-8 rounded-full bg-gray-50"
                /> */}
                <span className="truncate" aria-hidden="true">
                  {user?.email}
                </span>
              </a>
              {pathname === "/" && (
                <div className="flex items-center cursor-pointer gap-x-4 px-4 py-3 text-sm font-semibold leading-6 text-gray-900 hover:bg-gray-50">
                  <svg
                    className={"text-red-500 size-6"}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                    />
                  </svg>
                  <span className="text-red-500">Clear Chat</span>
                </div>
              )}
              <SignOutButton />
            </li>
          </ul>
        </nav>
      </div>
      <div className="w-full  px-5 max-h-screen">{children}</div>
    </div>
  );
}
