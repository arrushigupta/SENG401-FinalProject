import React from "react"
import { FormControl, Select, MenuItem, InputLabel } from "@mui/material";

export default function AIRSelect(props) {
    const { label, name, value, options, onChange } = props;
    return (
        <FormControl error={value[name] == null || value[name] == ""}>
            <InputLabel>{label}:</InputLabel>
            <Select label={label} name={name} value={value[name]} onChange={onChange} >
                {options.map((doctor) => (
                    <MenuItem key={doctor.id} value={doctor.id}>{doctor.name}</MenuItem>
                ))}

            </Select>
        </FormControl>
    )
}

