import { useEffect, useState } from "react";
import Modal from "../global/Modal";
import { IoClose } from "react-icons/io5";
import Button from "../global/Button";
import { Select } from "../..";
import toast from "react-hot-toast";
import vouchersService from "../../../services/vouchersService";
import { useAuth } from "../../../hooks/useAuth";
import moment from "moment/moment";
import { customStyles, packageData } from "./data";
import investmentService from "../../../services/investmentService";
import axios from "axios";
import { tokens } from "../../../constants/tokens";
import { baseURL } from "../../../constants/baseURL";

export default function Investment({ data }) {
  const { user } = useAuth();

  const [allData, setAllData] = useState({
    amount: 0,
    isOpenModal: false,
    selectedModalPackage: null,
    deposit_amount: 0,
    voucher_amount: 0,
    isVoucherClicked: false,
    isPreviewModalOpen: false,
    packageType: {
      label: "Self",
      value: "self",
    },
    allVouchers: [],
    selectedVoucher: null,
    downlineId: "",
    isInvestmentSubmitting: false,
    deposit_wallet: 0,
  });

  const handleDataChange = (name, value) =>
    setAllData((prev) => ({ ...prev, [name]: value }));


  const createInvestment = (user, data) => {
    // Direct hardcoded API call for this service
    return axios.post(
      // `http://localhost:5001/api/payment/create_transaction`,
      `${baseURL}/nowpayment/create_transaction`,
      {
        ...data,
        email: user?.user?.email,
      },
      {
        headers: {
          Authorization: user?.token,
        },
      }
    );
  };


  useEffect(() => {
    (async () => {
      try {
        const res = await vouchersService.getAllActiveVouchers(user);

        if (res.status === 200) {
          console.log(res.data.data);
          handleDataChange("allVouchers", res?.data?.data);
        }
      } catch (error) {
        toast.error(error?.response?.data?.message || "Something went wrong");
      }
    })();
  }, []);

  const handleCreateInvestment = async () => {
    let custom = [];
    console.log(allData.selectedVoucher);
    custom[0] = allData.downlineId ? allData.downlineId : user?.user?.userId;
    custom[1] = allData.packageType.value;
    custom[2] = user?.user?.userId;
    custom[3] = allData.selectedModalPackage?.id;
    custom[4] = parseFloat(allData.amount);
    custom[5] = parseFloat(allData.deposit_amount);
    custom[6] = parseFloat(allData.voucher_amount);
    custom[7] = allData.selectedVoucher ? allData.selectedVoucher?.value : "NA";

    try {
      const data = {
        to_currency: allData.selectedToken?.value,
        amount: parseFloat(allData.deposit_amount),
        buyer_name: user?.user?.name,
        buyer_email: user?.user?.email,
        custom: JSON.stringify(custom),
      };
      console.log(data);
      const res = await createInvestment(user, data);
      if (res.status === 200) {
        console.log(res?.data?.data.invoice_url);
        const checkoutUrl = res?.data?.data.invoice_url;
        setAllData({
          amount: 0,
          isOpenModal: false,
          deposit_amount: 0,
          voucher_amount: 0,
          selectedModalPackage: null,
          isVoucherClicked: false,
          isPreviewModalOpen: false,
          packageType: {
            label: "Self",
            value: "self",
          },
          allVouchers: [],
          selectedVoucher: null,
          downlineId: "",
          isInvestmentSubmitting: false,
          selectedToken: null,
        });
        
        if (checkoutUrl) {
          // open after async call, using simulated click
          const a = document.createElement("a");
          a.href = checkoutUrl;
          a.target = "_blank";
          a.rel = "noopener noreferrer";
          a.click();
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };




  return (
    <>
      {/* Investment Modal */}
      <Modal
        isOpen={allData.isOpenModal}
        handleClose={() => {
          handleDataChange("isOpenModal", false);
          setAllData({
            amount: 0,
            isOpenModal: false,
            selectedModalPackage: null,
            isVoucherClicked: false,
            isPreviewModalOpen: false,
            packageType: {
              label: "Self",
              value: "self",
            },
            allVouchers: [],
            selectedVoucher: null,
            downlineId: "",
            isInvestmentSubmitting: false,
            deposit_wallet: allData.deposit_wallet,
          });
        }}
      >
          <div>
          <div className="flex items-center justify-end">
            <IoClose
              size="20"
              className="text-black cursor-pointer"
              onClick={() => {
                handleDataChange("isOpenModal", false);
                handleDataChange("isTokenClicked", false);
              }}
            />
          </div>
          <div className="w-full">
            <p className="text-2xl text-gray-700 font-semibold leading-tighter">
              {allData?.selectedModalPackage?.name} Package
            </p>
            <p>{allData?.selectedModalPackage?.description}</p>
          </div>

          <div className="w-full mt-4">
            <label className="block text-[#07153D] font-normal">
              Select Package Type
            </label>
            <Select
              options={[
                {
                  label: "Self",
                  value: "self",
                },
                {
                  label: "Downline",
                  value: "downline",
                },
              ]}
              customStyles={customStyles}
              value={allData.packageType}
              onChange={(value) => handleDataChange("packageType", value)}
            />
          </div>
          <div className="w-full mt-4">
            <label className="block text-[#07153D] font-normal">
              Select Cryptocurrency
            </label>
            <Select
              options={tokens}
              customStyles={customStyles}
              value={allData.selectedToken}
              onChange={(value) => handleDataChange("selectedToken", value)}
            />
          </div>

          {allData.packageType?.value === "downline" && (
            <>
              <div className="w-full mt-4">
                <label className="block text-[#07153D] font-normal">
                  Enter Downline ID
                </label>
                <input
                  type="text"
                  name="downlineId"
                  className="w-full bg-white px-2.5 py-2 border rounded-md border-solid border-slate-200 outline-none mt-1 !ml-0"
                  onChange={(e) => {
                    handleDataChange("downlineId", e.target.value);
                  }}
                  value={allData.downlineId}
                />
              </div>
            </>
          )}

          <div className="w-full mt-4">
            <label className="block text-[#07153D] font-normal">
              Investment Amount
            </label>
            <input
              type="text"
              className="w-full bg-white px-2.5 py-2 border rounded-md border-solid border-slate-200 outline-none mt-1 !ml-0"
              placeholder={`$${allData?.selectedModalPackage?.minAmount} - $${allData?.selectedModalPackage?.maxAmount}`}
              onChange={(e) => {
                const enteredValue = parseFloat(e.target.value);
                handleDataChange("amount", e.target.value);
                // setNewInvestedAmount(enteredValue + enteredValue * 0.02);
                if (allData?.isVoucherClicked) {
                  // Your logic to use token wallet and its current calculation of half
                  const voucherAmount = enteredValue * 0.5;
                  handleDataChange("deposit_amount", voucherAmount);
                  handleDataChange("voucher_amount", voucherAmount);
                } else {
                  handleDataChange("deposit_amount", e.target.value);
                  handleDataChange("voucher_amount", 0);
                }
              }}
              value={allData.amount}
            />
            {/* <div className="text-colorBlue font-bold pt-4 text-center">
              Package will be activated for $
              {parseFloat(allData?.deposit_amount) +
                parseFloat(allData?.deposit_amount) *
                  (allData?.package === 1
                    ? 0.1
                    : allData?.package === 4
                    ? 0.1
                    : 0.1)}
            </div> */}
          </div>

          {allData.isVoucherClicked && (
            <>
              <div>
                <label className="block text-[#07153D] font-normal mt-4">
                  Deposit Amount
                </label>
                <input
                  type="text"
                  name="amount"
                  className="w-full bg-white px-2.5 py-2 border rounded-md border-solid border-slate-200 outline-none mt-1 !ml-0"
                  readOnly
                  value={allData?.deposit_amount}
                />
              </div>
              <div>
                <label className="block text-[#07153D] font-normal mt-4">
                  Voucher Amount
                </label>
                <input
                  type="text"
                  name="amount"
                  className="w-full bg-white px-2.5 py-2 border rounded-md border-solid border-slate-200 outline-none mt-1 !ml-0"
                  readOnly
                  value={allData?.voucher_amount}
                />
                {/* <p className="text-sm mt-1 text-black ">
                          <span className="text-red-600">*</span>
                        Voucher use will make sure 
                        </p> */}
              </div>
              <div className="w-full mt-4">
                <label className="block text-[#07153D] font-normal">
                  Select Voucher
                </label>
                <Select
                  options={allData.allVouchers.map((el) => ({
                    label: `${el?.voucher_id} - $${el.amount} - ${moment(
                      el.created_on
                    ).format("D MMM YYYY")}`,
                    value: el?.voucher_id,
                    amount: el?.amount,
                  }))}
                  customStyles={customStyles}
                  value={allData.selectedVoucher}
                  onChange={(value) => {
                    console.log(value);
                    handleDataChange("selectedVoucher", value);
                  }}
                />
              </div>
            </>
          )}

          <div className="flex items-center space-x-2 mt-4">
            <input
              type="checkbox"
              className="w-3 h-3 cursor-pointer"
              onClick={() => {
                handleDataChange("isVoucherClicked", !allData.isVoucherClicked);
                if (!allData.isVoucherClicked) {
                  const voucherAmount = parseFloat(allData.amount) * 0.5;
                  handleDataChange("deposit_amount", voucherAmount);
                  handleDataChange("voucher_amount", voucherAmount);
                  handleDataChange("selectedVoucher", null); // Ensure no voucher is selected initially
                } else {
                  handleDataChange(
                    "deposit_amount",
                    parseFloat(allData.amount)
                  );
                  handleDataChange("voucher_amount", 0);
                  handleDataChange("selectedVoucher", { value: "NA" });
                }
              }}
              checked={allData.isVoucherClicked}
            />
            <p className="text-sm">Use Voucher</p>
          </div>

          <Button
            className="mt-3"
            type="submit"
            // disabled={!isValid}
            loading={allData.isInvestmentSubmitting}
            onClick={handleCreateInvestment}
          >
            Submit
          </Button>
        </div>
      </Modal>

  <div className="px-4 py-6 md:px-6 lg:px-12">
  {/* Mobile View: Vertical Cards */}
  <div className="space-y-6 md:hidden">
    {packageData.map((pkg, index) => (
      <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 text-center">
        <img
          src={pkg.image}
          alt={pkg.name}
          className="w-full h-auto rounded-md object-contain"
        />
        <div className="mt-4 font-semibold text-lg text-gray-800 dark:text-white">
          {pkg.name}
        </div>
        <button
          onClick={() => {
            handleDataChange("isOpenModal", true);
            handleDataChange("selectedModalPackage", pkg);
          }}
          className="mt-3 w-full bg-[#42c977] hover:bg-[#37b569] text-white py-2.5 rounded-md font-medium transition-all duration-200"
        >
          Purchase
        </button>
      </div>
    ))}
  </div>

  {/* Desktop View: Horizontal Cards with Larger Images and Narrower Buttons */}
  <div className="hidden md:flex justify-between gap-6">
    {packageData.map((pkg, index) => (
      <div key={index} className="w-1/3 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 text-center relative">
        <img
          src={pkg.image}
          alt={pkg.name}
          className="w-full  object-contain rounded-md"
        />
        <div className="mt-4 font-semibold text-lg text-gray-800 dark:text-white">
          {pkg.name}
        </div>
        <button
          onClick={() => {
            handleDataChange("isOpenModal", true);
            handleDataChange("selectedModalPackage", pkg);
          }}
          className="mt-4 w-3/4 mx-auto bg-[#42c977] hover:bg-[#37b569] text-white py-2.5 rounded-md font-medium transition-all duration-200"
        >
          Purchase
        </button>
      </div>
    ))}
  </div>
</div>



    </>
  );
}