import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

const storedBallance = localStorage.getItem("ballance");

const useDefaultContext = () => {
  const [ballance, setBallance] = useState(
    parseFloat(localStorage.getItem("ballance") || 0)
  );
  const v = useRef("a");
  // console.log("v.current", v.current);
  
  v.current = 123;
  // console.log("v.current 2", v.current);


  const [enterPosition, setEnterPosition] = useState();
  const [stopPosition, setStopPosition] = useState("");
  const [cryptoName, setCryptoName] = useState("ETH");
  const [currentCryptoPrice, setCurrentCryptoPrice] = useState(0);
  const [tradeDirection, setTradeDirection] = useState("");
  const [setTargetPosition, setTargetValue] = useState(0);
  const [marginValue, setMarginValue] = useState(1);
  const [roe, setRoe] = useState(10);

  const isMargin = marginValue !== 1 ? true : false;

  useEffect(() => {
    localStorage.setItem("ballance", ballance);
  }, [ballance]); //is it needed?

  return {
    ballance,
    enterPosition,
    stopPosition,
    setTargetPosition,
    cryptoName,
    tradeDirection,
    marginValue,
    roe,
    currentCryptoPrice,
    isMargin,
    setBallance,
    setEnterPosition,
    setStopPosition,
    setTargetValue,
    setCryptoName,
    setTradeDirection,
    setMarginValue,
    setRoe,
    setCurrentCryptoPrice,
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
