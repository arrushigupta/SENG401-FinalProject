import { Button, Dialog, FormControl, FormGroup, FormLabel, Input, InputLabel, MenuItem, Select } from "@mui/material"
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
import DialogTitle from '@mui/material/DialogTitle';
import MedicationList from "./MedicationList";
import AllMedicationList from "./AllMedicationList";

export default function MedicationsPane(props) {
    const { healthCareNumber } = props;

    // Bring Loading Context In
    const { setLoading } = useContext(LoadingContext);
    const { userID } = useContext(UserContext);

    const [prescribeOpen, setPrescribeOpen] = useState(false);
    const [allMedsOpen, setAllMedsOpen] = useState(false);

    const [patientMedications, setPatientMedications] = useState([]);



    // END OF STATIC DEMO DATA

    // Set the fields in the form here with the names and default values
    // Dont think I need this

    const [formValues, setFormValues] = useState({
        doctor: "Rodrigo Amesty",
        clinic: "Clinic 1",
        date: "2022-01-01",
        time: "00:00",
    });


    const deleteMedication = (MedId) => {
        if (window.confirm("Are you sure you want to delete this medication?")) {
            AIRPost("http://localhost:3001/delete-patient-medication", setLoading, { MedId, healthCareNumber }).then((response) => {
                AIRGet("http://localhost:3001/get-patient-medications?healthCareNumber=" + healthCareNumber, setLoading, setPatientMedications);
            });
        }

    }

    const loadMedications = () => {
        AIRGet("http://localhost:3001/get-patient-medications?healthCareNumber=" + healthCareNumber, setLoading, setPatientMedications);
    }

    // RETRIEVE: Run on page load to load doctor and clinic options
    useEffect(() => {
        loadMedications();

    }, []);

    return (
        <div className="bg-secondary w-full m-auto mt-4 rounded-xl border-black border p-2">
            <h1 className="text-2xl">Medications</h1><br />
            <table className="w-full ">
                <thead>
                    <tr className="text-white bg-black p-1 pl-2 space-x-1 ">
                        <th>Brand</th>
                        <th>Type</th>
                        <th>Description</th>
                        <th>Delivery</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {patientMedications.map((medication) => (
                        <tr key={medication.MedID} className="m-3 bg-white text-center">
                            <td>{medication.Brand}</td>
                            <td>{medication.Type}</td>
                            <td>{medication.Description}</td>
                            <td>{medication.Delivery}</td>
                            <td><Button variant="contained" color={"error"} onClick={() => deleteMedication(medication.MedID)}>X</Button></td>
                        </tr>

                    ))}
                </tbody>

            </table>
            <div className="mt-5 grid grid-cols-5">
                <div className="grid">
                    <Button variant="contained" color={"primary"} onClick={() => { setAllMedsOpen(true); }} >Med List</Button>
                </div>
                <div className="grid"></div>
                <div className="grid"></div>
                <div className="grid"></div>
                <div className="grid">
                    <Button variant="contained" color={"success"} onClick={() => { setPrescribeOpen(true); }} >Add</Button>
                </div>

            </div>
            <MedicationList healthCareNumber={healthCareNumber} prescribeOpen={prescribeOpen} setPrescribeOpen={setPrescribeOpen} loadMedications={loadMedications} />
            <AllMedicationList allMedsOpen={allMedsOpen} setAllMedsOpen={setAllMedsOpen} loadMedications={loadMedications} />
        </div>
    )
}