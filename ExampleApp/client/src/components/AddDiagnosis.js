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

export default function AddDiagnosis(props) {
    const { userID, userType } = useContext(UserContext);

    const { healthCareNumber, setAddDiagnosisOpen, addDiagnosisOpen, loadDiagnosis } = props;
    const { loading, setLoading } = useContext(LoadingContext);
    const [allMedications, setAllMedications] = useState([]);
    const [formValues, setFormValues] = useState({
        name: "",
        comments: "",
    });

    // Updates from values on input change
    const handleInputUpdate = (event) => {
        setFormValues({
            ...formValues,
            [event.target.name]: event.target.value
        });
    }

    useEffect(() => {
        AIRGet("http://localhost:3001/list-all-medications", setLoading, setAllMedications);
        setLoading(false);
    }, [addDiagnosisOpen]);

    const handleSubmit = (event) => {
        console.log(formValues);
        AIRPost("http://localhost:3001/create-patient-diagnosis", setLoading, { ...formValues, healthCareNumber, doctorID: userID }).then((response) => {
            setFormValues({
                name: "",
                comments: "",
            });
            loadDiagnosis();
            setAddDiagnosisOpen(false);
        });
    }


    return (
        <Dialog fullWidth={true} onClose={() => { setAddDiagnosisOpen(false); setFormValues({ name: "", comments: "", }); }} open={addDiagnosisOpen} className="">
            <DialogTitle>Add Diagnosis</DialogTitle>
            <FormGroup className="grid  text-center grid-cols-2 space-x-2 m-5" >


                <FormControl error={formValues.MedID == null || formValues.MedID == ""}>
                    <AIRInput label="Name" value={formValues} name="name" onChange={handleInputUpdate} /><br />
                    <AIRInput label="Comments" value={formValues} name="comments" onChange={handleInputUpdate} />
                </FormControl>


                <Button style={{ marginTop: 10 }} variant="contained" disabled={formValues.MedID == ''} onClick={handleSubmit} >Add Notes</Button>
            </FormGroup>

        </Dialog>
    )
}
