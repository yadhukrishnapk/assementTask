import React from "react";
import { useField } from "informed";
import { InputGroup } from "react-bootstrap";
import { Eye, EyeOff } from "lucide-react";

const InputField = ({
  label,
  name,
  fieldType = "text",
  validate,
  required = false,
  placeholder,
  validateOn,
  icon,
  ...props
}) => {
  const { fieldState, fieldApi, render } = useField({
    ...props,
    name,
    validate,
    validateOn,
  });

  const { error, value } = fieldState;
  const inputId = `${name}-input`;
  const errorId = `${name}-error`;
  const [showPassword, setShowPassword] = React.useState(false);
  
  const actualFieldType = fieldType === "password" ? (showPassword ? "text" : "password") : fieldType;

  return render(
    <div className="mb-3">
      {label && (
        <label htmlFor={inputId} className="form-label">
          {label} {required && <span className="text-danger">*</span>}
        </label>
      )}
      <InputGroup hasValidation>
        {icon && <InputGroup.Text className="input-icon">{icon}</InputGroup.Text>}
        <input
          {...props}
          id={inputId}
          type={actualFieldType}
          value={value || ""}
          onChange={(e) => fieldApi.setValue(e.target.value)}
          onBlur={() => fieldApi.setTouched(true)}
          className={`form-control ${error ? "is-invalid" : ""}`}
          placeholder={placeholder || `Enter ${label?.toLowerCase()}`}
          aria-invalid={!!error}
          aria-describedby={error ? errorId : undefined}
        />
        {fieldType === "password" && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="btn btn-outline-secondary"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        )}
        {error && (
          <div id={errorId} className="invalid-feedback">
            {error}
          </div>
        )}
      </InputGroup>
    </div>
  );
};

export default InputField;