import { NextResponse } from "next/server";
import sendMoneyToClient from "./sendMoneyToClient";
import makeRecurringPayment from "./makeRecurringPayment";

export async function POST(req) {
  const body = await req.json();

  if (body?.type && body?.type === "credit") {
    const send = await sendMoneyToClient(body);
    if (send === 200) {
      return NextResponse.json({ status: "success" });
    } else {
      return NextResponse.json({ status: "error", message: send });
    }
  }

  if (body?.type && body?.type === "debit") {
   const transfer = await makeRecurringPayment(body);
    if (transfer === 200) {
        return NextResponse.json({ status: "success" });
      } else {
        return NextResponse.json({ status: "error", message: transfer });
      }
  }

  return NextResponse.json({});
}
