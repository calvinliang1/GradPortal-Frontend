import React, { useState,useEffect} from "react";
import {Button,TextField,Grid,Paper,AppBar,Typography,Toolbar,Box,IconButton,Menu,MenuItem,Stack,
	Card,CardContent,Divider,CardActions} from "@mui/material";
import {MenuIcon,AccountCircle} from '@mui/icons-material/';
import PropTypes from 'prop-types';
import { Link as RouterLink,useNavigate} from 'react-router-dom';
import {auth,signout} from './Firebase';
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import {option1,option2} from './ChartOptions'

function Main()
{
	let navigate = useNavigate();
  const [username, setusername] = React.useState("");
  const [anchorEl, setAnchorEl] = React.useState(null);

	useEffect(() => {
    let authToken = sessionStorage.getItem('Auth Token')
    let url = 'http://127.0.0.1:5000/api/student/'+auth.currentUser.email.replace("@","%40")+'/'+authToken

        if (authToken) {
          fetch(url,{
              method:'GET',
              headers : {
                'Content-Type':'application/json'
              }
            })
            .then(response => response.json())
            .then(response => {response.forEach(function(obj) { var output = obj.first_name+" "+obj.last_name;
              setusername(output)});})
            .catch(error => console.log(error))
            navigate("/in");
        }

        if (!authToken) {
            navigate('/login')
        }
    },[]);
	async function handleLogout(event) {
    event.preventDefault();
    await signout();
    sessionStorage.removeItem('Auth Token');
    navigate("/login");
  }
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
	return(
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
							<Button color="inherit" component={RouterLink} to="/login" onClick={handleLogout}>Logout</Button>
						</Toolbar>			
					</AppBar>
				</Box>
        <Stack direction="row" spacing={6} sx={{pt: "20px"}} justifyContent="center">
        <HighchartsReact highcharts={Highcharts} options={option1} />
        <HighchartsReact highcharts={Highcharts} options={option2} />
        </Stack>
		</div>
	);
}

export default Main;