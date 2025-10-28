import React from "react";
import ReactApexChart from "react-apexcharts";

const Piechart = ({ data }) => {
  // console.log(data);

  const options = {
    labels: data.map((ele) => ele?.package_name),
    colors: ["#6db0d5", "#36c78c", "#ffa600"],
    dataLabels: {
      enabled: true,
    },
  };

  const totalCount = data
    .map((ele) => ele?.investment_count)
    .reduce((accumulator, currentValue) => accumulator + currentValue, 0);

  // console.log(totalCount);

  const series = data.map((ele) => ele.investment_count);

  return (
    <div>
      <h4 className="ml-4 text-textColor text-2xl font-semibold mb-8">
        Package Wise Investment
      </h4>
      <ReactApexChart
        options={options}
        series={series}
        type="pie"
        width="100%"
        height="350"
      />
    </div>
  );
};

export default Piechart;
