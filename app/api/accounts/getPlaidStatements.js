import {
    plaidBaseUrl,
    plaidClient,
    plaidSecret,
  } from "@/app/services/plaidConfig";
  import axios from "axios";
  
  export const getPlaidStatements = async (access_token) => {
    try {
      const { data } = await axios.post(`${plaidBaseUrl}/statements/list`, {
        client_id: plaidClient,
        secret: plaidSecret,
        access_token,
      });
      return data;
    } catch (e) {
      console.log("Unable to get statments", e);
      throw e;
    }
  };
  