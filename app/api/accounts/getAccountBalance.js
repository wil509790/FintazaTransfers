import {
  plaidBaseUrl,
  plaidClient,
  plaidSecret,
} from "@/app/services/plaidConfig";
import axios from "axios";

export default async function getAccountBalance(access_token, account_ids) {
  try {
    const { data } = await axios.post(`${plaidBaseUrl}/accounts/balance/get`, {
      client_id: plaidClient,
      secret: plaidSecret,
      access_token,
      options: {
        account_ids,
      },
    });
    return data;
  } catch (e) {
    throw e;
  }
}
