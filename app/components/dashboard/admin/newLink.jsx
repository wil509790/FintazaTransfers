import axios from "axios";
import { useState } from "react";

export default function AddNewLink({ handleClose }) {
  const [link, setLink] = useState();
  const [busy, setBusy] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleGenerateLink = async () => {
    setBusy(true);
    try {
      const { data } = await axios.get("/api/link");
      if (data?.linkAccountUrl) {
        setLink(data.linkAccountUrl);
      }
    } catch (e) {
    } finally {
      setBusy(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(link).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset the copied state after 2 seconds
    });
  };

  return (
    <div className="w-[500px]">
      <div>
        <div>
          {link
            ? `Your secure account linking link has been generated. Click 'Copy' to send the link to your client and help them connect their account for recurring payments or loan disbursements.`
            : `Click the button below to generate a secure account linking link for the client. This link will allow the client to connect their account for recurring payments or loan disbursements.`}
          {link && (
            <div class="w-full  mx-auto mt-5">
              <div class="flex h-10 items-center bg-gray-50/45 border border-gray-300 rounded-md p-2">
                <input
                  id="urlInput"
                  type="text"
                  value={link}
                  disabled
                  readonly
                  class="flex-grow  px-2 py-1 border-none focus:ring-0 focus:outline-none text-gray-700"
                />
                <button
                  onClick={copyToClipboard}
                  class="ml-2 px-3 py-1 bg-white text-black text-sm font-medium rounded-md hover:bg-gray-200"
                >
                  {copied ? "Copied" : "Copy"}
                </button>
              </div>
            </div>
          )}
        </div>
        <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
          <button
            type="submit"
            disabled={busy}
            onClick={handleGenerateLink}
            className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm  sm:ml-3 sm:w-auto"
          >
            Generate
          </button>
          <button
            type="button"
            onClick={handleClose}
            className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
