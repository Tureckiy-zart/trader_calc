import React from "react";

const Input = ({
  inputHandler = () => {},
  typeHandler = "number",
  placeholderHandler = "",
  value = 0,
}) => {
  return (
    <label>
      {placeholderHandler}
      <input
        type={typeHandler}
        onChange={inputHandler}
        value={value}
      />
    </label>
  );
};

export default Input;
