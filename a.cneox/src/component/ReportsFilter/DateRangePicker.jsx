import React from "react";

const DateRangePicker = ({ startDate, endDate, handleFilterChange }) => {
  // Implement the DateRangePicker component
  return (
    <div className=" mb-7 flex flex-row gap-x-4 flex-wrap">
      <div className="flex flex-col justify-center gap-2 mb-1">
        <label className="text-gray-500">Start Date</label>
        <input
          value={startDate}
          onChange={handleFilterChange("startDate")}
          placeholder="Choose Start Date"
          type="date"
          name={"startDate"}
          className="border px-4 py-2 border-gary-500 rounded-lg ring-1 ring-gray-300 focus:ring-2 focus:ring-primaryColor outline-none"
        />
      </div>
      <div className="flex flex-col justify-center gap-2 mb-1">
        <label className="text-gray-500">End Date</label>
        <input
          value={endDate}
          onChange={handleFilterChange("endDate")}
          placeholder="Choose End Date"
          type="date"
          name={"endDate"}
          className="border px-4 py-2 border-gary-500 rounded-lg ring-1 ring-gray-300 focus:ring-2 focus:ring-primaryColor outline-none"
        />
      </div>
    </div>
  );
};

export default DateRangePicker;
