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
            className="w-16 md:w-32 lg:w-48 flex justify-start "
            src={img}
            alt="Image not loading"
          />
        </div>
        <div className=" chat chat-start" style={{"margin-bottom": "15rem  ", "background-color": "#2a2d35"}}>
          <div className="chat-bubble " style={{"background-color": "#2a2d35"}}>
            <h3 className="text-2xl">
              An email has been sent to your email address.
            </h3>
            <br />
            <h3 className="text-xl">
              Please check your mailbox to verify email!
            </h3>
            <br />
            <h3 className="text-xl">
              Note that ucalgary email verification may take up to two hours.
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
            className="w-16 md:w-32 lg:w-48 flex justify-start "
            src={img}
            alt="Image not loading"
          />
        </div>
        <div className=" chat chat-start" style={{"margin-bottom": "15rem  ", "background-color": "#2a2d35"}}>
          <div className="chat-bubble " style={{"background-color": "#2a2d35"}}>
            <h3 className="text-2xl">
              Verifying email...
            </h3>
          </div>
        </div>
      </div>
    );
  }
}
