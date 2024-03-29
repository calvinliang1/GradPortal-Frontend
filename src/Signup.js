import React,{ useState } from "react";
import {Button,TextField,Grid,Paper,AppBar,Typography,Toolbar,Box,
	Card,CardContent,Divider,CardActions, Alert, Snackbar} from "@mui/material";
import { Link as RouterLink, useNavigate, Navigate} from 'react-router-dom';
import './login.css';
import {onAuthStateChanged} from "firebase/auth";
import {signup,auth} from './Firebase';
import ConfigData from "./config.json";	
import validator from 'validator';

function Signup () {
	let navigate = useNavigate();

	const [userName, setUsername] = useState('');
  const [passWord, setPassword] = useState('');
  const [firstName, setFirstname] = useState("");
  const [lastName, setLastname] = useState("");
  const [vpassWord, setvPassword] = useState('');
  const [open, setOpen] = React.useState(false)


  const handlefirstnameChange = e =>{
  	setFirstname(e.target.value);
  	sessionStorage.setItem("firstname",e.target.value);
  }

  const handlelastnameChange = e =>{
  	setLastname(e.target.value);
  	sessionStorage.setItem("lastname",e.target.value);
  }

	const handleusernameChange = e =>{
  	setUsername(e.target.value);
  }

  const handlepasswordChange = e =>{
  	setPassword(e.target.value);
  }

  const handlevpasswordChange = e =>{
  	setvPassword(e.target.value);
  }

  const handleClick = () => {
  	setOpen(!open)
	}

	async function handleSubmit(event) {
		event.preventDefault();
			if(userName.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)&& passWord.length>=8)
			{
				if(firstName.match(/^[A-Za-z]+$|^[A-Za-z]+-[A-Za-z]+$/) && lastName.match(/^[A-Za-z]+$|^[A-Za-z]+-[A-Za-z]+$/))
				{
					if(passWord===vpassWord){
						if(!validator.isEmail(userName))
							alert("not valid email")
						else{
						await signup(userName, passWord).then((response) => {
          		sessionStorage.setItem('Auth Token', response._tokenResponse.idToken)
          		let authToken = sessionStorage.getItem('Auth Token')
          		let url = ConfigData.studentapi+authToken
          		var postbody = "first_name="+firstName+"&"+"last_name="+lastName+"&"
          		+"email_address="+auth.currentUser.email;
          		fetch(url,{
          			headers : {
        					Accept: 'application/json',
                			'Content-Type':'application/x-www-form-urlencoded',
      					},
      					method:'POST',
      					body: postbody,
    					})
    					.then(response => response.json())
    					//.then(response => {response.forEach(function(obj) { console.log(obj); });})
    					.catch(error => alert(error))
          				navigate('/in')
        		}).catch((error) => {
        				console.log("got here")
        				handleClick()
  						//alert("Email address exists already! Enter another one");
						});}
					}
					else
						alert('Verify the two passwords are right, not the same!');
				}
				else
					alert("Verify your name entered has no randomn characters other than hyphen and letters")
			}	
			else
			{
				alert('Validate if your password is at least 8 values long and the username entered is valid email');
			}
	}

		return (
    	<div>
        <Box>
          <AppBar position="static" alignitems="center" color="primary">
						<Toolbar>
							<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>Gradportal</Typography>
							<Button color="inherit" component={RouterLink} to="/login">Login</Button>
						</Toolbar>			
					</AppBar>
				</Box>
				<Grid container spacing={0} justifyContent="center" direction="row">
					<Grid item>
						<Grid container direction="column" justifyContent="center" spacing={1} className="login-form">
							<Paper sx={{backgroundColor:"#ededed"}} variant="elevation" elevation={2} >
								<Grid item>
									<Typography component="h1" variant="h5">Sign up</Typography>
								</Grid>
								<Grid item>
									<form onSubmit={handleSubmit}>
										<Grid container direction="column" spacing={1}>
											<Grid item>
												<TextField type="text" name="firstname" size='small' placeholder="firstname" name="firstname" value={firstName} 
												onChange={handlefirstnameChange} required autoFocus/>
											</Grid>
											<Grid item>
												<TextField type="text" name="lastname" size='small' placeholder="lastname" name="lastname" value={lastName} 
												onChange={handlelastnameChange} required autoFocus/>
											</Grid>
											<Grid item>
												<TextField type="email" placeholder="Email" name="username" variant="outlined" value={userName} 
												onChange={handleusernameChange} required autoFocus/>
											</Grid>
											<Grid item>
												<TextField type="password" placeholder="Password" name="password" variant="outlined" value={passWord} 
												onChange={handlepasswordChange} required autoFocus/>
											</Grid>
											<Grid item>
												<TextField type="password" placeholder="Verify Password" name="verifypassword" variant="outlined" value={vpassWord} 
												onChange={handlevpasswordChange} required autoFocus/>
											</Grid>
											<Grid item>
												<Button variant="contained" color="primary" type="submit" className="button-block" >Sign up now</Button>
											</Grid>
											<Grid item>
												<Snackbar open={open} autoHideDuration={6000}>
      										<Alert severity="error" sx={{ width: '100%' }}>Email address exists already! Enter another one</Alert>
    										</Snackbar>
											</Grid>
										</Grid>
									</form>
								</Grid>
							</Paper>
						</Grid>
					</Grid>	
				</Grid>
			</div>
    );
	
}
export default Signup;