import React, { useState } from "react";
import Form from "../Form";
// import Input from "./Input/Input";
import { useTradeContext } from "../../context/tradeContext/tradeContext";
import {
  Button,
  Input,
  FormControl,
  InputLabel,
  TextField,
  FormHelperText,
} from "@mui/material";

const ChangeBallance = ({ setIsShown }) => {
  const { setBallance } = useTradeContext();

  const [value, setValue] = useState("");
  const inputBallanceHandler = ({ target: { value } }) =>
    setValue(parseFloat(value));

  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (value) setBallance(value);
    setIsShown((p) => !p);
  };

  return (
    <FormControl>
      <Form className="ballanceForm" onSubmit={formSubmitHandler}>
        <TextField
          variant="standard"
          type="number"
          id="outlined-name"
          label="Enter value"
          value={value}
          onChange={inputBallanceHandler}
        />

        <Button color="success" type="submit" variant="standard">
          Ok
        </Button>
      </Form>
    </FormControl>
  );
};

export default ChangeBallance;
