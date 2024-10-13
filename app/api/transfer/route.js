import { NextResponse } from "next/server";
import sendMoneyToClient from "./sendMoneyToClient";

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

  return NextResponse.json({});
}
