// Used From https://dev.to/olumidesamuel_/implementing-protected-route-and-authentication-in-react-js-3cl4

import React from "react";
import { Navigate } from "react-router-dom";


export default function ProtectedRoute({ children }) {

    
    return (
        localStorage.getItem("chat-app-user") !== null ? children : <Navigate to="/" />
    );
}