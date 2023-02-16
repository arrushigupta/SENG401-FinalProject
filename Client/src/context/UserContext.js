import React, { createContext } from "react"


const UserContext = createContext(
    {
        userID: "",
        setUserID: (status) => { },
    });

export default UserContext;