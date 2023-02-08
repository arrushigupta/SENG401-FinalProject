import { Button, FormControl, FormGroup, FormLabel, Input, InputLabel, MenuItem, Select } from "@mui/material"
import React, { useEffect, useState, useContext } from "react"
import AIRInput from "./AIRInput";
import AIRSelect from "./AIRSelect";
import LoadingContext from "../context/LoadingContext";
import UserContext from "../context/UserContext";
import CurrentPatientContext from "../context/CurrentPatientContext";
import { AIRGet, AIRPost } from "../scripts/AIRBackend";
import { useNavigate } from "react-router-dom";
import moment from "moment";

export default function ViewAppointements() {

    // Bring Loading Context In
    const { setLoading } = useContext(LoadingContext);
    const { userID, userType } = useContext(UserContext);
    const navigate = useNavigate();

    const { setPatientID } = useContext(CurrentPatientContext);
    const { CurrentPatientID } = useContext(CurrentPatientContext);

    // THIS IS JUST STATIC DEMO DATA, THIS WILL BE FETCHED FROM THE BACKEND AND REPLACED(line 85/86)
    const [Appointements, setAppointements] = useState([
        {
            Duration: null,
            PatientID: null,
            DoctorID: null,
            Clinic: null,
            DateTime: null,
            id: null,
        }]);

    useEffect(() => {
        console.log(Appointements);
    }, [Appointements])


    // END OF STATIC DEMO DATA

    // Set the fields in the form here with the names and default values
    // Dont think I need this



    // // SUBMISSION: Check for form errors and submit when button pressed
    // const handleSubmit = (event) => {
    //     setLoading(true);
    //     // Check if all values are set
    //     for (const [key, value] of Object.entries(formValues)) {
    //         if (value === "" || value === null) {
    //             setLoading(false);
    //             return;
    //         }
    //     }

    //     // If all values are set, continue submission to backend
    //     // AIRPost("http://localhost:3001/create-appointement", setLoading, formValues, "/");

    // }

    const viewRecord = (patientId, appointementID) => {

        navigate("/patient-record?healthCareNumber=" + patientId +"&appointmentId="+appointementID);
        //AIRGet("http://localhost:3001/get-user-info?userId=" + id, setLoading, setAppointements);

    }


    // RETRIEVE: Run on page load to load doctor and clinic options
    useEffect(() => {
        setLoading(true);
        if (userType === "Doctor") {
            AIRGet("http://localhost:3001/get-appointments-by-doctor?userId=" + userID, setLoading, setAppointements);
        } else {
            AIRGet("http://localhost:3001/get-appointments-by-patient?userId=" + userID, setLoading, setAppointements);
        }

    }, []);

    return (
        <div className="bg-secondary w-full m-auto rounded-xl">
            <h1 className="text-2xl">View Appointments</h1><br />
            <FormGroup className="space-y-5">

                {/* <AIRInput type="date" label="Date" name="date" value={formValues.date} onChange={handleInputUpdate} />
                <AIRInput type="time" label="Time" name="time" value={formValues.time} onChange={handleInputUpdate} /> */}

                {/* <AIRSelect label="Appointement" name='Appointement' value={formValues} options={Appointements} onChange={handleInputUpdate} /> */}

                <h1 className="text-xl">Upcoming Appointments</h1>

                <table className="border-separate border-spacing-2 border border-slate-400 ...">
                    <thead >
                        <tr>
                            <td >Doctor</td>
                            <td >Clinic</td>
                            <td >Patient</td>
                            <td >Duration</td>
                            <td >Date and Time</td>
                            <td></td>
                        </tr>

                    </thead>
                    <tbody>
                        {Appointements.map((Appointement) => (
                            <tr>
                                <td >Dr. {Appointement.df} {Appointement.dl}</td>
                                <td >{Appointement.Name}</td>
                                <td >{Appointement.FirstName} {Appointement.LastName}</td>
                                <td >{Appointement.Duration}</td>
                                <td >{moment(Appointement.DateTime).format("YYYY-MM-DD @ hh:mm A")}</td>
                                {/* <td><Button onClick={e => viewRecord(Appointement.PatientID, e)}>View</Button></td> */}
                                {userType == "Doctor" ? (<td><Button onClick={e => viewRecord(Appointement.PatientID, Appointement.id, e)}>View</Button></td>) : null}
                            </tr>


                        ))}
                    </tbody>


                </table>
            </FormGroup>




        </div>
    )
}