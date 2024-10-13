"use client";

import axios from "axios";
import { useEffect } from "react";
import { usePlaidLink } from "react-plaid-link";
export default function LinkAccount({ token, setToken, handleRefresh }) {
  const config = {
    onSuccess: async (public_token, plaidMetaData) => {
      setToken(undefined);
      try {
        if (plaidMetaData) {
          const { data } = await axios.post("/api/accounts", {
            ...plaidMetaData
          });
          if (data) {
          }
        }
        handleRefresh?.();
      } catch (e) {}
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
