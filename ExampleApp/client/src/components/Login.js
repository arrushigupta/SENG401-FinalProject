import React, { useEffect, useState, useContext } from "react"
import PropTypes from 'prop-types';
import UserContext from "../context/UserContext";
import LoadingContext from "../context/LoadingContext";
import { Button, FormControl, FormGroup, FormLabel, Input, InputLabel, MenuItem, Select } from "@mui/material"
import { AIRPost } from "../scripts/AIRBackend";
import { useNavigate } from "react-router-dom";



export default function Login() {
  const navigate = useNavigate();
  const { setLoading } = useContext(LoadingContext);
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [invalid, setInvalid] = useState(false);
 

  const { setUserID, setUserType } = useContext(UserContext);
  // const { userID} = useContext(UserContext);

  const handleSubmit = async e => {
    AIRPost("http://localhost:3001/login", setLoading, { username, password }, "/").then(
      (response) => {
        if (response.length == 1) {
          console.log(response[0]);
          localStorage.setItem("session", JSON.stringify({ userID: response[0].Email, userType: response[0].UserType }));
          setUserID(response[0].Email);
          setUserType(response[0].UserType);
          // console.log("Cheese: " + userID);
          navigate("/")
        } else {
          setInvalid(true);
          console.log("User not found");
        }
      }
    );
  }

  return (
    <div className="flex justify-center items-center text-xl grid" >
      <h1 className="text-3xl mt-10">Please Login to Your Account</h1>
      <div className="bg-secondary w-full m-auto mt-5 p-5 rounded-xl">
        <FormGroup className="space-y-5" >
          {invalid ? <p className="text-red-500">Invalid username or password</p> : null}
          <FormControl error={username == null || username == "" || invalid}>
            <InputLabel>Username</InputLabel>
            <Input placeholder="Username" type="text" value={username} onChange={e => setUserName(e.target.value)} />
          </FormControl>

          <FormControl error={password == null || password == "" || invalid}>
            <InputLabel>Password</InputLabel>
            <Input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
          </FormControl>

          <Button variant="outlined" disabled={false} type="submit" onClick={handleSubmit}>Submit</Button>


        </FormGroup >
      </div>
    </div >
  )
}

