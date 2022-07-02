import { useEffect } from "react";
import {
  getCurrentPrice,
  //  getKucoinPrice
} from "../../api/binance";
import {
  PROFIT_DELTA,
  MAX_TRADE_PERCENT,
  LONG,
  SHORT,
} from "../constants/constants";
import { useTradeContext } from "../context/tradeContext/tradeContext";

const useCalc = () => {
  const {
    enterPosition,
    stopPosition,
    ballance,
    setTargetValue,
    tradeDirection,
    marginValue,
    setTargetPosition,
    isMargin,
    roe,
  } = useTradeContext();

  //   const tradeDirection = +enterPosition > stopPosition ? LONG : SHORT;

  //   setTradeDirection(tradeDirection);

  let buffer = Math.abs(+enterPosition - stopPosition);
  const profit = buffer * PROFIT_DELTA;

  // const errorHandler = () => {};

  //   useEffect(() => {
  if (tradeDirection === LONG) setTargetValue(+enterPosition + profit);
  if (tradeDirection === SHORT)
    setTargetValue(Math.abs(+enterPosition - profit));
  //   }, [tradeDirection]);

  const maxTradeAmount = parseFloat(ballance * MAX_TRADE_PERCENT).toFixed(2);

  //------------------------------------------------------------------------------
  // margin clalc block

  const tradeSum = parseFloat(maxTradeAmount);
  const marginSum = tradeSum * marginValue || 1;
  const profitFinal = marginSum * roe;

  let cryptoAmount = +marginSum / +enterPosition;

  const countProfitPriceInBtc = +enterPosition + +enterPosition * roe; //= 100%

  const pointsToTakeProfit = !isMargin
    ? +enterPosition * roe
    : Math.abs((+enterPosition * roe) / marginValue);

  const takeProfitValue =
    tradeDirection === LONG
      ? pointsToTakeProfit + +enterPosition
      : Math.abs(pointsToTakeProfit - +enterPosition);

  const marginStopLoss =
    tradeDirection === LONG
      ? Math.abs(pointsToTakeProfit - +enterPosition)
      : pointsToTakeProfit + +enterPosition;
  const btcAmount = marginSum / +enterPosition;

  const countArbitrage = ({
    current,
    target = "BTC",
    base = "USDT",
    count = parseFloat(localStorage.getItem("Arbitrage ballance")) || 1000,
  }) => {
    console.log("1", 1);
    const current_base = getCurrentPrice(current, base);
    const target_base = getCurrentPrice(target, base);
    const target_current = getCurrentPrice(current, target);
    console.log("current", current);
    // const kuc = getKucoinPrice(target, base).catch((e) => {
    //   console.log("e", e);
    // });
    // console.log("kuc", kuc);
    const CURRENT_BASE = current + base; // eth =>usd
    const TARGET_BASE = target + base; // BTC => USD
    const CURRENT_TARGET = current + target; //BTC => USD

    Promise.all([current_base, target_base, target_current]).then((res) => {
      const mapper = res.reduce((acc, i) => {
        acc[i.symbol] = parseFloat(i.price);
        return acc;
      }, {});

      const marketCommission = (value, percent = 0.075) =>
        value - value * (percent / 100);

      const byCurrent = marketCommission(count / mapper[CURRENT_BASE]); // usd => 'eth'
      const byTarget = marketCommission(mapper[CURRENT_TARGET] * byCurrent); //eth => bts
      const byBase = marketCommission(byTarget * mapper[TARGET_BASE]); //btc => usd
      const margin = byBase - count;
      //   console.group("clo");
      //   console.log("mapper", mapper);
      //   console.log("byCurrent :>> ", byCurrent);
      //   console.log("byTarget", byTarget);
      //   console.log("byBase :>> ", byBase);
      //   console.log("margin", margin);
      //   console.log("======================================");
      console.groupEnd();

      const isProfit = margin > 0;
      const procent = `${((margin / count) * 100).toFixed(3)}%`;

      console.log("isProfit", isProfit);
      if (isProfit) {
        console.log("profit % :>> ", procent);
        localStorage.setItem("Arbitrage ballance", count + margin);
      }

      ///----------------------------------
    });
  };
  // {
  //   const ethAmount = mapper[CURRENT_TARGET] * count;
  //   const dollarAmount = ethAmount * mapper[TARGET_BASE];
  //   const resAmount = dollarAmount / mapper[CURRENT_BASE];
  //   const isProfit = dollarAmount - dollarAmount / mapper[CURRENT_BASE] > 0;
  //   console.log("dollarAmount", dollarAmount);
  //   console.log(
  //     "dollarAmount - dollarAmount / mapper[CURRENT_BASE]",
  //     dollarAmount - dollarAmount / mapper[CURRENT_BASE]
  //   );
  //   console.log("isProfit :>> ", isProfit);
  //   debugger;
  //   const procent = `${(100 - (count / resAmount) * 100).toFixed(3)}%`;
  //   console.log("resAmount", resAmount);
  //   if (parseFloat(procent) <= 0) {
  //     console.log("procent <= 0:>> ", procent);
  //     return;
  //   }
  //   const cleanProfit = resAmount - count;
  //   //   debugger;
  //   if (parseFloat(procent) > 0) {
  //     console.log("Profit precent ", parseFloat(procent).toFixed(2));
  //     localStorage.setItem("count", count + Math.abs(cleanProfit));
  //   }
  // }

  //   setInterval(countArbitrage(), 100);

  //   const countArbitrage = async ({
  //     count = 100,
  //     eth_usdt,
  //     kcs_usdt,
  //     kcs_eth,
  //   }) => {
  //     const ethAmount = kcs_eth * count;
  //     const dollarAmount = ethAmount * eth_usdt;
  //     const resAmount = dollarAmount / kcs_usdt;
  //     const procent = 100 - (count / resAmount) * 100;
  //     console.log("resAmount", resAmount.toFixed(2));
  //     console.log("procent", procent.toFixed(2));

  //     const a = await getCurrentPrice("ETH", "USDT");
  //     const b = await getCurrentPrice("BNB", "USDT");
  //     const c = await getCurrentPrice("BNB", "ETH");

  // l

  //     console.log("a,b,c :>> ", a, b, c);

  //     return resAmount;
  //   };

  //   countArbitrage({
  //     count: 100,
  //     eth_usdt: 3439.1,
  //     kcs_usdt: 21.06,
  //     kcs_eth: 0.006121,
  //   });

  //   countArbitrage(100, 1020, 0.765, 0.00077);
  //------------------------------------------------------------------------------
  return {
    cryptoAmount,
    maxTradeAmount,
    marginSum,
    profitFinal,
    pointsToTakeProfit,
    takeProfitValue,
    marginStopLoss,
    btcAmount,
    countArbitrage,
  };
};

export default useCalc;
