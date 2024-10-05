// src/App.jsx
import { useState } from "react";
import Header from "./components/Header";
import CoinSelector from "./components/CoinSelector";
import Chart from "./components/Chart";
import useWebSocket from "./hooks/useWebSocket";

const App = () => {
  const coins = ["ethusdt", "bnbusdt", "dotusdt"];
  const [selectedCoin, setSelectedCoin] = useState(coins[0]);
  const [interval, setInterval] = useState("1m");
  const [chartData, setChartData] = useState({ labels: [], data: [] });

  const handleCoinChange = (coin) => {
    setSelectedCoin(coin);
    // Load previous data from localStorage if exists
    const storedData = JSON.parse(localStorage.getItem(coin));
    if (storedData) {
      setChartData(storedData);
    }
  };

  const handleWebSocketMessage = (data) => {
    const { t, o, h, l, c } = data; // kline data
    const newLabel = new Date(t).toLocaleTimeString(); // Convert timestamp to time string
    const newDataPoint = { open: o, high: h, low: l, close: c };

    setChartData((prevData) => {
      const updatedLabels = [...prevData.labels, newLabel];
      const updatedData = [...prevData.data, newDataPoint];

      // Store the updated data in localStorage
      localStorage.setItem(
        selectedCoin,
        JSON.stringify({ labels: updatedLabels, data: updatedData })
      );

      return { labels: updatedLabels, data: updatedData };
    });
  };

  // Use WebSocket to get market data
  useWebSocket(selectedCoin, interval, handleWebSocketMessage);

  return (
    <div className="container mx-auto p-4">
      <Header />
      <CoinSelector
        coins={coins}
        selectedCoin={selectedCoin}
        onCoinChange={handleCoinChange}
      />
      <Chart chartData={chartData} />
      <div className="flex justify-end mb-4">
        <button
          onClick={() => setInterval("1m")}
          className="p-2 border rounded"
        >
          1m
        </button>
        <button
          onClick={() => setInterval("3m")}
          className="p-2 border rounded mx-2"
        >
          3m
        </button>
        <button
          onClick={() => setInterval("5m")}
          className="p-2 border rounded"
        >
          5m
        </button>
      </div>
    </div>
  );
};

export default App;
