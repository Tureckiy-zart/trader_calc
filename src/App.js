import "./App.css";

import GetDataBlock from "./components/GetDataBlock/GetDataBlock";
import PrintBlock from "./components/PrintData/PrintBlock";
import PrintMoneyData from "./components/PrintData/PrintMoneyData";
import PrintTradeData from "./components/PrintData/PrintTradeData";

function App() {
  return (
    <div className="App">
      <GetDataBlock />
      <PrintBlock>
        <PrintMoneyData />
        <PrintTradeData />
      </PrintBlock>
    </div>
  );
}

export default App;
