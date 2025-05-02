import { useEffect, useRef } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BitcoinChart from "@/components/Chart/BitcoinChart";
import StockChart from "@/components/Chart/StockChart";

const Home = () => {

  const widgetContainerRef = useRef<HTMLDivElement | null>(null);


  useEffect(() => {
    const container = widgetContainerRef.current;
    if (!container) return;
  
    const script = document.createElement("script");
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-tickers.js";
    script.async = true;
    script.innerHTML = `
      {
        "symbols": [
          { "description": "", "proName": "BSE:SENSEX" },
          { "description": "", "proName": "FX_IDC:USDINR" },
          { "description": "", "proName": "BSE:RVNL" },
          { "description": "", "proName": "BITSTAMP:BTCUSD" }
        ],
        "isTransparent": false,
        "showSymbolLogo": true,
        "colorTheme": "light",
        "locale": "en"
      }
    `;
  
    container.appendChild(script);
  
    return () => {
      if (container.contains(script)) {
        container.removeChild(script);
      }
    };
  }, []);
  

  return (
    <div className="space-y-6">
      <div className="tradingview-widget-container" ref={widgetContainerRef}>
        <div className="tradingview-widget-container__widget"></div>
        <div className="tradingview-widget-copyright">
          <a
            href="https://www.tradingview.com/"
            rel="noopener nofollow"
            target="_blank"
          >
            <span className="blue-text">Track all markets on TradingView</span>
          </a>
        </div>
      </div>
      <Tabs defaultValue="crypto" className="space-y-4">
        <TabsList>
          <TabsTrigger value="crypto">Crypto</TabsTrigger>
          <TabsTrigger value="stocks">Stocks</TabsTrigger>
        </TabsList>
        <TabsContent value="crypto" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Cryptocurrency Bitcoin Market</CardTitle>
              <CardDescription>
                Top cryptocurrencies by market cap
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[80vh]">
              <div className="flex justify-center items-center">
                <BitcoinChart />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="stocks" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>SENSEX Stock Market</CardTitle>
              <CardDescription>Top stocks by market cap</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-center items-center">
                <StockChart />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Home;
