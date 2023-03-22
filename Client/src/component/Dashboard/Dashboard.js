import React from "react";
import { useEffect, useState, useContext } from "react"
import NavBar from "../NavBar/NavBar";
import ProductList from "../ProductList/ProductList"
import Contacts from "../ChatRoom/Contacts";
import UserContext from "../../context/UserContext";


function Dashboard() {

    return (<div>

        <div class="product-list-dashboard flex w-screen py-20">
            <ProductList chooseMessage={0} />
        </div>

    </div>);
}

export default Dashboard;