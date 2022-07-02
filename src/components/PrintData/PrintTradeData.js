import React, { useEffect, useState } from "react";
import { LONG } from "../constants/constants";
import { useTradeContext } from "../context/tradeContext/tradeContext";
const PrintTradeData = () => {
  const {
    stopValue,
    enterValue,
    tradeDirection,
    setTargetPosition,
    isVisibleTradeValues,
    cryptoName,
    direction,
    isMargin,
  } = useTradeContext();

  //   const [points, setPoints] = useState();

  const color = tradeDirection === LONG ? "lightgreen" : "red";
  //   console.log("enterValue PrintTradeData", enterValue);

  // перенести в файл с калькуляциями

  //   useEffect(() => {
  //     const points =
  //       direction === LONG
  //         ? +setTargetPosition - enterValue
  //         : Math.abs(enterValue - setTargetPosition);

  //     setPoints(points);
  //   }, [stopValue, setTargetPosition]);

  return (
    <>
      <div className="printDat a">
        <p className="cryptoName">Crypto: {cryptoName}</p>
        <p className="enterValue">Enter Target: {enterValue}</p>
        {/* <p className="points">Points : {points}</p> */}
        <p className="stopValue" style={{ color: "red" }}>
          Stop loss: {stopValue}
        </p>
        <p className="setTargetPosition" style={{ color: ` ${color}` }}>
          Take profit: ${setTargetPosition}
        </p>
      </div>
    </>
  );
};

export default PrintTradeData;

// import React, { createContext, useContext, useEffect, useState } from "react";

// const storedBallance = localStorage.getItem("ballance");

// const useDefaultContext = () => {
//   const [ballance, setBallance] = useState(parseFloat(storedBallance));
//   //   debugger
//   const [enterPosition, setEnterPosition] = useState("");
//   const [stopPosition, setStopPosition] = useState("");
//   const [cryptoName, setCryptoName] = useState("ETH");
//   const [currentCryptoPrice, setCurrentCryptoPrice] = useState(0);

//   //   const [isVisibleTradeValues, setIsVisibleTradeValues] = useState(false);
//   const [tradeDirection, setTradeDirection] = useState("");
//   const [setTargetPosition, setTargetValue] = useState(0);
//   const [marginValue, setMarginValue] = useState(1);
//   const [roe, setRoe] = useState(10);

//   const isMargin = marginValue !== 1 ? true : false;

//   useEffect(() => {
//     localStorage.setItem("ballance", ballance);
//   }, [ballance]);

//   return {
//     ballance,
//     setBallance,
//     enterPosition,
//     setEnterPosition,
//     stopPosition,
//     setStopPosition,
//     setTargetPosition,
//     setTargetValue,
//     cryptoName,
//     setCryptoName,
//     tradeDirection,
//     setTradeDirection,
//     marginValue,
//     setMarginValue,
//     roe,
//     setRoe,
//     isMargin,
//     currentCryptoPrice,
//     setCurrentCryptoPrice,
//   };
// };

// export const TradeContext = createContext(useDefaultContext);
// export const useTradeContext = () => useContext(TradeContext);

// const TradeContextProvider = ({ children }) => {
//   const context = useDefaultContext();
//   return (
//     <TradeContext.Provider value={context}>{children}</TradeContext.Provider>
//   );
// };

// export default TradeContextProvider;
