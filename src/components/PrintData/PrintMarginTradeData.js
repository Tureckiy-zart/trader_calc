import React from "react";
import useCalc from "../calculations/useCalc";
// import { useTradeContext } from "../context/tradeContext/tradeContext";

const PrintMarginTradeData = () => {
  //   const { isVisibleTradeValues, currentCryptoPrice } = useTradeContext();

  const {
    marginSum,
    profitFinal,
    pointsToTakeProfit,
    takeProfitValue,
    marginStopLoss,
    btcAmount,
  } = useCalc();

  return (
    <>
      <div className="printData">
        <div>
          <span className="profitFinal" style={{ color: "darkorange" }}>
            Profit ($): {profitFinal.toFixed(1) || ""}
          </span>
        </div>

        <p className="pointsToTakeProfit">
          Distance(points) ($): {pointsToTakeProfit.toFixed(1) || ""}
        </p>
        <div>
          <span className="takeProfitValue">
            Take Profit($): {takeProfitValue.toFixed(1) || ""}
          </span>
          <span className="marginStopLoss">
            StopLoss ($): {marginStopLoss.toFixed(1)}
          </span>
        </div>
        <p className="currentBtc_color">
          Current Price BTC:
          {/* {currentCryptoPrice} */}
        </p>
        <p
          className="btcAmount"
          style={{ color: btcAmount < 0.001 ? "red" : "green" }}
        >
          Crypto Amount ($): {btcAmount.toFixed(4)}
        </p>
      </div>
    </>
  );
};

export default PrintMarginTradeData;
