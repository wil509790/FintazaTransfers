import {
  plaidBaseUrl,
  plaidClient,
  plaidClientName,
  plaidSecret,
} from "@/app/services/plaidConfig";
import axios from "axios";
import { addDays, format, subYears } from "date-fns";

export const createLinkToken = async (products) => {
  try {
    const { data } = await axios.post(`${plaidBaseUrl}/link/token/create`, {
      client_id: plaidClient,
      secret: plaidSecret,
      client_name: plaidClientName,
      language: "en",
      products: ["transfer", "signal", "statements"],
      country_codes: ["US"],
      user: {
        client_user_id: plaidClient,
      },
      statements: {
        start_date: format(subYears(addDays(new Date(), 1), 2), 'yyyy-MM-dd'),
        end_date: format(new Date(), 'yyyy-MM-dd')
      },
      additional_consented_products: ["auth"],

    });
    return data;
  } catch (e) {
    throw e;
  }
};
