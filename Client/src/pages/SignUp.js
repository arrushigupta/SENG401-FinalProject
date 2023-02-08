import Header from "../component/Login/Header";
import SignUp from "../component/Login/SignUp";

export default function SignupPage(){
    return(
        <>
            <Header
              heading="Signup to create an account"
              paragraph="Already have an account? "
              linkName="Login"
              linkUrl="/"
            />
            <SignUp/>
        </>
    )
}