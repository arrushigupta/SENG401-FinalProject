import React, { useEffect, useContext, useState } from 'react'
import { DINOSGet, DINOSPost } from '../../scripts/backend-functions'
import LoadingContext from "../../context/LoadingContext";
import FormAction from "../Login/FormAction";
import "../../App.css";
import UploadImage from '../Additional/UploadImage';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



export default function CreateProduct({ closeModal, updateProductState}){

    const { setLoading } = useContext(LoadingContext);
    const [images, setImages] = useState([]);
    const [formValues, setFormValues] = useState({
        userID: JSON.parse(localStorage.getItem("chat-app-user"))._id,
        name: "",
        description: "",
        category: "Furniture",
        price: 0,
        images:[], 
        date: new Date(),
    });

    // Updates from values on input change
    const handleInputUpdate = (event) => {
        console.log(">>>" + event.target.name);

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
        event.preventDefault();

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
                category: "Furniture",
                price: 0, 
                images: [], 
                date: new Date(),
            });
            updateProductState();
        });
        closeModal();
    }

    return (
        <>

            <div className="grid-cols-3 gap-4 flex flex-col justify-center items-center ">
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <h1 className="text-2xl block mb-2 font-bold text-red-700"> Create New Product: </h1>
                    <div className="mb-4">
                        <label htmlFor="productName" className="block mb-2 font-bold text-gray-700">Product Name</label>
                        <input type="text" name="name" id="productName" className="w-full px-3 py-2 placeholder-gray-400 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="Enter product name" value={formValues["name"]} onChange={handleInputUpdate} required />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="price" className="block mb-2 font-bold text-gray-700">Price</label>
                        <input type="number" name="price" id="price" className="w-full px-3 py-2 placeholder-gray-400 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="Enter price" value={formValues["price"]} onChange={handleInputUpdate} required step='any'/>
                    </div>
                    <label>
                        Category
                        <select
                            value={formValues["category"]}
                            onChange={handleInputUpdate}
                            name="category"
                            id="category"
                            className="form-select block w-full mt-1 border rounded">
                            <option value="Furniture">Furniture</option>
                            <option value="Textbooks">Textbooks</option>
                            <option value="Clothing">Clothing</option>
                            <option value="Entertainment">Entertainment</option>
                            <option value="Vehicles">Vehicles</option>
                            <option value="Services">Services</option>
                            <option value="Electronics">Electronics</option>
                            <option value="Events">Events</option>
                            <option value="Other">Other</option>
                        </select>
                    </label>
                    <div className="mb-4">
                        <label htmlFor="description" className="block mb-2 font-bold text-gray-700">Description</label>
                        <textarea name="description" id="description" className="w-full px-3 py-2 placeholder-gray-400 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="Enter description" value={formValues["description"]} onChange={handleInputUpdate} required />
                    </div>
                    <UploadImage inputChange = {handleInputImages}/>

                    <FormAction handleSubmit={handleSubmit} text="Submit" />

                </form>
            </div>

        </>

    )

}
