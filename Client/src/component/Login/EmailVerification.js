import UserContext from "../../context/UserContext";
import LoadingContext from "../../context/LoadingContext";
import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { DINOSPatch } from "../../scripts/backend-functions";
export default function EmailVerifcation({ user }) {
  console.log("in component " + user);
  const navigate = useNavigate();
  const { setLoading } = useContext(LoadingContext);
  const { setUserID } = useContext(UserContext);
  useEffect(() => {
    if (user !== "?") {
      console.log("in useEffect: " + user);
      setLoading(false);
      DINOSPatch("http://localhost:4000/api/verifyEmail/" + user, setLoading);

      setTimeout(() => {
        console.log("Delayed for 1 second.");
        navigate("/home");
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
