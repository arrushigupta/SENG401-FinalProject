import React, { createContext } from "react"


const UserContext = createContext(
    {
        userID: "",
        setUserID: (status) => { 
            // userID = status;
        },
    });

export default UserContext;