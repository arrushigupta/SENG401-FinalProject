import { useEffect, useContext } from "react";
import { DINOSPost } from "../scripts/backend-functions";
//import UserContext from "../../context/UserContext";
//import LoadingContext from "../../context/LoadingContext";
import { useNavigate } from "react-router-dom";
export default function VerifyEmail() {
  // const navigate = useNavigate();
  // const { setLoading } = useContext(LoadingContext);
  // const { setUserID } = useContext(UserContext);
  // useEffect(() => {
  //   //  setLoading(false);
  //   DINOSPost("http://localhost:4000/api/verifyEmail");
  // }, []);

  const queryParameters = new URLSearchParams(window.location.search);
  try {
    const username = queryParameters.get("user");
  } catch (error) {}
  return (
    <>
      <div>
        <div className=""> </div>
        <p className="h1">Please Verify Email</p>
      </div>
    </>
  );
}
