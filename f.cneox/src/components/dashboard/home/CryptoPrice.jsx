import { useEffect, useState } from "react";
import { Bitcoin, RefreshCw } from "lucide-react";

export default function CryptoPrice() {
  const [cryptoData, setCryptoData] = useState({
    bitcoin: { price: 0, change24h: 0 },
    ethereum: { price: 0, change24h: 0 },
    loading: true,
    error: null,
  });
  const [lastUpdated, setLastUpdated] = useState(new Date());

  const fetchCryptoPrices = async () => {
    setCryptoData(prev => ({ ...prev, loading: true, error: null }));
    try {
      const response = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd&include_24hr_change=true");
      if (!response.ok) throw new Error("Failed to fetch crypto prices");

      const data = await response.json();
      setCryptoData({
        bitcoin: {
          price: data.bitcoin.usd,
          change24h: data.bitcoin.usd_24h_change
        },
        ethereum: {
          price: data.ethereum.usd,
          change24h: data.ethereum.usd_24h_change
        },
        loading: false,
        error: null
      });
      setLastUpdated(new Date());
    } catch (error) {
      setCryptoData(prev => ({
        ...prev,
        loading: false,
        error: error.message || "Failed to fetch crypto prices"
      }));
    }
  };

  useEffect(() => {
    fetchCryptoPrices();
    const interval = setInterval(fetchCryptoPrices, 5 * 60 * 1000); // Refresh every 5 minutes
    return () => clearInterval(interval);
  }, []);

  const formatNumber = (num) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(num);
  };

  const formatUKTime = (date) => {
    return date.toLocaleString('en-GB', {
      timeZone: 'Europe/London',
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    });
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-orange-100 dark:bg-orange-900 flex items-center justify-center mr-3">
            <Bitcoin className="text-orange-500" />
          </div>
          <h3 className="text-lg font-semibold tracking-wide text-gray-800 dark:text-white">
            Crypto Prices
          </h3>
        </div>
        <button
          onClick={fetchCryptoPrices}
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
          title="Refresh prices"
        >
          <RefreshCw size={18} className="text-gray-500" />
        </button>
      </div>

      {cryptoData.loading ? (
        <div className="py-4 text-center text-gray-500 dark:text-gray-400">
          Loading latest prices...
        </div>
      ) : cryptoData.error ? (
        <div className="py-4 text-center text-red-500">
          {cryptoData.error}
        </div>
      ) : (
        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Bitcoin (BTC)</p>
              <p className={`text-sm font-medium ${cryptoData.bitcoin.change24h >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                {cryptoData.bitcoin.change24h >= 0 ? '↑' : '↓'}
                {Math.abs(cryptoData.bitcoin.change24h).toFixed(2)}%
              </p>
            </div>
            <p className="text-2xl font-bold mt-1">{formatNumber(cryptoData.bitcoin.price)}</p>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Ethereum (ETH)</p>
              <p className={`text-sm font-medium ${cryptoData.ethereum.change24h >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                {cryptoData.ethereum.change24h >= 0 ? '↑' : '↓'}
                {Math.abs(cryptoData.ethereum.change24h).toFixed(2)}%
              </p>
            </div>
            <p className="text-2xl font-bold mt-1">{formatNumber(cryptoData.ethereum.price)}</p>
          </div>

          <div className="pt-2 text-xs text-gray-500 dark:text-gray-400">
            Last updated: {formatUKTime(lastUpdated)} (UK time)
          </div>
        </div>
      )}
    </div>
  );
}
