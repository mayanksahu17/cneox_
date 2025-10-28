import { useEffect, useState } from "react";
import { Button } from "../components";
import toast from "react-hot-toast";
import authService from "../services/authService";
import { useNavigate, useParams } from "react-router-dom";

export default function VerifyEmail() {
  const [isLoading, setIsLoading] = useState(false);
  const { token } = useParams();
  const handleNavigate = useNavigate();
  useEffect(() => {
    handleVerifyEmail();
  }, []);
  const handleVerifyEmail = async () => {
    console.log("first");
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
        {/*...::: Login Section Start :::... */}
        <section id="login-section">
          {/* Section Spacer */}
          <div className="py-40 pt-36 xl:pb-[200px] xl:pt-[180px]">
            {/* Section Container */}
            <div className="global-container">
              <div className="w-full font-poppins py-20 lg:py-40 min-h-screen">
                <div className="w-full flex flex-col-reverse lg:flex-row items-center mb-24 lg:mb-44 gap-4 text-justify justify-center">
                  <div className="w-full lg:w-1/2 flex flex-col  justify-center px-6">
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
                    <Button
                      className="!py-3 w-1/2"
                      onClick={handleVerifyEmail}
                      loading={isLoading}
                    >
                      Click to Verify
                    </Button>
                  </div>
                </div>
              </div>{" "}
            </div>
            {/* Section Container */}
          </div>
          {/* Section Spacer */}
        </section>
        {/*...::: Login Section End :::... */}
      </main>
    </>
  );
}
