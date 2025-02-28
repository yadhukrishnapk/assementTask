import React, { useState } from "react";
import { Form } from "informed";
import { User, Lock, Loader } from "lucide-react";
import InputField from "../InputField";
import { Button } from "react-bootstrap";
import "./LoginForm.css";
import { validatePassword } from "../validateLogin";
import { validateUsername } from "../validateLogin";

const LoginForm = ({ onLogin }) => {
  const [formErrors, setFormErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (formState) => {
    const { values } = formState;
    
    
    
    setLoading(true);
    
    try {
      if (onLogin) {
        await onLogin(values.username, values.password, setFormErrors);
      }
    } catch (error) {
      setFormErrors({ general: "An unexpected error occurred" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`login-container ${loading ? 'login-loading' : ''}`}>
      {loading && <div className="login-overlay">
        <div className="loading-spinner-container">
          <Loader size={40} className="loading-spinner" />
          <p className="loading-text">Signing you in...</p>
        </div>
      </div>}
      <div className="login-header">
        <h2 className="login-title">Welcome Back</h2>
        <p className="login-subtitle">Please sign in to continue</p>
      </div>

      <div className="login-body">
        {formErrors.general && (
          <div className="alert alert-danger" role="alert">
            {formErrors.general}
          </div>
        )}

        <Form onSubmit={handleSubmit}>
          <InputField
            name="username"
            label="Username"
            placeholder="Enter your username"
            validate={validateUsername}
            validateOn="change"
            required
            icon={<User size={20} />}
            disabled={loading}
          />

          <InputField
            name="password"
            label="Password"
            fieldType="password"
            placeholder="Enter your password"
            validate={validatePassword}
            validateOn="change"
            required
            icon={<Lock size={20} />}
            disabled={loading}
          />

          <Button
            type="submit"
            className={`w-100 mt-3 login-button ${loading ? 'login-button-loading' : ''}`}
            variant="primary"
            disabled={loading}
          >
            {loading ? "Processing..." : "Sign In"}
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default LoginForm;