import React, { useEffect, useContext, useState } from "react";
import { DINOSGet, DINOSPost } from "../../scripts/backend-functions";
import LoadingContext from "../../context/LoadingContext";
import FormAction from "../Login/FormAction";
import UploadImage from "../Additional/UploadImage";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { updateInfoRoute } from "../../utils/Routes";

export default function UserProfile() {
  const { setLoading } = useContext(LoadingContext);
  const [images, setImages] = useState([]);

  const [formValues, setFormValues] = useState({
    userID: JSON.parse(localStorage.getItem("chat-app-user"))._id,
    username: JSON.parse(localStorage.getItem("chat-app-user")).username,
    email: JSON.parse(localStorage.getItem("chat-app-user")).email,
    password: JSON.parse(localStorage.getItem("chat-app-user")).password,
    date: new Date(),
  });

  // Updates from values on input change
  const handleInputUpdate = (event) => {
    setFormValues({
      ...formValues,
      [event.target.name]: event.target.value,
    });
    // console.log(formValues)
  };

  // Trying to connect backend to post product
  const handleSubmit = (event) => {
    event.preventDefault();
    const updatedFormValues = {
      username: formValues.username,
      email: formValues.email,
      password: formValues.email,
    };

    // alert(updatedFormValues["images"])
    new Promise((r) => setTimeout(r, 20000));

    DINOSPost(
      updateInfoRoute + JSON.parse(localStorage.getItem("chat-app-user"))._id,
      setLoading,
      updatedFormValues
    ).then((response) => {
      // alert(updatedFormValues["images"][0])
      // alert("Hey")
      setFormValues({
        userID: JSON.parse(localStorage.getItem("chat-app-user"))._id,
        username: response.setUsername,
        email: response.setEmail,
      });
    });
    const item = JSON.parse(localStorage.getItem("chat-app-user"));
    item.username = formValues.username;
    item.email = formValues.email;
    localStorage.setItem("chat-app-user", JSON.stringify(item));
    console.log(JSON.parse(localStorage.getItem("chat-app-user")));
  };

  return (
    <>
      <div className="grid-cols-3 gap-4 flex flex-col justify-center items-center ">
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <h1 className="text-2xl block mb-2 font-bold text-red-700">
            {" "}
            PERSONAL INFO{" "}
          </h1>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block mb-2 font-bold text-gray-700"
            >
              USERNAME
            </label>
            <input
              type="text"
              name="username"
              id="productName"
              className="w-full px-6 py-2 placeholder-gray-400 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="username"
              value={formValues["username"]}
              onChange={handleInputUpdate}
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block mb-2 font-bold text-gray-700"
            >
              EMAIL
            </label>
            <input
              type="text"
              name="email"
              id="productName"
              className="w-full px-6 py-2 placeholder-gray-400 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="email"
              value={formValues["email"]}
              onChange={handleInputUpdate}
              required
            />
          </div>
          <FormAction handleSubmit={handleSubmit} text="Update" />
        </form>
      </div>
    </>
  );
}
