import React, { createContext } from "react"


const UserContext = createContext(
    {
        userID: null,
        setUserID: (status) => { },
    });

export default UserContext;