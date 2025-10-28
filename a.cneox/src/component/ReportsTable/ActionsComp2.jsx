import React, { useRef, useState } from "react";
import { FiLoader, FiSend, FiX } from "react-icons/fi";
import { updateTicketsbyId } from "../../services/ticketsService";
import toast from "react-hot-toast";

const ActionsComp2 = ({ data, renderFunction }) => {
  const [actionsVisible, setActionsVisible] = useState(false);
  const modalRef = useRef(null);

  // console.log(data);
  const [loading, setLoading] = useState(false);

  const [message, setMessage] = useState({ message: "" });

  const handleClick = (e) => {
    // setActionsVisible(false);
    if (e.target.id !== "modal") {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        console.log(e.target);
        setActionsVisible(false);
      }
    }

    // console.log(message);
  };

  const handleBtnClick = async () => {
    setLoading(true);
    if (!message) {
      toast.error("Please a write a valid Message.");
      return;
    }

    const response = await updateTicketsbyId(data.id, message);
    console.log(response);
    setMessage("");
    setActionsVisible(false);
    // console.log();
    renderFunction((prev) => !prev);
    toast.success("Ticket Closed Successfully!");

    setLoading(false);
  };

  return (
    <div className="">
      <button
        className="text-redColor hover:underline underline-offset-2 "
        onClick={() => {
          console.log("sdsad");
          console.log(actionsVisible);
          setActionsVisible(true);
        }}
      >
        Action
      </button>
      {actionsVisible && (
        <>
          <div
            className="fixed w-full h-full top-0 left-0 z-[60] flex items-center justify-center flex-col "
            onClick={handleClick}
          >
            <div
              className="absolute bg-white rounded-md ring-1 ring-gray-300  w-[28rem] p-2.5"
              ref={modalRef}
              id="modal"
            >
              {/* Heading */}
              <div className="p-4 md:p-5 space-y-4 relative">
                <h3 className="text-textColor text-2xl font-semibold">
                  Reply Ticket
                </h3>
                <button
                  className="text-xl text-subTextColor  p-2 rounded-full absolute z-50 -top-2 right-4"
                  onClick={(e) => {
                    e.preventDefault();
                    setActionsVisible(false);
                  }}
                >
                  <FiX />
                </button>
              </div>
              {/* TextBOX */}
              <div className="px-4  pb-3">
                <p className="  text-subTextColor text-lg font-medium pb-2  ">
                  Write a reply to Ticket
                </p>
                {/* <input type="text" /> */}
                <textarea
                  name=""
                  id=""
                  cols="30"
                  rows="10"
                  value={message.message}
                  className="bg-gray-50 border w-full  border-gray-300 text-textColor text-md rounded-lgring-1 ring-gray-300 focus:ring-2 focus:ring-primaryColor outline-none rounded-md block p-2 "
                  onChange={(e) => {
                    setMessage({ ...message, message: e.target.value });
                  }}
                />
              </div>
              {/* buttons */}
              <div className="flex items-end justify-end w-full pb-4 px-4  border-gray-300 rounded-b">
                <button
                  data-modal-hide="default-modal"
                  type="button"
                  className="text-white bg-greenColor focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-md px-5 py-2.5 text-center flex items-center gap-1 disabled:opacity-70"
                  disabled={loading}
                  onClick={() => handleBtnClick()}
                >
                  {loading ? (
                    <FiLoader className="animate-spin ease-in" />
                  ) : (
                    <FiSend className="text-lg" />
                  )}
                  <span></span>
                  Send
                </button>
                <button
                  data-modal-hide="default-modal"
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    setActionsVisible(false);
                  }}
                  className="ms-3 text-white  rounded-lg border border-gray-200 text-md font-medium px-5 py-2.5  bg-redColor"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
          <div
            className="fixed w-[100vw] h-[100vh] bg-black bg-opacity-[40%] top-0 left-0 z-50 "
            onClick={() => setActionsVisible(false)}
          />
        </>
      )}
    </div>
  );
};

export default ActionsComp2;
