import React, { useContext, useEffect } from "react"
import { Link, useNavigate, Router } from "react-router-dom";
import UserContext from "../context/UserContext";

export default function Header() {
    const navigate = useNavigate();
    const { userID, userType } = useContext(UserContext);
    useEffect(() => {
        console.log("userID: ", userID);
        console.log("userType: ", userType);
    }, []);

    const logout = () => {
        localStorage.removeItem('session');
        navigate.push('/splash');
    }
    return (
        <header>
            <nav className="nav bg-grey">
                <img src="/logo2.png" className="nav-logo" />
                <h1 className="text-4xl text-secondary">AIR Medical Center</h1>
                <ul className="nav-items">
                    {userType == "Doctor" ? (
                        <>
                            <Link className="p-3 text-secondary" to='/'>Home</Link>
                            <Link className="p-3 text-secondary" to='/view-appointements'>View Appointments</Link>
                            <Link className="p-3 text-secondary" onClick={logout}>Sign Out</Link>
                        </>
                    ) : userType == "Patient" ? (
                        <>
                            <Link className="p-3 text-secondary" to='/'>Home</Link>
                            <Link className="p-3 text-secondary" to='/new-appointement'>New Appointment</Link>
                            <Link className="p-3 text-secondary" to='/my-history'>My History</Link>
                            <Link className="p-3 text-secondary" onClick={logout}>Sign Out</Link>
                        </>
                    ) : (
                        <>
                            <Link className="p-3 text-secondary" to='/splash'>Home</Link>
                            <Link className="p-3 text-secondary" to='/login'>Sign In</Link>
                            <Link className="p-3 text-secondary" to='/register'>Register</Link>
                        </>
                    )}

                </ul>
            </nav>
        </header>
    )
}
