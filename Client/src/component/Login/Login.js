import React, { useEffect, useState, useContext } from "react"
import { loginFields } from "../../constants/formField";
import FormAction from "./FormAction";
import FormExtra from "./FormExtra";
import Input from "./Input";
import UserContext from "../../context/UserContext";
import LoadingContext from "../../context/LoadingContext";
import { DINOSPost } from '../../scripts/backend-functions'
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { loginRoute } from '../../utils/Routes';


const fields = loginFields;
let fieldsState = {};
fields.forEach(field => fieldsState[field.id] = '');

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
        setLoginState({ ...loginState, [e.target.id]: e.target.value })
        console.log(loginState)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        authenticateUser();
    }

    const notify = (label) => {
        if (label === "success") {
            toast.success('User Login Succeeded', {
                position: "top-right",
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
            DINOSPost('http://localhost:4000/api/login', setLoading, { email: loginState.email, password: loginState.password }).then(
                (response) => {
                    console.log(response);

                    if (response.status === "success") {

                        setUserName(loginState.username);
                        setLoginState('')
                        setUserID(response._id)
                        localStorage.setItem('chat-app-user', JSON.stringify(response));
                        console.log( JSON.parse(localStorage.getItem("chat-app-user")))
                        console.log(JSON.parse(localStorage.getItem("chat-app-user")).username)
                        console.log(JSON.parse(localStorage.getItem("chat-app-user"))._id)
                        
                        notify("success")
                        setTimeout(() => {
                            console.log("Delayed for 3 second.");
                            navigate("/chat")
                        }, "3000")
                    } else {
                        notify("error")

                    }

                }
            )
        } catch (error) {
            notify('error')
            console.log(error.message)
        }
    }



    return (
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <ToastContainer position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light" />
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