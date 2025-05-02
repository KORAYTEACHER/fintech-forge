import React, { useEffect } from 'react';

const StockTicker = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-single-quote.js';
    script.async = true;
    script.innerHTML = `
      {
        "symbol": "BSE:MRF",
        "width": 350,
        "isTransparent": false,
        "colorTheme": "light",
        "locale": "en"
      }
    `;
    document.getElementById('tradingview-widget-container').appendChild(script);

    return () => {
      document.getElementById('tradingview-widget-container').removeChild(script);
    };
  }, []);

  return (
    <div className="tradingview-widget-container" id="tradingview-widget-container">
      <div className="tradingview-widget-container__widget"></div>
      <div className="tradingview-widget-copyright">
        <a href="https://www.tradingview.com/" rel="noopener nofollow" target="_blank">
          <span className="blue-text">Track all markets on TradingView</span>
        </a>
      </div>
    </div>
  );
};

export default StockTicker;
