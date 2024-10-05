// src/hooks/useWebSocket.js
import { useEffect, useState } from "react";

const useWebSocket = (symbol, interval, onMessage) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const ws = new WebSocket(
      `wss://stream.binance.com:9443/ws/${symbol}@kline_${interval}`
    );

    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      if (message.k) {
        onMessage(message.k);
      }
    };

    setSocket(ws);

    return () => {
      ws.close();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [symbol, interval]);

  return socket;
};

export default useWebSocket;
