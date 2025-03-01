import { Link } from "react-router-dom";




function Nav(){

    return (
        <nav>
			<ul>
				<li>
					<Link className ="link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover" to="/login">Log in</Link>
				</li>
				<li>
					<Link className ="link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover" to="/register">Register</Link>
				</li>
			</ul>
	    </nav>
    );
}



export default Nav;