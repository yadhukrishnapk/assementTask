import React from "react";
import { Select, useFormState } from "informed";
import { Form, Alert, Spinner } from "react-bootstrap";
import ErrorMessage from "./ErrorMessage";

const SelectField = ({ 
  label, 
  name, 
  options, 
  isLoading,
  loadingMessage = "Loading...",
  error,
  errorMessage = "Error loading data",
  validate,
  valueKey = "id",
  labelKey = "name"
}) => {
  const formState = useFormState();
  const fieldError = formState.errors[name];

  return (
    <Form.Group className="mb-3">
      <Form.Label className="fw-medium">{label}</Form.Label>
      {isLoading ? (
        <div className="d-flex align-items-center py-2">
          <Spinner animation="border" size="sm" variant="primary" />
          <span className="ms-2 text-muted">{loadingMessage}</span>
        </div>
      ) : error ? (
        <Alert variant="danger" className="py-1 px-2 mb-0">
          {errorMessage}
        </Alert>
      ) : (
        <>
          <Select
            name={name}
            className="form-select"
            validate={validate}
          >
            <option value="">Select {label}</option>
            {options && options.map(option => (
              <option key={option[valueKey]} value={option[valueKey]}>
                {option[labelKey]}
              </option>
            ))}
          </Select>
          <ErrorMessage name={name} />
        </>
      )}
    </Form.Group>
  );
};

export default SelectField;