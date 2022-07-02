import React from "react";
import Select from "react-select";
import { marginMultiplier } from "../../constants/constants";

const options = [
  { value: marginMultiplier["1"], label: marginMultiplier["1"] },
  { value: marginMultiplier["3"], label: marginMultiplier["3"] },
  { value: marginMultiplier["5"], label: marginMultiplier["5"] },
  { value: marginMultiplier["10"], label: marginMultiplier["10"] },
  { value: marginMultiplier["25"], label: marginMultiplier["25"] },
  { value: marginMultiplier["50"], label: marginMultiplier["50"] },
  { value: marginMultiplier["100"], label: marginMultiplier["100"] },
];

const MarginSelect = ({ inputHandler, value }) => {
  return (
    <Select
      placeholderHandler={value}
      defaultValue={options}
      onChange={inputHandler}
      options={options}
    />
  );
};

export default MarginSelect;
