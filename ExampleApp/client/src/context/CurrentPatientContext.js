import React, { createContext } from "react"


const CurrentPatientContext = createContext(
    {
        CurrentPatientID: null,
        setPatientID: (status) => {},
    });

export default CurrentPatientContext;