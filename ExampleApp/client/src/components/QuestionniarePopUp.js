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

export default function QuestionniarePopUp(props) {
    const { userID, userType } = useContext(UserContext);

    const { appointementID, setQuestionnaireOpen, questionnaireOpen } = props;
    const { loading, setLoading } = useContext(LoadingContext);
    const [questionnaireFields, setQuestionnaireFields] = useState([{ PrimaryConcern: "", OtherConcern: "", Covid: "" }]);


    useEffect(() => {
        AIRGet("http://localhost:3001/get-questionnaire?appointmentId=" + appointementID, setLoading, setQuestionnaireFields);
    }, [appointementID]);




    return (
        <>
            {questionnaireFields[0] &&
                <Dialog fullWidth={true} onClose={() => { setQuestionnaireOpen(false); }} open={questionnaireOpen} >
                    <DialogTitle>Questionnaire</DialogTitle>

                    <div className="p-5">
                        <FormLabel component="legend">Primary Concern: {questionnaireFields[0].PrimaryConcern}</FormLabel>
                        <FormLabel component="legend">Other Concern: {questionnaireFields[0].OtherNotes}</FormLabel>
                        <FormLabel component="legend">Covid?: {questionnaireFields[0].Covid}</FormLabel>
                        <Button variant='contained' onClick={() => { setQuestionnaireOpen(false); }}>Close</Button>
                    </div>



                </Dialog>}

        </>

    )
}
