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
        setFormValues({
            ...formValues,
            [event.target.name]: event.target.value
        });
    }

    // Trying to connect backend to post product
    const handleSubmit = (event) => {
        event.preventDefault();

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
                    <h1 className="text-2xl block mb-2 font-bold text-red-700"> Create New Product: </h1>
                    <div className="mb-4">
                        <label htmlFor="productName" className="block mb-2 font-bold text-gray-700">Product Name</label>
                        <input type="text" name="name" id="productName" className="w-full px-3 py-2 placeholder-gray-400 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="Enter product name" value={formValues["name"]} onChange={handleInputUpdate} required />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="price" className="block mb-2 font-bold text-gray-700">Price</label>
                        <input type="number" name="price" id="price" className="w-full px-3 py-2 placeholder-gray-400 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="Enter price" value={formValues["price"]} onChange={handleInputUpdate} required step='any'/>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="category" className="block mb-2 font-bold text-gray-700">Category</label>
                        <input type="text" name="category" id="category" className="w-full px-3 py-2 placeholder-gray-400 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="Enter category" value={formValues["category"]} onChange={handleInputUpdate} required />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="description" className="block mb-2 font-bold text-gray-700">Description</label>
                        <textarea name="description" id="description" className="w-full px-3 py-2 placeholder-gray-400 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="Enter description" value={formValues["description"]} onChange={handleInputUpdate} required />
                    </div>
                    <UploadImage />

                    <FormAction handleSubmit={handleSubmit} text="Submit" />

                </form>
            </div>

        </>

    )

}