



function Row(){
    
    return(
            <li className = 'list-group-item'>ok</li>
    );
}


function Container(){
    const rows = [];

    for(let i = 0; i < 3 ;i++){
        rows.push(Row());
    }

    
    


    return (
        // <div className='container'>
        //     <table class="table">
        //     <thead>
        //         <tr>
        //         <th scope="col">#</th>
        //         <th scope="col">First</th>
        //         <th scope="col">Last</th>
        //         <th scope="col">Handle</th>
        //         </tr>
        //     </thead>
        //     <tbody>
        //         {rows}
        //     </tbody>
        //     </table>
        // </div>
        <div className='container'>
            <ul className="list-group">
                <li className="list-group-item">An item</li>
                <li className="list-group-item">A second item</li>
                <li className="list-group-item">A third item</li>
                <li className="list-group-item">A fourth item</li>
                <li className="list-group-item">And a fifth one</li>
                {rows}
            </ul>
        </div>
    );
}
