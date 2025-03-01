import { useState } from "react";



function Pagination(props){


    const pageNumber = [];


    for( let i = 1;i<=Math.ceil(props.totalPosts/props.postsPerPage);i++){
        pageNumber.push(i);
    }



    const [activePage,setActivePage] = useState(1);

    const handlePageClick = (number) =>{
        setActivePage(number);
        props.paginate(number)
    }

    return(
        <ul className="pagination">
            
            {
                
                pageNumber.map((i)=>(

                    
                        <li className={`page-item ${activePage === i?"active" : ""}`} key={i}  >
                            <a href="#" className="page-link" onClick={()=>{
                                handlePageClick(i)
                                props.paginate(i)
                            }}>{i}</a>
                        </li>
                    
                ))


                
            }

            
        </ul>
    );
}


export default Pagination;