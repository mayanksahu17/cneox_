import { useAuth } from "../../../hooks/useAuth";
import Card from "./Card";
import CrownCard from "./CrownCard";
import UpdateWalletAddressModal from "./UpdateWalletAddressModal";

export default function HomeStats({
  selectedWallet,
  setSelectedWallet,
  cardsData,
  allData,
}) {
  const { user } = useAuth();

  return (
    <div className="flex flex-col items-center md:items-start w-full h-full md:min-h-screen px-4">
      <div className="flex flex-col w-full space-y-4 ">
        {/* <img src="/assets/img/th-1/19.png" className="" /> */}
        <div className="space-y-2 px-6">
          <div className="flex justify-between items-center">
            <span className="text-gray-500">User ID</span>
            <span className="font-medium">{user?.user?.userId}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-500">Name</span>
            <span className="font-medium">{user?.user?.name}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-500">Your Balance</span>
            <span className="text-2xl font-bold">
              {(
                parseFloat(allData?.roi_wallet) +
                parseFloat(allData?.referral_binary_wallet) +
                parseFloat(allData?.interest_wallet) +
                parseFloat(allData?.toal_voucher_generated)
              ).toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-500">Sponsor Name</span>
            <span className="font-medium">{allData?.sponsor_name}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-500">Sponsor Email</span>
            <span className="font-medium">{allData?.sponsor_email}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-500">Currency</span>
            <span className="font-medium">US Dollar</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-500">Status</span>
            <span className="font-medium">Active</span>
          </div>
        </div>
      </div>
      <UpdateWalletAddressModal />
    </div>
  );
}
