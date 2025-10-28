import React from "react";
import { CSVLink } from "react-csv";

const ExportButton = ({ dataToExport, filename }) => {
  return (
    <CSVLink
      data={dataToExport}
      filename={`${filename}.csv`}
      className="bg-primaryColor text-white font-medium py-2 px-3 rounded-full"
    >
      Export
    </CSVLink>
  );
};

export default ExportButton;