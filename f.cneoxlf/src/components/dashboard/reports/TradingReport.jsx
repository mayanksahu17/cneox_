import { useEffect, useState } from "react";
import reportService from "../../../services/reportService";
import toast from "react-hot-toast";
import SecondaryTable from "../global/SecondaryTable";
import { CryptoCurrencyMarket } from "react-ts-tradingview-widgets";
const Header = ({ color, title, description, content }) => {
  return (
    <div
      className={`w-full flex flex-col gap-3 md:flex-row  rounded-2xl p-6 items-start md:items-center justify-between  mb-6 ${color}`}
    >
      <div className="w-full md:w-[50%]">
        <h3 className="text-4xl font-bold text-white">{title}</h3>
        {/* <p className="text-lg text-white">{description}</p> */}
      </div>
      <div className="w-full md:w-[50%] ">
        <p className="text-base text-white">{content}</p>
      </div>
    </div>
  );
};
const TradingReport = () => {
  const columns = [
    { accessor: "TradeDate", Header: "Trade Date" },
    { accessor: "Pair", Header: "Pair" },
    { accessor: "BuyingPrice", Header: "Buying Price ($)", prepend: "$" },
    { accessor: "OpenPrice", Header: "Open Price ($)", prepend: "$" },
    { accessor: "HighPrice", Header: "High Price ($)", prepend: "$" },
    { accessor: "LowPrice", Header: "Low Price ($)", prepend: "$" },
    { accessor: "Volume", Header: "Volume" },
    { accessor: "ProfitLoss", Header: "Profit / Loss", prepend: "$" },
    { accessor: "ProfitPercent", Header: "Profit (%)", append: "%" },
  ];
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchEIReport = async () => {
      try {
        const response = await reportService.getTradeReport();
        //console.log(response);
        console.log(response);
        if (response.data.success) {
          setData(response.data.data);
        } else {
          toast.error("Something went wrong");
        }
      } catch (error) {
        toast.error("Something went wromg");
      } finally {
      }
    };
    fetchEIReport();
  }, []);
  const formattedData = data?.map((el, index) => ({
    ...el,
    id: index + 1,
  }));
  return (
    <div className="w-full p-4 pt-8 md:p-32">
      <h1 className="text-4xl text-center mb-2">Trade Report</h1>
      <SecondaryTable columns={columns} data={formattedData} />
      <div className="flex flex-col mt-12">
        <Header
          color="bg-gray-700"
          title="Cryptocurrency Market."
          description="Some text below the heading. Describe more about your real-time charts here."
          content="The Cryptocurrency Market is a decentralized digital marketplace where various cryptocurrencies are traded. It enables individuals and institutions to buy, sell, and exchange digital assets like Bitcoin, Ethereum, and others."
        />
        <CryptoCurrencyMarket
          colorTheme="dark"
          width="100%"
          height={400}
        ></CryptoCurrencyMarket>
        {/* <hr className="my-[60px] border-0 border-b-[1px] border-solid border-gray" /> */}
      </div>
    </div>
  );
};
export default TradingReport;
