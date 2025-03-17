import {
  plaidBaseUrl,
  plaidClient,
  plaidSecret,
} from "@/app/services/plaidConfig";
import axios from "axios";

export const downloadPlaidStatements = async (access_token, statement_id) => {
  try {
    const { data } = await axios.post(
      `${plaidBaseUrl}/statements/download`,
      {
        client_id: plaidClient,
        secret: plaidSecret,
        access_token,
        statement_id,
      },
      { responseType: "arraybuffer" }
    );
    return data;
  } catch (e) {
    console.log("Unable to downlaod statements ", e);
    throw e;
  }
};
