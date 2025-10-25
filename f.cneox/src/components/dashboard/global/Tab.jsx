import clsx from "clsx";
import { useNavigate, useParams } from "react-router-dom";

export default function Tab({ data }) {
  const params = useParams();
  const selectedTab = params.selectedRoute;
  const handleNavigate = useNavigate();

  const { children } = data.find((el) => {
    return (
      el?.route.split("/").findLast((currElem) => currElem) === selectedTab
    );
  });

  return (
    <>
      <div className="flex items-center overflow-auto bg-gray-100 dark:bg-gray-800 rounded-t-md">
        {data.map(({ name, route }, index, arr) => {
          const isSelected =
            selectedTab === route?.split("/")?.findLast((el) => el);

          return (
            <div
              key={index}
              className={clsx(
                "py-2 px-4 cursor-pointer transition-all",
                isSelected
                  ? "border-b-4 font-bold text-black dark:text-white border-green-500 bg-white dark:bg-gray-900"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700",
                arr.length - 1 === index && "rounded-tr-md",
                index === 0 && "rounded-tl-md"
              )}
              onClick={() => handleNavigate(route)}
            >
              {name}
            </div>
          );
        })}
      </div>

      <div className="mt-2 bg-white dark:bg-gray-800 p-4 rounded-b-md shadow">
        {children}
      </div>
    </>
  );
}
