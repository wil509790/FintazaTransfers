import {
  plaidBaseUrl,
  plaidClient,
  plaidSecret,
} from "@/app/services/plaidConfig";
import axios from "axios";

export const checkRTPEligibility = async (access_token, account_id) => {
  try {
    let { data } = await axios.post(
      `${plaidBaseUrl}/transfer/capabilities/get`,
      {
        client_id: plaidClient,
        secret: plaidSecret,
        access_token,
        account_id,
      }
    );

    return data?.institution_supported_networks?.rtp?.credit;
  } catch (e) {
    throw e;
  }
};
