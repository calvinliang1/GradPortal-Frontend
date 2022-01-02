import React from "react";
import {Button,TextField,Grid,Paper,AppBar,Typography,Toolbar,Box,
	Card,CardContent,Divider,CardActions} from "@mui/material";
import PropTypes from 'prop-types';
import { Link as RouterLink} from 'react-router-dom';
function Home()
{
	return(
		<div>
        <Box>
          <AppBar position="static" alignitems="center" color="primary">
						<Toolbar>
							<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>Gradportal</Typography>
							<Button color="inherit" component={RouterLink} to="login">Login</Button>
						</Toolbar>			
					</AppBar>
				</Box>
		</div>
	);
}

export default Home;