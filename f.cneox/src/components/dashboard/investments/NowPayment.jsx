import { useEffect, useState } from "react";
import Modal from "../global/Modal";
import { IoClose } from "react-icons/io5";
import Button from "../global/Button";
import { Select } from "../..";
import toast from "react-hot-toast";
import vouchersService from "../../../services/vouchersService";
import { useAuth } from "../../../hooks/useAuth";
import moment from "moment/moment";
import { tokens } from "../../../constants/tokens";
import investmentService from "../../../services/investmentService";
import { customStyles, packageData } from "./data";

export default function NowPayment({ data }) {
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
    selectedToken: null,
  });

  const handleDataChange = (name, value) =>
    setAllData((prev) => ({ ...prev, [name]: value }));

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

      const res = await investmentService.createNowInvestment(user, data);
      if (res.status === 200) {
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
          window.open(checkoutUrl, "_blank");
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
            selectedToken: null,
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
      <div className="mt-10 flex w-full justify-center mb-20 sm:mb-0">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-20 lg:gap-4 w-full max-w-full lg:max-w-[80%]">
          {packageData?.map((el, index) => (
            <div key={index} className="w-full h-[80%]">
              <img
                src={el?.image}
                alt="Package Image"
                className="h-full w-full "
              />
              <Button
                className=" !py-1 !h-10 !flex !items-center !justify-center rounded-md w-full mt-2 text-white font-normal "
                // disabled={true}
                onClick={() => {
                  handleDataChange("isOpenModal", true);
                  handleDataChange("selectedModalPackage", el);
                }}
              >
                Purchase
              </Button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
