import React, { useEffect, useContext, useState } from 'react'
import { DINOSGet, DINOSPost } from '../../scripts/backend-functions'
import LoadingContext from "../../context/LoadingContext";
import FormAction from "../Login/FormAction";
import "../../App.css";
import UploadImage from '../Additional/UploadImage';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function CreateProduct() {

    const { setLoading } = useContext(LoadingContext);

    const [formValues, setFormValues] = useState({
        userID: JSON.parse(localStorage.getItem("chat-app-user"))._id,
        name: "",
        description: "",
        category: "",
        price: 0,
        date: new Date(),
    });

    // Updates from values on input change
    const handleInputUpdate = (event) => {
        console.log(event.target.name);

        setFormValues({
            ...formValues,
            [event.target.name]: event.target.value
        });
    }

    // Trying to connect backend to post product
    const handleSubmit = (event) => {

        console.log(formValues);

        // console.log(product);
        DINOSPost("http://localhost:4000/api/postProduct", setLoading, {
            ...formValues, name: formValues.name,
            description: formValues.description, price: formValues.price, date: formValues.date, userID: formValues.userID
        }).then((response) => {

            setFormValues({
                userID: JSON.parse(localStorage.getItem("chat-app-user"))._id,
                name: "",
                description: "",
                category: "",
                price: 0,
                date: new Date(),
            });
        });
    }

    return (
        <>

            <div className="grid-cols-3 gap-4 flex flex-col justify-center items-center ">
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>

                    <input label="Name" name="name" required onChange={handleInputUpdate} class="bg-gray-50 border border-gray-500 text-gray-900 text-sm rounded-lg text-center" placeholder='Product Name' /><br />
                    <input label="Price" name="price" required type='number' step='any' onChange={handleInputUpdate} class="bg-gray-50 border border-gray-500 text-gray-900 text-sm rounded-lg text-center" placeholder='Price' /><br />
                    <input label="Category" name="category" onChange={handleInputUpdate} class="bg-gray-50 border border-gray-500 text-gray-900 text-sm rounded-lg text-center" placeholder='Category' /><br />
                    <input label="Description" name="description" required onChange={handleInputUpdate} class="bg-gray-50 border border-gray-500 text-gray-900 text-sm rounded-lg text-center" placeholder='Description' /><br />
                    <UploadImage />

                    <FormAction handleSubmit={handleSubmit} text="Submit" />

                </form>
            </div>

        </>

    )

}