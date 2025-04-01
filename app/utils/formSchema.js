import * as yup from "yup";

export const SEND_MONEY_SCHEMA = yup.object({
  amount: yup
    .number()
    .typeError("Invalid value, must be number")
    .moreThan(0, "Amount must be more than $0")
    .required("Amount is required"),
});

export const RECURRING_PAYMENT_SCHEMA = yup.object({
  amount: yup
    .number()
    .typeError("Invalid value, must be number")
    .moreThan(0, "Amount must be more than $0")
    .required("Amount is required"),
  frequency: yup.string().required("Frequency is required"),
  startDate: yup.string().required("Start Date is required"),
  endDate: yup.string().required("End Date is required"),
  number_of_installments: yup
    .number()
    .typeError("Invalid value, must be number")
    .moreThan(0, "Installments must be at least 1")
    .required("Installments is required"),
});
