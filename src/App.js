import React from "react";
import axios from "axios";
import { getCurrentPrice } from "./api/binance";
import { main } from "./api/kucoin";
// import { useBinance } from "./api/binance";
// import "./api/binance";

import Balance from "./components/Balance/Balance";
import useCalc from "./components/calculations/useCalc";
// import ElevatedHeaderCardDemo from "./components/Cards/Card.main";
import { useTradeContext } from "./components/context/tradeContext/tradeContext";
// import { useTradeContext } from "./components/context/tradeContext/tradeContext";

import GetDataBlock from "./components/GetDataBlock/GetDataBlock";
import BallanceAmount from "./components/Balance/BallanceAmount";
import PrintBlock from "./components/PrintData/PrintBlock";
import PrintMarginTradeData from "./components/PrintData/PrintMarginTradeData";
// import PrintMargin from "./components/PrintData/PrintMargin";
import PrintTradeData from "./components/PrintData/PrintTradeData";
import PrintMoneyData from "./components/PrintData/PrintMoneyData";
import TargetForm from "./components/Form/TargetForm";
import Arbitrage from "./components/Arbitrage/Arbitrage";

function App() {
  //   const {
  //     isMargin,
  //     ballance,
  //     enterPosition,
  //     cryptoName,
  //     setCryptoName,
  //   } = useTradeContext();
  //   console.log("enterPosition APP", enterPosition);
  //   console.log("ballance APP", ballance);
  //   getCurrentPrice("eth", "usdt");

  // const { countArbitrage } = useCalc();
  //   main();
  // countArbitrage({
  //   current: "ETH",
  //   target: "BTC",
  //   base: "USDT",
  //   count: parseFloat(localStorage.getItem("Arbitrage ballance")),
  // });

  //   setInterval(() => {
  //     countArbitrage({
  //       current: "ETH",
  //       target: "BTC",
  //       base: "USDT",
  //       count: parseFloat(localStorage.getItem("Arbitrage ballance")),
  //     });
  //   }, 25000);

  // setInterval(() => {
  // Arbitrage("ADA");
  Arbitrage();
  // Arbitrage("DOGE");
  // Arbitrage("ETH");
  // Arbitrage("BTC");
  // Arbitrage("MANA");
  // }, 3000);

  return (
    <div className="App">
      <Balance />
      <TargetForm />

      <PrintBlock>
        <PrintMoneyData />
        {/* {isMargin && <PrintMarginTradeData />} */}
        {/* {!isMargin &&  */}
        <PrintTradeData />
        {/* 	// */}
        {/* <PrintMargin /> */}
        {/* <ElevatedHeaderCardDemo /> */}
      </PrintBlock>
    </div>
  );
}

export default App;
