"use client";

import Modal from "@/app/components/modal";
import { RECURRING_PAYMENT_SCHEMA } from "@/app/utils/formSchema";
import axios from "axios";
import { addMonths, addWeeks, format } from "date-fns";
import { useFormik } from "formik";
import { useEffect, useState } from "react";

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
      startDate: format(new Date(), "yyyy-MM-dd"),
      number_of_installments: 2,
      endDate: format(new Date(), "yyyy-MM-dd"),
    },
    enableReinitialize: true,
    validationSchema: RECURRING_PAYMENT_SCHEMA,
    onSubmit: async (values, { resetForm, setErrors }) => {
      setSuccess("");
      try {
        const { data } = await axios.post("/api/transfer", values);
        if (data?.status === "success") {
          resetForm();
          setSuccess("Transfer created successfully");
        } else {
          setErrors({ response: data?.message });
        }
      } catch (e) {
        setErrors({
          response:
            "There was an issue making the transfer. The login details of this account might have changed. Ask the account owner to re-link their account.",
        });
      }
    },
  });

  // Update endDate when frequency, startDate, or number_of_installments changes
  useEffect(() => {
    if (formik.values.startDate && formik.values.frequency && formik.values.number_of_installments) {
      const newEndDate = calculateEndDate(
        formik.values.startDate,
        formik.values.frequency,
        formik.values.number_of_installments
      );
      if (newEndDate) {
        formik.setFieldValue("endDate", format(newEndDate, "yyyy-MM-dd"));
      }
    }
  }, [formik.values.startDate, formik.values.frequency, formik.values.number_of_installments]);

  const handleClose = () => {
    setOpen(false);
    formik.resetForm();
    setSuccess("");
  };

  return (
    <div>
      <button
        className="rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        onClick={() => setOpen(true)}
      >
        Recurring Payment
      </button>
      <Modal open={open} setOpen={setOpen}>
        <form
          className="space-y-2 w-96"
          onSubmit={formik.handleSubmit}
          method="POST"
        >
          <p className="mb-10">Enter an amount to receive from client</p>
          <div className="flex flex-col gap-y-5">
            <div>
              <label className="block text-sm leading-6 text-gray-900">
                Amount to charge
              </label>
              <input
                id="amount"
                name="amount"
                value={formik.values.amount}
                onChange={formik.handleChange}
                className="block px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              {formik.errors.amount && formik.touched.amount && (
                <small className="text-red-600">{formik.errors.amount}</small>
              )}
            </div>
            <div>
              <label className="block text-sm leading-6 text-gray-900">
                Frequency
              </label>
              <select
                id="frequency"
                name="frequency"
                value={formik.values.frequency}
                onChange={formik.handleChange}
                className="block w-full bg-white rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
              >
                <option value="weekly">Weekly</option>
                <option value="bi-weekly">Bi-Weekly</option>
                <option value="monthly">Monthly</option>
              </select>
            </div>
            <div>
              <label className="block text-sm leading-6 text-gray-900">
                Number of Installments
              </label>
              <input
                type="number"
                min={1}
                name="number_of_installments"
                value={formik.values.number_of_installments}
                onChange={formik.handleChange}
                className="block px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              {formik.errors.number_of_installments &&
                formik.touched.number_of_installments && (
                  <small className="text-red-600">
                    {formik.errors.number_of_installments}
                  </small>
                )}
            </div>
            <div className="flex gap-x-5 w-full">
              <div className="w-full">
                <label className="block text-sm leading-6 text-gray-900">
                  Start Date
                </label>
                <input
                  id="startDate"
                  name="startDate"
                  type="date"
                  value={formik.values.startDate}
                  onChange={formik.handleChange}
                  className="block px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {formik.errors.startDate && formik.touched.startDate && (
                  <small className="text-red-600">
                    {formik.errors.startDate}
                  </small>
                )}
              </div>
              <div className="w-full">
                <label className="block text-sm leading-6 text-gray-900">
                  End Date
                </label>
                <input
                  id="endDate"
                  name="endDate"
                  type="date"
                  value={formik.values.endDate}
                  readOnly
                  className="block px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 bg-gray-200 sm:text-sm sm:leading-6"
                />
                {formik.errors.endDate && formik.touched.endDate && (
                  <small className="text-red-600">{formik.errors.endDate}</small>
                )}
              </div>
            </div>
          </div>
          {formik.errors.response && (
            <small className="text-red-600">{formik.errors.response}</small>
          )}
          {success && <small className="text-green-600">{success}</small>}
          <div className="!mt-10 sm:flex sm:flex-row-reverse">
            <button
              type="submit"
              disabled={formik.isSubmitting}
              className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm sm:ml-3 sm:w-auto"
            >
              Continue
            </button>
            <button
              type="button"
              onClick={handleClose}
              className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset sm:mt-0 sm:w-auto"
            >
              Cancel
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

const calculateEndDate = (startDate, frequency, installments) => {
  if (!startDate || !frequency || !installments) return null;

  const start = new Date(startDate);
  
  switch (frequency) {
    case 'weekly':
      return addWeeks(start, installments - 1);
    case 'bi-weekly':
      return addWeeks(start, (installments - 1) * 2);
    case 'monthly':
      return addMonths(start, installments - 1);
    default:
      throw new Error('Invalid frequency');
  }
};