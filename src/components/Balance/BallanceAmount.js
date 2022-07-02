import React from "react";
import FlexWrapper from "../FlexWrapper";
import { useTradeContext } from "../context/tradeContext/tradeContext";
const BallanceAmount = ({ setIsShown }) => {
  const { ballance } = useTradeContext();
  const toggler = () => setIsShown((p) => !p);

  return (
    <FlexWrapper className="ballance">
      <span className="ballance-title">Ballance:</span>
      <span className="ballance-value" onClick={toggler}>
        $: {ballance}
      </span>
    </FlexWrapper>
  );
};

export default BallanceAmount;
