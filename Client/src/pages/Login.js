import Header from "../component/Login/Header"
import Login from "../component/Login/Login"

export default function LoginPage(){
    return(
        <>
            <Header
                heading="Dinos Marketplace"
                paragraph="Don't have an account yet? "
                linkName="Signup"
                linkUrl="/signup"
                />
            <Login/>
            
        </>
    )
}