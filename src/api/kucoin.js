// const { default: axios } = require("axios");
// const API = require("kucoin-node-sdk");
// /** Init Configure */
// API.init({
//   baseUrl: "https://api.kucoin.com",
//   apiAuth: {
//     key: "6249880522b857000151171a", // KC-API-KEY
//     secret: "19c0e85d-399c-423d-94d5-3cfba924baec", // API-Secret
//     passphrase: "Udovenko", // KC-API-PASSPHRASE
//   },
//   authVersion: 2, // KC-API-KEY-VERSION. Notice: for v2 API-KEY, not required for v1 version.
// });

// /** API use */
// const getKucoinPrice = async (ticker = "ETH", to = "USDT") => {
//   //   const getTimestampRl = await API.rest.Others.getTimestamp();
//   const { data } = await API.rest.Market.Symbols.getTicker(`${ticker}-${to}`);
//   //   console.log("data getKucoinPrice", data);

//   return { symbol: ticker + to, price: data.price, market: "K" };
// };

// //binance
// const getCurrentPrice = (ticker = "ETH", to = "USDT") => {
//   return new Promise(async (resolve, reject) => {
//     const { data } = await axios
//       .get(`https://api.binance.com/api/v3/ticker/price?symbol=${ticker}${to}`)
//       .catch((error) => {
//         console.log("error", error);
//       });
//     if (data.price) {
//       resolve(data);
//     } else {
//       reject("Failed fetch");
//     }
//   });
// };

// /** Run Demo */
// // getKucoinPrice();

// // module.exports = { getKucoinPrice, getCurrentPrice };

// // const datafeed = new API.websocket.Datafeed();

// // // close callback
// // datafeed.onClose(() => {
// //   console.log("ws closed, status ", datafeed.trustConnected);
// // });

// // // connect
// // datafeed.connectSocket();

// // // subscribe
// // const topic = `/market/ticker:BTC-USDT`;
// // const callbackId = datafeed.subscribe(topic, (message) => {
// //   if (message.topic === topic) {
// //     console.log(message.data);
// //   }
// // });

// // console.log(`subscribe id: ${callbackId}`);
// // setTimeout(() => {
// //   // unsubscribe
// //   datafeed.unsubscribe(topic, callbackId);
// //   console.log(`unsubscribed: ${topic} ${callbackId}`);
// // }, 1000);
