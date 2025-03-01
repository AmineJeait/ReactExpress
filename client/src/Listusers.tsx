import { useState } from "react";
import axios from "axios";
import { useRef } from "react";


function Listusers(props){

    const [okState,setOkState] = useState("none");
    const [modState,setModState] = useState("inline");
    const token = localStorage.getItem("Token");
    const valRef = useRef('');
    const [value,setValue] = useState("");
    const maxLength:number = 90;



    const handleDelClick = (id:number)=> {
        const pro =  axios.post("http://localhost:8080/api/admin/del",{ID:id,Token:token});
        window.location.reload();
    }
        

    const handleDeactivateClick = (id:number) =>{
        const pro =  axios.post("http://localhost:8080/api/admin/deactivate",{ID:id,Token:token});
        window.location.reload();
    }

    const handleActivateClick = (id:number) =>{
        const pro =  axios.post("http://localhost:8080/api/admin/activate",{ID:id,Token:token});
        window.location.reload();
    }

    



    return (
     
        <table className="table">
            <thead>
                <tr>
                <th scope="col">Id</th>
                <th scope="col">Username</th>
                <th scope="col">Status</th>
                <th scope="col">Role</th>
                <th scope="col">Actions</th>
                </tr>
            </thead>
            <tbody>
        {
            Object.keys(props.data).map((oneKey,i)=>{
                const splittedData = props.data[oneKey].split(':')
                console.log(i)
                return (
                    <tr>
                        <th scope="row">{splittedData[0]}</th>
                        <td>{splittedData[1]}</td>
                        <td>{splittedData[2]}</td>
                        <td>{splittedData[3]}</td>
                        <div className="buttons">
                                <button className="btn btn-outline-danger" onClick={()=> handleDelClick(splittedData[0])}>Delete</button>
                                {
                                    (splittedData[2] == "active") ? <button className="btn btn-outline-warning"  onClick={()=>handleDeactivateClick(splittedData[0])}>Deactivate</button> :
                                    <button className="btn btn-outline-success"  onClick={()=>handleActivateClick(splittedData[0])}>Activate</button>
                                }
                                
                                
                                
                        </div>
                    </tr>
                )
            })

            
               
            

        }
            </tbody>
        </table>

    );
}




export default Listusers;