import {
    plaidBaseUrl,
    plaidClient,
    plaidSecret,
  } from "@/app/services/plaidConfig";
  import axios from "axios";
  
  export default async function createTransfer(values) {
    try {
      let { data } = await axios.post(
        `${plaidBaseUrl}/transfer/create`,
        {
          client_id: plaidClient,
          secret: plaidSecret,
          ...values,
        }
      );
  
      return data?.transfer;
    } catch (e) {
      throw e;
    }
  }
