import React from "react";
import { genarateVerifyLink } from "../../services/adminServices";
import toast from "react-hot-toast";
import copy from "copy-to-clipboard";

const Main = ({ data, user }) => {
  const handleGenerateVerfiyLink = async () => {
    const loadingToast = toast.loading("Genearting verification link...");
    try {
      console.log(user);
      const formData = {
        userId: user?.id,
        email: user?.email,
      };
      // console.log(formData);
      const response = await genarateVerifyLink(formData);
      console.log(response);

      if (response?.data?.success) {
        copy(response?.data?.link);
        toast.success("Verification link copied successfully", {
          id: loadingToast,
        });
      } else {
        toast.error("Failed to send verification", {
          id: loadingToast,
        });
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to send verification", {
        id: loadingToast,
      });
    }
  };
  const redBadge = [
    "inactive",
    "not verified",
    "failed",
    "close",
    "blocked",
    "suspended",
    "suspected",
  ];
  const greenBadge = [
    "active",
    "completed",
    "complete",
    "open",
    "verified",
    "approved",
    "status",
  ];

  const blueBadge = ["verify link", "send verification link"];
  const yellowBadge = ["pending", "used"];

  let badgeColor = "bg-gray-200";

  if (greenBadge.includes(data.toLowerCase())) {
    badgeColor = "bg-greenColor";
  } else if (redBadge.includes(data.toLowerCase())) {
    badgeColor = "bg-redColor";
  } else if (blueBadge.includes(data.toLowerCase())) {
    badgeColor = "bg-blueColor";
  } else if (yellowBadge.includes(data.toLowerCase())) {
    badgeColor = "bg-yellowColor";
  }
  return (
    <span
      className={`${badgeColor} text-white text-xs font-semibold px-2.5 py-1.5 rounded-md uppercase inline-block text-center cursor-pointer`}
      onClick={
        data.toLowerCase() === "send verification link"
          ? handleGenerateVerfiyLink
          : undefined
      }
    >
      {data.toLowerCase()}
    </span>
  );
};

export default Main;
