import React, { useState,useEffect } from "react";
import {Button,TextField,Grid,Paper,AppBar,Typography,Toolbar,Box,Stack,Select,MenuItem,
	Divider,LinearProgress} from "@mui/material";
import { Link as RouterLink, MemoryRouter, useNavigate} from 'react-router-dom';
import './login.css';
import {auth,signout} from './Firebase';

function StudentStep1() {
	let navigate = useNavigate();

	//let default = "";
	//const [firstName, setFirstname] = useState('');
	const [firstName, setFirstname] = useState(sessionStorage.getItem("firstname")||"");
  const [lastName, setLastname] = useState(sessionStorage.getItem("lastname")||"");
  const [nationality, setNationality] = useState(sessionStorage.getItem("nationality")||"");

  const handlefirstnameChange = e =>{
  	setFirstname(e.target.value);
  	sessionStorage.setItem("firstname",e.target.value);
  }

  const handlelastnameChange = e =>{
  	setLastname(e.target.value);
  	sessionStorage.setItem("lastname",e.target.value);
  }

  const handlenationalityChange = e =>{
  	setNationality(e.target.value);
  	sessionStorage.setItem("nationality",e.target.value);
  }

  async function handleLogout(event) {
		event.preventDefault();
		await signout();
		navigate("/Login");
	}

	const handleNext = () =>{
		event.preventDefault();
		if (firstName.match(/^[A-Za-z]+$/) && lastName.match(/^[A-Za-z]+$/)) {
			if(nationality!=="")
			{
				navigate("/studentprogress2")
			}
			else{
				alert('No nationality found');
			}
		} else {
			alert('Not valid name');
		}
	}

		return (
    	<div>
        <Box>
          <AppBar position="static" alignitems="center" color="primary">
						<Toolbar>
							<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>Gradportal</Typography>
							<Button color="inherit" onClick={handleLogout} >Logout</Button>
						</Toolbar>			
					</AppBar>
				</Box>
				<Box>
					<Box justifyContent="center" sx={{ display: 'flex',pt: "10px"}}>
      			<Box justifyContent="center" sx={{ width: '60%', mr: 1}}>
        			<LinearProgress variant="determinate" sx={{height: 10, borderRadius: 5, pt:"10px"}} value={0} />
      			</Box>
      			<Box justifyContent="center" sx={{ minWidth: 35 }}>
        			<Typography variant="body2" color="text.secondary">0%</Typography>
      			</Box>
    			</Box>
				</Box>
				<Box sx={{ minWidth: 35, pt: "10px"}}>
        	<Typography variant="h5" color="text.secondary" align="center">Tell us more about yourself</Typography>
      	</Box>
      	<Grid container spacing={1} justifyContent="center" direction="row" sx={{pt: "40px"}}>
					<form>
									<Grid container direction="row">
										<Grid item lg={6}>
												<Typography variant="h6">First name</Typography>
										</Grid>	
										<Grid item lg={6}>	
												<TextField type="text" name="firstname" size='small' value={firstName} 
												onChange={handlefirstnameChange} required autoFocus/>
										</Grid>
									</Grid>
									<Grid container direction="row">
										<Grid item lg={6}>
											<Typography variant="h6">Last name</Typography>
										</Grid>	
										<Grid item lg={6}>
											<TextField type="text" name="lastname" size='small' value={lastName} 
												onChange={handlelastnameChange} required autoFocus/>
										</Grid>	
									</Grid>
									<Grid container direction="row">
										<Grid item lg={6}>
											<Typography variant="h6">Nationality</Typography>
										</Grid>	
										<Grid item lg={6}>
											<Select value={nationality} 
												onChange={handlenationalityChange} required autoFocus>
												<MenuItem value={"US"}>US</MenuItem>
          							<MenuItem value={"Canada"}>Canada</MenuItem>
          							<MenuItem value={"Other"}>Other</MenuItem>
											</Select>
										</Grid>	
									</Grid>
					</form>
				</Grid>
				<Stack direction="row" spacing={6} sx={{pt: "40px"}} justifyContent="center">
					<Button variant="contained" color="primary" sx={{ml: "200px"}} onClick={handleNext} className="next-button">Next</Button>
				</Stack>
			</div>
    );
}
export default StudentStep1;