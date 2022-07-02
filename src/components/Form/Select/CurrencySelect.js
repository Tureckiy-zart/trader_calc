import React from "react";
import Select from "react-select";
import { cryptoName } from "../../constants/constants";

const options = [
  { value: cryptoName.BTC, label: cryptoName.BTC },
  { value: cryptoName.XMR, label: cryptoName.XMR },
  { value: cryptoName.ETH, label: cryptoName.ETH },
];

const CurrencySelect = ({ inputHandler, value }) => {
  return (
    <Select defaultValue={value} onChange={inputHandler} options={options} />
  );
};

export default CurrencySelect;
