import Nav from "./Nav";



function Welcome(){





    return (
        <div className = "welcome  border border-1">
            <div className="container">
                <h3>Welcome to this note's app</h3>
                <br />
                {/* <p>You can : </p> */}
                <Nav />
            </div>

        </div>
    );
}



export default Welcome;