import React, { useEffect, useContext, useState  } from "react"
import { Button } from "@mui/material"
import UserContext from "../context/UserContext"
import LoadingContext from "../context/LoadingContext"
import { AIRGet } from "../scripts/AIRBackend";


export default function Home() {
    const { userID, userType } = useContext(UserContext);
    const [user, setUser] = useState([{FirstName: null}]);
    const {setLoading} = useContext(LoadingContext);

    useEffect(() => {
        AIRGet("http://localhost:3001/get-user-info?userId=" + userID, setLoading, setUser);
    }, []);

    return  (
        <div className="flex justify-center items-center">
            <h1 className="text-xl">Welcome {user.FirstName}, to Medical Center's scheduling and patient history!</h1>
        </div>
    )
}