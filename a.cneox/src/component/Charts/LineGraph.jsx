import React from "react";
import ReactApexChart from "react-apexcharts";

const LineGraph = ({ data }) => {
  // console.log(data);

  const options = {
    chart: {
      id: "basic-line",
    },
    xaxis: {
      categories: data.map((ele) => ele?.day_of_week),
      range: 7,
    },

    colors: ["#6db0d5", "#36c78c"],
    dropShadow: {
      enabled: true,
      top: 0,
      left: 0,
      blur: 3,
      opacity: 0.5,
    },
  };

  const series = [
    {
      name: "Investments",
      data: data.map((ele) => ele?.total_investment_amount),
      //   colors:
    },
    {
      name: "Withdrawals",
      data: data.map((ele) => ele?.total_withdrawal_amount),
    },
  ];

  return (
    <div>
      <h4 className="ml-4 text-textColor text-2xl font-semibold mb-8">
        Deposits & Withdrawals
      </h4>
      <ReactApexChart
        options={options}
        series={series}
        type="line"
        height={350}
        width={"100%"}
      />
    </div>
  );
};

export default LineGraph;
