import React, { useEffect, useState } from "react";

import toast from "react-hot-toast";
import { FiLoader } from "react-icons/fi";
import { createVoucherAdmin } from "../../services/adminServices";

const AddVoucher = () => {
  const [addFormData, setAddFormData] = useState({
    admin: "admin@crownbankers.com",
    wallet: "roi",
    amount: "",
    userId: "CROWN-",
  });

  const [addFundsLoading, setAddFundsLoading] = useState(false);

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    if (addFormData.userId && addFormData.amount) {
      setAddFundsLoading(true);
      console.log(addFormData);
      try {
        const response = await createVoucherAdmin(addFormData);
        if (response?.data?.success) {
          toast.success("Entry created successfully");
        } else {
          toast.error("Something went wrong");
          console.log(response);
        }
      } catch (error) {
        toast.error(error?.response.data.message);
      }
    }

    setAddFormData({
      admin: "admin@crownbankers.com",
      wallet: "roi",
      amount: "",
      userId: "CROWN-",
    });
    setAddFundsLoading(false);
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
                value={addFormData.userId}
                placeholder="Enter User ID"
                required
                onChange={(e) => {
                  setAddFormData({ ...addFormData, userId: e.target.value });
                }}
              />
            </div>
            {/* <div className="my-3">
             
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
                 
                  Select A wallet
                </option>
                <option value="interest">Interest</option>
                <option value="roi">ROI</option>
                <option value="r&b">R&B</option>
              </select>
            </div> */}
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
      </div>
    </div>
  );
};

export default AddVoucher;
