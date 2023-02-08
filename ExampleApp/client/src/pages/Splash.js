import React, { useEffect, useContext, useState } from "react"
import { Button } from "@mui/material"
import UserContext from "../context/UserContext"
import LoadingContext from "../context/LoadingContext"


export default function Splash() {
    const { userID, userType } = useContext(UserContext);
    const { setLoading } = useContext(LoadingContext);



    return (
        <div className="flex h-screen ">

            <div className="m-auto border border-grey p-36 bg-grey rounded-2xl">
                <img src="/logo2.png"/>
                <div className="justify-center items-center">
                    <h1 className="text-white text-2xl mt-4 text-center">
                        Welcome to AIR Medical Center, simplifying the healthcare experience!
                    </h1>
                    <h2 className="text-white mt-4 text-center">Sign in to continue</h2>
                </div>



            </div>

        </div>
    )
}