import {
  plaidBaseUrl,
  plaidClient,
  plaidSecret,
} from "@/app/services/plaidConfig";
import axios from "axios";

export default async function authorizeTransfer(values) {
  try {
    let { data } = await axios.post(
      `${plaidBaseUrl}/transfer/authorization/create`,
      {
        client_id: plaidClient,
        secret: plaidSecret,
        ...values,
      }
    );

    return data?.authorization;
  } catch (e) {
    throw e;
  }
}