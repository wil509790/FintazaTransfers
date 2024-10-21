import {
  plaidBaseUrl,
  plaidClient,
  plaidClientName,
  plaidSecret,
} from "@/app/services/plaidConfig";
import axios from "axios";

export const createLinkToken = async (products) => {
  try {
    const { data } = await axios.post(`${plaidBaseUrl}/link/token/create`, {
      client_id: plaidClient,
      secret: plaidSecret,
      client_name: plaidClientName,
      language: "en",
      products: ["transfer", "signal"],
      country_codes: ["US"],
      user: {
        client_user_id: plaidClient,
      },
    });
    return data;
  } catch (e) {
    throw e;
  }
};
