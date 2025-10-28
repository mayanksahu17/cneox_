import React, { useState } from "react";
import toast from "react-hot-toast";
import { FiSend, FiUpload } from "react-icons/fi";
import "react-quill/dist/quill.snow.css";
import { uploadBulkEmail } from "../../services/bulkUploadService";
import Papa from "papaparse";
import Header from "../../component/ReportsFilter/Header";
import { TiTick } from "react-icons/ti";
import ReactQuill from "react-quill";

const Main = () => {
  const [body, setBody] = useState("");
  const [file, setFile] = useState(null);
  const [inputs, setInputs] = useState({
    subject: "",
  });
  const [emails, setEmails] = useState([]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const fileExtension = file?.type.split("/")[1];
      if (fileExtension !== "csv") {
        toast.error("Please input a csv file");
        return;
      }
      setFile(file);
      handleParse(file);
    }
  };

  const handleParse = (file) => {
    const reader = new FileReader();

    reader.onload = async ({ target }) => {
      const csv = Papa.parse(target.result, {
        header: true,
      });

      const targettedData = csv?.data?.map((el) => el["EMAIL"]);
      setEmails(targettedData);
    };

    reader.readAsText(file);
  };

  const handleInputsChange = (e) => {
    setInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const data = {
        subject: inputs.subject,
        body,
        emails,
      };

      // const loadingId = toast.loading("Sending emails...");
      const res = await uploadBulkEmail(data);

      if (res.data && res.status === 200) {
        toast.success("Emails sent ✔");
        setFile(null);
        setInputs({
          subject: "",
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setBody("");
      setFile(null);
      setInputs({
        subject: "",
      });
    }
  };

  return (
    <div className="w-full h-full  bg-white p-6 rounded-md">
      <Header headerText={"Bulk Email"} />
      {/* uplaod CSV button */}
      <div className="w-full flex items-center justify-end">
        <input
          type="file"
          accept=".csv"
          className="hidden"
          onChange={handleFileChange}
          id="fileInput"
          disabled={file}
        />

        <label htmlFor="fileInput">
          <div
            className={`flex  w-full p-4  rounded-xl items-center justify-center ${
              file ? "bg-greenColor bg-opacity-50" : "bg-greenColor"
            } hover:bg-green-400 cursor-${
              file ? "not-allowed" : "pointer"
            } text-white px-22 gap-4 `}
          >
            {file ? (
              <>
                <TiTick />
                <span>Uploaded</span>
              </>
            ) : (
              <>
                <FiUpload />
                <span>Upload (.csv)</span>
              </>
            )}
          </div>
        </label>
      </div>

      {/* Subject input field */}
      <div className="mb-5">
        <label
          htmlFor="email_subject"
          className="block mb-2 text-base font-normal text-subTextColor"
        >
          Add Subject for Email
        </label>
        <input
          type="text"
          value={inputs.subject}
          onChange={handleInputsChange}
          name="subject"
          className="bg-gray-50 border w-full  border-gray-300 text-textColor text-md rounded-lgring-1 ring-gray-300 focus:ring-2 focus:ring-purple-500 outline-none rounded-md block p-2 "
          placeholder={"Enter Subject"}
          required
        />
      </div>
      {/* message field */}
      <div>
        <label
          htmlFor="email_body"
          className="block mb-2 text-base font-normal text-subTextColor"
        >
          Add Body for Email
        </label>
        <input
          type="text"
          // theme="snow"
          value={body}
          onChange={(e) => {
            setBody(e.target.value);
          }}
          placeholder="Write something..."
          rows={10}
          onKeyDown={(e) => {
            const isEnterKey = e.key === "Enter";
            if (isEnterKey) {
              setBody((prev) => prev + "\n");
            }
          }}
          className="h-72 bg-gray-50 border w-full  border-gray-300 p-8"
        />
        {/* <ReactQuill
          theme="snow"
          value={body}
          onChange={setBody}
          className="h-96"
        /> */}
      </div>
      {/* send button */}
      <div className="w-full  my-16 flex justify-end">
        <button
          onClick={handleSubmit}
          className="flex gap-x-4 items-center text-white bg-greenColor px-4 py-2 rounded-md  "
        >
          <FiSend />
          Send
        </button>
      </div>
    </div>
  );
};

export default Main;
