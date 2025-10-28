import { useEffect, useRef, useState } from "react";
import { LuImagePlus } from "react-icons/lu";
import { useAuth } from "../../hooks/useAuth";
import {
  KYCSettings,
  SecuritySettings,
  ProfileSettings,
  Tab,
} from "../../components";
import userService from "../../services/userService";
import toast from "react-hot-toast";
import { UserAvatar } from "../../assets";

const Settings = () => {
  const { user, updateUserDetails } = useAuth();
  const [allImages, setAllImages] = useState({
    profileCover: user?.user?.profile_cover || null,
    profileImage: user?.user?.profile_picture || null,
  });
  const [allData, setAllData] = useState({
    notificationSettings: [],
  });

  const handleAllDataChange = (name, value) =>
    setAllData((prev) => ({ ...prev, [name]: value }));

  const profileCoverRef = useRef(null);
  const profileImageRef = useRef(null);

  const handleImageIconClick = (ref) => () => ref.current.click();

  const handleAllImagesChange = (name, value) =>
    setAllImages((prev) => ({ ...prev, [name]: value }));

  const handleFileInputChange = (name) => async (event) => {
    const selectedFile = event.target.files[0];
    handleAllImagesChange(name, URL.createObjectURL(selectedFile));

    const docType = name === "profileCover" ? "PROFILE_COVER" : "PROFILE";
    const fileFormData = new FormData();
    fileFormData.append("docType", docType);
    fileFormData.append("file", selectedFile);

    try {
      const response = await userService.updateProfileImages(user, fileFormData);
      if (response?.data?.success) {
        const updatedUserResponse = await userService.getUserData(user);
        if (updatedUserResponse?.data?.success) {
          updateUserDetails(updatedUserResponse?.data?.data);
          toast.success(
            name === "profileCover"
              ? "Profile Cover Updated Successfully"
              : "Profile Picture Updated Successfully"
          );
        }
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  const data = [
    {
      name: "Profile Settings",
      route: "/dashboard/settings/profile",
      children: <ProfileSettings />,
    },
    {
      name: "Security Settings",
      route: "/dashboard/settings/security",
      children: <SecuritySettings />,
    },
    {
      name: "KYC Settings",
      route: "/dashboard/settings/kyc",
      children: <KYCSettings />,
    },
  ];

  return (
    <div className="max-w-full w-full md:max-w-[80%] mx-auto text-black">
      {/* === Profile Cover Section === */}
      <div className="w-full h-[200px] md:h-[240px] lg:h-[280px] relative rounded-lg overflow-hidden">
        <input
          type="file"
          className="hidden"
          ref={profileCoverRef}
          onChange={handleFileInputChange("profileCover")}
          accept="image/*"
        />

        {/* Profile Cover */}
        <img
          className="w-full h-full object-cover rounded-lg border border-black"
          style={{
            background:
              !allImages.profileCover &&
              "linear-gradient(90deg, #000 0%, #facc15 50%, #fff 100%)",
          }}
          src={allImages.profileCover}
          alt="Profile Cover"
        />

        {/* Profile Image */}
        <input
          type="file"
          className="hidden"
          ref={profileImageRef}
          onChange={handleFileInputChange("profileImage")}
          accept="image/*"
        />
        <img
          src={allImages.profileImage || UserAvatar}
          alt="Profile"
          className="absolute left-5 -bottom-[60px] cursor-pointer lg:-bottom-[90px] w-[120px] h-[120px] lg:w-[180px] lg:h-[180px] rounded-full border-4 border-yellow-500 object-cover shadow-lg"
          onClick={handleImageIconClick(profileImageRef)}
        />

        {/* Edit Cover Button */}
        <button
          className="bg-yellow-500 hover:bg-yellow-400 rounded-md flex items-center justify-center p-2 absolute right-5 bottom-5 shadow-md transition-all border border-black"
          onClick={handleImageIconClick(profileCoverRef)}
        >
          <LuImagePlus size={22} className="text-black" />
        </button>
      </div>

      {/* === Profile Info === */}
      <div className="flex justify-between items-start">
        <div className="mt-20 lg:mt-28">
          <h1 className="font-bold text-3xl text-black">
            {user?.user?.name}
          </h1>
          <p className="text-yellow-600 font-semibold text-md mt-1">
            USER ID: {user?.user?.userId}
          </p>
          <p className="text-yellow-600 font-semibold text-md">
            PIN: {user?.user?.security_pin}
          </p>
        </div>
      </div>

      {/* === Tabs Section === */}
      <div className="mt-8 w-full bg-white border border-black rounded-lg shadow-md">
        <div className="border-b border-yellow-500 bg-black text-white rounded-t-lg">
          <h2 className="px-5 py-3 font-semibold text-yellow-500">
            Settings Menu
          </h2>
        </div>
        <div className="p-4">
          <Tab data={data} />
        </div>
      </div>
    </div>
  );
};

export default Settings;
