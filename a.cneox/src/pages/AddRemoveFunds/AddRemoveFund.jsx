import React, { useEffect, useState } from "react";
import { createFunds } from "../../services/fundManagementServices";
import toast from "react-hot-toast";
import { FiLoader } from "react-icons/fi";

const AddRemoveFund = () => {
  const [addFormData, setAddFormData] = useState({
    admin: "admin@crownbankers.com",
    wallet: "",
    amount: "",
    userid: "CROWN-",
    type: "add", //add,remove
    email: "admin@crownbankers.com",
  });

  const [removeFormData, setRemoveFormData] = useState({
    admin: "admin@crownbankers.com",
    wallet: "",
    amount: "",
    userid: "CROWN-",
    type: "remove", //add,remove
    email: "admin@crownbankers.com",
  });

  useEffect(() => {}, [addFormData, removeFormData]);

  const [addFundsLoading, setAddFundsLoading] = useState(false);
  const [removeFundsLoading, setRemoveFundsLoading] = useState(false);

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    if (addFormData.userid && addFormData.wallet && addFormData.amount) {
      setAddFundsLoading(true);
      console.log(addFormData);
      try {
        const response = await createFunds(addFormData);
        toast.success("Entry created successfully");
        // console.log(response);
        // setAddFormData({
        //   admin: "admin@crownbankers.com",
        //   wallet: "",
        //   amount: "",
        //   userid: "CROWN-",
        //   type: "add", //add,remove
        //   email: "admin@crownbankers.com",
        // });
      } catch (error) {
        // console.log(error);
        toast.error(error?.response.data.message);
      }
    }

    setAddFormData({
      admin: "admin@crownbankers.com",
      wallet: "",
      amount: "",
      userid: "CROWN-",
      type: "add", //add,remove
      email: "admin@crownbankers.com",
    });
    setAddFundsLoading(false);
  };

  const handleRemoveSubmit = async (e) => {
    e.preventDefault();
    if (
      removeFormData.userid &&
      removeFormData.wallet &&
      removeFormData.amount
    ) {
      setRemoveFundsLoading(true);
      try {
        const response = await createFunds(removeFormData);
        toast.success("Entry created successfully");
        // console.log(response);
      } catch (error) {
        // console.log(error?.response.data.message);
        toast.error(error?.response.data.message);
      }
    }
    setRemoveFormData({
      admin: "admin@crownbankers.com",
      wallet: "",
      amount: "",
      userid: "CROWN-",
      type: "remove", //add,remove
      email: "admin@crownbankers.com",
    });
    setRemoveFundsLoading(false);
  };

  return (
    <div className="w-full h-full  p-6 rounded-md ">
      <div className="flex flex-col lg:flex-row items-center gap-6">
        {/* Add Card form */}
        <div className="bg-white w-full py-2 px-5 rounded-md ring-1 ring-gray-300 shadow-lg ">
          <form action="submit">
            <h3 className="text-xl mb-2 pt-3 text-greenColor font-semibold">
              Add Funds
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
                className="bg-gray-50 border-gray-300 text-textColor text-sm rounded-md   block w-full 
                p-2 ring-1 ring-gray-300 focus:ring-2 focus:ring-primaryColor outline-none"
                value={addFormData.userid}
                placeholder="Enter User ID"
                required
                onChange={(e) => {
                  setAddFormData({ ...addFormData, userid: e.target.value });
                }}
              />
            </div>
            <div className="my-3">
              {/* dropDown */}
              <label
                htmlFor="select_wallet"
                className="block mb-2 text-sm font-medium text-subTextColor "
              >
                Choose Wallet
              </label>
              <select
                id="select_wallet"
                className="bg-gray-50 border-gray-300 text-textColor text-sm rounded-md   block w-full 
                p-2 ring-1 ring-gray-300 focus:ring-2 focus:ring-primaryColor outline-none"
                onChange={(e) =>
                  setAddFormData({
                    ...addFormData,
                    wallet:
                      e.target.value !== "Select A wallet"
                        ? e.target.value
                        : "",
                  })
                }
              >
                <option disabled selected={addFormData.wallet === ""} hidden>
                  {/* {console.log(addFormData)} */}
                  Select A wallet
                </option>
                <option value="interest">Interest</option>
                <option value="roi">ROI</option>
                <option value="r&b">R&B</option>
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
                type="number"
                id="enter_amount"
                aria-describedby="helper-text-explanation"
                className="bg-gray-50 border-gray-300 text-textColor text-sm rounded-md   block w-full 
                p-2 ring-1 ring-gray-300 focus:ring-2 focus:ring-primaryColor outline-none"
                placeholder="Amount"
                inputMode="numeric"
                required
                value={addFormData.amount}
                onChange={(e) => {
                  setAddFormData({ ...addFormData, amount: +e.target.value });
                }}
              />
            </div>
            <button
              className="bg-greenColor text-white font-medium py-2 px-3  my-4  rounded-full   disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={handleAddSubmit}
              disabled={addFundsLoading}
            >
              {addFundsLoading ? (
                <FiLoader className="animate-spin ease-in" />
              ) : (
                "Submit"
              )}
            </button>
          </form>

          {/* enter amount input field */}
        </div>
        {/* remove Card form */}
        <div className="bg-white w-full py-2 px-5 rounded-md ring-1 ring-gray-300 shadow-lg ">
          <form action="submit">
            <h3 className="text-xl mb-2 pt-3 text-redColor font-semibold">
              Remove Funds
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
                className="bg-gray-50 border-gray-300 text-textColor text-sm rounded-md   block w-full 
                p-2 ring-1 ring-gray-300 focus:ring-2 focus:ring-primaryColor outline-none"
                value={removeFormData.userid}
                required
                placeholder="Enter User ID"
                onChange={(e) => {
                  setRemoveFormData({
                    ...removeFormData,
                    userid: e.target.value,
                  });
                }}
              />
            </div>
            <div className="my-3">
              {/* dropDown */}
              <label
                htmlFor="select_wallet"
                className="block mb-2 text-sm font-medium text-subTextColor "
              >
                Choose Wallet
              </label>
              <select
                id="select_wallet"
                className="bg-gray-50 border-gray-300 text-textColor text-sm rounded-md   block w-full 
                p-2 ring-1 ring-gray-300 focus:ring-2 focus:ring-primaryColor outline-none"
                value={addFormData.value}
                onChange={(e) =>
                  setRemoveFormData({
                    ...removeFormData,
                    wallet:
                      e.target.value !== "Select A wallet"
                        ? e.target.value
                        : "",
                  })
                }
              >
                <option disabled selected={removeFormData.wallet === ""} hidden>
                  Select A wallet
                </option>

                <option value="interest">Interest</option>
                <option value="roi">ROI</option>
                <option value="r&b">R&B</option>
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
                type="number"
                id="enter_amount"
                aria-describedby="helper-text-explanation"
                className="bg-gray-50 border-gray-300 text-textColor text-sm rounded-md   block w-full 
                p-2 ring-1 ring-gray-300 focus:ring-2 focus:ring-primaryColor outline-none"
                placeholder="Amount"
                inputMode="numeric"
                required
                value={removeFormData.amount}
                onChange={(e) => {
                  setRemoveFormData({
                    ...removeFormData,
                    amount: +e.target.value,
                  });
                }}
              />
            </div>
            <button
              className="bg-redColor text-white font-medium py-2 px-3  my-4  rounded-full  disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={handleRemoveSubmit}
              disabled={removeFundsLoading}
            >
              {removeFundsLoading ? (
                <FiLoader className="animate-spin ease-in" />
              ) : (
                "Submit"
              )}
            </button>
          </form>

          {/* enter amount input field */}
        </div>
      </div>
    </div>
  );
};

export default AddRemoveFund;
