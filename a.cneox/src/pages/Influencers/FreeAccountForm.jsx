import React, { useState } from "react";
import { addFreeAccountTransactions } from "../../services/freeAccountService";
import toast from "react-hot-toast";
import { FiLoader } from "react-icons/fi";

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

const packageOption = [
  { package_id: 1, packageName: "BEGINNER" },
  { package_id: 2, packageName: "GROW" },
  { package_id: 3, packageName: "BANKER" },
  // { package_id: 4, packageName: "Turbo Watt" },
];

const FreeAccountForm = ({ renderFunc }) => {
  const [formData, setFormData] = useState({
    user_id: "CROWN",
    package_id: "",
    amount: "",
    gateway: "",
    target_amount: "",
    target_type: "",
    roi_type: "",
  });

  const [loading, setLoading] = useState(false);

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    // console.log(name, value);
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (data) => {
    // console.log(formData);
    setLoading(true);
    try {
      const response = await addFreeAccountTransactions(data);
      console.log(response);
      toast.success("Transaction Added SuccessFully");
      renderFunc((prev) => !prev);
      setFormData({
        user_id: "CROWN-",
        package_id: "",
        amount: "",
        gateway: "",
        target_amount: "",
        target_type: "direct",
        roi_type: "0",
      });
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong");
    }

    setLoading(false);
  };

  return (
    <div className="bg-white w-full py-2 px-5 rounded-md ring-1 ring-gray-300 shadow-lg mb-4">
      <form action="submit">
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
            type="text"
            id="add_card"
            name="user_id"
            placeholder="User ID"
            onChange={handleInput}
            className="bg-gray-50 border-gray-300 text-textColor text-sm rounded-md   block w-full 
            p-2 ring-1 ring-gray-300 focus:ring-2 focus:ring-primaryColor outline-none"
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
            htmlFor="enter_amount"
            className="block mb-2 text-sm font-medium text-subTextColor "
          >
            Enter Amount:
          </label>
          <input
            type="text"
            id="enter_amount"
            aria-describedby="helper-text-explanation"
            className="bg-gray-50 border-gray-300 text-textColor text-sm rounded-md   block w-full 
            p-2 ring-1 ring-gray-300 focus:ring-2 focus:ring-primaryColor outline-none"
            placeholder="Amount"
            inputMode="numeric"
            name="amount"
            onChange={handleInput}
            required
          />
        </div>
        <div className="my-3">
          <label
            htmlFor="enter_amount"
            className="block mb-2 text-sm font-medium text-subTextColor "
          >
            Enter Target Amount:
          </label>
          <input
            type="number"
            id="enter_target_amount"
            name="target_amount"
            onChange={handleInput}
            aria-describedby="helper-text-explanation"
            className="bg-gray-50 border-gray-300 text-textColor text-sm rounded-md   block w-full 
            p-2 ring-1 ring-gray-300 focus:ring-2 focus:ring-primaryColor outline-none"
            placeholder="Target Amount"
            inputMode="numeric"
            required
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
        <div className="my-3 ">
          <label
            htmlFor="target-radio"
            className="block mb-2.5 text-sm font-medium text-subTextColor "
          >
            Target Type
          </label>
          <div className="flex flex-row gap-x-4">
            <div className="flex items-center">
              <input
                checked={formData.target_type === "tree"}
                id="target-radio-1"
                type="radio"
                name="target-radio"
                value="tree"
                className="w-4 h-4 text-primaryColor  bg-gray-100 border-gray-300 "
                onChange={(e) => {
                  setFormData({ ...formData, target_type: e.target.value });
                }}
              />
              <label
                htmlFor="target-radio-1"
                className="ms-2 text-sm font-medium text-textColor "
              >
                Tree Business
              </label>
            </div>
            <div className="flex items-center">
              <input
                checked={formData.target_type === "direct"}
                id="target-radio-2"
                type="radio"
                value="direct"
                name="target-radio"
                className="w-4 h-4 text-primaryColor bg-gray-100 border-gray-300 "
                onChange={(e) => {
                  setFormData({ ...formData, target_type: e.target.value });
                }}
              />
              <label
                htmlFor="target-radio-2"
                className="ms-2 text-sm font-medium text-textColor "
              >
                Direct Business
              </label>
            </div>
          </div>
        </div>
        <div className="my-3 ">
          <label
            htmlFor="roi-radio"
            className="block mb-2.5 text-sm font-medium text-subTextColor"
          >
            ROI Type
          </label>
          <div className="flex flex-row gap-x-4">
            <div className="flex items-center">
              <input
                id="roi-radio-1"
                type="radio"
                name="with-roi"
                value="1"
                checked={formData.roi_type === "1"}
                className="w-4 h-4 text-primaryColor  bg-gray-100 border-gray-300 "
                onChange={(e) => {
                  setFormData({ ...formData, roi_type: e.target.value });
                }}
              />
              <label
                htmlFor="roi-radio-1"
                className="ms-2 text-sm font-medium text-textColor "
              >
                With ROI
              </label>
            </div>
            <div className="flex items-center">
              <input
                id="roi-radio-2"
                type="radio"
                value="0"
                checked={formData.roi_type === "0"}
                name="with-roi"
                className="w-4 h-4 text-primaryColor bg-gray-100 border-gray-300 "
                onChange={(e) => {
                  setFormData({ ...formData, roi_type: e.target.value });
                }}
              />
              <label
                htmlFor="roi-radio-2"
                className="ms-2 text-sm font-medium text-textColor "
              >
                Without ROI
              </label>
            </div>
          </div>
        </div>
        <button
          className="bg-greenColor text-white font-medium py-2 px-3  my-4  rounded-full  disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={(e) => {
            e.preventDefault();
            handleSubmit(formData);
          }}
          disabled={loading}
        >
          {loading ? <FiLoader className="animate-spin ease-in" /> : "Submit"}
        </button>
      </form>
      {/* enter amount input field */}
    </div>
  );
};

export default FreeAccountForm;
