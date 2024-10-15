"use client";

import Modal from "@/app/components/modal";
import { RECURRING_PAYMENT_SCHEMA } from "@/app/utils/formSchema";
import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";

export default function CreateRecurringPayment({ account }) {
  const [open, setOpen] = useState(false);
  const [success, setSuccess] = useState();
  const formik = useFormik({
    initialValues: {
      amount: "",
      id: account.id,
      accountId: account.accountId,
      type: "debit",
      frequency: "weekly",
    },
    enableReinitialize: true,
    validationSchema: RECURRING_PAYMENT_SCHEMA,
    onSubmit: async (values, { resetForm, setErrors }) => {
      setSuccess("");
      try {
        const { data } = await axios.post("/api/transfer", values);
        if (data?.status === "success") {
          resetForm();
          setSuccess(
            "Transfer created successfully"
          );
        } else {
          setErrors({ response: data?.message });
        }
      } catch (e) {
        console.log(e);
      }
    },
  });

  const handleClose = () => {
    setOpen(false);
    formik.resetForm();
    setSuccess("");
  };
  return (
    <div>
      <button onClick={() => setOpen(true)}>Make Recurring Payment</button>
      <Modal open={open} setOpen={setOpen}>
        <form
          className="space-y-2 w-96"
          onSubmit={formik.handleSubmit}
          action="#"
          method="POST"
        >
          <p className="mb-10">Enter an amount to receive from client</p>
          <div>
            <label
              htmlFor="email"
              className="block text-sm leading-6 text-gray-900"
            >
              Amount to charge
            </label>
            <div className="mt-2">
              <input
                id="amount"
                name="amount"
                value={formik.values.amount}
                onChange={formik.handleChange}
                className="block px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              {formik.errors.amount && formik.touched.amount && (
                <small className="text-red-600">{formik.errors.amount}</small>
              )}
            </div>
          </div>
          <div>
            <label
              for="frequency"
              class="block text-sm font-medium leading-6 text-gray-900"
            >
              Frequency
            </label>
            <select
              id="frequency"
              value={formik.values.frequency}
              onChange={formik.handleChange}
              name="frequency"
              class="mt-2 block w-full bg-white rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
            >
              <option value={"weekly"}>Weekly</option>
              <option value={"bi-weekly"}>Bi-Weekly</option>
              <option value={"monthly"}>Monthly</option>
            </select>
          </div>
          {formik.errors.response && (
            <small className="text-red-600">{formik.errors.response}</small>
          )}
          {success && <small className="text-green-600">{success}</small>}
          <div className="mt-10 sm:mt-4 sm:flex sm:flex-row-reverse">
            <button
              type="submit"
              disabled={formik.isSubmitting}
              className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm  sm:ml-3 sm:w-auto"
            >
              Continue
            </button>
            <button
              type="button"
              onClick={handleClose}
              className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset  sm:mt-0 sm:w-auto"
            >
              Cancel
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
