import {
  plaidBaseUrl,
  plaidClient,
  plaidSecret,
} from "@/app/services/plaidConfig";
import axios from "axios";

export default async function getIdentity(access_token) {
  try {
    let { data } = await axios.post(`${plaidBaseUrl}/identity/get`, {
      client_id: plaidClient,
      secret: plaidSecret,
      access_token,
    });

    return data;
  } catch (e) {
    throw e;
  }
}
