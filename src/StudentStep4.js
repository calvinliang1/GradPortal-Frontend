import React, { useState,useEffect } from "react";
import {Button,TextField,Grid,Paper,AppBar,Typography,Toolbar,Box,Stack,Select,IconButton,Menu,MenuItem,
  Card,CardContent,Divider,LinearProgress} from "@mui/material";
import {MenuIcon,AccountCircle} from '@mui/icons-material/';
import { Link as RouterLink, MemoryRouter, useNavigate} from 'react-router-dom';
import './login.css';
import {auth,signout} from './Firebase';
import {option2,option1} from './ChartOptions'
import ConfigData from './config.json'

function StudentStep4 () {
	let navigate = useNavigate();

	const [resume, setresume] = useState(sessionStorage.getItem("resume")||'');
  const [cv, setcv] = useState(sessionStorage.getItem("cv")||'');
	let authToken = sessionStorage.getItem('Auth Token')
	const [username, setusername] = React.useState("");
  const [studentid, setstudentid] = React.useState(0);
  const [anchorEl, setAnchorEl] = React.useState(null);

  useEffect(() => {
    let url = ConfigData.studentapi+auth.currentUser.email.replace("@","%40")+'/'+authToken
    if (authToken) {
            navigate('/studentprogress4')
            fetch(url,{
              method:'GET',
              headers : {
                'Content-Type':'application/json',
                'Access-Control-Allow-Origin':'*'
              }
            })
            .then(response => response.json())
            .then(response => {response.forEach(function(obj) { 
              var output = obj.first_name+" "+obj.last_name;
              setusername(output);
              setstudentid(obj.uuid);
            })})
            .catch(error => console.log(error));
        }

        if (!authToken) {
            navigate('/login')
        }
    },[]);
  
	const handleresumeChange = e =>{
  	setresume(e.target.files[0]);
  	sessionStorage.setItem("resume",e.target.files[0]);
  }

  const handlecvChange = e =>{
  	setcv(e.target.files[0]);
  	sessionStorage.setItem("cv",e.target.files[0]);
  }

  const handleNext =() =>{
		event.preventDefault();
		console.log(resume);
		console.log(cv);
		if (resume!==""&&cv!=="") {
      if(option1.series[0].data[3].y==20){
        option1.series[0].data[3].y=0;
        option1.series[0].data[5].y+=20;
      }
      else if(option1.series[0].data[3].y==10){
        option1.series[0].data[3].y=0;
        option1.series[0].data[5].y+=10;
      }
      else{}
			sessionStorage.setItem("Step4",0)
		}
		else if((resume!==""&&cv==="")||(resume===""&&cv!=="")){
      if(option1.series[0].data[3].y==20){
        option1.series[0].data[3].y=10;
        option1.series[0].data[5].y+=10;
      }
      else if(option1.series[0].data[3].y==0){
        option1.series[0].data[3].y=10;
        option1.series[0].data[5].y-=10;
      }
      else{}
      sessionStorage.setItem("Step4",10)
    }
    else{
      if(option1.series[0].data[3].y==0){
        option1.series[0].data[3].y=20;
        option1.series[0].data[5].y-=20;
      }
      else if(option1.series[0].data[3].y==10){
        option1.series[0].data[3].y=20;
        option1.series[0].data[5].y-=10;
      }
      else{}
    	sessionStorage.setItem("Step4",20)
    }
		navigate("/studentprogress5");
	}

	async function handleLogout(event) {
    event.preventDefault();
    await signout();
    sessionStorage.removeItem('Auth Token');
    navigate("/Login");
  }

	const handleBefore =() =>{
		navigate("/studentprogress3");
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
                </Menu>
              </Box>
              <Button color="inherit" onClick={handleLogout} >Logout</Button>
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
   										onChange={handleresumeChange}/>
										</Grid>
									</Grid>
									<Grid container direction="row">
										<Grid item lg={6}>
											<Typography variant="h6">CV</Typography>
										</Grid>	
										<Grid item lg={6}>
											<input type="file" accept=".doc,.docx,.pdf" 
											onChange={handlecvChange}/>
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