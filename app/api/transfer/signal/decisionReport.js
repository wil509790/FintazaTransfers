import {
  plaidBaseUrl,
  plaidClient,
  plaidSecret,
} from "@/app/services/plaidConfig";
import axios from "axios";

export default async function signalDecisionReport(transactionId) {
  try {
    await axios.post(`${plaidBaseUrl}/signal/decision/report`, {
      client_id: plaidClient,
      secret: plaidSecret,
      client_transaction_id: transactionId,
      initiated: true,
    });
  } catch (e) {
    return "There was an issue reporting the ach transfer to signal";
  }
}
