import React from "react";
import ReactApexChart from "react-apexcharts";

const AreaGraph = ({ data }) => {
  const options = {
    chart: {
      id: "area-chart",
    },
    xaxis: {
      categories: data.map((ele) => ele?.day_of_week),
      range: 7,
    },
    markers: {
      colors: ["#71838B"],
    },
    colors: ["#6db0d5"],
  };

  const series = [
    {
      name: "User Count",
      data: data.map((ele) => ele?.signups_count),
    },
  ];

  return (
    <div>
      <h4 className="ml-4 text-textColor text-2xl font-semibold mb-8">
        Daily Registered User
      </h4>
      <ReactApexChart
        options={options}
        series={series}
        type="area"
        height="350"
      />
    </div>
  );
};

export default AreaGraph;
