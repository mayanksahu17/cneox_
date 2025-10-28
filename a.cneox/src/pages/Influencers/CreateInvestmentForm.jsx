import React, { useState } from "react";
import toast from "react-hot-toast";
import { FiLoader } from "react-icons/fi";
import { createInvestmentAdmin } from "../../services/adminServices";

const packageOption = [
  { package_id: 1, packageName: "BEGINNER" },
  { package_id: 2, packageName: "GROW" },
  { package_id: 3, packageName: "BANKER" },
  { package_id: 4, packageName: "Turbo Watt" },
  { package_id: 5, packageName: "MINI" },
];

const gatewayOption = [
  "Bitcoin",
  "Cronos",
  "Ethereum",
  "Tether",
  "USD Coin",
  "Dai",
  "Pax Dollar",
  "Algorand",
  "Avalanche",
  "Binance Coin",
  "Cardano",
  "Celer Network",
  "COSMOS",
  "Elrond",
  "Fantom",
  "NEAR Protocol",
  "Polkadot",
  "Polygon",
  "Solana",
  "VeChain",
  "Zillika",
  "LTCT",
];

const CreateInvestmentForm = ({ renderFunc }) => {
  const [formData, setFormData] = useState({
    user_id: "CROWN-",
    package_id: "",
    amount: "",
    gateway: "",
  });

  const [loading, setLoading] = useState(false);

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    // console.log(name, value);
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (data) => {
    // Set default amount based on selected package

    console.log(data);
    setLoading(true);
    try {
      const response = await createInvestmentAdmin(data);
      console.log(response);
      toast.success("Transaction Added SuccessFully");
      renderFunc((prev) => !prev);
      setFormData({
        user_id: "CROWN-",
        package_id: "",
        amount: "",
        gateway: "",
      });
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong");
    }
    setLoading(false);
  };

  // console.log(formData.gateway === "");

  return (
    <div className="bg-white w-full py-2 px-5 rounded-md ring-1 ring-gray-300 shadow-lg mb-4">
      {/* <button
          onClick={() => {
            renderFunc((prev) => !prev);
          }}
        >
          CLick to render
        </button> */}
      <form>
        <h3 className="text-xl mb-2 pt-3 text-greenColor font-semibold">
          Add Investments
        </h3>
        {/* input field */}
        <div className="my-3">
          <label
            htmlFor="add_card"
            className="block mb-2 text-sm font-medium text-subTextColor "
          >
            Enter User ID
          </label>
          <input
            id="add_card"
            name="user_id"
            className="bg-gray-50 border-gray-300 text-textColor text-sm rounded-md   block w-full 
            p-2 ring-1 ring-gray-300 focus:ring-2 focus:ring-primaryColor outline-none"
            value={formData.user_id}
            onChange={handleInput}
            type="text"
            placeholder="User ID"
          />
        </div>
        <div className="my-3">
          {/* dropDown */}
          <label
            htmlFor="select_wallet"
            className="block mb-2 text-sm font-medium text-subTextColor "
          >
            Choose Packages
          </label>
          <select
            onChange={(e) =>
              // setFormData({ ...formData, gateway: e.target.value })
              {
                console.log(e.target.value);
                if (e.target.value !== "Select Package")
                  setFormData({
                    ...formData,
                    package_id: packageOption.filter(
                      (ele) => ele.packageName === e.target.value
                    )[0].package_id,
                  });
              }
            }
            placeholder="Select package"
            className="bg-gray-50 border-gray-300 text-textColor text-sm rounded-md   block w-full 
            p-2 ring-1 ring-gray-300 focus:ring-2 focus:ring-primaryColor outline-none"
          >
            <option disabled selected={formData.package_id === ""} hidden>
              Select Package
            </option>
            {packageOption.map((ele, i) => (
              <option key={i} value={ele.packageName}>
                {ele.packageName
                  .split("")[0]
                  .toUpperCase()
                  .concat(ele.packageName.slice(1))}
              </option>
            ))}
          </select>
        </div>
        <div className="my-3">
          <label
            htmlFor="add_card"
            className="block mb-2 text-sm font-medium text-subTextColor "
          >
            Enter amount
          </label>
          <input
            id="add_card"
            name="amount"
            className="bg-gray-50 border-gray-300 text-textColor text-sm rounded-md   block w-full 
            p-2 ring-1 ring-gray-300 focus:ring-2 focus:ring-primaryColor outline-none"
            value={formData.amount}
            onChange={handleInput}
            type="number"
            placeholder="Enter amount"
          />
        </div>
        <div className="my-3">
          {/* dropDown */}
          <label
            htmlFor="select_wallet"
            className="block mb-2 text-sm font-medium text-subTextColor "
          >
            Choose Gateway
          </label>
          <select
            onChange={(e) => {
              if (e.target.value !== "Select Crypto Type") {
                setFormData((prev) => ({
                  ...prev,
                  gateway: e.target.value,
                }));
              }

              setFormData({ ...formData, gateway: e.target.value });
            }}
            placeholder="Select gateway"
            className="bg-gray-50 border-gray-300 text-textColor text-sm rounded-md   block w-full 
            p-2 ring-1 ring-gray-300 focus:ring-2 focus:ring-primaryColor outline-none"
          >
            <option disabled selected={formData.gateway === ""} hidden>
              Select Gateway
            </option>
            {gatewayOption.map((ele, i) => (
              <option key={i} value={ele}>
                {ele}
              </option>
            ))}
          </select>
        </div>
        <button
          onClick={(e) => {
            e.preventDefault();
            handleSubmit(formData);
          }}
          className="bg-greenColor text-white font-medium py-2 px-3  my-4  rounded-full w"
          disabled={loading}
        >
          {loading ? <FiLoader className="animate-spin ease-in" /> : "Submit"}
        </button>
      </form>

      {/* enter amount input field */}
    </div>
  );
};

export default CreateInvestmentForm;
