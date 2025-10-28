import React, { useState } from "react";
import {
  EllipseFive,
  EllipseSix,
  PackageOne,
  PackageThree,
  PackageTwo,
  VerifiedImage,
} from "../../../assets/index";
import { useNavigate } from "react-router-dom";
import clsx from "clsx";
import { useAuth } from "../../../hooks/useAuth";
import Tree from "./Tree";

const BinaryNode = ({ data, last, first, ofTwo }) => {
  const { user } = useAuth();

  // console.log(last, first, ofTwo);

  const handleNavigate = useNavigate();
  const isClickAble = data?.user_id !== user?.user?.userId;

  const [showTree, setShowTree] = useState(false);

  const handleClick = () => {
    if (isClickAble) {
      handleNavigate(`/admin/genealogy/binary/${data?.user_id}`);
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

  return (
    <div
      className={clsx(
        "flex items-center justify-center flex-col realative",
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
          "flex flex-col justify-center items-center p-0 md:p-2 border border-gray-600 rounded-lg relative",
          ofTwo ? "h-[100px] w-[120px]" : "h-[120px] w-[120px]"
        )}
      >
        <div
          className="w-12 h-12 bg-[#373737] flex items-center justify-center rounded-full "
          onMouseEnter={() => setShowTree(true)}
          onMouseLeave={() => setShowTree(false)}
          onClick={() => setShowTree((prev) => !prev)}
        >
          {renderImageByPackage()}
          {showTree && !ofTwo && data && !first && (
            <div
              className={`absolute -top-20  -left-10 w-[280px] rounded-2xl transform -translate-x-1/2 -mt-40 -500 z-100  `}
              style={{ zIndex: "100" }}
            >
              <Tree data={data} />
            </div>
          )}
          {showTree && !ofTwo && data && first && (
            <div
              className={`absolute bottom-0 left-60 w-[280px] rounded-2xl transform -translate-x-1/2 -mt-40 -500  z-100  `}
              style={{ zIndex: "100" }}
            >
              <Tree data={data} />
            </div>
          )}
        </div>
        <span
          className={` text-sm text-center md:text-md ${
            !data ? "text-red-600 mt-2 " : "text-red-600 font-semibold mt-2"
          }`}
        >
          {data ? data?.user_id : ""}
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
};

export default BinaryNode;
