import React from "react";

const InputGroup = ({
  name,
  placeholder,
  value,
  error,
  icon,
  type,
  onChange
}) => {
  return (
    <div className="input-group mb-3">
      <div className="input-group-prepend">
        <span className="input-group-text">
          <i className={icon}></i>
        </span>
      </div>
      <input
        className={`${error ? "is-invalid" : ""} form-control form-control-lg`}
        placeholder={placeholder}
        name={name}
        type={type}
        autoComplete="true"
        value={value}
        onChange={onChange}
      />
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

InputGroup.defaultProps = {
  type: "text"
};

export default InputGroup;
