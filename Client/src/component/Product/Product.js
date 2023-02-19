import React, { useEffect, useContext, useState } from 'react'
import { DINOSGet } from '../../scripts/backend-functions'
import LoadingContext from "../../context/LoadingContext";


export default function Product(){

    const { setLoading } = useContext(LoadingContext);

    // possibly will add an array of tags

    const [product, setProduct] = useState({
        name: "Kendama",
        description: "Used it during all of grade 6, decided it was time to move on",
        price: 20,
        image: null,
    });

    const [users, setUsers] = useState({})

    useEffect(() => {
        // DINOSGet("http://localhost:4000/api/getAll", setLoading, setUsers);
        // setLoading(false);

        console.log( JSON.parse(localStorage.getItem("chat-app-user")));
        console.log(JSON.parse(localStorage.getItem("chat-app-user")).username);
        console.log(JSON.parse(localStorage.getItem("chat-app-user"))._id);

    },[]);


    return(
        <>
        <div>
            
            <div class="max-w-sm rounded overflow-hidden shadow-lg">
                <img class="w-full" src="https://v1.tailwindcss.com/img/card-top.jpg" alt="Sunset in the mountains"/>
                <div class="px-6 py-4">
                    <div class="font-bold text-xl mb-2">{product.name}</div>
                    <p class="text-gray-700 text-base">{product.description}</p>
                    <p class="font-bold text-lg mb-2">{product.price} $</p>
                </div>
                <div class="px-6 pt-1 pb-2">
                    <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#photography</span>
                    <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#travel</span>
                    <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#winter</span>
                </div>
            </div>
        </div>
        </>
    )

}

// //Handle Login API Integration here
// const authenticateUser = async () => {
//     try {
//         DINOSPost('http://localhost:4000/api/login', setLoading, { email: loginState.email, password: loginState.password }).then(
//             (response) => {
//                 console.log(response);

//                 if (response.status === "success") {

//                     setUserName(loginState.username);
//                     setLoginState('')
//                     setUserID(response._id)
//                     localStorage.setItem('chat-app-user', JSON.stringify(response));
//                     console.log( JSON.parse(localStorage.getItem("chat-app-user")))
//                     console.log(JSON.parse(localStorage.getItem("chat-app-user")).username)
//                     console.log(JSON.parse(localStorage.getItem("chat-app-user"))._id)
                    
//                     notify("success")
//                     setTimeout(() => {
//                         console.log("Delayed for 3 second.");
//                         navigate("/chat")
//                     }, "3000")
//                 } else {
//                     notify("error")

//                 }

//             }
//         )
//     } catch (error) {
//         notify('error')
//         console.log(error.message)
//     }