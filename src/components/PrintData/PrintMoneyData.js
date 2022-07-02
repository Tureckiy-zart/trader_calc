import React from "react";
import useCalc from "../calculations/useCalc";
import { useTradeContext } from "../context/tradeContext/tradeContext";

const PrintMoneyData = () => {
  const { setBallance,cryptoName } = useTradeContext();

  const { marginSum, cryptoAmount } = useCalc();
  return (
    <>
      <div className="main_flex  trade-max_value   margin-print_mainValues">
        <p className="currency" style={{ color: "darkorange" }}>
          Currency: {cryptoName}
        </p>
        <p className="tradeAmount" style={{ color: "palegreen" }}>
          Trade amount: ${marginSum.toFixed(1)}
        </p>
        <p className="tradeAmountCrypto" style={{ color: "palegreen" }}>
          Crypto amount: {cryptoAmount }
        </p>
      </div>
    </>
  );
};

export default PrintMoneyData;
