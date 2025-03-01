import { useRef } from "react";
import axios from "axios";

import { Link, useNavigate } from "react-router-dom";

export default function Register(){
    const usernameRef = useRef<HTMLInputElement>('');
    const passwordRef = useRef<HTMLInputElement>('');
    const navigate = useNavigate();


    
    const handleClick = async () => { 
        const response = await axios.post("http://localhost:8080/api/register",{"name":usernameRef.current.value,"password":passwordRef.current.value});
        console.log(response.data);
        navigate('/login');
    }
    return (
        <div className="form border border-2 bg-light">
            <h3>Register Yourself</h3>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Username</label>
                    <input ref = {usernameRef} type="text"  className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                    {/* <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div> */}
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input ref = {passwordRef} type="password" className="form-control" id="exampleInputPassword1"/ >
                </div>
                <div className='buttons'>
                    <button type="submit" onClick={handleClick} className="btn btn-outline-primary">Submit</button>
                    <p>or</p>
                    <Link className ="link link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover" to="/login">Log in</Link>
                </div>
        </div>
    );
}