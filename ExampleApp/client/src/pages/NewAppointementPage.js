import { Button, FormControl, FormGroup, FormLabel, Input, InputLabel, MenuItem, Select} from "@mui/material"
import React, { useEffect, useState, useContext } from "react"
import { Link, useNavigate} from 'react-router-dom';
import AIRInput from "../components/AIRInput";
import AIRSelect from "../components/AIRSelect";
import LoadingContext from "../context/LoadingContext";
import { AIRGet, AIRPost } from "../scripts/AIRBackend";
import UserContext from "../context/UserContext";



export default function NewAppointementPage() {
    // Bring Loading Context In
    const { setLoading } = useContext(LoadingContext);

    const { userID, userType } = useContext(UserContext);

    const navigate = useNavigate();

    // THIS IS JUST STATIC DEMO DATA, THIS WILL BE FETCHED FROM THE BACKEND AND REPLACED(line 85/86)
    const [doctors, setDoctors] = useState([
        {
            name: "Dr. John Doe",
            id: 1,
        },
        {
            name: "Dr. Jane Doe",
            id: 2,
        }]);

    const [clinics, setClinics] = useState([]);

    // END OF STATIC DEMO DATA

    // Set the fields in the form here with the names and default values
    const [formValues, setFormValues] = useState({
        doctor: "",
        clinic: "",
        date: "2022-01-01",
        time: "00:00"
    });

    // Updates from values on input change
    const handleInputUpdate = (event) => {
        setFormValues({
            ...formValues,
            [event.target.name]: event.target.value,
            patientID: userID
        });
    }

    // SUBMISSION: Check for form errors and submit when button pressed
    const handleSubmit = (event) => {
        //to navigate to questionaire but not working if put after code
        
        console.log(formValues);
        setLoading(true);
        // Check if all values are set
        for (const [key, value] of Object.entries(formValues)) {
            if (value === "" || value === null) {
                setLoading(false);
                return;
            }
        }
        
        //If all values are set, continue submission to backend
        AIRPost("http://localhost:3001/create-appointement", setLoading, formValues, "/")
            .then(
                (response) => {
                    console.log("RES", response);
                    navigate('/form?appointmentID=' + response.insertId);
                }
            )
            .catch((error) => {
                console.log("Err", error);
            })
            
    }


    // RETRIEVE: Run on page load to load doctor and clinic options
    useEffect(() => {
        setLoading(true);
        AIRGet("http://localhost:3001/list-doctors", setLoading, setDoctors);
        AIRGet("http://localhost:3001/list-clinics", setLoading, setClinics);

    }, []);

    return (
        <div className="bg-secondary w-3/5 m-auto mt-5 p-5 rounded-xl">
            <h1 className="text-2xl">New Appointment</h1><br />
            <FormGroup className="space-y-5">

                <AIRInput type="date" label="Date" name="date" value={formValues} onChange={handleInputUpdate} />
                <AIRInput type="time" label="Time" name="time" value={formValues} onChange={handleInputUpdate} />

                <AIRSelect label="Doctor" name='doctor' value={formValues} options={doctors} onChange={handleInputUpdate} />
                <AIRSelect label="Clinic" name='clinic' value={formValues} options={clinics} onChange={handleInputUpdate} />
                <Button variant="outlined" disabled={false} onClick={handleSubmit} >Create Appointment</Button>
            </FormGroup>




        </div>
    )
}