import React, { useEffect, useState, useContext } from "react"
import PropTypes from 'prop-types';
import UserContext from "../context/UserContext";
import LoadingContext from "../context/LoadingContext";
import { Button, FormControl, FormGroup, FormLabel, Input, InputLabel, MenuItem, Select } from "@mui/material"
import { AIRPost } from "../scripts/AIRBackend";
import { useNavigate } from "react-router-dom";



export default function Register() {
  const navigate = useNavigate();
  const { setLoading } = useContext(LoadingContext);
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [hcn, setHCN] = useState("");
 

  const { setUserID, setUserType } = useContext(UserContext);
  // const { userID} = useContext(UserContext);

  const handleSubmit = async e => {
    for (const [key, value] of Object.entries([username, password, hcn])) {
      if (value === "" || value === null) {
          window.alert("Please fill out all fields.");
          setLoading(false);
          return;
      }
  }
    AIRPost("http://localhost:3001/register", setLoading, { username, password, hcn }, "/").then(
      (response) => {
        console.log(response);
        if (response.error){
          window.alert("This username is already taken. Please try again.");
          return;
        }
        if (response.affectedRows == 1) {
          console.log(response[0]);
          localStorage.setItem("session", JSON.stringify({ userID: username, userType: "Patient" }));
          setUserID(username);
          setUserType("Patient");
          navigate("/my-history")
        }
      }
    );
  }

  return (
    <div className="flex justify-center items-center text-xl grid" >
      <h1 className="text-3xl mt-10">Register for an Account!</h1>
      <div className="bg-secondary w-full m-auto mt-5 p-5 rounded-xl">
        <FormGroup className="space-y-5" >
          <FormControl error={username == null || username == ""}>
            <InputLabel>Username</InputLabel>
            <Input placeholder="Username" type="text" value={username} onChange={e => setUserName(e.target.value)} />
          </FormControl>

          <FormControl error={password == null || password == ""}>
            <InputLabel>Password</InputLabel>
            <Input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
          </FormControl>

          <FormControl error={hcn == null || hcn == ""}>
            <InputLabel>Health Care Number</InputLabel>
            <Input placeholder="Health Care Number" type="text" value={hcn} onChange={e => setHCN(e.target.value)} />
          </FormControl>

          <Button variant="outlined" type="submit" onClick={handleSubmit}>Submit</Button>


        </FormGroup >
      </div>
    </div >
  )
}

