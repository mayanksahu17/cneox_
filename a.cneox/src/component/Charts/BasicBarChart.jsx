import React from "react";
import ReactApexChart from "react-apexcharts";

const BasicBarChart = ({ data }) => {
  const options = {
    chart: {
      id: "basic-bar",
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
      name: "ROI",
      data: data.map((ele) => ele?.total_roi_amount),
    },
    {
      name: "Referral",
      data: data.map((ele) => ele?.total_referral_amount),
    },
    {
      name: "Binary",
      data: data.map((ele) => ele?.total_binary_amount),
    },
    {
      name: "Career Rewards",
      data: data.map((ele) => ele?.total_career_rewards_amount),
    },
  ];

  return (
    <div>
      <h4 className="ml-4 text-textColor text-2xl font-semibold mb-8">
        {/* ROI, R&B & Interest */}
        Daily Given Returns
      </h4>
      <ReactApexChart
        options={options}
        series={series}
        type="bar"
        height="350"
      />
    </div>
  );
};

export default BasicBarChart;
