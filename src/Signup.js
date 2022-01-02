import React,{ useState } from "react";
import {Button,TextField,Grid,Paper,AppBar,Typography,Toolbar,Box,
	Card,CardContent,Divider,CardActions} from "@mui/material";
import { Link as RouterLink, useNavigate, Navigate} from 'react-router-dom';
import './login.css';
import {onAuthStateChanged} from "firebase/auth";
import {signup} from './Firebase';

function Signup () {
	let navigate = useNavigate();

	const [userName, setUsername] = useState('');
  const [passWord, setPassword] = useState('');
  const [vpassWord, setvPassword] = useState('');

	const handleusernameChange = e =>{
  	setUsername(e.target.value);
  }

  const handlepasswordChange = e =>{
  	setPassword(e.target.value);
  }

  const handlevpasswordChange = e =>{
  	setvPassword(e.target.value);
  }

	async function handleSubmit(event) {
		event.preventDefault();
			if(userName.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)&&
				passWord.length>=8)
			{
				if(passWord===vpassWord){
					await signup(userName, passWord);
					navigate("/studentprogress1");
				}
				else
					alert('Verify the two passwords are right, not the same!');
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
												<Button variant="contained" color="primary" type="submit" className="button-block">Sign up now</Button>
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