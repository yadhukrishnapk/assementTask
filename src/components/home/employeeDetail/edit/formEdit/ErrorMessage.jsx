import React from "react";
import { useFormState } from "informed";

const ErrorMessage = ({ name }) => {
  const formState = useFormState();
  const error = formState.errors[name];

  if (error) {
    const element = document.querySelector(`[name="${name}"]`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "center" });
    }
    
    return (
      <div className="text-danger mt-1 small">
        <i className="bi bi-exclamation-circle me-1"></i>
        {error}
      </div>
    );
  }

  return null;
};

export default ErrorMessage;