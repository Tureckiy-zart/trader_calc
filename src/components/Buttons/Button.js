import React from "react";
const Button = ({
  typeHandler = "button",
  onClickHandler = () => {},
  children = "Ok",
  name = "",
}) => {
  return (
    <button onClick={onClickHandler} name={name} type={typeHandler}>
      {children}
    </button>
  );
};

export default Button;
