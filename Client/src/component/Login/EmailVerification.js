import UserContext from "../../context/UserContext";
import LoadingContext from "../../context/LoadingContext";
import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { DINOSPatch } from "../../scripts/backend-functions";
import { verifyEmailRoute } from "../../utils/Routes";
import img from "../../img/dinosM.png";

export default function EmailVerifcation({ user }) {
  const navigate = useNavigate();
  const { setLoading } = useContext(LoadingContext);
  const { setUserID } = useContext(UserContext);
  useEffect(() => {
    if (user !== "?") {
      setLoading(false);
      DINOSPatch(verifyEmailRoute + user, setLoading);

      setTimeout(() => {
        navigate("/");
      }, "1800");
    }
  }, []);

  if (user === "?") {
    return (
      <div className="flex items-center justify-center min-h-screen p-5  min-w-screen">
        <div className="">
          <img
            className="w-16 md:w-32 lg:w-48 flex justify-start mt-24 "
            src={img}
            alt="Image not loading"
          />
        </div>
        <div class="w-11  overflow-hidden inline-block">
          <div class=" h-16  rotate-45 transform origin-bottom-left" style={{ "background-color": "#2a2d35" }}></div>
        </div>
        <div className="" style={{ "background-color": "#2a2d35", "padding": "0.5rem 0.75rem 0.75rem 0.75rem", "border-radius": "25px" }}>
          <div className=" " >
            <h3 className="text-2xl text-white">
              An email has been sent to your email address.
            </h3>
            <br />
            <h3 className="text-xl text-white">
              Please check your mailbox to verify email!
            </h3>
            <br />
            <h3 className="text-xl text-white">
              Note that ucalgary email verification may take up to two hours.</h3>
            <br />
            <h3 className="text-xl text-white"> Usually the ucalgary address will quarantine this message, please click <a className="text-red-600" href="https://security.microsoft.com/quarantine">here</a> and log in to release the message.
            </h3>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex items-center justify-center min-h-screen p-5  min-w-screen">
        <div className="">
          <img
            className="w-16 md:w-32 lg:w-48 flex justify-start mt-24 "
            src={img}
            alt="Image not loading"
          />
        </div>
       <div className="w-1/2 h-1/2" style={{ "background-color": "#2a2d35", "padding": "0.5rem 0.75rem 0.75rem 0.75rem", "border-radius": "25px" }}>
          <div className=" " >
            <h3 className="text-xl text-white">Verifying email...</h3>
          </div>
        </div>
      </div>
    );
  }
}
