import React from "react";
import { FiDollarSign } from "react-icons/fi";
import ProgressBar from "@ramonak/react-progress-bar";

const HomeTabComponent = ({ allData }) => {
  return (
    <>
      <div className="rounded-lg border-2 p-2 w-full md:w-1/2">
        <div className="w-full flex flex-row">
          <div className="w-full text-lg lg:text-xl font-semibold text-black">
            My Career : Level {allData?.binary_career_level || 0} -{" "}
            {allData?.binary_current_level_name || ""}
          </div>

          <div className="w-full text-lg lg:text-xl font-semibold text-black">
            Next Level: {allData?.binary_career_level + 1 || 0 + 1} -{" "}
            {allData?.binary_next_level_name || ""}
          </div>
        </div>
        
        {/* Total Business Section */}
        <div className="mt-3 mb-5 w-full bg-gray-50 p-4 rounded-2xl">
          <h3 className="text-md font-medium text-gray-700 mb-3">Total Business</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="flex flex-row gap-2 items-center">
                <div className="h-5 w-5 rounded-full bg-secondary flex items-center justify-center">
                  <FiDollarSign size="12" color="white" />
                </div>
                <p className="text-sm font-normal">Left Total</p>
              </div>
              <div className="my-2 text-black text-lg font-medium">
                ${allData?.totalLeftBusiness || 0}
              </div>
            </div>
            <div>
              <div className="flex flex-row gap-2 items-center">
                <div className="h-5 w-5 rounded-full bg-secondary flex items-center justify-center">
                  <FiDollarSign size="12" color="white" />
                </div>
                <p className="text-sm font-normal">Right Total</p>
              </div>
              <div className="my-2 text-black text-lg font-medium">
                ${allData?.totalRightBusiness || 0}
              </div>
            </div>
          </div>
        </div>
        
        {/* Current Level Progress */}
        <h3 className="text-md font-medium text-gray-700 mb-3 px-4">Current Level Progress</h3>
        <div className="mt-1 w-full flex flex-col gap-4 text-black">
          <div className="w-full bg-white p-4 rounded-2xl">
            <div className="flex justify-between items-center gap-2">
              <div className="flex flex-row gap-2">
                <div className="h-5 w-5 rounded-full bg-secondary flex items-center justify-center">
                  <FiDollarSign size="12" color="white" />
                </div>
                <p className="text-sm font-normal">Left Business (Level)</p>
              </div>
              <p className="text-sm font-normal">Target</p>
            </div>
            <div className="flex justify-between items-center gap-2">
              <div className="my-3 text-black text-lg font-medium">
                ${allData?.leftBusiness || 0}
              </div>
              <div className="my-3 text-black text-lg font-medium">
                ${allData?.target || 0}
              </div>
            </div>
            <ProgressBar
              completed={allData?.leftWidth || 0}
              height="4px"
              isLabelVisible={false}
              baseBgColor="#cbd5e1"
              borderRadius="10px"
              bgColor="#12CEF9"
            />
          </div>
          <div className="w-full bg-white p-4 rounded-2xl">
            <div className="flex justify-between items-center gap-2">
              <div className="flex flex-row gap-2">
                <div className="h-5 w-5 rounded-full bg-secondary flex items-center justify-center">
                  <FiDollarSign size="12" color="white" />
                </div>
                <p className="text-sm font-normal">Right Business (Level)</p>
              </div>
              <p className="text-sm font-normal">Target</p>
            </div>
            <div className="flex justify-between items-center gap-2">
              <div className="my-3 text-black text-lg font-medium">
                ${allData?.rightBusiness || 0}
              </div>
              <div className="my-3 text-black text-lg font-medium">
                ${allData?.target || 0}
              </div>
            </div>
            <ProgressBar
              completed={allData?.rightWidth || 0}
              height="4px"
              isLabelVisible={false}
              baseBgColor="#cbd5e1"
              borderRadius="10px"
              bgColor="#6ee7b7"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeTabComponent;
