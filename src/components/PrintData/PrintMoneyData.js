import React from "react";
import useCalc from "../calculations/useCalc";
import { useTradeContext } from "../context/tradeContext/tradeContext";
const PrintMoneyData = () => {
  const { ballance, isVisibleTradeValues } = useTradeContext();
  const { maxTradeAmount } = useCalc();
  return (
    <>
      <div className="printData">
        <p className="enterValue">Ballance: ${ballance}</p>
        {isVisibleTradeValues && (
          <p className="stopValue">Trade amount: ${maxTradeAmount}</p>
        )}
      </div>
    </>
  );
};

export default PrintMoneyData;
