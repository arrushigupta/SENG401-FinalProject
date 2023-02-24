import Dashboard from "../component/Dashboard/Dashboard"
import NavBar from "../component/NavBar/NavBar"
import CreateProduct from "../component/Product/CreateProduct"

export default function DashboardPage() {
    return (
        <>
            <NavBar />
            <div >
            {/* <h1>My username is: {JSON.parse(localStorage.getItem("chat-app-user")).username}</h1>
            <h1> Home </h1> */}
            <Dashboard></Dashboard>
            
            {/* <ProductList />
            <CreateProduct/> */}
            </div>
            
        </>
    )
}