import clsx from "clsx";
import { useNavigate, useParams } from "react-router-dom";

export default function Tab({ data }) {
  const params = useParams();
  const selectedTab = params.selectedRoute;
  const handleNavigate = useNavigate();

  const { children } =
    data.find(
      (el) => el?.route.split("/").findLast((currElem) => currElem) === selectedTab
    ) || data[0]; // fallback for first tab

  return (
    <>
      {/* === Tab Header === */}
      <div className="flex items-center overflow-auto bg-black border-b-2 border-black rounded-t-md">
        {data.map(({ name, route }, index, arr) => {
          const isSelected =
            selectedTab === route?.split("/")?.findLast((el) => el);

          return (
            <div
              key={index}
              onClick={() => handleNavigate(route)}
              className={clsx(
                "py-3 px-5 cursor-pointer transition-all duration-300 font-medium text-sm border-r border-black select-none",
                isSelected
                  ? "bg-yellow-400 text-black font-semibold border-b-4 border-b-black"
                  : "bg-black text-white hover:bg-yellow-500 hover:text-black",
                index === 0 && "rounded-tl-md",
                index === arr.length - 1 && "rounded-tr-md border-r-0"
              )}
            >
              {name}
            </div> 
          );
        })}
      </div>

      {/* === Tab Content === */}
      <div className="mt-2 bg-white border-2 border-black p-4 rounded-b-md shadow-md">
        {children}
      </div>
    </>
  );
}
