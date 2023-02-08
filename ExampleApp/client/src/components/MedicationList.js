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
export default function MedicationList(props) {

    const { healthCareNumber, setPrescribeOpen, prescribeOpen, loadMedications } = props;
    const { loading, setLoading } = useContext(LoadingContext);
    const [allMedications, setAllMedications] = useState([]);
    const [formValues, setFormValues] = useState({ MedID: '' });

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
    }, [prescribeOpen]);

    const handleSubmit = (event) => {
        console.log(formValues);
        AIRPost("http://localhost:3001/create-patient-medication", setLoading, { ...formValues, healthCareNumber }).then((response) => {
            setFormValues({ MedID: '' });
            loadMedications();
            setPrescribeOpen(false);
        });
    }


    return (
        <Dialog fullWidth={true} onClose={() => { setPrescribeOpen(false); setFormValues({ MedID: '' }); }} open={prescribeOpen} className="">
            <DialogTitle>Prescribe</DialogTitle>
            <FormGroup className="grid  text-center grid-cols-2 space-x-2 m-5" >


                <FormControl error={formValues.MedID == null || formValues.MedID == ""}>
                    <InputLabel>Medication:</InputLabel>
                    <Select label="Medication" name="MedID" value={formValues.MedID} onChange={handleInputUpdate} >
                        {allMedications.map((item) => (
                            <MenuItem key={item.MedID} value={item.MedID}>{item.Brand}</MenuItem>
                        ))}

                    </Select>
                </FormControl>


                <Button style={{ marginTop: 10 }} variant="contained" disabled={formValues.MedID == ''} onClick={handleSubmit} >Add Prescription</Button>
            </FormGroup>

        </Dialog>
    )
}
