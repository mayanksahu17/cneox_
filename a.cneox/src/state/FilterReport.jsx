import { useState, useEffect } from "react";

const Main = (initialData, fetchDataCallback) => {
  // State for managing data and filters
  const [data, setData] = useState(initialData);
  const [filteredData, setFilteredData] = useState([]);
  const [isFilter, setIsFilter] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [userId, setUserId] = useState("");

  // Effect for fetching data
  useEffect(() => {
    console.log("main useeffct in filter")
    fetchDataCallback({ setIsFilter, setData });
  }, []);

  // Handler for updating filter values
  const handleFilterChange = (name) => (event) => {
    if (name === "startDate") {
      setStartDate(event.target.value);
    } else if (name === "endDate") {
      setEndDate(event.target.value);
    } else if (name === "search_field") {
      setUserId(event.target.value);
    }
  };

  // Handler for submitting filters
  const handleFilterSubmit = () => {
    setIsFilter(true);
  };

  // Handler for resetting filters
  const handleReset = () => {
    setIsFilter(false);
    setStartDate("");
    setEndDate("");
    setUserId("");
  };

  // Effect for filtering data when filters change
  useEffect(() => {
    console.log("filter calling")
    if (isFilter && data) {
      const tempFilteredData = data?.filter((entry) => {
        const entryDate =
          entry.date ||
          entry.created_at ||
          entry.investment_date ||
          entry.txn_date ||
          entry.created_date;
        // const entryUserId = entry.user_Id || entry.userId || entry.Id;
        return (
          (!startDate || new Date(entryDate) >= new Date(startDate)) &&
          (!endDate || new Date(entryDate) <= new Date(endDate)) &&
          (!userId || entry?.userId?.includes(userId))
        );
      });

      setFilteredData(tempFilteredData);
    }
  }, [startDate, endDate, userId, isFilter, data]);

  // Return state and handlers for external use
  return {
    data: isFilter ? filteredData : data,
    userId,
    startDate,
    endDate,
    handleFilterChange,
    handleFilterSubmit,
    handleReset,
  };
};

export default Main;
