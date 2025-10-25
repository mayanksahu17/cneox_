import countryList from "react-select-country-list";
import { Select, Table } from "../../index";
import { genealogyColumns } from "../../../constants/Column";
import { useMemo, useState } from "react";

export default function Referral({ data }) {
  const [submitClicked, setSubmitClicked] = useState(false);

  // Current filter values that change as user updates inputs
  const [allFilters, setAllFilters] = useState({
    userCountry: null,
    userId: "",
    userEmailVerification: null,
  });

  // Applied filters that only update when Submit is clicked
  const [appliedFilters, setAppliedFilters] = useState({
    userCountry: null,
    userId: "",
    userEmailVerification: null,
  });

  const handleAllFiltersChange = (name, value) =>
    setAllFilters((prev) => ({ ...prev, [name]: value }));

  const options = useMemo(() => countryList().getData(), []);

  const formattedData = data?.map((el, index) => ({
    ...el,
    id: index + 1,
    user: el?.userData,
    countryAndPhone: {
      country: el?.userData?.country,
      phone: el?.userData?.phone,
    },
    position: el?.referral?.position,
    registeredOn: el?.referral?.registered_on,
    status: el?.userData?.verified,
    investment: el?.walletData?.[0]?.total_investment,
  }));

  const filteredData = formattedData?.filter((el) => {
    const countryMatch =
      !appliedFilters.userCountry ||
      el?.userData?.country === appliedFilters.userCountry.label;

    const emailVerificationMatch =
      !appliedFilters.userEmailVerification ||
      parseInt(el?.userData?.verified) ==
        parseInt(appliedFilters.userEmailVerification?.value);

    const userIdMatch =
      !appliedFilters.userId ||
      el?.userData?.userId
        ?.toLowerCase()
        ?.includes(appliedFilters?.userId?.toLowerCase());

    return countryMatch && emailVerificationMatch && userIdMatch;
  });

  const handleSubmit = () => {
    // Copy current filter values to applied filters
    setAppliedFilters({...allFilters});
    setSubmitClicked(true);
  };

  const handleReset = () => {
    // Reset both current filters and applied filters
    const emptyFilters = {
      userCountry: null,
      userId: "",
      userEmailVerification: null,
    };
    
    setAllFilters(emptyFilters);
    setAppliedFilters(emptyFilters);
    setSubmitClicked(false);
  };

  return (
    <div>
      {/* Search Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-1">
            Search User's ID
          </label>
          <input
            type="text"
            className="w-full p-2 border rounded-md bg-white text-black border-gray-300 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
            placeholder="Search User's ID"
            value={allFilters.userId}
            onChange={(e) => handleAllFiltersChange("userId", e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-1">
            Search User's Country
          </label>
          <div className="w-full dark:bg-gray-800 dark:text-white">
            <Select
              options={options}
              value={allFilters.userCountry}
              onChange={(value) => {
                handleAllFiltersChange("userCountry", value);
              }}
              className="react-select-container"
              classNamePrefix="react-select"
              styles={{
                control: (base, state) => ({
                  ...base,
                  backgroundColor: state.isFocused
                    ? "var(--tw-bg-opacity)"
                    : "inherit",
                  borderColor: "gray",
                  color: "black",
                  boxShadow: "none",
                }),
                singleValue: (base) => ({
                  ...base,
                  color: "inherit",
                }),
                menu: (base) => ({
                  ...base,
                  backgroundColor: "white",
                  color: "black",
                  zIndex: 50,
                }),
              }}
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-1">
            Search User's Email Verification
          </label>
          <div className="w-full dark:bg-gray-800 dark:text-white">
            <Select
              options={[
                { label: "Verified", value: 1 },
                { label: "Not Verified", value: 0 },
              ]}
              value={allFilters.userEmailVerification}
              onChange={(value) =>
                handleAllFiltersChange("userEmailVerification", value)
              }
              className="react-select-container"
              classNamePrefix="react-select"
              styles={{
                control: (base, state) => ({
                  ...base,
                  backgroundColor: state.isFocused
                    ? "var(--tw-bg-opacity)"
                    : "inherit",
                  borderColor: "gray",
                  color: "black",
                  boxShadow: "none",
                }),
                singleValue: (base) => ({
                  ...base,
                  color: "inherit",
                }),
                menu: (base) => ({
                  ...base,
                  backgroundColor: "white",
                  color: "black",
                  zIndex: 50,
                }),
              }}
            />
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex space-x-4 mb-6 max-w-xs">
        <button
          onClick={handleSubmit}
          className="flex-1 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
        >
          Submit
        </button>
        <button
          onClick={handleReset}
          className="flex-1 px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
        >
          Reset
        </button>
      </div>

      {/* Referral Details Table */}
      <div>
        <h4 className="text-md font-medium text-gray-900 dark:text-white mb-2">
          Referral Details
        </h4>
        <div className="overflow-x-auto">
          <Table
            columns={genealogyColumns}
            data={submitClicked ? filteredData : formattedData}
            heading=""
          />
        </div>
        {formattedData?.length > 0 && (
          <div className="flex justify-between items-center mt-4">
            <span className="text-sm text-gray-700 dark:text-gray-300">
              Showing {submitClicked ? filteredData.length : formattedData.length} results
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
