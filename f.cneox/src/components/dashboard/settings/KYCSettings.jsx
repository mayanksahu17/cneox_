import { IoClose } from "react-icons/io5";
import Button from "../global/Button";
import Modal from "../global/Modal";
import { useRef, useState } from "react";
import CustomSelect from "../global/CustomSelect";
import { FiUpload } from "react-icons/fi";
import userService from "../../../services/userService";
import { useAuth } from "../../../hooks/useAuth";
import toast from "react-hot-toast";

export default function KYCSettings() {
  const { user } = useAuth();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    file: null,
    docType: null,
    isUploadLoading: false,
  });
  const fileRef = useRef(null);

  const handleModalChange = (val) => {
    setIsModalOpen(val);
  };

  const handleFormDataChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleFormDataChange("file", file);
    }
  };

  const handleFileAttach = () => {
    if (fileRef.current) {
      fileRef.current.click();
    }
  };

  const handleUpload = async () => {
    try {
      setIsModalOpen(false);
      handleFormDataChange("isUploadLoading", true);

      const fileFormData = new FormData();
      fileFormData.append("docType", formData?.docType?.value);
      fileFormData.append("file", formData.file);
      const res = await userService.updateProfileImages(user, fileFormData);
      if (res?.data?.success) {
        toast.success("KYC submitted successfully");
      }

      console.log(res);
    } catch (error) {
      console.log(error);
      handleFormDataChange("isUploadLoading", false);
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      handleFormDataChange("isUploadLoading", false);
      setFormData({
        file: null,
        docType: null,
        isUploadLoading: false,
      });
    }
  };

  return (
    <div className="mt-4 text-gray-800 dark:text-gray-200">
      <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">KYC Settings</h1>
      <p className="text-gray-700 dark:text-gray-300 text-sm mt-1">
        To adhere to regulatory requirements, all users must complete identity
        verification to prevent fraudulent activities. You have not yet
        submitted the required documents for this process. To continue your
        investments, please verify your identity.
      </p>

      <div className="w-full mt-6">
        <p className="text-2xl text-gray-900 dark:text-white font-semibold leading-tighter">
          Upload Document
        </p>
        <p className="leading-tight mt-1 text-gray-700 dark:text-gray-300">
          In order to complete, please upload any one of the following personal
          documents
        </p>
      </div>
      <div className="mt-4">
        <label className="block text-gray-700 dark:text-gray-300 font-medium">Select Document Type</label>
        <CustomSelect
          options={[
            { label: "Passport", value: "PASSPORT" },
            { label: "Driving License", value: "DRIVING_LICENSE" },
            { label: "National ID", value: "NATIONAL_ID" },
          ]}
          handleChange={(value) => handleFormDataChange("docType", value)}
          value={formData.docType}
        />
      </div>
      <div className="mt-4">
        <label className="block text-gray-700 dark:text-gray-300 font-medium">Add Document Image</label>
        <div
          className={`py-1.5 px-4 border ${
            formData.file ? "border-green-500" : "border-gray-300 dark:border-gray-600"
          } rounded-md h-[104px] flex flex-col items-center justify-center cursor-pointer w-full
          bg-white dark:bg-gray-800`}
          onClick={handleFileAttach}
          disabled={formData.file ? true : false}
        >
          <div className="flex flex-col items-center">
            <FiUpload className="text-gray-500 dark:text-gray-400" />
            <p
              className={`${
                formData.file ? "text-green-500" : "text-gray-500 dark:text-gray-400"
              } text-[12px]`}
            >
              {formData.file ? "Document Attached" : "Attach a Document File"}
            </p>
            <input
              type="file"
              ref={fileRef}
              className="hidden"
              accept="image/*"
              onChange={handleImageChange}
              disabled={formData.file ? true : false}
            />
          </div>
        </div>
      </div>
      <Button
        className="w-full !px-6 !h-10 !mt-3"
        disabled={!formData.file || !formData.docType}
        onClick={handleUpload}
        loading={formData.isUploadLoading}
      >
        Upload
      </Button>
    </div>
  );
}
