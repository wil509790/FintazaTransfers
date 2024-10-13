import {
  plaidBaseUrl,
  plaidClient,
  plaidSecret,
} from "@/app/services/plaidConfig";
import axios from "axios";

export const getBankDetails = async (instId) => {
  try {
    let { data } = await axios.post(`${plaidBaseUrl}/institutions/get_by_id`, {
      client_id: plaidClient,
      secret: plaidSecret,
      country_codes: ["US"],
      institution_id: instId,
      options: {
        include_optional_metadata: true,
      },
    });

    return data?.institution;
  } catch (e) {
    throw e;
  }
};
