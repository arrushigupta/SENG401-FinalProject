import React, { useEffect, useContext, useState } from 'react'
import { DINOSGet, DINOSPost } from '../../scripts/backend-functions'
import LoadingContext from "../../context/LoadingContext";
import FormAction from "../Login/FormAction";
import "../../App.css";
import UploadImage from '../Additional/UploadImage';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



export default function CreateProduct(){

    const { setLoading } = useContext(LoadingContext);
    const [images, setImages] = useState([]);
    const [formValues, setFormValues] = useState({
        userID: JSON.parse(localStorage.getItem("chat-app-user"))._id,
        name: "",
        description: "",
        category: "",
        price: 0,
        images:[], 
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

    const handleInputImages = (event) => {
        let selectedImages = [event.target.files];
        console.log("FileList:");
        console.log(selectedImages);


        setImages([...images, ...selectedImages]);

        let imageArr = [];
        for (let i = 0; i < selectedImages[0].length; i++){
            console.log(selectedImages[0][i]);
            alert("h")

            // Read the file as a data URL
            const reader = new FileReader();

            reader.readAsDataURL(selectedImages[0][i]);

            // When the file is done loading, store the data URL in a variable
            reader.onload = () => {
                const base64Image = reader.result.replace(/^data:image\/(png|jpg|jpeg);base64,/, '');
                // Send the base64 encoded image to the server

                imageArr.push(base64Image);
            };
            
            // console.log(formValues.images);
            console.log(imageArr[i]);
        }

        // imageArr = [{name:"asjhd"}];
        setFormValues({
            ...formValues,
            images: imageArr
        });
        
        // console.log(selectedImages[0]);
        
    }

    // Trying to connect backend to post product
    const handleSubmit = (event) => {

        console.log(formValues);

        // console.log(product);
       
        // // console.log(formValues)
        // console.log(images)
        // // console.log(product);
        
        // console.log(formValues.images);
        
        // console.log(formValues.images);
        const updatedFormValues = {
            name: formValues.name, 
            description: formValues.description, 
            price: formValues.price, 
            date: formValues.date, 
            category: formValues.category,
            userID: formValues.userID,
            images: formValues.images
        }

        // alert(updatedFormValues["images"])
        new Promise(r => setTimeout(r, 20000));
        
        DINOSPost("http://localhost:4000/api/postProduct", setLoading,  updatedFormValues).then((response) => {
            // alert(updatedFormValues["images"][0])
            // alert("Hey")
            setFormValues({
                userID: JSON.parse(localStorage.getItem("chat-app-user"))._id,
                name: "",
                description: "",
                category: "",
                price: 0, 
                images: [], 
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
