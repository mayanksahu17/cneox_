import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { changeUserData, fetchUsersData } from "../../services/userService";
import Loader from "../../component/Loader/Main";
import Header from "../../component/ReportsFilter/Header";
import toast from "react-hot-toast";
import { useAuth } from "../../hooks/useAuth";

const EditUser = () => {
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);

  const [tempEditData, setTempEditData] = useState({});

  const navigate = useNavigate();

  const userCred = JSON.parse(localStorage.getItem("crown_admin"));

  const { userId } = useParams();

  useEffect(() => {
    if (userCred?.role !== 1) {
      toast.error("Your are not allowed to this page");
      return navigate("/admin/dashboard");
    }

    const getUserById = async (id) => {
      const response = await fetchUsersData(id);
      setUserData(response.data.data);
      setTempEditData(response.data.data);
      setLoading(false);
    };
    getUserById(userId);
  }, []);

  // console.log(userData.withdrawal_wallet)

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    // console.log(name, value);
    setTempEditData({ ...tempEditData, [name]: value });
  };

  const handleSubmit = async (id, data) => {
    try {
      const response = await changeUserData(id, data);
      console.log(response);
      toast.success("Profile Updated Successfully!");
      navigate("/admin/users/user-list");
      console.log("helloo");
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong!");
    }
  };

  return loading ? (
    <Loader />
  ) : (
    <div className="w-full h-full  bg-white p-6 rounded-md">
      {/* heading */}
      <Header headerText={"Edit User"} />
      {/* Form with field userID, Name, Email, Password, Security Pin, Country, Phone */}

      <form action="submit" className="mt-6">
        <div className="my-4">
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-medium text-subTextColor "
          >
            Name
          </label>
          <input
            id="name"
            className="bg-gray-50 border-gray-300 text-textColor text-sm rounded-md   block w-full 
                p-2 ring-1 ring-gray-300 focus:ring-2 focus:ring-primaryColor outline-none"
            value={tempEditData.name}
            onChange={(e) => handleInput(e)}
            name="name"
            type="text"
            placeholder="Name"
          />
        </div>
        <div className="my-4">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-subTextColor "
          >
            Enter Email
          </label>
          <input
            id="email"
            className="bg-gray-50 border-gray-300 text-textColor text-sm rounded-md   block w-full 
                p-2 ring-1 ring-gray-300 focus:ring-2 focus:ring-primaryColor outline-none"
            value={tempEditData.email}
            onChange={(e) => handleInput(e)}
            name="email"
            type="email"
            placeholder="Email"
          />
        </div>
        {/* password  */}
        <div className="my-4">
          <label
            htmlFor="new_password"
            className="block mb-2 text-sm font-medium text-subTextColor "
          >
            Enter Password
          </label>
          <input
            id="new_password"
            className="bg-gray-50 border-gray-300 text-textColor text-sm rounded-md   block w-full 
                p-2 ring-1 ring-gray-300 focus:ring-2 focus:ring-primaryColor outline-none"
            value={tempEditData.new_password}
            onChange={(e) =>
              setFormData({ ...formData, user_id: e.target.value })
            }
            type="text"
            placeholder="Password"
          />
        </div>
        {/* security pin */}
        <div className="my-4">
          <label
            htmlFor="security_pin"
            className="block mb-2 text-sm font-medium text-subTextColor "
          >
            Enter Security Pin
          </label>
          <input
            id="security_pin"
            className="bg-gray-50 border-gray-300 text-textColor text-sm rounded-md   block w-full 
                p-2 ring-1 ring-gray-300 focus:ring-2 focus:ring-primaryColor outline-none"
            value={tempEditData.security_pin}
            onChange={(e) => handleInput(e)}
            name="security_pin"
            type="text"
            placeholder="Security Pin"
          />
        </div>
        {/* Country */}
        <div className="my-4">
          <label
            htmlFor="country"
            className="block mb-2 text-sm font-medium text-subTextColor "
          >
            Enter Country
          </label>
          <input
            id="country"
            className="bg-gray-50 border-gray-300 text-textColor text-sm rounded-md   block w-full 
                p-2 ring-1 ring-gray-300 focus:ring-2 focus:ring-primaryColor outline-none"
            value={tempEditData.country}
            onChange={(e) => handleInput(e)}
            name="country"
            type="text"
            placeholder="Country"
          />
        </div>
        {/* phone */}
        <div className="my-4">
          <label
            htmlFor="phone"
            className="block mb-2 text-sm font-medium text-subTextColor "
          >
            Enter Phone
          </label>
          <input
            id="phone"
            className="bg-gray-50 border-gray-300 text-textColor text-sm rounded-md   block w-full 
                p-2 ring-1 ring-gray-300 focus:ring-2 focus:ring-primaryColor outline-none"
            value={tempEditData.phone}
            onChange={(e) => handleInput(e)}
            type="text"
            placeholder="Phone"
            name="phone"
          />
        </div>
        <div className="my-4">
          <label
            htmlFor="withdrawal_wallet"
            className="block mb-2 text-sm font-medium text-subTextColor "
          >
            Enter withdrawal wallet
          </label>
          <input
            id="withdrawal_wallet"
            className="bg-gray-50 border-gray-300 text-textColor text-sm rounded-md   block w-full 
                p-2 ring-1 ring-gray-300 focus:ring-2 focus:ring-primaryColor outline-none"
            value={tempEditData.withdrawal_wallet}
            onChange={(e) => handleInput(e)}
            type="text"
            placeholder="withdrawal_wallet"
            name="withdrawal_wallet"
          />
        </div>
        <div className="flex gap-x-4 mt-2">
          <button
            onClick={(e) => {
              e.preventDefault();

              setTempEditData({ ...tempEditData, ...userData });
            }}
            className="bg-redColor px-5 py-2 font-medium text-white rounded-md"
          >
            Reset
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              const editData = {
                name: tempEditData.name,
                phone: tempEditData.phone,
                country: tempEditData.country,
                securityPin: tempEditData.security_pin,
                emailToBeUpdated: tempEditData.email,
                withdrawal_wallet: tempEditData?.withdrawal_wallet,
                new_password: tempEditData?.new_password,
              };
              console.log(editData);
              handleSubmit(userId, editData);
            }}
            className="bg-primaryColor px-5 py-2 font-medium text-white rounded-md"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditUser;
