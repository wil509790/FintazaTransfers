import {
  plaidBaseUrl,
  plaidClient,
  plaidSecret,
} from "@/app/services/plaidConfig";
import axios from "axios";

export const exchangeToken = async (public_token) => {
  try {
    const { data } = await axios.post(
      `${plaidBaseUrl}/item/public_token/exchange`,
      {
        client_id: plaidClient,
        secret: plaidSecret,
        public_token,
      }
    );
    if (data.access_token) {
      return data;
    }
    return undefined;
  } catch (e) {
    throw e;
  }
};
