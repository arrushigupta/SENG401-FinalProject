import { Button, FormControl, FormGroup, FormLabel, Input, InputLabel, MenuItem, Select } from "@mui/material"
import React, { useEffect, useState, useContext } from "react"
import AIRInput from "../components/AIRInput";
import AIRSelect from "../components/AIRSelect";
import LoadingContext from "../context/LoadingContext";
import { AIRGet, AIRPost } from "../scripts/AIRBackend";
import { useSearchParams } from "react-router-dom";
import MedicationsPane from "../components/MedicationsPane";
import NotesPane from "../components/NotesPane";
import Demographics from "../components/Demographics";
import DiagnosisPane from "../components/DiagnosisPane";
import QuestionniarePopUp from "../components/QuestionniarePopUp";


export default function ViewPatientRecordPage() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [questionnaireOpen, setQuestionnaireOpen] = useState(true);
    // Bring Loading Context In
    const { setLoading } = useContext(LoadingContext);
    // need to get patientID from from current patientcontext
    // const { PatientID} = useContext(CurrentPatientContext);
    // const {patientID} = id; 

    return (
        <div className="bg-secondary w-4/5 m-auto mt-5 p-5 rounded-xl">
            <h1 className="text-2xl">View Patient Record</h1>
            <Button variant="contained" className="float-right" onClick={() => setQuestionnaireOpen(true)}>Open Questionnaire</Button><br />
            <h1 className="text-2xl">Health Care #: {searchParams.get("healthCareNumber")}</h1><br />

            <div className="grid grid-cols-1">
                <Demographics healthCareNumber={searchParams.get("healthCareNumber")} />
            </div>

            <div className="grid grid-cols-2 space-x-2">
                <MedicationsPane healthCareNumber={searchParams.get("healthCareNumber")} />
                <NotesPane healthCareNumber={searchParams.get("healthCareNumber")} />
            </div>
            <div>
                <DiagnosisPane healthCareNumber={searchParams.get("healthCareNumber")} />
            </div>
            <QuestionniarePopUp appointementID={searchParams.get("appointmentId")} questionnaireOpen={questionnaireOpen} setQuestionnaireOpen={setQuestionnaireOpen} />


        </div>
    )
}