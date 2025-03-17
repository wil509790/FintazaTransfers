"use client";
import Modal from "@/app/components/modal";
import axios from "axios";
import { format } from "date-fns";
import Image from "next/image";
import { useEffect, useState } from "react";
import CreateRecurringPayment from "./createRecurringPayment";
import AddNewLink from "./newLink";
import SendMoney from "./sendMoney";
// import SuggestBank from "./suggestBank";

import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
export default function Users() {
  const [clients, setClients] = useState([]);
  const [open, setOpen] = useState(false);

  const handleLoad = async () => {
    let { data, error } = await axios.get("/api/clients");
    if (data?.length) {
      setClients(data);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    handleLoad();
  }, [open]);
  return (
    <>
      <div className="px-4 sm:px-6 lg:px-8 h-full w-full">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-base font-semibold leading-6 text-gray-900">
              Clients
            </h1>
            <p className="mt-2 text-sm text-gray-700">
              List of clients linked their account
            </p>
          </div>
          <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              New Link
            </button>
          </div>
        </div>
        <div className="mt-8 flow-root ">
          <div className="-mx-4 -my-2  sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <table className="min-w-full  divide-y divide-gray-300">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Bank Name
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Account Type
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Client Name
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Client Email
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Created At
                    </th>
                    <th
                      scope="col"
                      className="relative py-3.5 pl-3 pr-4 sm:pr-0"
                    >
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {clients.map((person) => (
                    <tr key={person.id}>
                      <td className="whitespace-nowrap flex justify-start gap-x-2 px-3 py-4 text-sm text-gray-500">
                        {person?.bankLogo && (
                          <Image
                            loader={() => person?.bankLogo + ""}
                            width={0}
                            height={0}
                            className="h-5 w-5 rounded-full"
                            alt={person?.bankName + ""}
                            src={`data:image/png;base64,${person?.bankLogo}`}
                          />
                        )}
                        {person?.bankName}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {person?.accountType}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {person?.name}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {person?.email}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {format(person.created_at, "MMM/dd/yyyy HH:mm")}
                      </td>
                      <td className=" z-50 py-4 pl-3 pr-4 flex gap-x-3 text-right text-sm font-medium sm:pr-0">
                        <SendMoney account={person} />
                        <CreateRecurringPayment account={person} />
                        {person?.statements && (
                          <Dropdown account={person} id={person.id} />
                        )}
                        {/* <ActionButtons
                          items={[
                            {
                              name: "Suggest bank",
                              href: "#",
                              onClick: () => handleSuggestBank(person),
                            },
                          ]}
                        /> */}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <Modal open={open} setOpen={setOpen}>
        <AddNewLink handleClose={handleClose} />
      </Modal>
    </>
  );
}

export function Dropdown({ account, id }) {
  console.log(account);
  const handleDownload = async (value) => {
    const { data } = await axios.post(
      "/api/statements",
      {
        id,
        statement_id: value.statement_id,
      },
      {
        responseType: "blob",
      }
    );
    const filename = `${account.name}-${value.month}-${value.year}`;
    await downloadPDF(data, filename);
  };
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
          Statements
          <ChevronDownIcon
            aria-hidden="true"
            className="-mr-1 size-5 text-gray-400"
          />
        </MenuButton>
      </div>

      <MenuItems
        transition
        className="absolute max-h-[300px] overflow-y-auto right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
      >
        {account.statements.map((st) => (
          <MenuItem
            key={st.statement_id}
            onClick={() => handleDownload(st)}
            className="group"
          >
            <a
              href="#"
              className="group flex items-center px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-4 text-gray-600 mr-1"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m9 13.5 3 3m0 0 3-3m-3 3v-6m1.06-4.19-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z"
                />
              </svg>

              {format(new Date(st?.year, st?.month - 1), "MMMM, yyyy")}
            </a>
          </MenuItem>
        ))}
      </MenuItems>
    </Menu>
  );
}

const downloadPDF = async (data, filename) => {
  try {
    const url = window.URL.createObjectURL(new Blob([data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `${filename}.pdf`);
    document.body.appendChild(link);
    link.click();

    // Clean up
    link.remove();
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Error fetching PDF:", error);
  }
};
