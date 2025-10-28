import { createContext, useState } from "react";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const user = JSON.parse(localStorage.getItem("crown_admin")) || null;
  const notifications = [];
  const [state, setState] = useState({
    user,
    notifications,
  });

  const [notificationCount, setNotificationCount] = useState([]);

  const handleStateChange = (name, value) =>
    setState((prev) => ({ ...prev, [name]: value }));

  const updateUser = (data) => {
    console.log(data);
    localStorage.setItem("crown_admin", JSON.stringify(data));
    handleStateChange("user", data);
  };
  const updateNotifications = (data) => {
    handleStateChange("notifications", data);
  };

  const logOutUser = () => {
    localStorage.removeItem("crown_admin");
    handleStateChange("user", null);
  };

  const updateUserDetails = (data) => {
    handleStateChange("user", { user: data, token: state.user.token });
    localStorage.setItem(
      "crown_admin",
      JSON.stringify({ user: data, token: state.user.token })
    );
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        updateUser,
        logOutUser,
        updateUserDetails,
        updateNotifications,
        notificationCount,
        setNotificationCount,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
