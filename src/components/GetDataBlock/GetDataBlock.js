import React from "react";
import BallanceForm from "../Form/BallanceForm";
import TargetForm from "../Form/TargetForm";

const GetDataBlock = () => {
  return (
    <div className="getData">
      <TargetForm />
      <BallanceForm />
    </div>
  );
};

export default GetDataBlock;
