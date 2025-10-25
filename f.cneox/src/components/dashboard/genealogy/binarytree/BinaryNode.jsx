import clsx from "clsx";
import { useAuth } from "../../../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import Tree from "./Tree";
import {
  EllipseFive,
  EllipseSix,
  PackageOne,
  PackageTwo,
  PackageThree,
  VerifiedImage,
} from "../../../../assets";

export default function BinaryNode({ data, last, first, ofTwo, side }) {
  const { user } = useAuth();
  const handleNavigate = useNavigate();
  const isClickAble = data?.user_id !== user?.user?.userId;

  const [showTree, setShowTree] = useState(false);
  const hoverTimeoutRef = useRef(null);

  const handleMouseEnter = () => {
    if (data) {
      hoverTimeoutRef.current = setTimeout(() => {
        setShowTree(true);
      }, 300); // 300ms delay before showing
    }
  };

  const handleMouseLeave = () => {
    clearTimeout(hoverTimeoutRef.current);
    setShowTree(false);
  };

  useEffect(() => {
    return () => {
      clearTimeout(hoverTimeoutRef.current);
    };
  }, []);

  const handleClick = () => {
    if (isClickAble && data?.user_id) {
      handleNavigate(`/dashboard/genealogy/binary/${data?.user_id}`);
    }
  };

  const renderImageByPackage = () => {
    if (!data) {
      return (
        <img src={EllipseSix} width="50" height="50" className="pt-[4px]" />
      );
    }

    if (!data?.package_id) {
      if (data?.verified === 1) {
        return (
          <img src={VerifiedImage} width="36" height="50" className="contain" />
        );
      } else {
        return (
          <img src={EllipseFive} width="50" height="50" className="pt-[4px]" />
        );
      }
    }

    switch (data?.package_id) {
      case 1:
        return <img src={PackageOne} alt="Package 1" width="40" height="40" />;
      case 2:
        return <img src={PackageTwo} alt="Package 2" width="50" height="50" />;
      case 3:
        return (
          <img src={PackageThree} alt="Package 3" width="50" height="50" />
        );

      default:
        return (
          <img src={EllipseSix} width="50" height="50" className="pt-[4px]" />
        );
    }
  };

  const getPopupPosition = () => {
    if (first) {
      return "top-full left-1/2 transform -translate-x-1/2 mt-2"; // Positioned below first node
    } else if (side) {
      return "top-0 -left-[410px]"; // Left side
    } else {
      return "top-0 -right-[410px]"; // Right side
    }
  };

  return (
    <div
      className={clsx(
        "flex items-center justify-center flex-col relative",
        isClickAble && "cursor-pointer"
      )}
      onClick={handleClick}
    >
      <div>
        {!first && (
          <div
            style={{ height: ofTwo ? "10px" : "30px", paddingTop: 0 }}
            className="w-[2px] bg-gray-300"
          />
        )}
      </div>
      <div
        className={clsx(
          "flex flex-col justify-center items-center p-0 md:p-1 border border-gray-600 rounded-lg relative",
          ofTwo ? "h-[80px] w-[100px]" : "h-[90px] w-[100px]"
        )}
      >
        <div
          className="w-10 h-10 bg-[#373737] flex items-center justify-center rounded-full relative"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={(e) => {
            e.stopPropagation();
            setShowTree((prev) => !prev);
          }}
        >
          {renderImageByPackage()}
          {showTree && data && (
            <div 
              className={`absolute ${getPopupPosition()} w-[420px] shadow-xl rounded-lg z-[9999] 
                          transition-opacity duration-200 opacity-100`}
              onClick={(e) => e.stopPropagation()}
            >
              <Tree data={data} />
            </div>
          )}
        </div>
        <span
          className={`text-center text-xs ${
            !data ? "text-primary mt-1 " : "text-primary font-semibold mt-1 "
          }`}
        >
          {data ? data.user_id : ""}
        </span>
      </div>
      <div>
        {!last && (
          <div
            className={clsx(
              "w-[2px] bg-gray-300 pb-0 mb-0",
              ofTwo ? "h-[10px]" : "h-[30px]"
            )}
          />
        )}
      </div>
    </div>
  );
}
