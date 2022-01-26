import {
  Route,
  Routes,
  BrowserRouter as Router,
} from "react-router-dom";
import React from "react";
import ReactDOM from "react-dom";
import Login from "./Login"
import Home from "./Home"
import Signup from "./Signup"
import StudentStep1 from "./StudentStep1"
import StudentStep2 from "./StudentStep2"
import StudentStep3 from "./StudentStep3"
import StudentStep4 from "./StudentStep4"
import StudentStep5 from "./StudentStep5"
import Main from "./Main"
import {useAuth} from './Firebase';

function App()
{
	return (
		<div className="App">
			<Router>
				<Routes>
					<Route path = "/" element={<Home />} />
					<Route path = "/login" element={<Login />} />
					<Route path = "/signup" element={<Signup/>} />
					<Route path = "/studentprogress1" element={<StudentStep1/>}/>
					<Route path = "/studentprogress2" element={<StudentStep2/>}/>
					<Route path = "/studentprogress3" element={<StudentStep3/>}/>
					<Route path = "/studentprogress4" element={<StudentStep4/>}/>
					<Route path = "/studentprogress5" element={<StudentStep5/>}/>
					<Route path = "/in" element={<Main/>}/>
				</Routes>
			</Router>
		</div>
	)
}
export default App