import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import toast from "react-hot-toast";
import axios from "axios";
import { baseURL } from "../../constants/baseURL";
import { useAuth } from "../../hooks/useAuth";

const LoginToUserDashboard = () => {
  const { userid } = useParams();
  const { user, updateUser } = useAuth();
  const handleNavigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [adminEmail, setAdminEmail] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [adminPin, setAdminPin] = useState("");
  const [isAddminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [formData, setFormData] = useState({
    userId: "",
    name: "",
    emailToBeUpdated: "",
  });
  useEffect(() => {
    console.log(userid);
    setLoading(false);
    const userData = JSON.parse(localStorage.getItem("crown_admin"));
    if (userData) {
      setIsAdminLoggedIn(true);
    } else {
      setIsAdminLoggedIn(false);
      setLoading(true);
      return;
    }
    const fetchData = async (userid) => {
      const headers = {
        Authorization: `${userData?.token}`,
      };
      console.log(localStorage.getItem("crown_admin"));
      try {
        const res = await axios.get(
          `${baseURL}/users/user-data-admin/${userid}?email=superadmin1@crownbankers.com`,
          { headers }
        );
        console.log(res);
        if (res.data.success) {
          setFormData({
            userId: res.data.data.userId,
            name: res.data.data.name,
            emailToBeUpdated: res.data.data.email,
          });
          setLoading(true);
        } else {
          toast.error("Failed to load user");
        }
      } catch (err) {
        toast.error("Failed to load user");
      }
    };
    fetchData(userid);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = JSON.parse(localStorage.getItem("crown_admin"));
    if (!userData) {
      toast.error("Please login again to admin panel");
    }
    const loginForm = {
      userId: formData?.userId,
      password: password,
      email: "superadmin1@crownbanekrs.com",
    };
    try {
      const headers = {
        Authorization: `${userData?.token}`,
      };
      const response = await axios.post(
        `${baseURL}/admin/user-signin`,
        loginForm,
        { headers }
      );
      console.log(response);
      //console.log("response", response);
      if (response.data.success && response.data.token) {
        if (response.data.data.verified) {
          toast.success("Login successful");
          //console.log("response", response);
          const userData = {
            token: response.data.token,
            email: response.data.data.email,
            userId: response.data.data.userId,
          };
          updateUser({
            user: response?.data?.data,
            token: response?.data?.token,
          });
          handleNavigate("/dashboard");
        } else {
          toast.error("Account not verified yet");
        }
      } else {
        toast.error("Invalid user id or password");
      }
    } catch (error) {
      console.log(error);
      if (
        error?.response?.data?.message === "Password is incorrect." ||
        error?.response?.data?.message ===
          "Invalid user id or you are a new user"
      ) {
        toast.error(error?.response?.data?.message);
      } else {
        toast.error("error");
      }
    } finally {
    }
  };
  const handleAdminPAnel = async (e) => {
    e.preventDefault();
    const loginForm = {
      email: adminEmail,
      security_pin: adminPin,
      password: adminPassword,
    };
    console.log(loginForm, "login data ");
    try {
      await axios
        .post(`${baseURL}/admin/signin`, loginForm)
        .then((res) => {
          console.log("res", res);
          if (res.data.success && res.data.token) {
            toast.success("Login successful");

            const userData = {
              token: res.data.token,
              email: loginForm.email,
              userId: res.data.data.id,
            };
            localStorage.setItem("crown_admin", JSON.stringify(userData));
            window.location.reload();
          }
        })
        .catch((err) => {
          console.log(err);
          toast.error("Something went wrong! Check your email and password");
        });
    } catch (error) {
      toast.error(error);
    }
  };
  return (
    loading && (
      <div className="bg-gray-100 h-screen flex items-center justify-center">
        <div className="bg-white p-4 py-6 rounded-md shadow-md max-w-3xl w-full">
          {isAddminLoggedIn ? (
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  {/* Left Side (User Details) */}
                  <div className="w-1/2 space-y-2 text-black">
                    <div className="flex items-center">
                      <div className="text-lg mb-6">
                        Login to user dashboard
                      </div>

                      <label className="text-sm" htmlFor="username">
                        User Name:
                      </label>
                      <div id="username">{formData?.name}</div>
                    </div>
                    <div className="flex items-center">
                      <label className="text-sm" htmlFor="userId">
                        User ID:
                      </label>
                      <div id="userId">{formData?.userId}</div>
                    </div>
                    <div className="flex items-center">
                      <label className="text-sm" htmlFor="email">
                        User Email:
                      </label>
                      <div id="email">{formData?.emailToBeUpdated}</div>
                    </div>
                  </div>

                  {/* Right Side (Login Form) */}
                  <div className="w-1/2 text-black">
                    <form>
                      <div className="space-y-4 text-center">
                        <label className="text-sm" htmlFor="password">
                          Password
                        </label>
                        <input
                          type="password"
                          id="password"
                          onChange={(e) => setPassword(e.target.value)}
                          value={password}
                          className="block w-full px-4 py-2 border rounded-md"
                          placeholder="Enter your password"
                        />
                        <button
                          className="bg-blue-500 text-white rounded-md p-2 w-full"
                          onClick={handleSubmit}
                        >
                          Login
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </form>
          ) : (
            <form>
              <div className="space-y-4 text-left text-black ">
                <div className="text-lg mb-6">Login to admin panel first</div>
                <label className="text-sm" htmlFor="email">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={adminEmail}
                  onChange={(e) => {
                    setAdminEmail(e.target.value);
                  }}
                  // Handle email input change
                  className="block w-full px-4 py-2 border rounded-md"
                  placeholder="Enter your email"
                />
                <label className="text-sm" htmlFor="pin">
                  PIN
                </label>
                <input
                  type="text"
                  id="pin"
                  // Handle PIN input change
                  className="block w-full px-4 py-2 border rounded-md"
                  placeholder="Enter your PIN"
                  value={adminPin}
                  onChange={(e) => {
                    setAdminPin(e.target.value);
                  }}
                />
                <label className="text-sm" htmlFor="password">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={adminPassword}
                  onChange={(e) => {
                    setAdminPassword(e.target.value);
                  }}
                  className="block w-full px-4 py-2 border rounded-md"
                  placeholder="Enter your password"
                />
                <button
                  className="bg-blue-500 text-white rounded-md p-2 w-full"
                  onClick={handleAdminPAnel}
                >
                  Login to admin panel
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    )
  );
};

export default LoginToUserDashboard;
