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

export default function AddNotes(props) {
    const { userID, userType } = useContext(UserContext);

    const { healthCareNumber, setAddNotesOpen, addNotesOpen, loadNotes } = props;
    const { loading, setLoading } = useContext(LoadingContext);
    const [allMedications, setAllMedications] = useState([]);
    const [formValues, setFormValues] = useState({
        ailment: "",
        cure: "",
        duration: "",
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
    }, [addNotesOpen]);

    const handleSubmit = (event) => {
        console.log(formValues);
        AIRPost("http://localhost:3001/create-patient-notes", setLoading, { ...formValues, healthCareNumber, doctorID: userID }).then((response) => {
            setFormValues({
                ailment: "",
                cure: "",
                duration: "",
            });
            loadNotes();
            setAddNotesOpen(false);
        });
    }


    return (
        <Dialog fullWidth={true} onClose={() => { setAddNotesOpen(false); setFormValues({ ailment: "", cure: "", duration: "", }); }} open={addNotesOpen} className="">
            <DialogTitle>Add Notes</DialogTitle>
            <FormGroup className="grid  text-center grid-cols-2 space-x-2 m-5" >


                <FormControl error={formValues.MedID == null || formValues.MedID == ""}>
                    <AIRInput label="Ailment" value={formValues} name="ailment" onChange={handleInputUpdate} /><br />
                    <AIRInput label="Cure" value={formValues} name="cure" onChange={handleInputUpdate} /><br />
                    <AIRInput label="Duration" value={formValues} name="duration" onChange={handleInputUpdate} />
                </FormControl>


                <Button style={{ marginTop: 10 }} variant="contained" disabled={formValues.MedID == ''} onClick={handleSubmit} >Add Notes</Button>
            </FormGroup>

        </Dialog>
    )
}
