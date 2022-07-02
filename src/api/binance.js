// // import { useState } from "react";
// // import sha256 from "crypto-js/sha256";
// // import hmacSHA512 from "crypto-js/hmac-sha512";

import axios from "axios";
// import { useEffect } from "react";
// import { useTradeContext } from "../components/context/tradeContext/tradeContext";

// // import React from "react";
// const axios = require("axios");
// var CryptoJS = require("crypto-js");
// // const { Spot } = require("@binance/connector");
// // const keys = {
// //   apiKey: process.env.API_KEY,
// //   secretKey: process.env.SECRET_KEY,
// // };

// const keys = {
//   apiKey: process.env.API_KEY,
//   secretKey: process.env.SECRET_KEY,
// };

// const burl = "https://api.binance.com";
// const endpoint = "/api/v3/account";
// // const test = "/api/v3/ping";
// let dataQueryString = `recvWindow=10000&timestamp=` + Date.now();

// const hashSignature = CryptoJS.HmacSHA256(
//   dataQueryString,
//   keys["secretKey"]
// ).toString(CryptoJS.enc.Hex);

// const url =
//   burl + endpoint + "?" + dataQueryString + "&signature=" + hashSignature;

// export const useBinance = async () => {
//   //   // export const useBinance = () => {
//   //   //   const [balance, setBalance] = useState(0);

//   //   //   console.log("999 :>> ", 999);
//   //   //   const res = await axios.get(endpoint + test);
//   //   //   const res = await axios.get(url, {
//   //   //     "X-MBX-APIKEY": keys["apiKey"],
//   //   //   });
//   //   //   console.log("res", res);

//   const request = new XMLHttpRequest();

//   request.open("GET", url, true);
//   request.setRequestHeader("X-MBX-APIKEY", keys["apiKey"]);
//   request.onload = () => {
//     const data = JSON.parse(request.responseText);
//     console.log("data", data);
//   };
//   request.send();
//   //   return { res };
// };

// // export const client = new Spot(apiKey, apiSecret);

// // const socket = new WebSocket("wss://stream.binance.com:9443/ws/ehteur@trade");

// // socket.onmessage = ({ data }) => {
// //   console.log(data);
// // };
// export const getCurrentPrice = (ticker = "BTC", to = "USDT") => {
//   // export const getCurrentPrice = async (ticker = "BTC", to = "USDT") => {
//   //   const { data } = await axios.get(
//   //     `https://api.binance.com/api/v3/ticker/price?symbol=${ticker}${to}`
//   //   );

//   //   console.log("data", data.price);
//   //   return +data.price;

//   return new Promise((resolve, reject) => {
//     // const { data } = axios.get(
//     //   `https://api.binance.com/api/v3/ticker/price?symbol=${ticker}${to}`
//     // );
//     // console.log("data", data);
//     // resolve(data);
//   });
// };

export const getCurrentPrice = (ticker, to = "USDT") => {
  return new Promise(async (resolve, reject) => {
    const { data } = await axios
      .get(`https://api.binance.com/api/v3/ticker/price?symbol=${ticker}${to}`)
      .catch((error) => {
        console.log("error", error);
      });
    if (data.price) {
      resolve(data);
    } else {
      reject("Failed fetch");
    }
  });
};
export const getSymbols = () => {
  return new Promise(async (resolve, reject) => {
    const { data } = await axios
      .get(`https://api.binance.com/api/v3/exchangeInfo`)
      .catch((error) => {
        console.log("error", error);
      });
    if (data) {
      resolve(data);
    } else {
      reject("Failed fetch");
    }
  });
};

// curl "https://api.kucoin.com/api/v1/market/candles?symbol=BTC-USDT&type=1hour&startAt=1562460061&endAt=1562467061"
