import React, { useEffect, useState, useContext } from "react";
import UserContext from "../../context/UserContext";
import LoadingContext from "../../context/LoadingContext";
import { signupFields } from "../../constants/formField";
import FormAction from "./FormAction";
import Input from "./Input";
import { DINOSPost } from "../../scripts/backend-functions";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { registerRoute } from "../../utils/Routes";

const fields = signupFields;
let fieldsState = {};

fields.forEach((field) => (fieldsState[field.id] = ""));

export default function SignUp() {
  const navigate = useNavigate();
  const { setLoading } = useContext(LoadingContext);
  const { setUserID } = useContext(UserContext);

  const [signupState, setSignupState] = useState(fieldsState);

  const handleChange = (e) => {
    setSignupState({ ...signupState, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // this wont refresh the page

    createAccount();
  };

  const notify = (label, error) => {
    if (label === "success") {
      toast.success("User Registered", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
    if (label === "error") {
      toast.error(error, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  //handle Signup API Integration here
  const createAccount = async () => {
    if (signupState.password !== signupState.confirm_password) {
      notify("error");
      // window.alert("Password doesn't match with Confirm Password");
      setLoading(false);
      return;
    }
    try {
      DINOSPost(registerRoute, setLoading, {
        username: signupState.username,
        email: signupState.email,
        password: signupState.password,
      }).then((response) => {
        if (response.status === "success") {
          setUserID(signupState.username);
          setSignupState("");
          notify("success");
          setTimeout(() => {
            navigate("/");
          }, "3000");
        } else {
          notify("error", response.message);
        }
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
      <div className="">
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        {fields.map((field) => (
          <Input
            key={field.id}
            handleChange={handleChange}
            value={signupState[field.id]}
            labelText={field.labelText}
            labelFor={field.labelFor}
            id={field.id}
            name={field.name}
            type={field.type}
            isRequired={field.isRequired}
            placeholder={field.placeholder}
          />
        ))}
        <FormAction handleSubmit={handleSubmit} text="Signup" />
      </div>
    </form>
  );
}
