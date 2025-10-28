import React, { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { fetchUsers } from "../../services/userService";
import toast from "react-hot-toast";
import Loader from "../../component/Loader/Main";
import UserlistComp from "./UserlistComp";

const UserList = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [render, setRender] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetchUsers();
        const modifiedTableData = response.data.data.map((item) => {
          return {
            ...item,

            package:
              parseFloat(item?.packages?.totalInvestment) === 0
                ? ``
                : `${item?.packages?.totalInvestment} - ${item?.packages?.name}`,
          };
        });
        setData(modifiedTableData);
        setLoading(false);
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong");
      }
    };
    fetchData();
  }, [render]);

  console.log(data);
  const columns = [
    { field: "serialNumber", fieldName: "Sr. no." },
    { field: "user", fieldName: "user", multipleValues: true },
    { field: "position", fieldName: "Positon" },
    { field: "countryAndPhone", fieldName: "Country and Phone " },
    { field: "sponsor", fieldName: "Sponsor", multipleValues: true },
    { field: "package", fieldName: "Packages" },
    { field: "createdAt", fieldName: "Date" },
    { field: "status", fieldName: "Status", multipleValues: true },
    { field: "securityPin", fieldName: "Pin" },
    { field: "action", fieldName: "Action" },
  ];

  return (
    <div className="w-full h-full  bg-white p-6 rounded-md">
      {loading ? (
        <Loader />
      ) : (
        <>
          <UserlistComp
            data={data}
            columns={columns}
            headerText={"Users List"}
            renderFunc={setRender}
          />
        </>
      )}
    </div>
  );
};

export default UserList;
