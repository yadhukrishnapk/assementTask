import { useState } from "react";
import { showErrorToast } from "../utils/toastMessage";

export const useLoginForm = (onLogin) => {
  const [error, setError] = useState(null);

  const handleSubmit = async (formState) => {
    const { values } = formState;
    try {
      await onLogin(values.username, values.password);
    } catch (err) {
      const errorMessage = err.message || "Login failed. Please check your credentials.";
      setError(errorMessage);
      showErrorToast(errorMessage);
    }
  };

  return {
    error,
    setError,
    handleSubmit,
  };
};

export default useLoginForm;