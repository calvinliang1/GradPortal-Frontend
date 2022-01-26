import React,{ useState,useEffect} from "react";
import {Button,TextField,Grid,Paper,AppBar,Typography,Toolbar,Link,Box,
	Card,CardContent,Divider,CardActions} from "@mui/material";
import { Link as RouterLink, useNavigate, Navigate} from 'react-router-dom';
import './login.css';
import {onAuthStateChanged} from "firebase/auth";
import {signin,auth} from './Firebase';

//class Login extends React.Component {
function Login(){
	let navigate = useNavigate();

	const [userName, setUsername] = useState('');
  const [passWord, setPassword] = useState('');
  
  const handleusernameChange = e =>{
  	setUsername(e.target.value);
  }

  const handlepasswordChange = e =>{
  	setPassword(e.target.value);
  }

  /*
		fetch('http://localhost:5000/student',{
      		'methods':'GET',
      		headers : {
        		'Content-Type':'application/json'
      		}
    	})
    	.then(response => response.json())
    	.then(response => {response.forEach(function(obj) { console.log(obj.name); });})
    	.catch(error => console.log(error))
	}*/
	async function handleSubmit(event) {
		event.preventDefault();
		await signin(userName, passWord).then((response) => {
					console.log(response)
          sessionStorage.setItem('Auth Token', response._tokenResponse.idToken)
          if(sessionStorage.getItem("finished")!=null){
      			navigate("/in");
        	}
          else{
          	navigate('/studentprogress1')
          }
        }).catch((error) => {
  					alert("Re-type user info, password or username may be wrong or does not exist");
					});
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
									<Typography component="h1" variant="h5">Log In</Typography>
								</Grid>
								<Grid item>
									<form onSubmit={handleSubmit}>
										<Grid container direction="column" spacing={1}>
											<Grid item>
												<TextField type="email" placeholder="Email" name="username" variant="outlined" value={userName} 
												onChange={handleusernameChange} required autoFocus/>
											</Grid>
											<Grid item>
												<TextField type="password" placeholder="Password" name="password" variant="outlined"value={passWord} 
												onChange={handlepasswordChange} required autoFocus/>
											</Grid>
											<Grid item>
												<Button variant="contained" color="primary" type="submit" className="button-block"> Login </Button>
											</Grid>
										</Grid>
									</form>
								</Grid>
								<Grid item>
									<Link href="/" variant="body2"> Forgot Password?</Link>
								</Grid>
							</Paper>
						</Grid>
					</Grid>	
				</Grid>
				<Box className="register-area">
					<Box className="student-area">
						<Card sx={{ maxWidth: 400, backgroundColor: "#d4e4ff"}}>
							<CardContent>
								<Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: "bold"}}>Student</Typography>
								<Divider />
								<Typography variant="p" component="div" sx={{fontWeight: 100, flexGrow: 1, maxWidth: 400}}>
								Are you a student looking to apply for graduate programs? Register today to connect with professors
								that are suitable for you.
								</Typography>
							</CardContent>
							<CardActions>
								<Button size="small" variant="contained" color="primary" component={RouterLink} to="/signup">Register as student</Button>
							</CardActions>
						</Card>
					</Box>
				</Box>
			</div>
    );
}
export default Login;