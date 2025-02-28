import React from "react";
import { Input, useFormState } from "informed";
import { Form } from "react-bootstrap";
import ErrorMessage from "./ErrorMessage";

const FormField = ({ label, name, type = "text", validate, formatter, parser, max, placeholder }) => {
  const formState = useFormState();
  const error = formState.errors[name];

  return (
    <Form.Group className="mb-3">
      <Form.Label className="fw-medium">{label}</Form.Label>
      <Input
        type={type}
        name={name}
        className={`form-control ${error ? "is-invalid" : ""}`}
        validate={validate}
        formatter={formatter}
        parser={parser}
        max={max}
        placeholder={placeholder}
      />
      <ErrorMessage name={name} />
    </Form.Group>
  );
};

export default FormField;