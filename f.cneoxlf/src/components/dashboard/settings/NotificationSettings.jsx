import { useEffect, useState } from "react";
import ToggleSwitch from "../global/ToggleSwitch";
import userService from "../../../services/userService";
import { useAuth } from "../../../hooks/useAuth";
import Button from "../global/Button";
import toast from "react-hot-toast";

export default function NotificationSettings() {
  const { user } = useAuth();
  const [render, setReder] = useState(false);
  useEffect(() => {
    (async () => {
      try {
        const notificationResponse = await userService.getNotificationSettings(
          user
        );
        console.log(notificationResponse);
        if (notificationResponse?.data?.success) {
          const settings = notificationResponse?.data?.data[0];
          setAllInputs((prev) => ({
            ...prev,
            isUnusualChecked: settings?.isUnusualChecked || 0,
            isSuspiciousChecked: settings?.isSuspiciousChecked || 0,
            isSalesChecked: settings?.isSalesChecked || 0,
            isNewFeatureChecked: settings?.isNewFeatureChecked || 0,
            isTipsChecked: settings?.isTipsChecked || 0,
          }));
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, [render]);
  const [allInputs, setAllInputs] = useState({
    isUnusualChecked: 0,
    isSuspiciousChecked: 0,
    isSalesChecked: 0,
    isNewFeatureChecked: 0,
    isTipsChecked: 0,
  });
  const [isLoading, setIsLoading] = useState(false);

  const data = [
    {
      name: "Security Alerts",
      description: "You will get only those email notification what you want",
      checkboxes: [
        {
          text: "Email me whenever encounter unusual activity",
          name: "isUnusualChecked",
        },
        {
          text: "Email me if the suspicious browser is used to sign in",
          name: "isSuspiciousChecked",
        },
      ],
    },
    {
      name: "News",
      description: "You will get only those email notification what you want",
      checkboxes: [
        {
          text: "Notify me by email about sales and latest news",
          name: "isSalesChecked",
        },
        {
          text: "Email me about new features and updates",
          name: "isNewFeatureChecked",
        },
        {
          text: "Email me about tips on using account",
          name: "isTipsChecked",
        },
      ],
    },
  ];

  const handleToggle = (name) => {
    setAllInputs((prev) => ({
      ...prev,
      [name]: prev[name] === 0 ? 1 : 0,
    }));
  };

  const handleSave = async () => {
    try {
      setIsLoading(true);

      const notificationResponse = await userService.updateNotificationSettings(
        user,
        allInputs
      );

      if (notificationResponse?.data?.success) {
        setIsLoading(false);

        toast.success("Notification settings saved successfully");
        setReder((prev) => ~prev);
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  return (
    <div className="mt-4 space-y-4 w-full">
      <h1 className="text-2xl ">Notification Settings</h1>
      <div className="w-full space-y-4">
        {data.map((el, index) => (
          <div key={index}>
            <h4 className="text-xl text-gray-900 font-medium">{el.name}</h4>
            <p className="text-black text-sm font-normal">{el.description}</p>
            <div className="mt-4 w-full space-y-3">
              {el.checkboxes.map((currElem, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <ToggleSwitch
                    isChecked={allInputs[currElem?.name]}
                    handleToggle={() => handleToggle(currElem?.name)}
                  />
                  <p className="font-normal text-sm">{currElem?.text}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="w-full md:flex md:items-center md:justify-end">
        <Button
          className="w-full sm:!w-[10%]"
          onClick={handleSave}
          loading={isLoading}
        >
          Save
        </Button>
      </div>
    </div>
  );
}
