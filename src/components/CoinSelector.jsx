/* eslint-disable react/prop-types */
// src/components/CoinSelector.jsx

const CoinSelector = ({ coins, selectedCoin, onCoinChange }) => {
  return (
    <div className="mb-4">
      <select
        value={selectedCoin}
        onChange={(e) => onCoinChange(e.target.value)}
        className="p-2 border rounded"
      >
        {coins.map((coin) => (
          <option key={coin} value={coin}>
            {coin}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CoinSelector;
