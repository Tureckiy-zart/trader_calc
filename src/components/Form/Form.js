import React from "react";
import "./form.css";

const Form = ({ onSubmit, children, className }) => {
  const cln = `form ${className}`;
  return (
    <form className={cln} onSubmit={onSubmit}>
      {children}
    </form>
  );
};

export default Form;
