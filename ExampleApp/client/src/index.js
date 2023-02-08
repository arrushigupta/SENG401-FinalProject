import React, { useEffect, useState } from "react"
import { createRoot } from 'react-dom/client';
import Header from "./components/Header"
import Footer from "./components/Footer"
import Home from "./pages/Home"
import Splash from "./pages/Splash"
import styles from "./style.css"
import LoadingContext from "./context/LoadingContext";

import { Routes, Route, BrowserRouter, Router, Navigate } from 'react-router-dom';
import MyHistoryPage from "./pages/MyHistoryPage"
import ViewAppointementsPage from "./pages/ViewAppointementsPage"
import QuestionnairePage from "./pages/QuestionnairePage"
import ViewPatientRecordPage from "./pages/ViewPatientRecordPage"
import Login from "./components/Login"
import NewAppointementPage from "./pages/NewAppointementPage"
import LoaderPane from "./components/LoaderPane";
import { Switch } from "@mui/material";
import UserContext from "./context/UserContext";
import { useNavigate } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoutes"
import Register from "./components/Register";

const container = document.getElementById('root');
const root = createRoot(container);


function App() {

    const getInitialLogin = () => {
        const session = localStorage.getItem('session')
        return session ? JSON.parse(session) : {userID: null, userType: null};
      }

    const [loading, setLoading] = useState(false);

    const [userID, setUserID] = useState(getInitialLogin().userID);
    const [userType, setUserType] = useState(getInitialLogin().userType);

    useEffect(() => {
    if (userType == null) {
        //navigate('/splash');
    }
    }, []);

    return (
        <BrowserRouter>
            <LoadingContext.Provider value={{ loading, setLoading }}>
                <UserContext.Provider value={{ userID, setUserID, userType, setUserType }}>
                    <LoaderPane>
                        <Header />
                        <Routes>
                            <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
                            <Route path="/splash" element={<Splash />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Register />} />

                            {/* Patient Pages */}
                            <Route path="/new-appointement" element={<ProtectedRoute><NewAppointementPage /></ProtectedRoute>} />
                            <Route path="/form" element={<ProtectedRoute><QuestionnairePage /></ProtectedRoute>} />
                            <Route path="/my-history" element={<ProtectedRoute><MyHistoryPage /></ProtectedRoute>} />

                            {/* Doctor Pages */}
                            <Route path="/view-appointements" element={<ProtectedRoute><ViewAppointementsPage /></ProtectedRoute>} />
                            <Route path="/patient-record" element={<ProtectedRoute><ViewPatientRecordPage /></ProtectedRoute>} />
                            

                        </Routes>
                        <Footer />
                    </LoaderPane>
                </UserContext.Provider>
            </LoadingContext.Provider>
        </BrowserRouter>


    )
}

root.render(<App />)