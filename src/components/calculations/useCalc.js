import {
  PROFIT_DELTA,
  MAX_TRADE_PERCENT,
  LONG,
  SHORT,
} from "../constants/constants";
import { useTradeContext } from "../context/tradeContext/tradeContext";

const useCalc = () => {
  const {
    enterValue,
    stopValue,
    ballance,
    setTargetValue,
    setTradeDirection,
    tradeDirection,
  } = useTradeContext();

  setTradeDirection(enterValue > stopValue ? LONG : SHORT);
  console.log("tradeDirection,", tradeDirection);
  let buffer = Math.abs(enterValue - stopValue);
  const profit = buffer * PROFIT_DELTA;

  // const errorHandler = () => {};

  if (tradeDirection === "long") setTargetValue(enterValue + profit);
  if (tradeDirection === "short") setTargetValue(Math.abs(enterValue - profit));

  const maxTradeAmount = parseFloat(ballance * MAX_TRADE_PERCENT).toFixed(2);

  return { maxTradeAmount };
};

export default useCalc;
