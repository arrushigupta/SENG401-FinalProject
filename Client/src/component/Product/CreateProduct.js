import React, { useEffect, useContext, useState } from 'react'
import { DINOSGet, DINOSPost } from '../../scripts/backend-functions'
import LoadingContext from "../../context/LoadingContext";
import Input from "../Login/Input";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css'
import FormAction from "../Login/FormAction";
import "../../App.css";

// import DatePicker from "../Additional/DatePicker"

export default function CreateProduct(){

    const { setLoading } = useContext(LoadingContext);
    const [selectedDate, setSelectedDate] = useState(null);

    const [formValues, setFormValues] = useState({
        name: "",
        description: "",
        price: 0,
        date: Date,
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
            description: formValues.description, price: formValues.price}).then((response) => {

            setFormValues({
                name: "",
                description: "",
                price: 0,
                image: null,
            });
            // loadNotes();
            // setAddNotesOpen(false);
        });
    }



    return(
        <>

        <div class="grid grid-cols-3 gap-4">

            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>

            <input label="Name" name="name" onChange={handleInputUpdate} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder='Product Name'/><br />
            <input label="Description" name="description" onChange={handleInputUpdate} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder='Description'/><br />
            <input label="Price" name="price" onChange={handleInputUpdate} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder='Price'/><br />

            <div className='App'>

            <DatePicker
                selected={selectedDate}
                onChange={date => setSelectedDate(date)}
                
                placeholderText={'dd/mm/yyyy'}
                filterDate={date => date.getDay() !== 6 && date.getDay() !== 0} // weekends cancel
                showYearDropdown // year show and scrolldown alos
                scrollableYearDropdown
                />
            </div>
            
            <FormAction handleSubmit={handleSubmit} text="Submit" />

            </form>
        </div>

        </>

    )

}