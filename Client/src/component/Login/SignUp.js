import { useState } from 'react';
import { signupFields } from "../../constants/formField";
import FormAction from "./FormAction";
import Input from "./Input";
import { auth } from '../../firebase'
import { createUserWithEmailAndPassword } from 'firebase/auth'

const fields = signupFields;
let fieldsState = {};

fields.forEach(field => fieldsState[field.id] = '');

export default function SignUp() {
  const [signupState, setSignupState] = useState(fieldsState);

  const handleChange = (e) => {
    setSignupState({ ...signupState, [e.target.id]: e.target.value });
    console.log(signupState)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(signupState)
    createAccount()
  }

  //handle Signup API Integration here
  const createAccount = async () => {
    try {
      const user = await createUserWithEmailAndPassword(auth, signupState.email, signupState.password)
      console.log(user)
      console.log(auth.currentUser)
    } catch (error) {
      console.log(error.message)
    }
    setSignupState('')
  }

  return (
    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
      <div className="">
        {
          fields.map(field =>
            <Input
              key={field.id}
              handleChange={handleChange}
              value={signupState[field.id]}
              labelText={field.labelText}
              labelFor={field.labelFor}
              id={field.id}
              name={field.name}
              type={field.type}
              isRequired={field.isRequired}
              placeholder={field.placeholder}
            />

          )
        }
        <FormAction handleSubmit={handleSubmit} text="Signup" />
      </div>



    </form>
  )
}