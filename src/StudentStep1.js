import React, { useState,useEffect } from "react";
import {Button,TextField,Grid,Paper,AppBar,Typography,Toolbar,Box,Stack,Select,IconButton,Menu,MenuItem,
	Card,CardContent,Divider,LinearProgress} from "@mui/material";
import {MenuIcon,AccountCircle} from '@mui/icons-material/';
import { Link as RouterLink, MemoryRouter, useNavigate} from 'react-router-dom';
import './login.css';
import ConfigData from "./config.json";
import {auth,signout} from './Firebase';
import {option2,option1} from './ChartOptions'

function StudentStep1() {
	let navigate = useNavigate();
	let authToken = sessionStorage.getItem('Auth Token');

	const [username, setusername] = React.useState("");
  const [cid, setcid] = React.useState(0);
  const [studentid, setstudentid] = React.useState(0);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [nationalitylist, setNationalityList] = useState([""]);
  const [nationality, setNationality] = useState("");

  useEffect(() => {
    //let authToken = sessionStorage.getItem('Auth Token')   
    let url = ConfigData.studentapi+auth.currentUser.email.replace("@","%40")+'/'+authToken

        if (authToken) {
            navigate('/studentprogress1')
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
              let url1 = ConfigData.citizenapi+obj.uuid+'/'+authToken
              fetch(url1,{
              method:'GET',
              headers : {
                'Content-Type':'application/json',
                'Access-Control-Allow-Origin':'*',
              },
              })
              .then(response => response.json())
              .then(response => {response.forEach(function(obj) {
                setNationality(obj.country);});})
              .catch(error => console.log(error))
            })})
            .catch(error => console.log(error));
        }

        else if (!authToken) {
            navigate('/login')
        }
  	},[]);

  useEffect(() => {
      let url2 = ConfigData.countryapi+authToken;
      if(authToken){
        navigate('/studentprogress1');
        fetch(url2,{
              method:'GET',
              headers : {
                'Content-Type':'application/json',
                'Access-Control-Allow-Origin':'*'
              }
            })
            .then(response => response.json())
            .then(response => {
              var output = []
              response.forEach(function(obj) { 
                output.push(obj.name);
              })
              setNationalityList(output);
          })
            .catch(error => console.log(error));
      }
      else if (!authToken) {
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

  const handleBefore =() =>{
    navigate("/in");
  }

	const handleNext = event => {
		event.preventDefault();
			if(nationality!=="")
			{
        if(option1.series[0].data[0].y==20){
          option1.series[0].data[0].y=0
          option1.series[0].data[5].y+=20
        }
        else{}
				let url1 = ConfigData.citizenapi+studentid+'/'+authToken
				let outputlength = 0;
        console.log("got here 1")
        sessionStorage.setItem("Step1",0);
				fetch(url1,{
      		method:'GET',
      		headers : {
        		'Content-Type':'application/json'
      		},
    		})
    		.then(response => response.json())
        .then(response => {outputlength=response.length; 
        if(outputlength==0)
        {
          let url2 = ConfigData.citizenapi+authToken
          var bodyv = "student_id="+studentid+"&country="+nationality;
          fetch(url2,{
              method:'POST',
              headers : {
                Accept: 'application/json',
                'Content-Type':'application/x-www-form-urlencoded'
              },
              body: bodyv,
            })
            .then(response => response.json())
            .then(response => {response.forEach(function(obj) {console.log(obj); });})
            .catch(error => console.log(error))
        }
        else{
        response.forEach(function(obj) {
          let url3 = ConfigData.citizenapi+obj.uuid+'/'+authToken
          var bodyv = "country="+nationality;
          fetch(url3,{
              method:'PUT',
              headers : {
                Accept: 'application/json',
                'Content-Type':'application/x-www-form-urlencoded',
              },
              body: bodyv,
            })
            .then(response => response.json())
            .then(response => { console.log(response);})
            .catch(error => console.log(error))
        });}
      })
        .catch(error => console.log(error))
				navigate("/studentprogress2")
			}
			else{
        if(option1.series[0].data[0].y==0){
          option1.series[0].data[0].y=20
          option1.series[0].data[5].y-=20
        }
        else{}
        sessionStorage.setItem("Step1",20)
        navigate("/studentprogress2")
				//alert('No nationality found, it needs to not be empty');
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
                        {nationalitylist.map(country=>(<MenuItem key={country} value={country}>{country}</MenuItem>))}
											</Select>
										</Grid>	
									</Grid>
					</form>
				</Grid>
				<Stack direction="row" spacing={6} sx={{pt: "40px"}} justifyContent="center">
          <Button variant="contained" color="primary" sx={{mr: "200px"}} onClick={handleBefore} className="before-button">Exit</Button>
					<Button variant="contained" color="primary" sx={{ml: "200px"}} onClick={handleNext} className="next-button">Next</Button>
				</Stack>
			</div>
    );
}
export default StudentStep1;