import { useState } from "react";
import axios from "axios";
import { useRef } from "react";


function List(props){

    const [okState,setOkState] = useState("none");
    const [modState,setModState] = useState("inline");
    const token = localStorage.getItem("Token");
    const valRef = useRef('');
    const [value,setValue] = useState("");
    const maxLength:number = 90;


    const handleModClick = (id:number,placeholder:string) => {

        console.log(id);

        let okButton = document.getElementsByName("ok");
        let modButton = document.getElementsByName("mod");
        let inputs = document.getElementsByName("inputs");
        let data = document.getElementsByName("data");
        let cancel = document.getElementsByName("can");
        let archive = document.getElementsByName("archive");



        for(let i = 0;i < modButton.length ; i++){

            if(i == id){
                okButton[i].style.display = "inline";
                modButton[i].style.display = "none";
                inputs[i].style.display = "inline";
                inputs[i].placeholder = placeholder;
                data[i].style.display = "none";
                cancel[i].style.display="inline";
                archive[i].style.display = "none";
            }
            
        }




        // document.getElementById("inputs").placeholder = splittedData[i]; 
        




    }


    const handleOkClick = (id:number,idNote:number) =>{



        let okButton = document.getElementsByName("ok");
        let modButton = document.getElementsByName("mod");
        let inputs = document.getElementsByName("inputs");
        let data = document.getElementsByName("data");





        for(let i = 0;i < modButton.length ; i++){

            if(i == id){
                okButton[i].style.display = "none";
                modButton[i].style.display = "inline";
                
                inputs[i].style.display = "none";
                
                inputs[i].placeholder = "";
                data[i].style.display = "inline";
            }   
            
        }

        const pro  =  axios.post("http://localhost:8080/api/mod",{ID:idNote,Token:token,Data:value});
        
        window.location.reload();

    }

    const handleCancelClick = (id:number) =>{



        let okButton = document.getElementsByName("ok");
        let modButton = document.getElementsByName("mod");
        let inputs = document.getElementsByName("inputs");
        let data = document.getElementsByName("data");
        let cancel = document.getElementsByName("can");




        for(let i = 0;i < cancel.length ; i++){

            if(i == id){
                okButton[i].style.display = "none";
                modButton[i].style.display = "inline";
                
                inputs[i].style.display = "none";
                
                inputs[i].placeholder = "";
                data[i].style.display = "inline";
                cancel[i].style.display="none";
            }   
            
        }

        window.location.reload();

    }
        

    return (
 

        <ul className="list-group ">
            
            {
                
                Object.keys(props.data).map((oneKey,i)=>{
                    const splittedData = props.data[oneKey].split(':')
                    console.log(i)
                    return (
                        <li className="list-group-item" key={i} value={splittedData[0]} > 

                            <input maxLength={maxLength}  type="text" name="inputs" className="form-contro" placeholder="" style = {{display:"none"}} onChange={(e)=>{setValue(e.target.value)}} />
                            <p name="data">{splittedData[1]}</p>
                            <div className="buttons">
                                <button className="btn btn-outline-success" style={{display:"none"}} name="ok" onClick={()=>handleOkClick(i,splittedData[0])}>Save</button> 
                                <button className="btn btn-outline-primary" name ="mod"  onClick={()=>handleModClick(i,splittedData[1])}>Modify</button>
                                <button className="btn btn-outline-warning" name = "archive" onClick={()=>props.handleClick(splittedData[0])}>Archive</button>
                                <button className="btn btn-outline-danger" style={{display:"none"}} name="can" onClick={()=>handleCancelClick(splittedData[0])}>Cancel</button>
                            </div>
                        </li>
                    )
                })


                
            }

            
        </ul>
    );
}




export default List;