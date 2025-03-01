import './css/App.css'


import { BrowserRouter,
    Route,Routes,
    Link } from "react-router-dom";

import Home from "./Home.js";
import Login from "./Login.js";
import Register from "./Register.js";

import Welcome from './Welcome.js';

import Manage from './Manage.js';

// import reactLogo from "./assets/react.svg";


function App(){

	




	return(
		<div className="container ">
			<div className = "router">
				<BrowserRouter>
					<Routes>
						<Route path="/home" element={<Home />}/ >
						<Route path="/login" element={ <Login />}/ >
						<Route path="/register" element={<Register />}/ >
						<Route path = "/" element={<Welcome />} />
						<Route path = "/manage" element={<Manage />} />
					</Routes>
				</BrowserRouter>
			</div>
		</div>
	);




}


export default App;
