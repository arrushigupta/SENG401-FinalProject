import UserContext from "../../context/UserContext";
import LoadingContext from "../../context/LoadingContext";
import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { DINOSPatch } from "../../scripts/backend-functions";
import { verifyEmailRoute } from "../../utils/Routes";

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
      <div>
        <h1>Please Verify Email</h1>
      </div>
    );
  } else {
    return (
      <div>
        <h1>Verifying Email...</h1>
      </div>
    );
  }
}
