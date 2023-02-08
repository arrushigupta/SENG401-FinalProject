import React from "react"
import { FormControl, Input, InputLabel } from "@mui/material";

export default function AIRInput(props) {
    const { label, name, value, onChange, type, placeholder, style } = props;
    return (
        <FormControl error={value[name] == null || value[name] == ""}>
            <InputLabel>{label}:</InputLabel>
            <Input style={style} placeholder={label} type={type} name={name} value={value[name]} onChange={onChange}/>

        </FormControl>
    )
}