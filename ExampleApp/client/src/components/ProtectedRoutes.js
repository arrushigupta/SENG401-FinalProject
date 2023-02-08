// Used From https://dev.to/olumidesamuel_/implementing-protected-route-and-authentication-in-react-js-3cl4

import React, { useContext, Component } from "react";
import { Navigate, Route } from "react-router-dom";
import UserContext from "../context/UserContext";


export default function ProtectedRoute({children}) {
  const {userType, userID} = useContext(UserContext);

  return (
    userType != null ? children : <Navigate to="/splash" />
  );
}
