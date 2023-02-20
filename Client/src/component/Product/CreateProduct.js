import React, { useEffect, useContext, useState } from 'react'
import { DINOSGet, DINOSPost } from '../../scripts/backend-functions'
import LoadingContext from "../../context/LoadingContext";
import FormAction from "../Login/FormAction";
import "../../App.css";


export default function CreateProduct(){

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
        console.log(event.target.name)
        setFormValues({
            ...formValues,
            [event.target.name]: event.target.value
        });
    }

    // Trying to connect backend to post product
    const handleSubmit = (event) => {

        console.log(formValues)

        // console.log(product);
        DINOSPost("http://localhost:4000/api/postProduct", setLoading, { ...formValues, name: formValues.name, 
            description: formValues.description, price: formValues.price, date: formValues.date, userID: formValues.userID}).then((response) => {

            setFormValues({
                userID: JSON.parse(localStorage.getItem("chat-app-user"))._id,
                name: "",
                description: "",
                category: "",
                price: 0,
                date: new Date(),
            });
            // loadNotes();
            // setAddNotesOpen(false);
        });
    }



    return(
        <>

        <div class="grid grid-cols-3 gap-4">

            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>

            <input label="Name" name="name" onChange={handleInputUpdate} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg" placeholder='Product Name'/><br />
            <input label="Price" name="price" onChange={handleInputUpdate} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg" placeholder='Price'/><br />
            <input label="Category" name="category" onChange={handleInputUpdate} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg " placeholder='Category'/><br />
            <input label="Description" name="description" onChange={handleInputUpdate} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg" placeholder='Description'/><br />
            
            
            <FormAction handleSubmit={handleSubmit} text="Submit" />

            </form>
        </div>

        </>

    )

}