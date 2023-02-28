import React from "react";
import { useEffect, useState, useContext } from "react"
import NavBar from "../NavBar/NavBar";
import ProductList from "../ProductList/ProductList"
import Contacts from "../ChatRoom/Contacts";
import UserContext from "../../context/UserContext";


function Posts() {

    return (
        <div>

        </div>
        
    );
}


function Dashboard() {

    

    const { userID } = useContext(UserContext);

    return (<div>
        <NavBar></NavBar>
        
        <div class= "product-list-dashboard">
            <ProductList/>
        </div>
        
    </div>);
}

export default Dashboard;