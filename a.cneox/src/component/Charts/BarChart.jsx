import React from "react";
import ReactApexChart from "react-apexcharts";

const BarChart = ({ data }) => {
  const daysData = data
    .map((ele) => ele?.day_of_week)
    .slice(
      data.map((ele) => ele?.day_of_week).length - 8,
      data.map((ele) => ele?.day_of_week).length
    );

  console.log(
    data.map((ele) => ele?.day_of_week).length - 8,
    data.map((ele) => ele?.day_of_week).length
  );

  // console.log(daysData);

  const options = {
    chart: {
      id: "basic-bar",
      stacked: true,
    },
    xaxis: {
      categories: daysData,
      range: 7,
    },
    colors: ["#6db0d5", "#00c3b9", "#7ec555", "#ffa600"],
    dataLabels: {
      enabled: false,
    },
  };

  const series = [
    {
      name: "ROI",
      data: data
        .map((ele) => ele?.total_roi_amount)
        .slice(
          data.map((ele) => ele?.day_of_week).length - 8,
          data.map((ele) => ele?.day_of_week).length
        ),
    },
    {
      name: "Referral",
      data: data
        .map((ele) => ele?.total_referral_amount)
        .slice(
          data.map((ele) => ele?.day_of_week).length - 8,
          data.map((ele) => ele?.day_of_week).length
        ),
    },
    {
      name: "Binary",
      data: data
        .map((ele) => ele?.total_binary_amount)
        .slice(
          data.map((ele) => ele?.day_of_week).length - 8,
          data.map((ele) => ele?.day_of_week).length
        ),
    },
    {
      name: "Career Rewards",
      data: data
        .map((ele) => ele?.total_career_rewards_amount)
        .slice(
          data.map((ele) => ele?.day_of_week).length - 8,
          data.map((ele) => ele?.day_of_week).length
        ),
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
        width={"100%"}
      />
    </div>
  );
};

export default BarChart;
