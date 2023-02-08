import React, { useContext } from "react"
import { FormControl, Select, MenuItem, InputLabel } from "@mui/material";
import LoadingContext from "../context/LoadingContext";

export default function LoaderPane(props) {
    const { loading, setLoading } = useContext(LoadingContext);
    return (
        <>
            {loading ?
                <div className="flex w-screen z-[2000] h-screen absolute bg-black opacity-90 text-center items-center justify-center">
                    <img src="/loader.gif" className="w-20" />
                </div> : null

            }
            {props.children}
        </>

    )
}

