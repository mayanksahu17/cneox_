import { useState } from "react";
import { Button, ErrorMessage, PasswordInput, Select } from "../components";
import countryList from "react-select-country-list";
import { useMemo } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { baseURL } from "../constants/baseURL";

import authService from "../services/authService";
import toast from "react-hot-toast";
import { AuthImage, SignUpImage, Logo } from "../assets";

export default function SignUp() {
  const [searchParams, setSearchParams] = useSearchParams({
    sponsorId: "",
    position: "left",
  });

  const paramSponsorId = searchParams.get("sponsorId");
  const paramPosition = searchParams.get("position");

  const [formData, setFormData] = useState({
    hasSponsor: false,
    position: "left",
    sponsorId: "CROWN-",
    sponsorName: "",
    firstName: "",
    lastName: "",
    country: null,
    phoneNumber: "",
    email: "",
    confirmEmail: "",
    password: "",
    confirmPassword: "",
    acceptTerms: false,
    // withdrawal_wallet: "",
  });

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    country: "",
    // phoneNumber: "",
    email: "",
    confirmEmail: "",
    password: "",
    confirmPassword: "",
    acceptTerms: "",
    // withdrawal_wallet: "",
  });

  const [touched, setTouched] = useState({
    firstName: false,
    lastName: false,
    country: false,
    // phoneNumber: false,
    email: false,
    confirmEmail: false,
    password: false,
    confirmPassword: false,
    acceptTerms: false,
    // withdrawal_wallet: "",
  });

  const handleBlur = (name) => {
    setTouched((prev) => ({ ...prev, [name]: true }));
    validateInput(name, formData[name]);
  };

  const validateInput = (name, value) => {
    let error = "";

    switch (name) {
      case "firstName":
      case "lastName":
        error = value.trim() === "" ? `${name} is required` : "";
        break;
      case "country":
        error = value ? "" : "Please select a country";
        break;
      case "withdrawal_wallet":
        error = value ? "" : "Please enter the withdrawal wallet";
        break;
      // case "withdrawal_wallet":
      //   error = value ? "" : "Please enter the withdrawal wallet";
      //   break;
      // case "phoneNumber":
      //   error = /^\d{10,15}$/.test(value) ? "" : "Invalid phone number";
      //   break;
      case "email":
        error = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
          ? ""
          : "Invalid email address";
        break;
      case "confirmEmail":
        error = value === formData.email ? "" : "Emails do not match";
        break;
      case "password":
        error =
          value.length >= 3 ? "" : "Password must be at least 3 characters";
        break;
      case "confirmPassword":
        error = value === formData.password ? "" : "Passwords do not match";
        break;
      case "acceptTerms":
        error = formData.acceptTerms
          ? ""
          : "You must accept the terms and conditions";
        break;
      default:
        break;
    }

    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const [loadingStates, setLoadingStates] = useState({
    isSignUpLoading: false,
  });

  const handleRadioChange = (e) => {
    const { name } = e.target;
    setFormData({
      ...formData,
      [name]: !formData[name],
    });
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: !prev[name] }));
    validateInput(name, checked);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (touched[name]) {
      validateInput(name, value);
    }
  };

  const options = useMemo(() => countryList().getData(), []);

  const handleNavigate = useNavigate();

  const customStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: "transparent",
      border: "1px solid #fff",
      borderRadius: "8px",
      padding: "1px",
    }),
    input: (provided) => ({
      ...provided,
      color: "#fff !important",
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "#FFFFFF",
    }),
    option: (provided) => ({
      ...provided,
      backgroundColor: "#000000",
      color: "#FFF",
    }),
  };

  useEffect(() => {
    if (formData.sponsorId.length == 12) {
      fetchSponsorName(formData.sponsorId);
    }
  }, [formData.sponsorId]);

  const fetchSponsorName = async (id) => {
    try {
      const { data } = await axios.get(baseURL + "/users/name/" + id);
      if (data?.success) {
        setFormData((prev) => ({ ...prev, sponsorName: data?.data?.name }));
      }
    } catch (error) {
      setFormData((prev) => ({ ...prev, sponsorName: "" }));
    }
  };

  const changeLoadingStates = (name, value) => {
    setLoadingStates((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      changeLoadingStates("isSignUpLoading", true);
      const response = await authService.signUpUser({
        ...formData,
        referrer_id: formData.sponsorId
          ? `${formData.sponsorId}`
          : "CROWN-100012",
        phone: formData.phoneNumber,
        // withdrawal_wallet: formData.withdrawal_wallet,
        username: `${formData.firstName} ${formData.lastName}`,
        country: formData?.country?.label,
      });

      if (response?.data?.success) {
        // const emailResponse = await authService.sendVerificationEmail({
        //   email: formData.email,
        //   userId: response?.data?.data?.userId,
        // });
        // if (emailResponse?.status === 200) {
        setFormData({
          hasSponsor: false,
          position: "left",
          sponsorId: "",
          sponsorName: "",
          firstName: "",
          lastName: "",
          country: null,
          phoneNumber: "",
          email: "",
          confirmEmail: "",
          password: "",
          confirmPassword: "",
          acceptTerms: false,
        });
        toast.success(
          "Verification link sent to your email. Please check your inbox."
        );
        handleNavigate("/login");
        //  }
      }
    } catch (error) {
      console.log(error);
      toast.error(
        "Error while registering with us. Please try after some time"
      );
    } finally {
      changeLoadingStates("isSignUpLoading", false);
    }
  };

  // const queryParams = new URLSearchParams(window.location.search);

  useEffect(() => {
    if (paramSponsorId) {
      setFormData((prev) => ({
        ...prev,
        sponsorId: paramSponsorId,
        hasSponsor: true,
      }));
    }

    if (paramPosition) {
      setFormData((prev) => ({ ...prev, position: paramPosition }));
    }
  }, [paramPosition, paramSponsorId]);

  const validationFilteredStates = Object.keys(formData).filter(
    (el) => el !== "hasSponsor" && el !== "sponsorId" && el !== "sponsorName"
  );

  const isButtonDisabled = useMemo(
    () =>
      Object.values(errors).some((error) => error !== "") ||
      validationFilteredStates.filter((el) => formData[el] === "")?.length > 0,
    [errors, formData]
  );

  return (
    <>
      <div
        className="w-full flex justify-center items-center min-h-screen py-4 lg:py-10"
        style={{
          backgroundImage: `url(${AuthImage})`,
        }}
      >
        <div className="max-w-[90%] relative lg:max-w-[80%] flex flex-col md:flex-row items-stretch h-full justify-stretch w-full rounded-3xl bg-[#111111] ">
          {/* Logo */}

          <div className="absolute top-4 left-4 cursor-pointer h-14 p-2 w-14 rounded-full bg-white flex items-center justify-center">
            <img
              src={Logo}
              alt="Logo Image"
              className="w-full h-full object-contain"
              onClick={() => handleNavigate("/")}
            />
          </div>

          <div className="w-full md:w-1/2 flex h-full">
            <img
              src={SignUpImage}
              alt="SignUp Image"
              className="h-full w-full object-cover max-w-full"
            />
          </div>
          <div className="w-full md:w-1/2 h-full p-4 md:p-10">
            <h1 className="text-[#C0B088] text-3xl font-semibold">Sign Up</h1>
            <p className=" text-sm">Register if you don't have an account</p>
            <div className="mt-3 flex items-center space-x-4">
              <label className="block text-textwhite text-base ">
                Do you have a sponsor ?
              </label>
              <div className="flex items-center">
                <input
                  type="radio"
                  name="hasSponsor"
                  checked={formData.hasSponsor}
                  onChange={handleRadioChange}
                />
                <label className="ml-2 text-textwhite">Yes</label>
                <input
                  type="radio"
                  name="hasSponsor"
                  checked={!formData.hasSponsor}
                  onChange={handleRadioChange}
                  className="ml-4"
                />
                <label className="ml-2 text-textwhite">No</label>
              </div>
            </div>
            {formData.hasSponsor && (
              <div className="w-full flex text-base my-3 space-x-4">
                <div className="w-full">
                  <label className="block text-textwhite">Sponsor ID</label>
                  <input
                    type="text"
                    name="sponsorId"
                    value={formData.sponsorId}
                    onChange={handleChange}
                    className="w-full bg-transparent px-2.5 py-[7px] border rounded-md border-solid border-white mt-1 !ml-0"
                  />
                </div>
                <div className="w-full">
                  <label className="block text-textwhite">Sponsor Name</label>
                  <input
                    type="text"
                    name="sponsorName"
                    value={formData.sponsorName}
                    readOnly
                    className="w-full bg-transparent px-2.5 py-[7px] border rounded-md border-solid border-white mt-1 !ml-0"
                  />
                </div>
              </div>
            )}
            <div className="mt-3 flex items-center space-x-4">
              <label className="block text-textwhite text-base ">
                Position
              </label>
              <div className="flex items-center">
                <input
                  type="radio"
                  checked={paramPosition === "right"}
                  onChange={() =>
                    setSearchParams((prev) => ({
                      ...prev,
                      sponsorId: paramSponsorId,
                      position: "right",
                    }))
                  }
                />
                <label className="ml-2 text-textwhite">Right</label>
                <input
                  type="radio"
                  checked={paramPosition === "left"}
                  onChange={() =>
                    setSearchParams((prev) => ({
                      ...prev,
                      sponsorId: paramSponsorId,
                      position: "left",
                    }))
                  }
                  className="ml-4"
                />
                <label className="ml-2 text-textwhite">Left</label>
              </div>
            </div>
            <div className="w-full flex flex-col lg:flex-row text-base my-3 gap-3">
              <div className="w-full">
                <label className="block text-textwhite">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full bg-transparent px-2.5 py-[7px] border rounded-md border-solid border-white mt-1 !ml-0"
                  onBlur={() => handleBlur("firstName")}
                />
                <ErrorMessage
                  error={errors.firstName}
                  touched={touched.firstName}
                />
              </div>
              <div className="w-full">
                <label className="block text-textwhite">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full bg-transparent px-2.5 py-[7px] border rounded-md border-solid border-white mt-1 !ml-0"
                  onBlur={() => handleBlur("lastName")}
                />
                <ErrorMessage
                  error={errors.lastName}
                  touched={touched.lastName}
                />
              </div>
            </div>
            <div className="w-full flex flex-col lg:flex-row items-center text-base my-3 gap-3">
              <div className="w-full">
                <label className="block text-textwhite mb-1">Country</label>
                <Select
                  options={options}
                  customStyles={customStyles}
                  value={formData.country}
                  onChange={(value) => {
                    setFormData((prev) => ({ ...prev, country: value }));
                  }}
                  onBlur={() => handleBlur("country")}
                />
                <ErrorMessage
                  error={errors.country}
                  touched={touched.country}
                />
              </div>
              <div className="w-full">
                <label className="block text-textwhite">Phone</label>
                <input
                  type="text"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  className="w-full bg-transparent px-2.5 py-[7px] border rounded-md border-solid border-white mt-1 !ml-0"
                  onBlur={() => handleBlur("phoneNumber")}
                />
                {/* <ErrorMessage
                  error={errors.phoneNumber}
                  touched={touched.phoneNumber}
                /> */}
              </div>
            </div>
            <div className="w-full flex flex-col lg:flex-row items-center text-base my-3 gap-3">
              <div className="w-full">
                <label className="block text-textwhite mb-1">Email</label>
                <input
                  type="text"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-transparent px-2.5 py-[7px] border rounded-md border-solid border-white mt-1 !ml-0"
                  onBlur={() => handleBlur("email")}
                />
                <ErrorMessage error={errors.email} touched={touched.email} />
              </div>
              <div className="w-full">
                <label className="block text-textwhite">Confirm Email</label>
                <input
                  type="text"
                  name="confirmEmail"
                  value={formData.confirmEmail}
                  onChange={handleChange}
                  className="w-full bg-transparent px-2.5 py-[7px] border rounded-md border-solid border-white mt-1 !ml-0"
                  onBlur={() => handleBlur("confirmEmail")}
                />
                <ErrorMessage
                  error={errors.confirmEmail}
                  touched={touched.confirmEmail}
                />
              </div>
            </div>
            <div className="w-full flex flex-col lg:flex-row items-center text-base my-3 gap-3">
              <div className="w-full">
                <PasswordInput
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  onBlur={() => handleBlur("password")}
                />
                <ErrorMessage
                  error={errors.password}
                  touched={touched.password}
                />
              </div>

              <div className="w-full">
                <PasswordInput
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  label="Confirm Password"
                  onBlur={() => handleBlur("confirmPassword")}
                />
                <ErrorMessage
                  error={errors.confirmPassword}
                  touched={touched.confirmPassword}
                />
              </div>
            </div>
            {/* <div className="w-full">
              <label className="block text-textwhite">Withdrawal wallet</label>
              <input
                type="text"
                name="withdrawal_wallet"
                value={formData.withdrawal_wallet}
                onChange={handleChange}
                className="w-full bg-transparent px-2.5 py-[7px] border rounded-md border-solid border-white mt-1 !ml-0"
                onBlur={() => handleBlur("withdrawal_wallet")}
              />
              <ErrorMessage
                error={errors.withdrawal_wallet}
                touched={touched.withdrawal_wallet}
              />
            </div> */}
            <div className="flex items-center space-x-3 mt-2">
              <input
                type="checkbox"
                name="acceptTerms"
                checked={!formData.acceptTerms}
                onChange={handleCheckboxChange}
              />
              <p className="text-sm lg:text-white">
                I accept the{" "}
                <span className="text-[#C0B088] underline font-medium">
                  terms and conditions
                </span>
              </p>
            </div>
            <ErrorMessage
              error={errors.acceptTerms}
              touched={touched.acceptTerms}
            />
            <Button
              onClick={handleSubmit}
              loading={loadingStates.isSignUpLoading}
              className="mt-3 !bg-[#B28D5B] hover:!bg-[#c7ad89] disabled:!bg-[#74624a]"
              disabled={isButtonDisabled}
            >
              Sign Up
            </Button>
            <p className="text-center w-full text-white text-sm mt-2">
              Already have an account ?{" "}
              <span
                className="text-[#C0B088] font-medium underline cursor-pointer"
                onClick={() => handleNavigate("/login")}
              >
                Sign In
              </span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
