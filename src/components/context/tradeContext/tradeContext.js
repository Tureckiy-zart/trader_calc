import React, { createContext, useContext, useEffect, useState } from "react";

const storedBallance = localStorage.getItem("ballance");

const useDefaultContext = () => {
  const [ballance, setBallance] = useState(storedBallance);
  const [enterValue, setEnterValue] = useState("");
  const [stopValue, setStopValue] = useState("");

  const [isVisibleTradeValues, setIsVisibleTradeValues] = useState(false);
  const [tradeDirection, setTradeDirection] = useState("");
  const [targetValue, setTargetValue] = useState(0);

  useEffect(() => {
    localStorage.setItem("ballance", ballance);
  }, [ballance]);

  return {
    ballance,
    setBallance,
    enterValue,
    setEnterValue,
    stopValue,
    setStopValue,
    targetValue,
    setTargetValue,
    isVisibleTradeValues,
    setIsVisibleTradeValues,
    tradeDirection,
    setTradeDirection,
  };
};

export const TradeContext = createContext(useDefaultContext);
export const useTradeContext = () => useContext(TradeContext);

const TradeContextProvider = ({ children }) => {
  const context = useDefaultContext();
  return (
    <TradeContext.Provider value={context}>{children}</TradeContext.Provider>
  );
};

export default TradeContextProvider;
