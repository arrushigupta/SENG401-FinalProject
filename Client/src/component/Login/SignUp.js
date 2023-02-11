import React, { useEffect, useState, useContext } from "react"
import UserContext from "../../context/UserContext";
import LoadingContext from "../../context/LoadingContext";
import { signupFields } from "../../constants/formField";
import FormAction from "./FormAction";
import Input from "./Input";
import {DINOSPost} from '../../scripts/backend-functions'
import { useNavigate } from "react-router-dom";

const fields = signupFields;
let fieldsState = {};

fields.forEach(field => fieldsState[field.id] = '');

export default function SignUp() {
  const navigate = useNavigate();
  const { setLoading } = useContext(LoadingContext);
  const { setUserID } = useContext(UserContext);

  const [signupState, setSignupState] = useState(fieldsState);

  const handleChange = (e) => {
    setSignupState({ ...signupState, [e.target.id]: e.target.value });
    console.log(signupState)
  }
  

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(signupState)
    createAccount()
  }

  //handle Signup API Integration here
  const createAccount = async () => {
    if (signupState.password !== signupState.confirm_password) {
      window.alert("Password doesn't match with Confirm Password");
      setLoading(false);
      return;
  }
    try {
      DINOSPost('http://localhost:4000/api/register', setLoading, {username: signupState.username, email:signupState.email, password: signupState.password }).then(
        (response) => {
          console.log(response);
        }
      )
    } catch (error) {
      console.log(error.message)
    }
    setUserID(signupState.username);
    setSignupState('')
    navigate("/")
  }

  return (
    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
      <div className="">
        {
          fields.map(field =>
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

          )
        }
        <FormAction handleSubmit={handleSubmit} text="Signup" />
      </div>



    </form>
  )
}