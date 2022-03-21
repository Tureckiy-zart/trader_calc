import React from "react";
import { LONG } from "../constants/constants";
import { useTradeContext } from "../context/tradeContext/tradeContext";
const PrintTradeData = () => {
  const { stopValue, enterValue, tradeDirection, targetValue ,isVisibleTradeValues} =
    useTradeContext();
  const color = tradeDirection === LONG ? "lightgreen" : "red";
console.log('tradeDirection :>> ', tradeDirection);
  return (
    <>
      {isVisibleTradeValues && (
      <div className="printData">
        <p className="enterValue">EnterValue: ${enterValue}</p>
        <p className="stopValue">StopValue: ${stopValue}</p>
        <p className="targetValue" style={{ color: ` ${color}` }}>
          TargetValue: ${targetValue}
        </p>
      </div>
   )} 
    </>
  );
};

export default PrintTradeData;
