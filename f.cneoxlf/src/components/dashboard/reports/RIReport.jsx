import { useState, useEffect } from "react";
import { reportsRIColumns } from "../../../constants/Column";
import Table from "../global/Table";
import * as XLSX from "xlsx";

export default function RIReport({ data }) {
  const [filteredData, setFilteredData] = useState([]);
  const [dateFilter, setDateFilter] = useState("all");

  useEffect(() => {
    filterData();
  }, [data, dateFilter]);

  const filterData = () => {
    let filtered = [...(data || [])];
    
    // Apply date filter
    if (dateFilter === "last30days") {
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      filtered = filtered.filter(item => new Date(item.date) >= thirtyDaysAgo);
    }
    
    setFilteredData(filtered);
  };

  const packages = [
    {
      name: "BEGINNER",
      id: 1,
    },
    {
      name: "GROW",
      id: 2,
    },
    {
      name: "BANKER",
      id: 3,
    },
  ];

  const formattedData = filteredData?.map((el, index) => ({
    ...el,
    id: index + 1,
    referralUser: el?.referral_user_id,
    referralAmount: el?.amount,
    package: packages.find((currElem) => currElem.id === el?.package_id)?.name,
  }));
  
  // Function to download data as Excel file
  const downloadExcel = () => {
    // Create a worksheet with formatted data for Excel export
    const worksheet = XLSX.utils.json_to_sheet(
      formattedData.map(item => ({
        ID: item.id,
        Date: item.date,
        "Referral User": item.referralUser,
        Position: item.position,
        Package: item.package,
        "Referral Amount": `$${item.referralAmount}`
      }))
    );
    
    // Set column widths for better readability
    const columnWidths = [
      { wch: 5 },   // ID
      { wch: 12 },  // Date
      { wch: 15 },  // Referral User
      { wch: 10 },  // Position
      { wch: 12 },  // Package
      { wch: 15 }   // Referral Amount
    ];
    worksheet["!cols"] = columnWidths;
    
    // Create workbook and append the worksheet
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Referral Income Report");
    
    // Generate filename with current date
    const date = new Date();
    const fileName = `Referral_Income_Report_${date.toISOString().split('T')[0]}.xlsx`;
    
    // Trigger the download
    XLSX.writeFile(workbook, fileName);
  };
  
  // Custom columns with styling matching the screenshot
  const customColumns = [
    {
      Header: "ID",
      accessor: "id",
    },
    {
      Header: "DATE",
      accessor: "date",
    },
    {
      Header: "REFERRAL USER",
      accessor: "referralUser",
    },
    {
      Header: "POSITION",
      accessor: "position",
    },
    {
      Header: "PACKAGE",
      accessor: "package",
    },
    {
      Header: "REFERRAL AMOUNT",
      accessor: "referralAmount",
      Cell: ({ value }) => <span className="text-green-600 dark:text-green-400 font-medium">${value}</span>,
    },
  ];
  
  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-4">
        <div className="flex space-x-2">
          <button
            onClick={() => setDateFilter("all")}
            className={`px-3 py-1 rounded ${
              dateFilter === "all" 
                ? "bg-green-500 text-white" 
                : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
            }`}
          >
            All Reports
          </button>
          <button
            onClick={() => setDateFilter("last30days")}
            className={`px-3 py-1 rounded ${
              dateFilter === "last30days" 
                ? "bg-green-500 text-white" 
                : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
            }`}
          >
            Last 30 Days
          </button>
        </div>
        
        {/* Download Button */}
        <button
          onClick={downloadExcel}
          disabled={!formattedData || formattedData.length === 0}
          className="flex items-center px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
          </svg>
          Download Excel
        </button>
      </div>
    
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              {customColumns.map((column) => (
                <th 
                  key={column.Header} 
                  className="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider bg-gray-50 dark:bg-[#1E293B]"
                >
                  {column.Header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-[#1E293B]">
            {formattedData && formattedData.length > 0 ? (
              formattedData.map((row, rowIndex) => (
                <tr 
                  key={rowIndex} 
                  className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  {customColumns.map((column, colIndex) => (
                    <td 
                      key={colIndex} 
                      className="px-6 py-4 whitespace-nowrap text-gray-700 dark:text-gray-300"
                    >
                      {column.Cell ? column.Cell({ value: row[column.accessor] }) : row[column.accessor]}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td 
                  colSpan={customColumns.length} 
                  className="px-6 py-4 text-center text-gray-500 dark:text-gray-400 bg-white dark:bg-[#1E293B]"
                >
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}