import "../FormInput/FormInput.scss";
import "./SelectInput.scss";

export const SelectInput = ({
  id,
  label,
  options,
  placeholder = "Selecciona una opción",
  error,
  ...selectProps
}) => (
  <div className="auth-input-group">
    <label htmlFor={id}>{label}</label>
    <div className={`auth-input-wrapper ${error ? "auth-input-error" : ""}`}>
      <select
        id={id}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        {...selectProps}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
    {error && (
      <span id={`${id}-error`} className="auth-error-message" role="alert">
        {error}
      </span>
    )}
  </div>
);
