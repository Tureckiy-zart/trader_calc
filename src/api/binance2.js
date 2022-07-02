// import axios from "axios";
// const { default: axios } = require("axios");
// import React from "react";
const { SliderMarkLabel } = require("@mui/material");
const { default: axios } = require("axios");
const { MainClient } = require("binance");
const { useState } = require("react");
const { getKucoinPrice, getCurrentPrice } = require("./kucoin");
const APIKucoin = require("kucoin-node-sdk");
/** Init Configure */
APIKucoin.init({
  baseUrl: "https://api.kucoin.com",
  apiAuth: {
    key: "6249880522b857000151171a", // KC-API-KEY
    secret: "19c0e85d-399c-423d-94d5-3cfba924baec", // API-Secret
    passphrase: "Udovenko", // KC-API-PASSPHRASE
  },
  authVersion: 2, // KFC-API-KEY-VERSION. Notice: for v2 API-KEY, not required for v1 version.
});

const client = new MainClient({
  api_key: "qxFoiorIwBqmXfFH69EWhuk5oXrvkhVZSHfozbNCOMOC9iU4twyYadEXSEHFNPZF",
  api_secret:
    "KQEiRV7A62X4UQ48qzZEBrLkPlMnk1DSGCd1foC9878WIB68GTo6HXjBVC8IsoWv",
});

// const getInf = async () => {
//   //   const { data } = await API.rest.Market.Symbols.getTicker("BTC-USDT");

//   const inf = await client.getAccountInformation();
//   return inf;
// };

// const getPrice = (ticker = "ETH", to = "USDT") => {
//   return new Promise((resolve, reject) => {
//     const { data } = MainClient.getTicker(`${ticker}${to}`);
//     // .get(`https://api.binance.com/api/v3/ticker/price?symbol=${ticker}${to}`)
//     console.log("data", data);
//     if (data.price) {
//       resolve(data);
//     } else {
//       reject("Failed fetch");
//     }
//   });
// };
// getPrice().then((res) => console.log("res", res));
// let a = 0;
// const getMyOrdersList = async () => {
//   return await client.getOrdersList;
// };
// getMyOrdersList();
// getInf().then((res) => console.log("res", res));
// console.log("1a", a);
// if (a !== 0) {
//   console.log("a111111", a);
// }
// const getBtc = () => {};

// module.exports = { getBtc };

// const stat24v = client
//   .getSymbolPriceTicker(["ETHBTC"])
//   .then((result) => {
//     console.log("get24hrChangeStatististics inverse futures result: ", result);
//   })
//   .catch((err) => {
//     console.error("get24hrChangeStatististics inverse futures error: ", err);
//   });
// console.log("stat24v", stat24v);

// let kucoinBalanceUSD = 1000;
// let kucoinBalanceETH = 1;

// let binanceBalanceUSD = 1000;
// let binanceBalanceETH = 1;

let count = {
  kucoinBalanceUSD: 1000,
  kucoinBalanceETH: 3,
  binanceBalanceUSD: 1000,
  binanceBalanceETH: 3,
};

const countArbitrage2 = ({ current, base, count }) => {
  console.log("121", 121);
  const binance_current_base = getCurrentPrice(current, base);
  const kucoin_current_base = getKucoinPrice(current, base);
  //   const [first, setfirst] = useState();
  //   const CURRENT_BASE = current + base; // eth =>usd

  Promise.all([binance_current_base, kucoin_current_base]).then((res) => {
    let b, k;
    let kucoinETH = count.kucoinBalanceETH / 5, //!!!!!!!
      kucoinUSD = count.kucoinBalanceUSD / 10,
      binanceETH = count.binanceBalanceETH / 5,
      binanceUSD = count.binanceBalanceUSD / 10;
    console.log("kucoinUSD", kucoinUSD);
    console.log("binanceETH", binanceETH);
    // const mapper = res.map((i) => {
    //   if (!i["market"]) {
    //     i["market"] = "B";
    //   }
    //   return i;
    // });
    // mapper.forEach((i) => {
    //   console.log("i :>> ", i);
    //   if (i.market === "K") {
    //     k = parseFloat(i.price);
    //   }
    //   if (i.market === "B") {
    //     b = parseFloat(i.price);
    //   }
    // });
    const isTradable = (a, b) => {
      return Math.abs(100 - (b / a) * 100) >= 0.01;
    };

    let kToB = k > b;
    let bToK = k < b;

    if (kToB && isTradable(k, b)) {
      console.log("1 :>> ", 1);

      //!!!check calcuations
      kucoinETH -= kucoinETH / k;
      kucoinUSD += kucoinUSD;

      binanceETH += binanceETH / b;
      binanceUSD -= binanceUSD;
    } else if (bToK && isTradable(k, b)) {
      console.log("2", 2);

      console.log("binanceETH!!!!!!!!!", binanceETH);
      console.log("kucoinETH!!!!!!!!!!!!", kucoinETH);
      binanceETH -= binanceUSD / b;
      binanceUSD += binanceUSD;

      kucoinETH += kucoinETH / k;
      kucoinUSD -= kucoinUSD;
      console.log("]]]]]]]]]]]]]]]]]]]]]]]]]]");
      console.log("binanceETH", binanceETH);
      console.log("kucoinETH", kucoinETH);
      console.log("kucoinUSD", kucoinUSD);
      console.log("binanceUSD", binanceUSD);
    }

    // console.log("kucoinETH", kucoinETH);
    // console.log("binanceETH", binanceETH);
    // console.log("binanceUSD", binanceUSD);

    // console.log("Biniance current_base", binance_current_base);
    // console.log("kucoin_current_base", kucoin_current_base);

    // const finalSumUSD = binanceUSD + kucoinUSD;
    // const finalSumETH = binanceETH + kucoinETH;

    // console.log("finalSumUSD", finalSumUSD);
    // console.log("finalSumETH", finalSumETH);

    count = {
      kucoinBalanceUSD: count.kucoinBalanceUSD + kucoinUSD,
      kucoinBalanceETH: count.kucoinBalanceETH + kucoinETH,
      binanceBalanceUSD: count.binanceBalanceUSD + binanceUSD,
      binanceBalanceETH: count.binanceBalanceETH + binanceETH,
    };
    console.log("count", count);
  });
  return;
};

// countArbitrage2({
//   current: "ETH",
//   //   target:USDTC",
//   base: "USDT",
//   //   count: {
//   //     kucoinBalanceUSD: 1000,
//   //     kucoinBalanceETH: 1,
//   //     binanceBalanceUSD: 1000,
//   //     binanceBalanceETH: 1,
//   //   },
//   count,
// });

class API {
  current;
  base;
  count;
  state;
  iterationCounter;
  constructor(current, base, count) {
    this.current = current;
    this.base = base;
    this.count = count;
    this.state = {};
    this.iterationCounter = 0;
  }
  get countObj() {
    console.log("this.state", this.state);
    return this.state;
  }
  isTradable(a, b) {
    return Math.abs(100 - (b / a) * 100) >= 0.01;
  }
  getCurrentPriceBinance() {
    return new Promise(async (resolve, reject) => {
      const { data } = await axios
        .get(
          `https://api.binance.com/api/v3/ticker/price?symbol=${this.current}${this.base}`
        )
        .catch((error) => {
          console.log("error", error);
        });

      if (data?.price) {
        resolve({
          symbol: this.current + this.base,
          price: parseFloat(data.price),
          market: "B",
          data: Date.now(),
        });
      } else {
        reject("Failed fetch");
      }
    });
  }
  async getCurrentPriceKucoin() {
    //   const getTimestampRl = await API.rest.Others.getTimestamp();
    const { data } = await APIKucoin.rest.Market.Symbols.getTicker(
      `${this.current}-${this.base}`
    );
    if (data) {
      return {
        symbol: this.current + this.base,
        price: parseFloat(data.price),
        market: "K",
        data: Date.now(),
      };
    }
  }
  async getData() {
    const binance_current_base = await this.getCurrentPriceBinance(
      this.current,
      this.base
    );
    const kucoin_current_base = await this.getCurrentPriceKucoin(
      this.current,
      this.base
    );

    // this.state.binance = binance_current_base;
    // this.state.kucoin = kucoin_current_base;
    // console.log("this.state :>> ", this.state);
    Promise.all([binance_current_base, kucoin_current_base])
      .then((res) => {
        let ret = {};
        if (res[0].market === "B") {
          this.state.binance = res[0];
          this.state.kucoin = res[1];
          //   ret.binance = res[0];
          //   ret.kucoin = res[1];
        } else {
          this.state.binance = res[1];
          this.state.kucoin = res[0];
          //   ret.binance = res[1];
          //   ret.kucoin = res[0];
        }
        this.iterationCounter += 1;
        return ret;
      })
      .then(() => {
        // this.state.binance = res[1];
        // this.state.kucoin = res[0];

        let kToB = this.state.kucoin.price > this.state.binance.price;
        let bToK = this.state.kucoin.price < this.state.binance.price;

        console.log("bToK", bToK);
        console.log("kToB", kToB);
        console.log(" binance  :>> ", this.state.binance);
        console.log("  kucoin  :>> ", this.state.kucoin);
        const timeDelta = this.state.binance.data - this.state.kucoin.data;
        console.log("timeDelta", timeDelta);

        if (this.iterationCounter === 1) {
        }

        if (kToB) {
          //   this.state;
        }
      })
      .catch((e) => console.log(e));

    // await this.getCurrentPriceBinance().then(
    //   (res) => (this.state = { ...this.state, ...res, market: "B" })
    // );
    // await this.getCurrentPriceKucoin().then((result) => {
    //   //   console.log("result", result);
    //   this.state = { ...this.state, ...result };
    // });
  }
}

const api = new API("ETH", "USDT", count);
const d = api.getData();
console.log("api.current :>> ", api.current);
console.log("API.count", d);
