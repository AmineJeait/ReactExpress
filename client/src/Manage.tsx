import { useEffect, useState } from "react";
import axios from "axios";
import List from "./List";
import { Link, useNavigate } from "react-router-dom";
import Pagination from "./Pagination";


function Manage(){

    const token = localStorage.getItem("Token");
    const [data,setData] = useState('');

    const [currentPage,setCurrentPage] = useState(1);
    const [postsPerPage] = useState(6);


    const indexOfLastPost = currentPage*postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = data.slice(indexOfFirstPost,indexOfLastPost); // get the 6 first posts

    const Paginate = (pageNumber:number)=> setCurrentPage(pageNumber)


    const navigate = useNavigate();

    const getData = async ()=>{
        const pro  = await axios.post("http://localhost:8080/api/archive",{Token:token})
        console.log(pro.data);
        setData(pro.data.data);
    }


    useEffect(() => {
            getData();
            
        }, []);
    

    const handleClick  = (id:number) =>{
        const pro =  axios.post("http://localhost:8080/api/active",{ID:id,Token:token});
        window.location.reload();
    }


    const handleLogOut = ()=>{
        localStorage.removeItem("Token");
        navigate('/login')
    }


    const handleDelClick = (id) =>{
        const pro =  axios.post("http://localhost:8080/api/delete",{ID:id,Token:token});
        window.location.reload();
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
                                <li> <Link to= "/home" className="dropdown-item">Home</Link></li>
                                <li><a className="dropdown-item" href="#" onClick={handleLogOut}>Log out</a></li>
                            </ul>
                            </div>
                        </div>
            <br />
            <br />
            <br />

            <ul className="list-group ">
            
            {
                
                Object.keys(currentPosts).map((oneKey,i)=>{
                    const splittedData = currentPosts[oneKey].split(':')
                    console.log(i)
                    return (
                        <li className="list-group-item" key={i} value={splittedData[0]} >
                           
                            <p id="data">{splittedData[1]}</p>
                            <div className="buttons">
                                <button className="btn btn-outline-success" onClick={()=>handleClick(splittedData[0])}>Recover</button>
                                <button className="btn btn-outline-danger" onClick={()=>handleDelClick(splittedData[0])}>Delete</button>
                            </div>
                        </li>
                    )
                })
                    

                
            }


            
        </ul>
        <Pagination postsPerPage={postsPerPage} totalPosts={data.length} paginate={Paginate} />
        </div>
    );

}


export default Manage;