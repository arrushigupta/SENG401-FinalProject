import React, { createContext } from "react"


const UserContext = createContext(
    {
        userID: null,
        setUserID: (status) => { },
        userType: null,
        setUserType: (status) => { }
    });

export default UserContext;