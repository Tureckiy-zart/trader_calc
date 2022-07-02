import React from "react";
import useCalc from "../calculations/useCalc";
import { useTradeContext } from "../context/tradeContext/tradeContext";

const PrintMargin = () => {
  const { isMargin } = useTradeContext();
  const {
    // maxTradeAmount,
    marginSum,
    profitFinal,
    pointsToTakeProfit,
    takeProfitValue,
    marginStopLoss,

    btcAmount,
  } = useCalc();
  //   marginCount();
  return (
    <>
      <div className="print_margin_container">
        {/* <p className="enterValue">Ballance: ${ballance}</p> */}
        {isMargin && (
          <>
            {/* <div className="margin_container"> */}
            {/* <p className="stopValue">Trade amount: ${maxTradeAmount}</p> */}

            <p className="marginSum">Max Open (USDT)t: ${marginSum}</p>
            <p className="profitFinal">
              Profit (USDT)t: ${profitFinal.toFixed(1)}
            </p>
            <p className="pointsToTakeProfit">
              pointsToTakeProfit (USDT)t: ${pointsToTakeProfit}
            </p>
            <p className="takeProfitValue">
              takeProfitValue (USDT)t: ${takeProfitValue}
            </p>
            <p className="marginStopLoss">
              marginStopLoss (USDT)t: ${marginStopLoss}
            </p>
            <p
              className="btcAmount"
              style={{ color: btcAmount < 0.001 ? "red" : "green" }}
            >
              btcAmount (USDT): ${btcAmount}
            </p>
          </>

          // {/*   </div> */}
        )}
      </div>
    </>
  );
};

export default PrintMargin;
