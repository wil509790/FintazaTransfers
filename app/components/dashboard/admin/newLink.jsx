import axios from "axios";
import { useState } from "react";

export default function AddUser({ handleClose }) {
  const [link, setLink] = useState();
  const [busy, setBusy] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleGenerateLink = async () => {
    const { data } = await axios.get("/api/link");
    if (data?.linkAccountUrl) {
      setLink(data.linkAccountUrl);
    }
    console.log(data);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(link).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset the copied state after 2 seconds
    });
  };

  return (
    <div className="w-full">
      <div>
        <div>
          generate a link
          <div class="max-w-xs mx-auto mt-5">
            <div class="flex items-center bg-gray-200 border border-gray-300 rounded-md p-2">
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
                class="ml-2 px-3 py-1 bg-blue-500 text-white text-sm font-medium rounded-md hover:bg-blue-600"
              >
                {copied ? "Copied" : "Copy"}
              </button>
            </div>
          </div>
        </div>
        <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
          <button
            type="submit"
            disabled={busy}
            onClick={handleGenerateLink}
            className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm  sm:ml-3 sm:w-auto"
          >
            Continue
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
