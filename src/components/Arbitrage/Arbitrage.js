import React from "react";
import { getCurrentPrice, getSymbols } from "../../api/binance";
import useCalc from "../calculations/useCalc";

const getIsTradable = (symbols, baseAsset, targetAsset) =>
  symbols.some(
    (i) => i.symbol.includes(baseAsset) && i.symbol.includes(targetAsset)
  );

const isTradable = (
  symbols = [],
  baseAsset = "SOL",
  quoteAsset = "RUB",
  targetAsset = "USDT"
) => {
  const res =
    getIsTradable(symbols, baseAsset, targetAsset) &&
    getIsTradable(symbols, baseAsset, quoteAsset) &&
    getIsTradable(symbols, targetAsset, quoteAsset);

  if (!res) {
    throw new Error("НЕТ ТОРГОВОЙ ПАРЫ");
  }
  return res;
};

const fiatArray = [
  "RUB",
  "UAH",
  "TRY",
  "BRL",
  //  "EUR",
  "AUD",
  "GBP",
];
const AltsArray = [
  "ETH",
  "BNB",
  "SOL",
  //   "BRL",
  //   //  "EUR",
  //   "AUD",
  //   "GBP",
];

const currentSymbolArray = (symbols, baseAsset) =>
  symbols.filter((i) => {
    return i.baseAsset.toUpperCase() === baseAsset.toUpperCase();
  });

let countIterations = {
  positive: 0,
  negative: 0,
};

const Arbitrage = async (
  //   baseAsset = "MANA",
  //   baseAsset = "BTC",
  baseAsset = "SOL",
  //   quoteAsset = "BTC",
  //   quoteAsset = "UAH",
  quoteAsset = "TRY",
  //   quoteAsset = "RUB",
  // quoteAsset = "ETH",
  //   quoteAsset = "BTC",
  //   quoteAsset = "EUR",
  //   targetAsset = "BNB"
  targetAsset = "ETH"
  //   targetAsset = "BTC"
  // targetAsset = "USDT"
) => {
  const { symbols } = await getSymbols();
  let balance = localStorage.getItem("balance") || 1000;

  if (!isTradable(symbols, baseAsset, quoteAsset, targetAsset)) {
    return;
  }

  const turnONBot = async () => {
    const trashHold = 0.1;
    let base_Target = await getCurrentPrice(baseAsset, targetAsset);
    console.log("base_Target :>> ", base_Target);
    let base_Quote = await getCurrentPrice(baseAsset, quoteAsset);
    console.log("base_Quote", base_Quote);
    let quote_Target;
    // let quote_Target = await getCurrentPrice(targetAsset, quoteAsset);

    // const quote_Base = await getCurrentPrice(quoteAsset, baseAsset);
    // const target_Quote = await getCurrentPrice(targetAsset, quoteAsset);
    if (
      quoteAsset === targetAsset ||
      baseAsset === quoteAsset ||
      baseAsset === targetAsset
    ) {
      throw new Error("ОДИНЫКОВЫЕ ВХОДНЫЕ ДАННЫЕ");
    }
    // TODO: создать саммивы с Альтами для категории targetAsset

    if (quoteAsset === "BTC" && AltsArray.includes(targetAsset)) {
      quote_Target = await getCurrentPrice(targetAsset, quoteAsset);
      return;
    }

    if (quoteAsset === "BTC" || quoteAsset === "EUR") {
      quote_Target = await getCurrentPrice(quoteAsset, targetAsset);
    }

    if (quoteAsset === "USDT" || fiatArray.includes(quoteAsset)) {
      quote_Target = await getCurrentPrice(targetAsset, quoteAsset);
    }

    if (targetAsset === "BTC" && fiatArray.includes(quoteAsset)) {
      quote_Target = await getCurrentPrice(targetAsset, quoteAsset);
    }

    let AB = balance / parseFloat(base_Target.price); // купить альт за дол
    let BC = AB * parseFloat(base_Quote.price); // продать альт за БТС
    let CD = BC / parseFloat(quote_Target.price); // продать БТС за ДОЛ

    console.log("CD", CD);
    const profit1 = ((CD - balance) / balance) * 100;
    const profit = (CD / balance) * 100 - 100;

    console.log("profit", profit);
    console.log("profit111111", profit1);

    if (profit > trashHold) {
      countIterations.positive += 1;
      localStorage.setItem("balance", CD);
      return;
    }

    AB = balance * parseFloat(quote_Target.price);
    BC = AB / parseFloat(base_Quote.price);
    CD = BC * parseFloat(base_Target.price);
    if (profit > trashHold) {
      console.log("profit2", profit);
      countIterations.negative += 1;
      localStorage.setItem("balance", CD);
      return;
    }
  };

  setInterval(() => {
    try {
      turnONBot();
    } catch (err) {
      console.log("err", err);
    }
  }, 5000);

  console.log("countIterations", countIterations);
  console.log("balance", balance);
};

export default Arbitrage;
