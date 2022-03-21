import React, { useState } from "react";
import Form from "./Form";
import Input from "../Input/Input";
import Button from "../Buttons/Button";
import { useTradeContext } from "../context/tradeContext/tradeContext";

const TargetForm = () => {
  const { setIsVisibleTradeValues, setEnterValue, setStopValue } =
    useTradeContext();

  const [enterLocalValue, setEnterLocalValue] = useState("");
  const [stopLocalValue, setStopLocalValue] = useState("");

  const formSubmitHandler = (e) => {
    e.preventDefault();

    setEnterValue(enterLocalValue);
    setStopValue(stopLocalValue);
    setIsVisibleTradeValues(true);
  };

  const inputEnterHandler = ({ target: { value } }) =>
    setEnterLocalValue(parseFloat(value));
  const inputStopHandler = ({ target: { value } }) =>
    setStopLocalValue(parseFloat(value));

  const resetInputValuesHandler = () => {
    setEnterValue("");
    setStopValue("");
    setIsVisibleTradeValues(false);

    setEnterLocalValue("");
    setStopLocalValue("");
  };

  return (
    <Form className="targetForm" onSubmit={formSubmitHandler}>
      <Input
        placeholderHandler="Enter position"
        inputHandler={inputEnterHandler}
        typeHandler="number"
        value={enterLocalValue}
      />
      <Input
        placeholderHandler="Stop position"
        inputHandler={inputStopHandler}
        typeHandler="number"
        value={stopLocalValue}
      />
      <div className="controls">

      <input type="submit" />
      <Button typeHandler="button" onClickHandler={resetInputValuesHandler}>
        Reset
      </Button>
      </div>
    </Form>
  );
};

export default TargetForm;
