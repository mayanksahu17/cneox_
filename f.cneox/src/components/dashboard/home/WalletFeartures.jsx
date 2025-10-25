import React from "react";
import copy from "copy-to-clipboard";
import toast from "react-hot-toast";
import frontendURL from "../../../constants/frontendURL";
import { useAuth } from "../../../hooks/useAuth";
const WalletFeartures = () => {
  const { user } = useAuth();

  const leftReferralLink =
    frontendURL +
    "/signup?sponsorId=CROWN-" +
    user?.user?.userId?.split("-")[1] +
    "&position=left";
  const rightReferralLink =
    frontendURL +
    "/signup?sponsorId=CROWN-" +
    user?.user?.userId?.split("-")[1] +
    "&position=right";
  return (
    <div className="w-full md:w-1/2 rounded-2xl  border-2">
      <div className="w-full p-3 rounded-lg">
        <div className="text-black text-xl ">Referral Link</div>
        <div className="mt-3 w-full flex flex-col  gap-4 ">
          <div className="w-full bg-white rounded-md p-2">
            <p className="opacity-80 text-black font-normal text-xs">
              Left link
            </p>
            <div className="flex justify-between w-full space-x-3 mt-2 border-2 border-black bg-white p-2 rounded-2xl">
              <input
                type="text"
                className="w-4/6 bg-white rounded-xl text-xs px-2 py-1 text-opacity-80 text-black"
                value={leftReferralLink}
                readOnly
              />
              <button
                className="text-black bg-colorBlue px-2 py-2  rounded-full w-2/6 text-sm font-normal"
                onClick={() => {
                  copy(leftReferralLink);
                  toast.success("Link copied");
                }}
              >
                Copy link
              </button>
            </div>
          </div>
          <div className="w-full  rounded-md  p-2">
            <p className="opacity-80 text-black font-normal text-xs">
              Right link
            </p>
            <div className="flex justify-between w-full space-x-3 mt-2 bg-white p-2  border-2 border-black rounded-2xl">
              <input
                type="text"
                className="w-4/6 bg-white text-xs px-2 py-1 text-opacity-80 text-black"
                value={rightReferralLink}
                readOnly
              />
              <button
                className="text-black bg-colorBlue px-2 py-2 rounded-full w-2/6 text-sm font-normal"
                onClick={() => {
                  copy(rightReferralLink);
                  toast.success("Link copied");
                }}
              >
                Copy link
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalletFeartures;
