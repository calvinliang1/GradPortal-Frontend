import React, { useState,useEffect } from "react";
import {Button,TextField,Grid,Paper,AppBar,Typography,Toolbar,Box,Stack,Select,IconButton,Menu,MenuItem,
	Card,CardContent,Divider,LinearProgress} from "@mui/material";
import {MenuIcon,AccountCircle} from '@mui/icons-material/';
import { Link as RouterLink, MemoryRouter, useNavigate} from 'react-router-dom';
import './login.css';
import {auth,signout} from './Firebase';

function StudentStep1() {
	let navigate = useNavigate();
	let studentid = "";
	let authToken = sessionStorage.getItem('Auth Token');

	const [username, setusername] = React.useState("");
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [nationality, setNationality] = useState("");

  useEffect(() => {
    //let authToken = sessionStorage.getItem('Auth Token')   
    let url = 'http://127.0.0.1:5000/api/student/'+auth.currentUser.email.replace("@","%40")+'/'+authToken+'/'

        if (authToken) {
            fetch(url,{
      				method:'GET',
      				headers : {
        				'Content-Type':'application/json',
        				'Access-Control-Allow-Origin':'*'
      				}
    				})
    				.then(response => response.json())
            .then(response => {response.forEach(function(obj) { var output = obj.first_name+" "+obj.last_name;
              setusername(output); studentid = obj.uuid;})})
            .catch(error => console.log(error))

            let url1 = 'http://127.0.0.1:5001/api/citizen_of/'+studentid+'/'+authToken+'/'
						fetch(url1,{
      				method:'GET',
      				headers : {
        				'Content-Type':'application/json',
        				'Access-Control-Allow-Origin':'*',
      				},
    				})
    				.then(response => response.json())
            .then(response => {response.forEach(function(obj) {setNationality(obj.country);
            	console.log(obj); });})
            .catch(error => console.log(error))
            navigate('/studentprogress1')
        }

        if (!authToken) {
            navigate('/login')
        }
  	},[]);

  const handlenationalityChange = e =>{
  	setNationality(e.target.value);
  	sessionStorage.setItem("nationality",e.target.value);
  }

  async function handleLogout(event) {
		event.preventDefault();
		await signout();
		sessionStorage.removeItem('Auth Token');
		navigate("/login");
	}

	const handleNext = () =>{
		event.preventDefault();
		
			if(nationality!=="")
			{
				let url1 = 'http://127.0.0.1:5000/api/citizen_of/'+studentid+'/'+authToken
				let cid = "";
				let outputlength = 0;
				fetch(url1,{
      				method:'GET',
      				headers : {
        				'Content-Type':'application/json'
      				},
    				})
    				.then(response => response.json())
            .then(response => {outputlength=response.length; response.forEach(function(obj) {cid = obj.uuid;
            	console.log(obj); });})
            .catch(error => console.log(error))
        if(outputlength==0)
        {
        	let url2 = 'http://127.0.0.1:5000/api/citizen_of/'+authToken
        	fetch(url2,{
      				method:'POST',
      				headers : {
        				'Content-Type':'application/json'
      				},
      				body: JSON.stringify({
      						student_id: studentid,
      						country: nationality,
      					}),
    				})
    				.then(response => response.json())
            .then(response => {response.forEach(function(obj) {console.log(obj); });})
            .catch(error => console.log(error))
        }
        else
        {
        	let url3 = 'http://127.0.0.1:5000/api/citizen_of/'+cid+'/'+authToken
        	fetch(url3,{
      				method:'PUT',
      				headers : {
        				'Content-Type':'application/json'
      				},
      				body: JSON.stringify({
      						country: nationality,
      					}),
    				})
    				.then(response => response.json())
            .then(response => {response.forEach(function(obj) {console.log(obj); });})
            .catch(error => console.log(error))
        }
				navigate("/studentprogress2")
			}
			else{
				alert('No nationality found, it needs to not be empty');
			}
	}
	const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
		return (
    	<div>
        <Box>
          <AppBar position="static" alignitems="center" color="primary">
						<Toolbar>
							<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>Gradportal</Typography>
							<Box justifyContent="center">
                <Typography variant="h6" component="span" sx={{ flexGrow: 1 }}>{username}</Typography>
                <IconButton size="large" aria-label="account of current user" aria-controls="menu-appbar"
                  aria-haspopup="true" onClick={handleMenu} color="inherit"
                >
                  <AccountCircle />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                  }}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem onClick={handleClose}>Profile</MenuItem>
                  <MenuItem onClick={handleClose}>Settings</MenuItem>
                </Menu>
              </Box>
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
        	<Typography variant="h5" color="text.secondary" align="center">Tell us more about your nationality</Typography>
      	</Box>
      	<Grid container spacing={1} justifyContent="center" direction="row" sx={{pt: "40px"}}>
					<form>
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