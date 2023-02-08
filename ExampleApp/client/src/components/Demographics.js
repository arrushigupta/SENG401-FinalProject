import { Button, FormControl, FormGroup, FormLabel, Input, InputLabel, MenuItem, Select } from "@mui/material"
import React, { useEffect, useState, useContext } from "react"
import AIRInput from "./AIRInput";
import AIRSelect from "./AIRSelect";
import LoadingContext from "../context/LoadingContext";
import UserContext from "../context/UserContext";
import { AIRGet, AIRPost } from "../scripts/AIRBackend";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

export default function Demographics(props) {
    const { healthCareNumber } = props;

    // Bring Loading Context In
    const { setLoading } = useContext(LoadingContext);
    const { userID, userType } = useContext(UserContext);
    const { editing, setEditing } = useState(null);


    // THIS IS JUST STATIC DEMO DATA, THIS WILL BE FETCHED FROM THE BACKEND AND REPLACED(line 85/86)
    const [medications, setMedications] = useState([]);


    // END OF STATIC DEMO DATA

    // Set the fields in the form here with the names and default values
    // Dont think I need this

    const [formValues, setFormValues] = useState({
        Email: "",
        Address: "",
        PhoneNumber: "",
        FirstName: "",
        LastName: "",
        PatientRecord: healthCareNumber,
        WorksAt: null,
        UserType: "Patient",

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
        console.log(formValues);
        AIRPost("http://localhost:3001/update-user-info", setLoading, formValues).then((response) => {
            console.log(response);
        });
        loadDemoData();
    }

    const loadDemoData = () => {
        if (healthCareNumber) {
            console.log("Loading Medications");
            AIRGet("http://localhost:3001/get-user-info?userId=" + healthCareNumber, setLoading, setFormValues);
        }
    }

    // RETRIEVE: Run on page load to load doctor and clinic options
    useEffect(() => {
        loadDemoData();

    }, [healthCareNumber]);


    return (
        <div className="bg-secondary w-full m-auto rounded-xl border-black border p-3">
            <h1 className="text-2xl">Demographics</h1><br />
            <FormGroup className="grid text-center grid-cols-2 space-x-2" style={{ display: "inline-block" }}  >

                <AIRInput style={{ width: 250 }} className="grid m-2" type="text" label="Address" name="Address" value={formValues} onChange={handleInputUpdate} />
                <AIRInput style={{ width: 250 }} className="grid m-2" label="Phone Number" name='PhoneNumber' value={formValues} onChange={handleInputUpdate} />
                <AIRInput style={{ width: 250 }} className="grid m-2" label="First Name" name='FirstName' value={formValues} onChange={handleInputUpdate} />
                <AIRInput style={{ width: 250 }} className="grid m-2" label="Last Name" name='LastName' value={formValues} onChange={handleInputUpdate} />

                <Button style={{ marginTop: 10 }} variant="contained" disabled={false} onClick={handleSubmit} >Update</Button>
            </FormGroup>

        </div>
    )
}