import Dashboard from "../component/Dashboard/Dashboard"
import NavBar from "../component/NavBar/NavBar"
import Product from "../component/Product/Product"
import CreateProduct from "../component/Product/CreateProduct"

export default function HomePage() {
    return (
        <>
            <NavBar />
            <div class="py-24">
            <h1>My username is: {JSON.parse(localStorage.getItem("chat-app-user")).username}</h1>
            <h1> Home </h1>
            <Product />
            <CreateProduct/>
            </div>
            
        </>
    )
}