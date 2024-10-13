import { Suspense } from "react";
import SetupAccountComponent from "../components/setupAccount";

export default async function SetupAccountPage() {

  return <Suspense><SetupAccountComponent /></Suspense>
}
