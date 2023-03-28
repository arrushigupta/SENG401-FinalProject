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

      <div class="flex items-center justify-center min-h-screen p-5  min-w-screen">  
        <div div class="max-w-xl p-8 text-center text-gray-800 bg-white shadow-xl lg:max-w-3xl rounded-3xl lg:p-12">
          
          <img class="w-16 md:w-32 lg:w-48 flex justify-start" src={img} alt="Image not loading"/> 

          <h3 class="text-2xl">Please Verify Email</h3>
        </div>
      </div>
    );
  } else {
    return (

      <div class="flex items-center justify-center min-h-screen p-5  min-w-screen">  
        <div div class="max-w-xl p-8 text-center text-gray-800 bg-white shadow-xl lg:max-w-3xl rounded-3xl lg:p-12">
          
          <img class="w-16 md:w-32 lg:w-48 flex justify-start" src={img} alt="Image not loading"/> 

          <h3 class="text-2xl">Verifying Email...</h3>
        </div>        
      </div>

    );
  }
}
