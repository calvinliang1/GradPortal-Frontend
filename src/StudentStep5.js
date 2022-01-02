import React, { useState } from "react";
import {Button,TextField,Grid,Paper,AppBar,Typography,Toolbar,Box,Stack,Select,MenuItem,
	Divider,LinearProgress} from "@mui/material";
import { Link as RouterLink, MemoryRouter, useNavigate } from 'react-router-dom';
import './login.css';
import {auth,signout} from './Firebase';

function StudentStep5 () {
	let navigate = useNavigate();

  const [research_interests, setrinterests] = useState(['']);

  const handleInputChange = i => event =>{
    let researchs = [...research_interests];
    researchs[i] = event.target.value;
    setrinterests(researchs);
  }
  const handleAddClick= event =>{
    event.preventDefault()
    let researchs = research_interests.concat([""])
    setrinterests(researchs);
  }
  const handleDelete = i => e => {
    e.preventDefault()
    if(i>=1){
    let researchs = [
      ...research_interests.slice(0, i),
      ...research_interests.slice(i + 1)
    ]
    setrinterests(researchs);
    }
  }
  const handleSubmit =()=> {
    event.preventDefault();
    var noempty = 0;
    for(var i=0;i<research_interests.length;i++)
    {
      if(research_interests[i]===""){
        noempty=1;
        break;
      }
    }
    if(noempty==0)
      alert("Valid");
    else
      alert('Empty interest field');
  }
  const handleBefore =() =>{
    navigate("/studentprogress4");
  }
  async function handleLogout(event) {
    event.preventDefault();
    await signout();
    navigate("/Login");
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
        			<LinearProgress variant="determinate" sx={{height: 10, borderRadius: 5, pt:"10px"}} value={80} />
      			</Box>
      			<Box justifyContent="center" sx={{ minWidth: 35 }}>
        			<Typography variant="body2" color="text.secondary">80%</Typography>
      			</Box>
    			</Box>
				</Box>
				<Box sx={{ minWidth: 35, pt: "10px"}}>
        	<Typography variant="h5" color="text.secondary" align="center">Tell us more about your
        	favourite research interest(s)</Typography>
      	</Box>
      	<Grid container spacing={0} justifyContent="center" direction="row" sx={{pt: "40px"}}>
					<form style={{minWidth: "500px"}}>
						{research_interests.map((research,index)=>(
							<span key={index}>
									<Grid container direction="row">
										<Grid item lg={4}>
												<Typography variant="h6" sx={{fontWeight: "bold"}}>Research interest</Typography>
										</Grid>	
										<Grid item lg={4}>	
												<TextField type="text" size='small' value={research} onChange=
													{handleInputChange(index)} required autoFocus/>
										</Grid>
										<Grid item lg={4}>
											<Button onClick={handleDelete(index)} size="small">remove</Button>
										</Grid>
									</Grid>
							</span>
						))}	
						<Grid item lg={3}>
							<Button variant="text" size="small" onClick={handleAddClick}>+add more</Button>
						</Grid>	
					</form>
				</Grid>
				<Stack direction="row" spacing={6} sx={{pt: "40px"}} justifyContent="center">
          <Button variant="contained" color="primary" sx={{mr: "200px"}} onClick={handleBefore} className="before-button">Back</Button>
					<Button variant="contained" color="primary" sx={{ml: "200px"}} onClick={handleSubmit} className="next-button">Next</Button>
				</Stack>
			</div>
    );
	
}
export default StudentStep5;