import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CgSpinner } from "react-icons/cg";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import authService from "../../services/authService";

const Verify = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { token } = useParams();
  const handleNavigate = useNavigate();
  useEffect(() => {
    handleVerifyEmail();
  }, []);
  const handleVerifyEmail = async () => {
    if (token) {
      try {
        setIsLoading(true);
        const res = await authService.verifyUserEmail({ token });

        if (res.status === 200) {
          handleNavigate("/login");
          toast.success("Email verified successfully !");
        }

        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        toast.error(error?.response?.data?.message || "Something went wrong");
      }
    }
  };
  return (
    <>
      <main className="main-wrapper relative overflow-hidden">
        <section id="login-section">
          {/* Section Spacer */}
          <div className="py-40 pt-36 xl:pb-[200px] xl:pt-[180px]">
            {/* Section Container */}
            <div className="global-container">
              <div className="mx-auto max-w-[910px] text-center">
                <h2 className="mb-[50px]">Verify your account!</h2>
                <div className="flex flex-col justify-center items-center rounded-lg bg-white px-[30px] py-[50px] text-left shadow-[0_4px_60px_0_rgba(0,0,0,0.1)] sm:px-10">
                  <h1 className="text-4xl lg:text-5xl font-medium mb-4 ">
                    Welcome to a <br /> World Where
                    <br /> <span className="text-primary">Dreams</span>{" "}
                    Transform <br />
                    into{" "}
                    <span className="text-primary">
                      Investment <br />
                      Success
                    </span>
                  </h1>
                  <p className="text-base lg:text-xl mb-4">
                    You're just a step away from getting
                    <br /> started! Please click the button below to
                    <br /> confirm your email. In case of issues, copy
                    <br /> and paste the URL into your browser
                  </p>
                  <button
                    type="submit"
                    onClick={handleVerifyEmail}
                    className="button mt-7 block rounded-[50px] border-2 border-black bg-black py-4 text-white after:bg-colorOrangyRed hover:border-colorOrangyRed hover:text-white w-1/2"
                  >
                    Click to Verify
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Verify;
