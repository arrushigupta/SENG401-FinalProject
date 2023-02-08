import { Button, FormControl, FormGroup, FormLabel, Input, InputLabel, MenuItem, Select } from "@mui/material"
import React, { useEffect, useState, useContext } from "react"
import { Link, useNavigate } from 'react-router-dom';
import AIRInput from "../components/AIRInput";
import AIRSelect from "../components/AIRSelect";
import LoadingContext from "../context/LoadingContext";
import { AIRGet, AIRPost } from "../scripts/AIRBackend";
import UserContext from "../context/UserContext";
import { useSearchParams } from "react-router-dom";


export default function QuestionnairePage() {
    // Bring Loading Context In
    const { setLoading } = useContext(LoadingContext);
    const [confirmation, setConfirmation] = useState(false);

    const { userID, userType } = useContext(UserContext);
    const [searchParams, setSearchParams] = useSearchParams();


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


    // END OF STATIC DEMO DATA

    // Set the fields in the form here with the names and default values
    const [formValues, setFormValues] = useState({
        covid: "",
        primaryConcern: "",
        otherNotes: "",
        appointmentID: searchParams.get("appointmentID"),
        patientID: userID
    });

    const covidOptions = [
        { id: 0, name: "No" },
        { id: 1, name: "Yes" },
    ]


    // Updates from values on input change
    const handleInputUpdate = (event) => {
        setFormValues({
            ...formValues,
            [event.target.name]: event.target.value
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
        AIRPost("http://localhost:3001/create-questionnaire", setLoading, formValues, "/")
            .then(
                (response) => {
                    console.log("RES", response);
                    setConfirmation(true);
                }
            )
            .catch((error) => {
                console.log("Err", error);
            })

    }


    return (
        !confirmation ?
            <div className="bg-secondary w-3/5 m-auto mt-5 p-5 rounded-xl">
                <h1 className="text-2xl">Please Fill Intake Form</h1><br />
                <FormGroup className="space-y-5" >
                    <AIRSelect type="covid" label="Have you tested positive for Covid-19 within the last 14 days" name="covid" options={covidOptions} value={formValues} onChange={handleInputUpdate} />

                    <AIRInput type="primaryConcern" label="Please enter your primary concern for today's appointment" name="primaryConcern" value={formValues} onChange={handleInputUpdate} />


                    <AIRInput type="otherNotes" label="Please enter any other notes" name="otherNotes" value={formValues} onChange={handleInputUpdate} />

                    <Button variant="outlined" disabled={false} onClick={handleSubmit}>Submit Form</Button>
                </FormGroup>
            </div>
            : <div className="bg-secondary w-3/5 m-auto mt-5 p-5 rounded-xl text-center">
                <h1 className="text-2xl">Your appointement has been confirmed!</h1>
            </div>
    )
}