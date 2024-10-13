"use client";
import Modal from "@/app/components/modal";
import { createClient } from "@/app/utils/supabase/client";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import AddNewLink from "./newLink";
import SendMoney from "./sendMoney";
import CreateRecurringPayment from "./createRecurringPayment";
// import SuggestBank from "./suggestBank";

export default function Users() {
  const [clients, setClients] = useState([]);
  const [open, setOpen] = useState(false);
  const supabase = createClient();

  const handleLoad = async () => {
    let { data, error } = await supabase.from("clients").select();
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
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Email
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
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {person?.name}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {person?.email}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {format(person.created_at, "MMM/dd/yyyy")}
                      </td>
                      <td className=" z-50 py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                        <SendMoney account={person} />
                        <CreateRecurringPayment account={person} />
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
