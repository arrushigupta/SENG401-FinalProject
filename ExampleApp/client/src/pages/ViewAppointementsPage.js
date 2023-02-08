import { Button, FormControl, FormGroup, FormLabel, Input, InputLabel, MenuItem, Select } from "@mui/material"
import React, { useEffect, useState, useContext } from "react"
import AIRInput from "../components/AIRInput";
import AIRSelect from "../components/AIRSelect";
import ViewAppointements from "../components/ViewAppointements";
import LoadingContext from "../context/LoadingContext";
import UserContext from "../context/UserContext";
import { AIRGet, AIRPost } from "../scripts/AIRBackend";

export default function ViewAppointementsPage() {

    // Bring Loading Context In
    const { setLoading } = useContext(LoadingContext);
    const { userID, userType } = useContext(UserContext);

    // THIS IS JUST STATIC DEMO DATA, THIS WILL BE FETCHED FROM THE BACKEND AND REPLACED(line 85/86)
    const [Appointements, setAppointements] = useState([
        {
            doctor: null,
            clinic: null,
            date: null,
            time: null,
            patientID: null,
            id: null,
        }]);

    

    // END OF STATIC DEMO DATA

    // Set the fields in the form here with the names and default values
    // Dont think I need this

    const [formValues, setFormValues] = useState({
        doctor: "Rodrigo Amesty",
        clinic: "Clinic 1",
        date: "2022-01-01",
        time: "00:00",
    });

    // Updates from values on input change
    const handleInputUpdate = (event) => {
        setFormValues({
            ...formValues,
            [event.target.name]: event.target.value
        });
    }

    // SUBMISSION: Check for form errors and submit when button pressed
    const handleSubmit = (event) => {
        setLoading(true);
        // Check if all values are set
        for (const [key, value] of Object.entries(formValues)) {
            if (value === "" || value === null) {
                setLoading(false);
                return;
            }
        }

        // If all values are set, continue submission to backend
        // AIRPost("http://localhost:3001/create-appointement", setLoading, formValues, "/");

    }

    const viewRecord = (id) => {
        //AIRGet("http://localhost:3001/get-user-info?userId=" + id, setLoading, setAppointements);

    }


    // RETRIEVE: Run on page load to load doctor and clinic options
    useEffect(() => {
        console.log("userID: ", userID);
        console.log("userType: ", userType);
        setLoading(true);
        if (userType === "Doctor") {
            AIRGet("http://localhost:3001/get-appointments-by-doctor?userId=" + userID, setLoading, setAppointements);
        } else {
            AIRGet("http://localhost:3001/get-appointments-by-patient?userId=" + userID, setLoading, setAppointements);
        }

    }, []);

    return (
        <div className="bg-secondary w-3/5 m-auto mt-5 p-5 rounded-xl">
            <ViewAppointements/>
        </div>
        
    )
}