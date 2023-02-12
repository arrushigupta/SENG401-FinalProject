import React, { useEffect, useState, useContext } from "react"
import { loginFields } from "../../constants/formField";
import FormAction from "./FormAction";
import FormExtra from "./FormExtra";
import Input from "./Input";
import UserContext from "../context/UserContext";
import LoadingContext from "../context/LoadingContext";
import { useNavigate } from "react-router-dom";
import { DINOSGet } from '../../scripts/backend-functions'
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const fields = loginFields;
let fieldsState = {};
fields.forEach(field => fieldsState[field.id] = '');

export default function Login() {
    const navigate = useNavigate();
    const { setLoading } = useContext(LoadingContext);
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [invalid, setInvalid] = useState(false);
    const [loginState, setLoginState] = useState(fieldsState);


    const handleChange = (e) => {
        setLoginState({ ...loginState, [e.target.id]: e.target.value })
        console.log(loginState)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        authenticateUser();
    }

    //Handle Login API Integration here
    const authenticateUser = async () => {
        try {
            DINOSGet("http://localhost:4000/api/getOne/:id", setLoading, { username: signupState.username, email: signupState.email, password: signupState.password }, "/").then(
                // (response) => {
                //     if (response.length == 1) {
                //         console.log(response[0]);
                //         localStorage.setItem("session", JSON.stringify({ userID: response[0].Email, userType: response[0].UserType }));
                //         setUserID(response[0].Email);
                //         setUserType(response[0].UserType);
                //         // console.log("Cheese: " + userID);
                //         navigate("/")
                //     } else {
                //         setInvalid(true);
                //         console.log("User not found");
                //     }
                // }
            );
        } catch (error) {
            console.log(error.message);
        }
    }



    return (
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="-space-y-px">
                {
                    fields.map(field =>
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

                    )
                }
            </div>

            <FormExtra />
            <FormAction handleSubmit={handleSubmit} text="Login" />

        </form>
    )
}