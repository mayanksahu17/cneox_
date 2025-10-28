import { Link } from "react-router-dom";
import { StatusBadge } from "..";
import copy from "copy-to-clipboard";
import toast from "react-hot-toast";

const MultipleValueComp = ({ item, field }) => {
  return field === "user" ? (
    <td className="p-4  text-sm text-textColor ">
      {/* {console.log(mul)} */}
      {item[field].id} <br className="mb-1" />
      {item[field].name} <br className="mb-1" />
      {item[field].email}
      <div className="flex flex-row justify-between mt-4">
        <Link to={`/admin/bio/${item[field].id}`}>
          <button className="bg-blueColor px-2.5 py-0.5 rounded-md text-white">
            {" "}
            Bio
          </button>
        </Link>
        <button
          onClick={() => {
            copy(
              `https://crownbankers.com/login-to-user-dashboard/${item[field].id}`
            );
            toast.success("Login link copied successfully");
          }}
          className="bg-greenColor px-3 py-1 rounded-md text-white"
        >
          {" "}
          Login
        </button>
      </div>
    </td>
  ) : field === "upline" ? (
    item.type === "downline" ? (
      <td className="p-4  text-sm text-textColor ">
        {item.sponsor} <br className="mb-1" />
        {item.sponsor_name} <br className="mb-1" />
        {item.sponsor_country} <br className="mb-1" />
        {item.sponsor_email}
      </td>
    ) : (
      <td></td>
    )
  ) : field === "sponsor" ? (
    <td className="p-4  text-sm text-textColor ">
      {item[field].id} <br className="mb-1" />
      {item[field].name} <br className="mb-1" />
      {item[field].email}
    </td>
  ) : field === "user_id" ? (
    <td className="p-4  text-sm text-textColor ">
      {item.user_id || item.userId} <br className="mb-1" />
      {item.name} <br className="mb-1" />
      {item.email}
    </td>
  ) : field === "currency2" ? (
    <td className="p-4  text-sm text-textColor ">
      {item.currency2} <br className="mb-1" />$
      {parseFloat(item.amount2).toFixed(2)}
    </td>
  ) : field === "currency1" ? (
    <td className="p-4  text-sm text-textColor ">
      {item.currency1} <br className="mb-1" />$
      {parseFloat(item.amount1).toFixed(2)}
    </td>
  ) : field === "package_name" ? (
    <td className="p-4  text-md text-greenColor ">
      ${item.amount} <br className="mb-1" />
      <span className="text-primaryColor font-semibold">
        {item.package_name} <br className="mb-1" />
      </span>
    </td>
  ) : field === "status" ? (
    <td className="p-4  text-sm text-textColor flex flex-col gap-y-2">
      {/* {console.log(item)} */}
      <StatusBadge data={item.status} />

      {item?.user?.verified === 1 ? (
        <StatusBadge data={"verified"} />
      ) : (
        <>
          <StatusBadge data={"not verified"} />
          <StatusBadge data={"send verification link"} user={item?.user} />
        </>
      )}
    </td>
  ) : field === "document" ? (
    <td className="p-4  text-sm text-textColor flex flex-col gap-y-2">
      {/* {console.log(item)} */}

      <a
        href={item?.doclink}
        target="_blank"
        rel="noreferrer"
        className=" underline text-textColor hover:text-blueColor"
      >
        {item?.doctype}
      </a>
    </td>
  ) : field === "referral_user_id" ? (
    <td className="p-4  text-sm text-textColor ">
      {item.referral_user_id} <br className="mb-1" />
      {item?.referral_email}
    </td>
  ) : (
    ""
  );
};

export default MultipleValueComp;
