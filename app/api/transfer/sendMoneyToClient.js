import { createClient } from "@/app/utils/supabase/server";
import { cookies } from "next/headers";
import authorizeTransfer from "./authorizeTransfer";
import createTransfer from "./createTransfer";

export default async function sendMoneyToClient(values) {
  const cookie = cookies();
  const supabase = createClient(cookie);

  const { data: client, error } = await supabase
    .from("clients")
    .select()
    .eq("id", values.id)
    .eq("accountId", values.accountId)
    .single();

  const auth = await authorizeTransfer({
    access_token: client?.accessToken,
    account_id: values.accountId,
    type: "credit",
    network: client?.rtpSupport ? "rtp" : 'ach',
    ...(client?.rtpSupport ? {} : {ach_class: 'web'}),
    amount: Number(values.amount).toFixed(2),
    user: {
      legal_name: "Test",
    },
  });
  if (auth?.id) {
    if (auth?.decision === "approved") {
      const create = await createTransfer({
        access_token: client?.accessToken,
        account_id: values.accountId,
        authorization_id: auth?.id,
        description: "transfer",
      });
      if (create?.id) {
        // const balance =  await getAccountBalance(client?.accessToken, [client?.accountId])
        // console.log(balance.accounts[0]?.balances)
        return 200;
      }
    } else {
      return auth?.decision_rationale?.description;
    }
  }
  //   console.log("cliet", auth);
}
