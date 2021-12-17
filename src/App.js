import React from "react";
import {Button,TextField,Grid,Paper,AppBar,Typography,Toolbar,Link,Box,
	Card,CardContent,Divider,CardActions} from "@mui/material";
import './login.css';
class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = { username: "", password:"", authflag:1 };
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}	
	handleChange(event) {
		this.setState({ username: event.state.username, password: event.state.password });
	}
	handleSubmit(event) {
		event.preventDefault();
		if (this.state.username == 'admin@littech.in' && this.state.password == 'secret') {
			this.props.history.push("/home");
		} else {
			alert('Incorrect Credntials!');
		}
	}
	render() {
		return (
    	<div>
        <Box>
          <AppBar position="static" alignitems="center" color="primary">
						<Toolbar>
							<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>Gradportal</Typography>
							<Button color="inherit">Login</Button>
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
									<form onSubmit={this.handleSubmit}>
										<Grid container direction="column" spacing={1}>
											<Grid item>
												<TextField type="email" placeholder="Email" name="username" variant="outlined" value={this.state.username} onChange=
			{(event) => this.setState({[event.target.name]: event.target.value,})} required autoFocus/>
											</Grid>
											<Grid item>
												<TextField type="password" placeholder="Password" name="password" variant="outlined"value={this.state.password} onChange=
			{(event) => this.setState({[event.target.name]: event.target.value,})} required autoFocus/>
											</Grid>
											<Grid item>
												<Button variant="contained" color="primary" type="submit" className="button-block"> Login </Button>
											</Grid>
										</Grid>
									</form>
								</Grid>
								<Grid item>
									<Link href="#" variant="body2"> Forgot Password?</Link>
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
								<Button size="small" variant="contained" color="primary">Register as student</Button>
							</CardActions>
						</Card>
					</Box>
				</Box>
			</div>
    );
	}
}
export default App;