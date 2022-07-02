import React from "react";

const Input = ({
  inputHandler = () => {},
  typeHandler = "number",
  placeholderHandler = "",
  value = 0,
  required = false,
}) => {
  return (
    <label>
      {placeholderHandler}
      <input
        required={required}
        type={typeHandler}
        onChange={inputHandler}
        value={value}
      />
    </label>
  );
};

export default Input;
