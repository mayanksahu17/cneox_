import { useState } from "react";
import CustomSelect from "../global/CustomSelect";
import Button from "../global/Button";
import ticketService from "../../../services/ticketService";
import { useAuth } from "../../../hooks/useAuth";
import toast from "react-hot-toast";

export default function SubmitTicket() {
  const { user } = useAuth();

  const [allInputs, setAllInputs] = useState({
    selectedDepartment: { label: "Admin Support", value: "Admin Support" },
    selectedService: {
      label: "Package Activation",
      value: "Package Activation",
    },
    selectedAttachment: null,
    subject: "",
    description: "",
    isLoading: false,
  });

  const handleAllInputsChange = (name, value) =>
    setAllInputs((prev) => ({ ...prev, [name]: value }));

  const handleTicketSubmit = async () => {
    try {
      handleAllInputsChange("isLoading", true);

      const inputData = {
        department: allInputs.selectedDepartment.value,
        service: allInputs.selectedService.value,
        subject: allInputs.subject,
        description: allInputs.description,
        status: "Open",
      };

      const res = await ticketService.createTicket(user, inputData);
      const ticketId = res.data?.data?.ticketId;

      if (ticketId && allInputs.selectedAttachment) {
        const uploadData = new FormData();
        uploadData.append("docType", "TICKET_DOC");
        uploadData.append("file", allInputs.selectedAttachment);
        uploadData.append("email", user?.user?.email);

        const uploadRes = await ticketService.uploadTicketDocument(
          ticketId,
          uploadData
        );

        if (uploadRes?.data?.success) {
          toast.success("Ticket created successfully");
        }
      } else {
        toast.success("Ticket created successfully");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setAllInputs({
        selectedDepartment: {
          label: "Admin Support",
          value: "Admin Support",
        },
        selectedService: {
          label: "Package Activation",
          value: "Package Activation",
        },
        selectedAttachment: null,
        subject: "",
        description: "",
        isLoading: false,
      });
    }
  };

  return (
    <div className="mt-4 w-full text-gray-900 dark:text-gray-100">
      <h4 className="text-xl font-semibold">Submit Ticket</h4>
      <div className="mt-2 w-full">
        <div className="mb-4">
          <label className="block font-medium mb-1 text-gray-700 dark:text-gray-200">
            Select Department
          </label>
          <CustomSelect
            className="w-full"
            options={[
              { label: "Admin Support", value: "Admin Support" },
              { label: "Technical Support", value: "Technical Support" },
            ]}
            placeHolder="Select Department"
            handleChange={(value) =>
              handleAllInputsChange("selectedDepartment", value)
            }
            value={allInputs.selectedDepartment}
          />
        </div>

        <div className="mb-4">
          <label className="block font-medium mb-1 text-gray-700 dark:text-gray-200">
            Select Service
          </label>
          <CustomSelect
            className="w-full"
            options={[
              { label: "Package Activation", value: "Package Activation" },
              { label: "Downline Activation", value: "Downline Activation" },
              { label: "Authentication", value: "Authentication" },
            ]}
            placeHolder="Select Service"
            handleChange={(value) =>
              handleAllInputsChange("selectedService", value)
            }
            value={allInputs.selectedService}
          />
        </div>

        <div className="mb-4">
          <label className="block font-medium mb-1 text-gray-700 dark:text-gray-200">
            Subject
          </label>
          <input
            type="text"
            className="w-full text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600 placeholder-gray-400 dark:placeholder-gray-500 px-3 py-2 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Write a subject"
            name="subject"
            value={allInputs.subject}
            onChange={(e) => handleAllInputsChange("subject", e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block font-medium mb-1 text-gray-700 dark:text-gray-200">
            Description
          </label>
          <textarea
            rows="4"
            className="w-full text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600 placeholder-gray-400 dark:placeholder-gray-500 px-3 py-2 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Write description"
            value={allInputs.description}
            onChange={(e) =>
              handleAllInputsChange("description", e.target.value)
            }
          />
        </div>

        <div className="mb-4">
          <label className="block font-medium mb-1 text-gray-700 dark:text-gray-200">
            Attachment (optional)
          </label>
          <input
  type="file"
  className="w-full text-sm file:mr-4 file:py-2 file:px-4
             file:rounded-md file:border-0
             file:text-sm file:font-semibold
             file:bg-blue-50 file:text-blue-700
             hover:file:bg-blue-100
             dark:file:bg-gray-700 dark:file:text-gray-100
             dark:hover:file:bg-gray-600
             bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100
             border border-gray-300 dark:border-gray-600
             px-2 py-2 rounded-md outline-none"

            onChange={(e) => {
              const selectedFile = e.target.files[0];
              if (selectedFile) {
                handleAllInputsChange("selectedAttachment", selectedFile);
              }
            }}
          />
        </div>

        <Button
          className="mt-4"
          onClick={handleTicketSubmit}
          loading={allInputs.isLoading}
        >
          Submit
        </Button>
      </div>
    </div>
  );
}
