"use client";

import axios from "axios";
import { useEffect } from "react";
import { usePlaidLink } from "react-plaid-link";
export default function LinkAccount({
  token,
  setToken,
  setError,
  setSuccess,
  code,
}) {
  const config = {
    onSuccess: async (public_token, plaidMetaData) => {
      setToken(undefined);
      try {
        if (plaidMetaData) {
          const { data } = await axios.post("/api/accounts", {
            ...plaidMetaData,
            code,
          });
          if (data?.status) {
            setError(data?.message);
          } else {
            setSuccess("Your account has been linked successfuly");
          }
        }
      } catch (e) {
        setError("There was something wrong, please try again");
      }
    },
    onExit: (err, metadata) => {
      setToken(undefined);
    },
    onEvent: (eventName, metadata) => {},
    token,
  };

  const { open, exit, ready } = usePlaidLink(config);
  useEffect(() => {
    if (ready && token) {
      open();
    }
  }, [ready, open]);
  return null;
}
