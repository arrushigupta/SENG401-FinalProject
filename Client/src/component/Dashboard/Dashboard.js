import React from "react";
import NavBar from "../NavBar/NavBar";
import ProductList from "../ProductList/ProductList"
import Contacts from "../ChatRoom/Contacts";
//import {Post} from "../../../../Server/models/product_model"
// sample
function FakeContact(props){
    return (<div className="contact-javi">
        <img className="circle-img" src= {props.img}></img>
        <div> <h3 >{props.name}</h3></div>
    </div>)
}











function Inbox() {
    return (
        <div id="inbox">
            <h1>Inbox</h1>
            <hr ></hr>
            
            <FakeContact 
                img = "https://th.bing.com/th/id/OIP.iWlnorWGXqzsTXemmk4e2QHaHb?pid=ImgDet&rs=1"
                name = "Beyonce"
                /> 
        
            <FakeContact 
                img = "https://th.bing.com/th?id=ODL.152b7f7b3025feb97e032e6089a31d8d&w=143&h=198&c=12&rs=1&qlt=99&pcl=faf9f7&o=6&pid=13.1"
                name = "Chuck Norris"
                />
        </div>
    );
}

function Posts() {

    return (
        <div>

        </div>
        
    );
}


function Dashboard() {

    return (<div>
        <NavBar></NavBar>
        
        <div class= "product-list-dashboard">
            <ProductList/>
        </div>
        <Inbox/>
        
    </div>);
}

export default Dashboard;