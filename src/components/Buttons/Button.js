import React from "react";
const Button = ({
  typeHandler = "button",
  onClickHandler = () => {},
  children = "Ok",
}) => {
  return (
    <button onClick={onClickHandler} type={typeHandler}>
      {children}
    </button>
  );
};

export default Button;
