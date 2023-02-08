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
export default function AllMedicationList(props) {

    const { healthCareNumber, setAllMedsOpen, allMedsOpen, loadMedications } = props;
    const { setLoading } = useContext(LoadingContext);
    const [allMedications, setAllMedications] = useState([]);
    const [formValues, setFormValues] = useState({ MedID: '', Brand: '', Delivery: '', Type: '', Description: '' });
    const [editing, setEditing] = useState(null);


    const editHandler = (MedID) => {

        allMedications.forEach((item) => {
            if (item.MedID === MedID) {
                setFormValues({
                    MedID: item.MedID,
                    Brand: item.Brand,
                    Delivery: item.Delivery,
                    Type: item.Type,
                    Description: item.Description
                });
                setEditing(MedID);
                return;
            }
        });

    }
    // Updates from values on input change
    const handleInputUpdate = (event) => {
        setFormValues({
            ...formValues,
            [event.target.name]: event.target.value
        });
    }

    const reloadMedications = () => {
        AIRGet("http://localhost:3001/list-all-medications", setLoading, setAllMedications);
        loadMedications();
    }
    useEffect(() => {
        reloadMedications();
    }, []);

    const addNew = () => {
        setFormValues({ MedID: '0', Brand: '', Delivery: '', Type: '', Description: '' });
        setAllMedications([...allMedications, { MedID: '0', Brand: '', Delivery: '', Type: '', Description: '' }]);
        setEditing(0);
    }
    const handleDelete = (MedId) => {
        if (window.confirm("Are you sure you want to delete this medication?")) {
            AIRPost("http://localhost:3001/delete-medication", setLoading, { MedId }).then((response) => {
                if (response.error){
                    window.alert("Can not delete this medication since it is being used by a patient.");
                }
                reloadMedications();
            });
        }

    }


    useEffect(() => {
        console.log("Meds", allMedications);
    }, [allMedications]);

    const handleSubmit = (event) => {
        for (const [key, value] of Object.entries(formValues)) {
            if (value === "" || value === null) {
                setLoading(false);
                return;
            }
        }
        setEditing(null);
        if (formValues.MedID === "0") {
            console.log(formValues);
            AIRPost("http://localhost:3001/create-medication", setLoading, { ...formValues }).then((response) => {
                reloadMedications();
            });
        } else {
            AIRPost("http://localhost:3001/update-medication", setLoading, { ...formValues }).then((response) => {
                reloadMedications();
            });
        }

    }


    return (
        <Dialog fullWidth={true} onClose={() => { setAllMedsOpen(false); setFormValues({ MedID: '' }); }} open={allMedsOpen} >
            <DialogTitle>Manage Medications Inventory</DialogTitle>
            <div className="grid grid-cols-1 p-5 space-y-2 overflow-scroll">
                {allMedications.map((medication, index) => (
                    <div key={index} className="w-full bg-tertiary border-black border rounded-xl p-4">
                        <div className="grid grid-cols-4">
                            {editing == medication.MedID ?
                                <>
                                    <div className="grid col-span-3">
                                        <Input placeholder={"Brand"} type="text" name="Brand" value={formValues.Brand} onChange={handleInputUpdate} />
                                        <Input placeholder={"Delivery"} type="text" name="Delivery" value={formValues.Delivery} onChange={handleInputUpdate} />
                                        <Input placeholder={"Type"} type="text" name="Type" value={formValues.Type} onChange={handleInputUpdate} />
                                        <Input placeholder={"Description"} type="text" name="Description" value={formValues.Description} onChange={handleInputUpdate} />
                                    </div>

                                    <div className="grid grid-cols-2 space-x-3">
                                        <Button className="grid w-1/5 " variant="contained" color="secondary" onClick={handleSubmit}>Save</Button>
                                    </div>
                                </>
                                : <>
                                    <div className="grid col-span-3">
                                        <p className="grid">{medication.Brand}</p>
                                        <p className="grid">{medication.Delivery}</p>
                                        <p className="grid">{medication.Type}</p>
                                        <p className="grid">{medication.Description}</p>
                                    </div>

                                    <div className="grid grid-cols-2 space-x-3">
                                        <Button className="grid w-1/5 " variant="contained" color="error" onClick={()=>{handleDelete(medication.MedID)}}>X</Button>
                                        <Button className="grid w-1/5 " variant="contained" color="secondary" onClick={() => editHandler(medication.MedID)}>Edit</Button>
                                    </div>
                                </>
                            }


                        </div>
                    </div>
                ))}
                <Button variant="outlined" color="success" onClick={addNew}>Add New</Button>
            </div>


            <Button style={{ marginTop: 20 }} variant="contained" disabled={false} onClick={() => { setAllMedsOpen(false); setFormValues({ MedID: '' }); }} >Close</Button>


        </Dialog>
    )
}
