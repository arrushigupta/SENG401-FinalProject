import { Button, FormControl, FormGroup, FormLabel, Input, InputLabel, MenuItem, Select } from "@mui/material"
import React, { useEffect, useState, useContext } from "react"
import AIRInput from "../components/AIRInput";
import AIRSelect from "../components/AIRSelect";
import LoadingContext from "../context/LoadingContext";
import { AIRGet, AIRPost } from "../scripts/AIRBackend";
import ViewAppointements from "../components/ViewAppointements";
import Demographics from "../components/Demographics";
import UserContext from "../context/UserContext";


export default function MyHistoryPage() {

    // Bring Loading Context In
    const { setLoading } = useContext(LoadingContext);
    const { userID, userType } = useContext(UserContext);

    // THIS IS JUST STATIC DEMO DATA, THIS WILL BE FETCHED FROM THE BACKEND AND REPLACED(line 85/86)
    const [Medications, setMedications] = useState([
        {
            MedID: "Yes",
            Delivery: "Advil",
            Brand: "Ibroprofen",
            Type: "Pain reliver",
            Description: 1,
        }
    ]);

    // THIS IS JUST STATIC DEMO DATA, THIS WILL BE FETCHED FROM THE BACKEND AND REPLACED(line 85/86)
    const [Notes, setNotes] = useState([
        {
            DateTime: "2022-01-01",
            HealthCareNumber: 1,
            Cure: "Precribed pain reliever",
            Ailment: "Migranes",
            Duration: "1 week",
            DoctorID: "Dr Ideen the big cheese",
        },
    ]);

    const [Diagnosis, setDiagnosis] = useState([
    ]);

    const [Patient, setPatient] = useState({
        Email: "",
        Address: "",
        PhoneNumber: "",
        FirstName: "",
        LastName: "",
        PatientRecord: "",
        WorksAt: null,
        UserType: "Patient",
    });

    // END OF STATIC DEMO DATA



    useEffect(() => {
        console.log(userID);
        AIRGet("http://localhost:3001/get-user-info?userId=" + userID, setLoading, setPatient);

        AIRGet("http://localhost:3001/get-patient-medications?healthCareNumber=" + userID, setLoading, setMedications);
        AIRGet("http://localhost:3001/get-patient-diagnosis?healthCareNumber=" + userID, setLoading, setDiagnosis);

        // For ideen: How do set it up so that we can setPatient values with the response from the first AIRGet
        // Since for some reason it remains null, im thinking it has to do with async features of js
        // This is true, i fixed it by usging the userContext

    }, []);

    return (
        <div className="w-4/5 grid m-auto">
            <div className="grid w-full mt-5">
                <Demographics healthCareNumber={userID} />
            </div>
            <div className="grid grid-cols-2 gap-3 w-full">
                <div className="bg-secondary w-full m-auto mt-5 p-5 rounded-xl grid">
                    <h1 className="text-2xl">View My History</h1><br />
                    <FormGroup className="space-y-5">

                        <h1>Health Care Number: {Patient.PatientRecord}</h1>

                        <h1 className="text-xl">Medications</h1>
                        <table className="border-separate border-spacing-2 border border-slate-400 ...">
                            <tr>
                                <td className=" font-bold">Brand</td>
                                <td className=" font-bold">Delivery</td>
                                <td className=" font-bold">Description</td>
                                <td className=" font-bold">Type</td>
                            </tr>
                            {Medications.map((Medication, key) => {
                                return (
                                    <tr key={key}>
                                        <td>{Medication.Delivery}</td>
                                        <td>{Medication.Brand}</td>
                                        <td>{Medication.Type}</td>
                                        <td>{Medication.Description}</td>
                                    </tr>
                                )
                            })}
                        </table>

                        <h1 className="text-xl">Diagnosis</h1>
                        <table className="border-separate border-spacing-2 border border-slate-400 ...">
                            <tr>
                                <td className=" font-bold">Name</td>
                                <td className=" font-bold">Comments</td>
                                <td className=" font-bold">Doctor</td>
                            </tr>
                            {Diagnosis.map((Diagn, key) => {
                                return (
                                    <tr key={key}>
                                        <td>{Diagn.Name}</td>
                                        <td>{Diagn.Comments}</td>
                                        <td>Dr. {Diagn.FirstName} {Diagn.LastName}</td>

                                    </tr>
                                )
                            })}
                        </table>

                    </FormGroup>

                </div>
                <div className="bg-secondary w-full m-auto mt-5 p-5 rounded-xl  grid">
                    <ViewAppointements />
                </div>
            </div>
        </div>
    )
}