import React, { useState } from "react";
import {Button,TextField,Grid,Paper,AppBar,Typography,Toolbar,Box,Stack,Select,MenuItem,
	Divider,LinearProgress} from "@mui/material";
import { Link as RouterLink, MemoryRouter, useNavigate} from 'react-router-dom';
import './login.css';
import {auth,signout} from './Firebase';

function StudentStep4 () {
	let navigate = useNavigate();

	const [resume, setresume] = useState('');
  const [cv, setcv] = useState('');

  /*
	constructor(props) {
		super(props);
		this.state = {resume: "", cv: ""};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}	
	handleChange(event) {
		this.setState({resume: event.state.resume, cv: event.state.cv});
	}*/

	const handleresumeChange = e =>{
  	setresume(e.target.value);
  }

  const handlecvChange = e =>{
  	setcv(e.target.value);
  }

  const handleNext =() =>{
		event.preventDefault();
		if (resume!=="" && cv!=="") {
			navigate("/studentprogress5");
		} else {
			alert('No valid files yet');
		}
	}

	async function handleLogout(event) {
		event.preventDefault();
		await signout();
		navigate("/Login");
	}

	const handleBefore =() =>{
		navigate("/studentprogress3");
	}
	
		return (
    	<div>
        <Box>
          <AppBar position="static" alignitems="center" color="primary">
						<Toolbar>
							<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>Gradportal</Typography>
							<Button color="inherit" onClick={handleLogout}>Logout</Button>
						</Toolbar>			
					</AppBar>
				</Box>
				<Box>
					<Box justifyContent="center" sx={{ display: 'flex',pt: "10px"}}>
      			<Box justifyContent="center" sx={{ width: '60%', mr: 1}}>
        			<LinearProgress variant="determinate" sx={{height: 10, borderRadius: 5, pt:"10px"}} value={60} />
      			</Box>
      			<Box justifyContent="center" sx={{ minWidth: 35 }}>
        			<Typography variant="body2" color="text.secondary">60%</Typography>
      			</Box>
    			</Box>
				</Box>
				<Box sx={{ minWidth: 35, pt: "10px"}}>
        	<Typography variant="h5" color="text.secondary" align="center">Tell us more about your academic
        		and work experience</Typography>
      	</Box>
      	<Grid container spacing={1} justifyContent="center" direction="row" sx={{pt: "40px"}}>
					<form>
									<Grid container direction="row">
										<Grid item lg={6}>
												<Typography variant="h6">Resume</Typography>
										</Grid>	
										<Grid item lg={6}>	
   										<input type="file" accept=".doc,.docx,.pdf" 
   										value={resume} onChange={handleresumeChange}/>
										</Grid>
									</Grid>
									<Grid container direction="row">
										<Grid item lg={6}>
											<Typography variant="h6">CV</Typography>
										</Grid>	
										<Grid item lg={6}>
											<input type="file" accept=".doc,.docx,.pdf" 
											value={cv} onChange={handlecvChange}/>
										</Grid>	
									</Grid>
					</form>
				</Grid>
				<Stack direction="row" spacing={6} sx={{pt: "40px"}} justifyContent="center">
					<Button variant="contained" color="primary" sx={{mr: "200px"}} onClick={handleBefore} className="before-button">Back</Button>
					<Button variant="contained" color="primary" sx={{ml: "200px"}} onClick={handleNext} className="next-button">Next</Button>
				</Stack>
			</div>
    );
}
export default StudentStep4;