import React, { useEffect, useState } from "react";

import { Button, ButtonGroup, Checkbox, TextField } from "@mui/material";
import Form from "./Form";
import Input from "./Input/Input";
// import Button from "../Buttons/Button";
import { useTradeContext } from "../context/tradeContext/tradeContext";
import CurrencySelect from "./Select/CurrencySelect";
import MarginSelect from "./Select/MarginSelect";
// import { getCurrentPrice } from "../../api/binance";
import { LONG, SHORT } from "../constants/constants";

const TargetForm = () => {
  const {
    setEnterPosition,
    setStopPosition,
    setCryptoName,
    setMarginValue,
    setRoe,
    isMargin, //!!!!
    setCurrentCryptoPrice,
    setTradeDirection,
    setBallance,
  } = useTradeContext();

  const [enterValue, setEnterValue] = useState(4500);
  
  const [stopValue, setStopValue] = useState();

  const [cryptoLocalName, setCryptoLocalName] = useState("ETH");
  const [marginSelectValue, setMarginSelectValue] = useState(1);
  const [profitPercent, setProfitPercent] = useState(10);
  const [tradeLocalDirection, setTradeLocalDirection] = useState(LONG);

  const [isMarginChecked, setIsMarginChecked] = useState(false);

  const formSubmitHandler = async (e) => {
    e.preventDefault();
    console.log("enterValue FORM:>> ", enterValue);
    
    setCryptoName(cryptoLocalName);
    setEnterPosition(enterValue);
    setStopPosition(stopValue);

    setMarginValue(marginSelectValue);
    setTradeDirection(tradeLocalDirection);
    setRoe(profitPercent / 100);

    // setBallance(77777777777777777777777777777777);
    // if (isMargin) {
    //   const currentPrice = await getCurrentPrice(cryptoLocalName);
    //   setCurrentCryptoPrice(parseFloat(currentPrice).toFixed(2));
    // }
    // debugger;
  };

  const onGetEnterPosition = ({ target: { value } }) =>
    setEnterValue(parseFloat(value));
  const onGetStopPosition = ({ target: { value } }) =>
    setStopValue(parseFloat(value));

  const onGetProfitPercent = ({ target: { value } }) =>
    setProfitPercent(parseFloat(value));
  const onGetTradeDirection = ({ target }) =>
    setTradeLocalDirection(target.name);

  const onMarginSelector = () => setIsMarginChecked((prev) => !prev);

  const onChangeMarginValue = (value) => setMarginSelectValue(value.value);
  const onChangeCurrency = (value) => setCryptoLocalName(value.value);

  const resetInputValuesHandler = () => {
    setEnterValue();
    setStopValue();

    setEnterValue();
    setStopValue();
    setProfitPercent(10);
  };

  return (
    <Form className="targetForm main_flex" onSubmit={formSubmitHandler}>
      <div className="targetForm_setStartData_container">
        <CurrencySelect
          //   defaultValue="BTC"
          inputHandler={onChangeCurrency}
          value={cryptoLocalName}
        />
        <TextField
          required={true}
          variant="standard"
          id="outlined-name"
          label="Enter position"
          type="number"
          value={enterValue}
          onChange={onGetEnterPosition}
        />
        <TextField
          required={isMargin && true}
          variant="standard"
          id="outlined-name"
          label="Stop position"
          type="number"
          value={stopValue}
          onChange={onGetStopPosition}
        />
      </div>
      <div className="targetForm_calculations">
        <TextField
          variant="standard"
          type="number"
          id="outlined-name"
          label="ROE, %"
          value={profitPercent}
          onChange={onGetProfitPercent}
        />

        <div className="margin-container">
          Margin :
          <Checkbox
            checked={isMarginChecked}
            onChange={onMarginSelector}
            inputProps={{ "aria-label": "controlled", id: "changeMargin" }}
          />
          {isMarginChecked && (
            <MarginSelect
              inputHandler={onChangeMarginValue}
              value={marginSelectValue}
            />
          )}
        </div>
        <ButtonGroup className="controls" size="small">
          <Button
            color="success"
            variant="contained"
            name={LONG}
            onClick={onGetTradeDirection}
          >
            {LONG}
          </Button>

          <Button
            name={SHORT}
            onClick={onGetTradeDirection}
            variant="contained"
            color="error"
          >
            {SHORT}
          </Button>
        </ButtonGroup>
      </div>
      {/* //controls */}
      <ButtonGroup
        className="controls"
        orientation="vertical"
        size="small"
        // color="secondary"
        aria-label="small button group"
        // variant="outlined"
      >
        <Button type="submit" color="secondary">
          Submit
        </Button>
        <Button type="button" onClick={resetInputValuesHandler}>
          Reset
        </Button>
      </ButtonGroup>
    </Form>
  );
};

export default TargetForm;
