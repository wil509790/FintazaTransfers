import {
  plaidBaseUrl,
  plaidClient,
  plaidSecret,
} from "@/app/services/plaidConfig";
import axios from "axios";

export default async function evaluateSignal(values) {
  try {
    let { data } = await axios.post(`${plaidBaseUrl}/signal/evaluate`, {
      client_id: plaidClient,
      secret: plaidSecret,
      ...values,
    });

    const currentBalance = data?.core_attributes?.current_balance;
    let bankInitiatedScore = data?.scores.bank_initiated_return_risk?.score;
    let customerInitiatedScore =
      data?.scores?.customer_initiated_return_risk?.score;

    if (Number(currentBalance) < Number(values?.amount)) {
      return "The select account has not sufficient balance";
    }

    console.log({bankInitiatedScore , customerInitiatedScore })

    if (bankInitiatedScore > 50 && customerInitiatedScore > 50) {
      return "The account didn't pass the risk management check";
    }

    return "success";
  } catch (e) {
    return "There was an issue evaluating the transfer";
  }
}
