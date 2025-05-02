import { useEffect } from "react";

const TickerTape = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js";
    script.async = true;
    script.innerHTML = JSON.stringify({
      symbols: [
        { proName: "NASDAQ:TSLA" },
        { proName: "NASDAQ:AAPL" },
        { proName: "NASDAQ:NVDA" },
        { proName: "NASDAQ:MSFT" },
      ],
      showSymbolLogo: true,
      colorTheme: "light",
      displayMode: "adaptive",
      locale: "en",
    });
    document.getElementById("ticker-tape").appendChild(script);
  }, []);

  return <div id="ticker-tape" className="tradingview-widget-container"></div>;
};

export default TickerTape;
