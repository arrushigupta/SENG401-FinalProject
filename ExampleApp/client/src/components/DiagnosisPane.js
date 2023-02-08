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
import AddDiagnosis from "./AddDiagnosis";
import moment from "moment";

export default function DiagnosisPane(props) {
    const { healthCareNumber } = props;

    // Bring Loading Context In
    const { setLoading } = useContext(LoadingContext);
    const { userID } = useContext(UserContext);

    // const [prescribeOpen, setPrescribeOpen] = useState(false);
    // const [allMedsOpen, setAllMedsOpen] = useState(false);

    const [patientNotes, setPatientNotes] = useState([]);
    const [addDiagnosisOpen, setAddDiagnosisOpen] = useState(false);



    // END OF STATIC DEMO DATA

    // Set the fields in the form here with the names and default values
    // Dont think I need this

    const [formValues, setFormValues] = useState({
        doctor: "Rodrigo Amesty",
        clinic: "Clinic 1",
        date: "2022-01-01",
        time: "00:00",
    });


    const loadDiagnosis = () => {
        AIRGet("http://localhost:3001/get-patient-diagnosis?healthCareNumber=" + healthCareNumber, setLoading, setPatientNotes);
    }

    useEffect(() => {
        loadDiagnosis();
    }, []);

    return (
        <div className="bg-secondary w-full m-auto mt-4 rounded-xl border-black border p-2">
            <h1 className="text-2xl">Diagnosis</h1><br />
            <table className="w-full ">
                <thead>
                    <tr className="text-white bg-black p-1 pl-2 space-x-1 ">
                        <th>Date Diagnosed</th>
                        <th>Name</th>
                        <th>Comments</th>
                        <th>Doctor</th>
                    </tr>
                </thead>
                <tbody>
                    {patientNotes.map((note, index) => (
                        <tr key={index} className="m-3 bg-white text-center">
                            <td>{moment(note.DateTime).format("YYYY-MM-DD")}</td>
                            <td>{note.Name}</td>
                            <td>{note.Comments}</td>
                            <td>Dr. {note.FirstName} {note.LastName}</td>
                        </tr>

                    ))}
                </tbody>

            </table>
            <div className="mt-5 grid grid-cols-5">
                <div className="grid">
                    {/* <Button variant="contained" color={"primary"} onClick={() => { setAllMedsOpen(true); }} >Med List</Button> */}
                </div>
                <div className="grid"></div>
                <div className="grid"></div>
                <div className="grid"></div>
                <div className="grid">
                    <Button variant="contained" color={"success"} onClick={() => { setAddDiagnosisOpen(true); }} >Add</Button>
                </div>

            </div>
            <AddDiagnosis healthCareNumber={healthCareNumber} addDiagnosisOpen={addDiagnosisOpen} setAddDiagnosisOpen={setAddDiagnosisOpen} loadDiagnosis={loadDiagnosis} />
        </div>
    )
}