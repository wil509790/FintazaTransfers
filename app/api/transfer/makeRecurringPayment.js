import {
  plaidBaseUrl,
  plaidClient,
  plaidSecret,
} from "@/app/services/plaidConfig";
import { createClient } from "@/app/utils/supabase/server";
import axios from "axios";
import { addYears, format } from "date-fns";
import { cookies } from "next/headers";
import { v4 as uuidv4 } from "uuid";
import evaluateSignal from "./signal/evaluate";
import getAccountBalance from "../accounts/getAccountBalance";
import signalDecisionReport from "./signal/decisionReport";

export default async function makeRecurringPayment(values) {
  const cookie = cookies();
  const supabase = createClient(cookie);

  const { data: client, error } = await supabase
    .from("clients")
    .select()
    .eq("id", values.id)
    .eq("accountId", values.accountId)
    .single();

  let transaction_id = uuidv4();

  const currentBalance = await getAccountBalance(client?.accessToken, [
    client.accountId,
  ]);
  if (currentBalance < Number(values?.amount)) {
    return "The select account has not sufficient balance";
  }

  const evaluate = await evaluateSignal({
    access_token: client?.accessToken,
    account_id: client?.accountId,
    amount: Number(values.amount),
    client_transaction_id: transaction_id,
  });
  if (evaluate !== "success") {
    return evaluate;
  }

  let { data } = await axios.post(`${plaidBaseUrl}/transfer/recurring/create`, {
    client_id: plaidClient,
    secret: plaidSecret,
    access_token: client?.accessToken,
    account_id: values.accountId,
    type: "debit",
    network: "same-day-ach",
    ach_class: "ppd",
    amount: Number(values.amount).toFixed(2),
    user: {
      legal_name: client?.name,
    },
    schedule: getSchedule(values.frequency),
    description: "debit",
    idempotency_key: transaction_id,
  });

  if (data?.decision === "approved") {
    await supabase
      .from("transactions")
      .insert({ client_id: client?.id, transaction_id });
    console.log(error);
    signalDecisionReport(transaction_id);
    return 200;
  } else {
    return data?.decision_rationale?.description;
  }
}

const getSchedule = (frequency) => {
  let interval_execution_day = 1;
  const today = new Date();

  if (frequency === "weekly" || frequency === "bi-weekly") {
    let day = today.getDay();
    if (day < 1 || day > 5) {
      day = 1;
    }
    interval_execution_day = day;
  }

  if (frequency === "monthly") {
    let day = today.getDate();
    console.log("day", day);
    if (day > 28) {
      day = 1;
    }
    interval_execution_day = day;
  }
  let schedule = {
    start_date: format(today, "yyyy-MM-dd"),
    end_date: format(addYears(today, 10), "yyyy-MM-dd"),
    interval_execution_day,
  };
  switch (frequency) {
    case "bi-weekly":
      schedule = { ...schedule, interval_unit: "week", interval_count: 2 };
      break;
    case "weekly":
      schedule = { ...schedule, interval_unit: "week", interval_count: 1 };
      break;

    case "monthly":
      schedule = { ...schedule, interval_unit: "month", interval_count: 1 };
      break;

    default:
      return null;
  }

  return schedule;
};
