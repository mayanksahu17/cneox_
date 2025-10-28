import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { fetchTickets } from "../../services/ticketsService";
import ReportFilter from "../../component/Filter/Main";
import Loader from "../../component/Loader/Main";

// Tickets

const Main = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  // const { user } = useAuth();

  const [render, setRender] = useState(false);

  const columns = [
    { field: "id", fieldName: "Sr. no." },
    { field: "user_id", fieldName: "User", multipleValues: true },
    { field: "country", fieldName: "Country" },
    { field: "department", fieldName: "Department" },
    { field: "subject", fieldName: "Subject" },
    { field: "description", fieldName: "Description" },
    { field: "updated_date", fieldName: "Last Updated" },
    { field: "status", fieldName: "Status" },
    { field: "document", fieldName: "Document" },
    { field: "action", fieldName: "Action", type: "ticketsAction" },
  ];

  useEffect(() => {
    setLoading(true);
    setData([]);
    const fetchData = async () => {
      try {
        const response = await fetchTickets();
        console.log(response.data.data);
        setData(response.data.data);
        setLoading(false);
      } catch (error) {
        toast.error("Something went wrong");
      }
    };
    fetchData();
  }, [render, setRender]);

  return (
    <div className="w-full h-full  bg-white p-6 rounded-md">
      {loading ? (
        <Loader />
      ) : (
        <>
          <ReportFilter
            data={data}
            columns={columns}
            headerText={"Tickets"}
            ticketsTable={true}
            renderFunc={setRender}
          />
        </>
      )}
    </div>
  );
};

export default Main;
