import { FormikProps } from "formik";
import React from "react";
import ATMTextField from "../../atoms/ATMTextField/ATMTextField";
import { FeedbackFormValues } from "./FeedbackFormWrapper";
import ATMTextArea from "../../atoms/ATMTextArea/ATMTextArea";

type Props = {
  formikProps: FormikProps<FeedbackFormValues>;
};
const FeedbackForm = ({ formikProps }: Props) => {
  const { values, setFieldValue, handleReset } = formikProps;
  return (
    <div className="bg-slate-200 p-4 rounded-lg">
      <div className="pb-8">
        <div className="text-xl font-bold">Thank you so much for taking the time!</div>
        <p>Please Provide the below details!</p>
      </div>

      <div className="flex flex-col gap-4">
        <div className="w-[300px] ">

          <ATMTextField
            className="rounded-md"
            label="First Name"
            value={values?.name}
            onChange={(e) => setFieldValue("name", e.target.value)}
            placeholder="John"
            name="name"
          />
        </div>
        <div className="w-[300px]">
          <ATMTextField
            className="rounded-md"
            label="Last Name"
            value={values?.lastName}
            onChange={(e) => setFieldValue("lastName", e.target.value)}
            placeholder="Doe"
            name="lastName"
          />
        </div>
        <div className="w-[500px]">
          <ATMTextArea
            className="rounded-md"
            label="Remark"
            placeholder=" Enter you full Postal Address"
            value={values?.remark}
            onChange={(newValue) => {
              setFieldValue("lastName", newValue);
            }}
          />
        </div>

        <div className="w-[300px] ">
          <ATMTextField
            className="rounded-md"
            label="Country"
            value={values?.country}
            onChange={(e) => setFieldValue("country", e.target.value)}
            placeholder="India"
            name="country"
          />
        </div>
        <div className="w-[300px] ">
          <ATMTextField
            className="rounded-md"
            label="Email"
            value={values?.email}
            onChange={(e) => setFieldValue("email", e.target.value)}
            placeholder="example@sample.com"
            name="email"
          />
        </div>
        <div className="w-[300px] ">
          <ATMTextField
            className="rounded-md"
            label="Mobile"
            value={values?.phone}
            onChange={(e) => setFieldValue("phone", e.target.value)}
            placeholder="91+ 123456789"
            name="phone"
          />
        </div>

      </div>

      <div className="flex gap-4 mt-6">

        <button className="bg-green-400 text-white text-lg p-2 px-6 rounded font-semibold" type='submit'>
          Submit Feedback
        </button>
        <button className="bg-red-500 text-white font-medium p-2 rounded px-6" onClick={() => handleReset()}>
          Reset
        </button>

      </div>
    </div>
  );
};

export default FeedbackForm;
