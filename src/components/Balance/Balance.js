import React, { useState } from "react";
import FlexWrapper from "../FlexWrapper";
import ChangeBallance from "../Form/Balance/ChangeBallance";
import BallanceAmount from "./BallanceAmount";

const Balance = () => {
  const [isShown, setIsShown] = useState(false);

  return (
    <FlexWrapper>
      <BallanceAmount setIsShown={setIsShown} />
      {isShown && <ChangeBallance setIsShown={setIsShown} />}
    </FlexWrapper>
  );
};

export default Balance;
