import React from "react";
import PreviewModal from "../global/PreviewModal";
import { calculateCompoundedAmount } from "../../../utils/calculateCompoundedAmount";
import Button from "../global/Button";

const Preview = () => {
  return (
    <PreviewModal
      isOpen={allData.isPreviewModalOpen}
      handleClose={() => handleDataChange("isPreviewModalOpen", false)}
    >
      <div className="mt-3 grid grid-cols-2 justify-between w-full gap-4">
        <div className="w-full">
          <label className="block text-[#07153D] font-normal">
            Package Type
          </label>
          <input
            type="text"
            name="amount"
            className="w-full bg-white px-2.5 py-1 border rounded-md border-solid border-slate-200 outline-none mt-1 "
            readOnly
            value={allData?.packageType?.label}
          />
        </div>
        <div className="w-full">
          <label className="block text-[#07153D] font-normal">
            Package Name
          </label>
          <input
            type="text"
            name="amount"
            className="w-full bg-white px-2.5 py-1 border rounded-md border-solid border-slate-200 outline-none mt-1 "
            readOnly
            value={allData?.selectedModalPackage?.name}
          />
        </div>
        <div className="w-full">
          <label className="block text-[#07153D] font-normal">
            Daily Returns
          </label>
          <input
            type="text"
            name="amount"
            className="w-full bg-white px-2.5 py-1 border rounded-md border-solid border-slate-200 outline-none mt-1 "
            readOnly
            value={allData?.selectedModalPackage?.dailyReturns}
          />
        </div>
        <div className="w-full">
          <label className="block text-[#07153D] font-normal">
            Package Duration
          </label>
          <input
            type="text"
            name="amount"
            className="w-full bg-white px-2.5 py-1 border rounded-md border-solid border-slate-200 outline-none mt-1 "
            readOnly
            value={`${allData?.selectedModalPackage?.durationInDays} Days`}
          />
        </div>
        <div className="w-full">
          <label className="block text-[#07153D] font-normal">
            Amount to Pay
          </label>
          <input
            type="text"
            name="amount"
            className="w-full bg-white px-2.5 py-1 border rounded-md border-solid border-slate-200 outline-none mt-1 "
            readOnly
            value={allData?.amount}
          />
        </div>
        <div className="w-full">
          <label className="block text-[#07153D] font-normal">Earnings</label>
          <input
            type="text"
            name="amount"
            className="w-full bg-white px-2.5 py-1 border rounded-md border-solid border-slate-200 outline-none mt-1 "
            readOnly
            value={`$${calculateCompoundedAmount(
              parseFloat(allData?.amount),
              allData?.selectedModalPackage?.dailyReturns,
              allData?.selectedModalPackage?.durationInDays
            )}`}
          />
        </div>
      </div>
      <Button className="mt-4 mb-1">Complete Transaction</Button>
    </PreviewModal>
  );
};

export default Preview;
