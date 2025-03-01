import React from "react"
// import {useSearchParams} from "react-router-dom"
import { redirect, useNavigate } from "react-router-dom";
import { useEffect,useState } from "react";
import axios from "axios";
import { useRef } from "react";

import { Link } from "react-router-dom";

import List from "./List";

import Pagination from "./Pagination";
import Listusers from "./Listusers";



function Home() {

    const [data,setData] = useState(["Loading..."]);
    const [role,setRole] = useState("user");
    const valRef = useRef<HTMLInputElement>('');
    const token = localStorage.getItem("Token");
    const navigate = useNavigate();
    let maxNotes:number = 10;
    const maxLength:number = 90;

    const [currentPage,setCurrentPage] = useState(1);
    const [postsPerPage] = useState(6);


    const indexOfLastPost = currentPage*postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = data.slice(indexOfFirstPost,indexOfLastPost); // get the 6 first posts

    const Paginate = (pageNumber:number)=> setCurrentPage(pageNumber)

    const getData  = async() =>{
        const pro  = await axios.post("http://localhost:8080/api/home",{Token:token});
        console.log(pro.data)
        if(pro.data == "Invalid token"){
            navigate('/login',{
                state:{message: "you must be logged in"}
            });
        }
        setRole(pro.data.role);
        if(pro.data.role == "admin"){
            console.log("admin");
        }
        setData(pro.data.data);
        
    }



    useEffect(() => {
        let message = document.getElementById("message");
        message.textContent = "";
        getData();
        
    }, []);

    const handleAddClick   = async () => { 
        if(valRef.current.value != ""){
            const pro  = await axios.post("http://localhost:8080/api/add",{text:valRef.current.value,Token:token});
            console.log(pro.data);
            window.location.reload();
        }
        else{
           let message = document.getElementById("message");
           message.textContent = "You can't add an empty note";
           
        }
        
    }

    const handleDelClick = async(id:number)=> { 
        console.log(id)
        const pro  = await axios.post("http://localhost:8080/api/del",{ID:id,Token:token});
        console.log(pro.data);

        window.location.reload();
    }


    const handleLogOut = ()=>{
        localStorage.removeItem("Token");
        navigate('/login')
    }


    return (
        <div className="home">
            <div className="nave">
                <h3>Welcome</h3>
                <div className="btn-group">
                <button type="button" className="btn btn-outline-dark dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                    Account
                </button>
                <ul className="dropdown-menu">

                    { (role == "admin") ? <li></li> :<li> <Link to= "/manage" className="dropdown-item">Manage</Link></li>}
                    <li><a className="dropdown-item" href="#" onClick={handleLogOut}>Log out</a></li>
                </ul>
                </div>
            </div>
            
            <div className="mini-form">
                <label htmlFor="exampleInputEmail1" className="form-label"></label>
                { (role == "admin") ? <div></div> : 
                <>
                <input maxLength={maxLength} ref = {valRef} type="text" className="form-control" id="exampleInputEmail1" />
                <button className="btn btn-outline-primary" onClick = {handleAddClick}>Add a note</button> 
                </>
                }
            </div>
            <p id="message" style={{color:"red"}}></p>

            
            
           { (role == "admin") ?
            
            <Listusers data ={currentPosts} />  : <List data ={currentPosts} handleClick={handleDelClick}/>}
            
            <Pagination postsPerPage={postsPerPage} totalPosts={data.length} paginate={Paginate} />
            
        </div>
    )
}


export default Home;