import React, { useEffect, useState, useContext } from "react"



export function DINOSGet(url, setLoading, setData) {
    setLoading(true);
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    };

    fetch(url, requestOptions)
        .then(response => response.json()
            .then(data => {
                console.log(data);
                setLoading(false);
                setData(data);
                return;
            })
            .catch(error => {
                console.error(error);
                setLoading(false);
            })

        ).catch(error => {
            console.error(error);
            setLoading(false);
        })

}

export async function DINOSPost(url, setLoading, formValues, redirect) {
    setLoading(true);
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formValues)
    };

    return await fetch(url, requestOptions)
        .then(response => {
            //console.log(response.json());
            setLoading(false);
            //window.location.href = redirect;
            return response.json();

        })
        .catch(error => {
            console.error(error);
            setLoading(false);
            return error;
        })

}