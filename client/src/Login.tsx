import { useRef } from 'react';

import { Link } from 'react-router-dom';


import {  useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';




function Login(){
    const valRef = useRef<HTMLInputElement>('');
    const passwordRef = useRef<HTMLInputElement>('');

    const [message, setMessage] = useState("");

    
    const navigate = useNavigate()

    

    async function  handleClick ()  { 

        const pro  = await axios.post("http://localhost:8080/api/login",{"name":valRef.current.value,"password":passwordRef.current.value});
        console.log(pro.data.status);
        const Token = pro.data.token;
        if(pro.data == "Incorrect information"){
            setMessage("Incorrect username or password");
        }
        if(pro.data.status == "ok"){
            localStorage.setItem("Token",Token);
            navigate('/home',{
                state:{
                    "status":"ok",

                }
            });
        }
    }

    


    
    
    
    return (
        <div className="form border border-2 bg-light">
                <h3>Log in</h3>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Username</label>
                    <input ref = {valRef} type="text"  className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input ref = {passwordRef} type="text" className="form-control" id="exampleInputPassword1"/ >
                </div>
                <div className='buttons'>
                    <button type="submit" onClick={handleClick} className="btn btn-outline-primary">Submit</button>
                    <p>or</p>
                    <Link className ="link link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover" to="/register">Register</Link>
                </div>
                <br />
                <p style={{color:"red"}}>{message}</p>
        </div>
    );
}


export default Login;