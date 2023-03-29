import React, { useState, useContext } from "react";
import { loginFields } from "../../constants/formField";
import FormAction from "./FormAction";
import FormExtra from "./FormExtra";
import Input from "./Input";
import UserContext from "../../context/UserContext";
import LoadingContext from "../../context/LoadingContext";
import { DINOSPost } from "../../scripts/backend-functions";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { loginRoute } from "../../utils/Routes";

const fields = loginFields;
let fieldsState = {};
fields.forEach((field) => (fieldsState[field.id] = ""));

export default function Login() {
  const navigate = useNavigate();
  const { setLoading } = useContext(LoadingContext);
  const { setUserID } = useContext(UserContext);

  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [invalid, setInvalid] = useState(false);
  const [loginState, setLoginState] = useState(fieldsState);

  // useEffect(() => {
  //     if (localStorage.getItem("chat-app-user")) {
  //         navigate("/chat");
  //     }
  // }, []);

  const handleChange = (e) => {
    setLoginState({ ...loginState, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    authenticateUser();
  };

  const notify = (label) => {
    if (label === "success") {
      toast.success("User Login Succeeded", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
    if (label === "error") {
      toast.error("Password doesn't match", {
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
  //Handle Login API Integration here
  const authenticateUser = async () => {
    try {
      DINOSPost(loginRoute, setLoading, {
        email: loginState.email,
        password: loginState.password,
      }).then((response) => {
        if (response.status === "success") {
          setUserName(loginState.username);
          setLoginState("");
          setUserID(response._id);
          localStorage.setItem("chat-app-user", JSON.stringify(response));

          notify("success");
          if (response.emailVerified) {
            setTimeout(() => {
              navigate("/home");
            }, "1800");
          } else {
            setTimeout(() => {
              navigate("/verifyEmail?user=?");
            }, "1800");
          }
        } else {
          notify("error");
        }
      });
    } catch (error) {
      notify("error");
    }
  };

  return (
    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
      <ToastContainer
        position="top-center"
        autoClose={1800}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="-space-y-px">
        {fields.map((field) => (
          <Input
            key={field.id}
            handleChange={handleChange}
            value={loginState[field.id]}
            labelText={field.labelText}
            labelFor={field.labelFor}
            id={field.id}
            name={field.name}
            type={field.type}
            isRequired={field.isRequired}
            placeholder={field.placeholder}
          />
        ))}
      </div>

      <FormExtra />
      <FormAction handleSubmit={handleSubmit} text="Login" />
    </form>
  );
}
