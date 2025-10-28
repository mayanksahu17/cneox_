import React, { useRef, useState } from "react";
import {
  changeStatus,
  sendCredentials,
  sendVerifyLink,
} from "../../services/adminServices";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const ActionsComp = ({ data, renderFunction }) => {
  const [actionsVisible, setActionsVisible] = useState(false);
  const btnRef = useRef();
  const optionsRef = useRef();

  const userData = JSON.parse(localStorage.getItem("crown_admin"));

  const navigate = useNavigate();

  // console.log(data);

  window.addEventListener("click", (e) => {
    // // console.log(e.target.classList);
    // const classes = e.target.classList;

    if (e.target !== btnRef.current && e.target !== optionsRef.current) {
      setActionsVisible(false);
    }
    // if(e.target. )
  });

  const sendUsersCredentials = async () => {
    try {
      const loadingToast = toast.loading("Sending credentials...");
      const response = await sendCredentials(data.user.id);
      console.log(response);
      if (response.status === 200) {
        toast.success("Credentials sent successfully", {
          id: loadingToast,
        });
      } else {
        toast.error("Failed to send credentials", { id: loadingToast });
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occurred:");
    }
  };

  const sendUserVerificationLink = async () => {
    try {
      const loadingToast = toast.loading("Sending verification link...");
      const formData = {
        userId: data.user.id,
        email: data.user.email,
      };
      // console.log(formData);
      const response = await sendVerifyLink(formData);
      console.log(response);

      if (response.status === 200) {
        toast.success("Verification link sent successfully", {
          id: loadingToast,
        });
      } else {
        toast.error("Failed to send verification", {
          id: loadingToast,
        });
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occurred:");
    }
  };

  const suspendUserAccount = async () => {
    try {
      // Create the formData object with the necessary data
      const formData = {
        userId: data.user.id, // Replace with the actual key for user ID in your data
        status: "suspended",
      };
      const response = await changeStatus(formData);
      console.log(response.data.success);

      if (response.data.success) {
        toast.success("Status updated successfully", {
          id: "loadingToast",
        });
        renderFunction(prev=>!prev);
        // onRender();
      } else {
        toast.error("Status update failed", { id: "loadingToast" });
      }
    } catch (error) {
      console.log(error)
      toast.error("An error occurred:", { id: "loadingToast" });
    }
  };

  const blockUserAccount = async () => {
    try {
      // Create the formData object with the necessary data
      const formData = {
        userId: data.user.id, // Replace with the actual key for user ID in your data
        status: "blocked",
      };
      const response = await changeStatus(formData);
      console.log(response);

      if (response.status === 200) {
        toast.success("Status updated successfully", {
          id: "loadingToast",
        });
        renderFunction(prev=>!prev);

        // onRender();
      } else {
        toast.error("Status update failed", { id: "loadingToast" });
      }
    } catch (error) {
      toast.error("An error occurred:", { id: "loadingToast" });
    }
  };

  const navigateToEditUser = (userId) => {
    if (userData?.role !== 1) {
      toast.error("Your are not allowed to this page");
      return;
    }

    return navigate(`/admin/edit-user/${userId}`);
  };

  // <Link to={`/admin/edit-user/${data?.user?.id}`}>
  //       </Link>
  return (
    <div className="">
      <button
        className="text-redColor hover:underline underline-offset-2 "
        onClick={() => {
          setActionsVisible((prev) => !prev);
        }}
        ref={btnRef}
      >
        Action
      </button>
      <ul
        className={`w-52 px-4 py-3 flex flex-col gap-1.5  mt-4 z-20 bg-white right-10 absolute  ring-1 ring-gray-300 rounded-md ${
          !actionsVisible ? "hidden" : ""
        }`}
        ref={optionsRef}
      >
         <li
          className={`text-subTextColor  py-1.5 px-2 rounded-md hover:bg-gray-300/70 border-b-[1px] border-b-gray-200 ${
            userData?.role !== 1 ? "cursor-not-allowed" : "cursor-pointer"
          }`}
          onClick={() => navigateToEditUser(data?.user?.id)}
        >
          Edit
        </li>
        
        <li
          className="text-subTextColor cursor-pointer  border-b-[1px] py-1.5 px-2 rounded-md hover:bg-gray-300/70 border-b-gray-200"
          onClick={sendUsersCredentials}
        >
          Send Credentials
        </li>
        <li
          className="text-subTextColor cursor-pointer py-1.5 px-2 rounded-md hover:bg-gray-300/70 border-b-[1px] border-b-gray-200"
          onClick={sendUserVerificationLink}
        >
          Send Verification link
        </li>
        <li
          className="text-subTextColor cursor-pointer py-1.5 px-2 rounded-md hover:bg-gray-300/70 border-b-[1px] border-b-gray-200"
          onClick={suspendUserAccount}
        >
          Suspend
        </li>
       
        <li
          className="text-redColor cursor-pointer py-1.5 px-2 rounded-md hover:bg-gray-300/70 "
          onClick={blockUserAccount}
        >
          Block
        </li>
      </ul>
    </div>
  );
};
export default ActionsComp;
