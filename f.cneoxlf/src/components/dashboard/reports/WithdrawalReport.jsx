import { useState, useEffect } from "react";
import { reportWithdrawalColumns } from "../../../constants/Column";
import Table from "../global/Table";
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { Download } from "lucide-react";
// Create styles for PDF
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#fff",
    padding: 30,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: "center",
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 10,
    color: "#666",
  },
  table: {
    display: "table",
    width: "100%",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 20,
  },
  tableRow: {
    flexDirection: "row",
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
  },
  tableHeader: {
    backgroundColor: "#f0f0f0",
    padding: 8,
    fontWeight: "bold",
  },
  tableCell: {
    padding: 8,
    fontSize: 10,
  },
  greenText: {
    color: "#4CAF50",
  },
  status: {
    padding: 4,
    borderRadius: 4,
    fontSize: 10,
    width: "fit-content",
  },
  approved: {
    backgroundColor: "#1B5E20",
    color: "#81C784",
  },
  pending: {
    backgroundColor: "#0D47A1",
    color: "#90CAF9",
  },
  rejected: {
    backgroundColor: "#B71C1C",
    color: "#EF9A9A",
  },
  footer: {
    position: "absolute",
    bottom: 30,
    left: 30,
    right: 30,
    textAlign: "center",
    color: "#999",
    fontSize: 10,
  },
});

// PDF Document component
const ReportPDF = ({ data, title, dateFilter, walletFilter }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>
        {dateFilter === "all" ? "All Time Reports" : "Last 30 Days Reports"}
        {walletFilter !== "all" ? ` - ${walletFilter}` : " - All Wallets"}
      </Text>
      
      <View style={styles.table}>
        {/* Table Headers */}
        <View style={[styles.tableRow, styles.tableHeader]}>
          <Text style={[styles.tableCell, { width: "5%" }]}>ID</Text>
          <Text style={[styles.tableCell, { width: "12%" }]}>DATE</Text>
          <Text style={[styles.tableCell, { width: "10%" }]}>AMOUNT</Text>
          <Text style={[styles.tableCell, { width: "8%" }]}>CHARGES</Text>
          <Text style={[styles.tableCell, { width: "15%" }]}>METHOD</Text>
          <Text style={[styles.tableCell, { width: "15%" }]}>SOURCE</Text>
          <Text style={[styles.tableCell, { width: "15%" }]}>CRYPTO</Text>
          <Text style={[styles.tableCell, { width: "10%" }]}>FINAL AMT</Text>
          <Text style={[styles.tableCell, { width: "10%" }]}>STATUS</Text>
        </View>
        
        {/* Table Rows */}
        {data.map((item, index) => (
          <View key={index} style={styles.tableRow}>
            <Text style={[styles.tableCell, { width: "5%" }]}>{item.id}</Text>
            <Text style={[styles.tableCell, { width: "12%" }]}>{item.date}</Text>
            <Text style={[styles.tableCell, { width: "10%" }, styles.greenText]}>${item.amount}</Text>
            <Text style={[styles.tableCell, { width: "8%" }]}>{item.charges}%</Text>
            <Text style={[styles.tableCell, { width: "15%" }]}>{item.withdrawalMethod}</Text>
            <Text style={[styles.tableCell, { width: "15%" }]}>{item.walletSource}</Text>
            <Text style={[styles.tableCell, { width: "15%" }]}>{item.cryptoType}</Text>
            <Text style={[styles.tableCell, { width: "10%" }, styles.greenText]}>${item.finalAmount}</Text>
            <Text style={[
              styles.tableCell, 
              { width: "10%" },
              item.status?.toLowerCase() === "approved" ? styles.approved :
              item.status?.toLowerCase() === "pending" ? styles.pending : styles.rejected
            ]}>
              {item.status}
            </Text>
          </View>
        ))}
      </View>
      
      <Text style={styles.footer}>Generated on {new Date().toLocaleString()}</Text>
    </Page>
  </Document>
);

export default function WithdrawalReport({ data }) {
  const [filteredData, setFilteredData] = useState([]);
  const [dateFilter, setDateFilter] = useState("all");
  const [walletFilter, setWalletFilter] = useState("all");
  const [isDownloadReady, setIsDownloadReady] = useState(false);

  useEffect(() => {
    filterData();
  }, [data, dateFilter, walletFilter]);

  useEffect(() => {
    // Small delay to make sure the PDF component is ready
    if (filteredData.length > 0) {
      const timer = setTimeout(() => {
        setIsDownloadReady(true);
      }, 500);
      return () => clearTimeout(timer);
    }
     setIsDownloadReady(false);
  }, [filteredData]);

  const filterData = () => {
    let filtered = [...(data || [])];
    
    // Apply date filter
    if (dateFilter === "last30days") {
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      filtered = filtered.filter(item => new Date(item.date) >= thirtyDaysAgo);
    }
    
    // Apply wallet filter
    if (walletFilter !== "all") {
      filtered = filtered.filter(item => item.wallet_source === walletFilter);
    }
    
    setFilteredData(filtered);
  };

  const formattedData = filteredData?.map((el, index) => ({
    ...el,
    id: index + 1,
    cryptoType: el?.crypto_type,
    walletType: el?.wallet_type,
    walletSource: el?.wallet_source ,
    finalAmount: el?.final_amount
      ? parseFloat(el?.final_amount).toFixed(2)
      : parseFloat(0)?.toFixed(2),
    charges: el?.charges
      ? parseFloat(el?.charges)?.toFixed(2)
      : parseFloat(0)?.toFixed(2),
  }));

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
      Header: "AMOUNT",
      accessor: "amount",
      Cell: ({ value }) => <span className="text-green-400">${value}</span>,
    },
    {
      Header: "CHARGES",
      accessor: "charges",
      Cell: ({ value }) => <span>{value}%</span>,
    },
    {
      Header: "WITHDRAWAL METHOD",
      accessor: "withdrawalMethod",
    },
    {
      Header: "WALLET SOURCE",
      accessor: "wallet_type",
    },
    {
      Header: "CRYPTO TYPE",
      accessor: "cryptoType",
    },
    {
      Header: "FINAL AMOUNT",
      accessor: "finalAmount",
      Cell: ({ value }) => <span className="text-green-400">${value}</span>,
    },
    {
      Header: "STATUS",
      accessor: "status",
      Cell: ({ value }) => (
        <span className={`px-2 py-1 rounded-md text-xs ${
          value?.toLowerCase() === "approved" ? "bg-green-900 text-green-400" :
          value?.toLowerCase() === "pending" ? "bg-blue-900 text-blue-400" :
          "bg-red-900 text-red-400"
        }`}>
          {value}
        </span>
      ),
    },
  ];
  
  // Get the report title based on wallet filter
  const getReportTitle = () => {
    if (walletFilter === "all") return "Withdrawal Reports";
    return `${walletFilter} Reports`;
  };
  
  return (
    <div className="h-full w-full">
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
        
        <div className="flex items-center space-x-4">
          <select
            value={walletFilter}
            onChange={(e) => setWalletFilter(e.target.value)}
            className="px-3 py-1 rounded bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
          >
            <option value="all">All Wallets</option>
            <option value="ROI Wallet">ROI Wallet</option>
            <option value="R&B Wallet">R&B Wallet</option>
            <option value="Extra Income Wallet">Extra Income Wallet</option>
          </select>
          
          {/* PDF Download Button */}
          {isDownloadReady && formattedData.length > 0 ? (
            <PDFDownloadLink
              document={
                <ReportPDF 
                  data={formattedData} 
                  title={getReportTitle()}
                  dateFilter={dateFilter}
                  walletFilter={walletFilter}
                />
              }
              fileName={`${getReportTitle().replace(/\s+/g, "-").toLowerCase()}-${dateFilter}-${new Date().toISOString().split("T")[0]}.pdf`}
              className="px-3 py-1 rounded bg-green-500 hover:bg-green-600 text-white flex items-center"
            >
              {({ loading }) => (
                loading ? 
                <span>Preparing...</span> : 
                <span className="flex items-center">
                  <Download className="w-4 h-4 mr-1" /> Download PDF
                </span>
              )}
            </PDFDownloadLink>
          ) : (
            <button
              disabled
              className="px-3 py-1 rounded bg-gray-400 text-white flex items-center cursor-not-allowed"
            >
              <Download className="w-4 h-4 mr-1" /> Loading...
            </button>
          )}
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full text-gray-400">
          <thead className="border-b border-gray-700">
            <tr>
              {customColumns.map((column) => (
                <th key={column.Header} className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                  {column.Header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {formattedData && formattedData.length > 0 ? (
              formattedData.map((row, rowIndex) => (
                <tr key={rowIndex} className="hover:bg-gray-800">
                  {customColumns.map((column, colIndex) => (
                    <td key={colIndex} className="px-6 py-4 whitespace-nowrap">
                      {column.Cell ? column.Cell({ value: row[column.accessor] }) : row[column.accessor]}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={customColumns.length} className="px-6 py-4 text-center text-gray-500">
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