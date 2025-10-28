import { useEffect, useState } from "react";
import { Bitcoin, RefreshCw, Link as LucideLink } from "lucide-react";

export default function CryptoPrice() {
  const [cryptoData, setCryptoData] = useState({
    bitcoin: { price: 0, change24h: 0 },
    ethereum: { price: 0, change24h: 0 },
    loading: true,
    error: null,
  });
  const [lastUpdated, setLastUpdated] = useState(new Date());

  const fetchCryptoPrices = async () => {
    setCryptoData((prev) => ({ ...prev, loading: true, error: null }));
    try {
      const response = await fetch(
        "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd&include_24hr_change=true"
      );
      if (!response.ok) throw new Error("Failed to fetch crypto prices");

      const data = await response.json();
      setCryptoData({
        bitcoin: {
          price: data.bitcoin.usd,
          change24h: data.bitcoin.usd_24h_change,
        },
        ethereum: {
          price: data.ethereum.usd,
          change24h: data.ethereum.usd_24h_change,
        },
        loading: false,
        error: null,
      });
      setLastUpdated(new Date());
    } catch (error) {
      setCryptoData((prev) => ({
        ...prev,
        loading: false,
        error: error.message || "Failed to fetch crypto prices",
      }));
    }
  };

  useEffect(() => {
    fetchCryptoPrices();
    const interval = setInterval(fetchCryptoPrices, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const formatNumber = (num) => {
    if (num === null || num === undefined) return "$0.00";
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(num);
  };

  const formatUKTime = (date) => {
    return date.toLocaleString("en-GB", {
      timeZone: "Europe/London",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour12: true,
    });
  };

  return (
    <div
      className="rounded-lg shadow-lg p-4 h-full"
      style={{
        background:
          "linear-gradient(180deg, rgba(7,10,16,0.65), rgba(3,6,12,0.75))",
        border: "1px solid rgba(255,255,255,0.05)",
        backdropFilter: "blur(8px)",
      }}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-yellow-50/5 flex items-center justify-center mr-2">
            <Bitcoin className="text-yellow-400" size={16} />
          </div>
          <div>
            <h3 className="text-base font-semibold text-gray-100 leading-tight">
              Crypto Prices
            </h3>
            <p className="text-xs text-gray-400 leading-tight">
              Live market snapshot
            </p>
          </div>
        </div>

        <button
          onClick={fetchCryptoPrices}
          className="flex items-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-3 py-1.5 text-xs rounded-md transition"
          title="Refresh"
        >
          <RefreshCw size={14} />
          Refresh
        </button>
      </div>

      {cryptoData.loading ? (
        <div className="py-3 text-center text-gray-400 text-sm">
          Loading prices...
        </div>
      ) : cryptoData.error ? (
        <div className="py-3 text-center text-red-500 text-sm">
          {cryptoData.error}
        </div>
      ) : (
        <div className="space-y-2">
          {/* Bitcoin */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-400 font-medium">Bitcoin (BTC)</p>
            </div>
            <div className="text-right">
              <p className="text-lg font-semibold text-white">
                {formatNumber(cryptoData.bitcoin.price)}
              </p>
              <p
                className={`text-xs font-medium ${
                  cryptoData.bitcoin.change24h >= 0
                    ? "text-green-400"
                    : "text-red-400"
                }`}
              >
                {cryptoData.bitcoin.change24h >= 0 ? "↑" : "↓"}
                {Math.abs(cryptoData.bitcoin.change24h).toFixed(2)}%
              </p>
            </div>
          </div>

          {/* Ethereum */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-400 font-medium">
                Ethereum (ETH)
              </p>
            </div>
            <div className="text-right">
              <p className="text-lg font-semibold text-white">
                {formatNumber(cryptoData.ethereum.price)}
              </p>
              <p
                className={`text-xs font-medium ${
                  cryptoData.ethereum.change24h >= 0
                    ? "text-green-400"
                    : "text-red-400"
                }`}
              >
                {cryptoData.ethereum.change24h >= 0 ? "↑" : "↓"}
                {Math.abs(cryptoData.ethereum.change24h).toFixed(2)}%
              </p>
            </div>
          </div>

          <div className="pt-2 text-[10px] text-gray-500">
            Last updated: {formatUKTime(lastUpdated)} (UK)
          </div>
        </div>
      )}
    </div>
  );
}
