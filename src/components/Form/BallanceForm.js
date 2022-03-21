import React, { useState } from "react";
import Form from "./Form";
import Input from "../Input/Input";
import { useTradeContext } from "../context/tradeContext/tradeContext";

const BallanceForm = () => {
  const [value, steValue] = useState("");

  const { setBallance } = useTradeContext();

  const inputBallanceHandler = ({ target: { value } }) =>
    steValue(parseFloat(value));

  const formSubmitHandler = (e) => {
    e.preventDefault();
    setBallance(value);
  };

  return (
    <Form className="ballanceForm" onSubmit={formSubmitHandler}>
      <Input
        inputHandler={inputBallanceHandler}
        value={value}
        placeholderHandler="Enter value"
      />
      <input type="submit" />
    </Form>
  );
};

export default BallanceForm;
