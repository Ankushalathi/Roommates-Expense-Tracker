import { Form, Formik } from "formik";
import React from "react";
import { object, string } from "yup";
import FeedbackForm from "./Feedbackform";

export type FeedbackFormValues = {
  name: string;
  lastName: string;
  remark: string;
  email: string;
  country: string;
  phone: string;
};

const FeedBackFormWrapper = () => {
  const intialValues: FeedbackFormValues = {
    name: "",
    lastName: "",
    remark: '',
    email: "",
    country: "",
    phone: "",
  };

  const validationSchema = object().shape({
    name: string().required('first name is required'),
    lastName: string().required('last name is required'),
    remark: string().required('last name is required'),
    email: string().email().required('email is required'),
    country: string().required('country is required'),
    phone: string().required('phone is required')
  })
  const handleSubmit = () => {
    alert('form Submitted succesfully')
  }
  return (
    <Formik
      initialValues={intialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {(formikProps) => (
        <Form>
          <FeedbackForm formikProps={formikProps} />
        </Form>
      )}
    </Formik>
  )
};

export default FeedBackFormWrapper;
