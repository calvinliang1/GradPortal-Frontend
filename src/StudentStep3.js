import React, { useState } from "react";
import {Button,TextField,Grid,Paper,AppBar,Typography,Toolbar,Box,Stack,Select,MenuItem,
  Divider,LinearProgress} from "@mui/material";
import { Link as RouterLink, MemoryRouter, useNavigate} from 'react-router-dom';
import './login.css';
import {auth,signout} from './Firebase';

function StudentStep3 (){
	let navigate = useNavigate();

  const [accomplishmentslist, setalist] = useState([{type:"", details:"", media:""}]);
  const [certificationslist, setclist] = useState([{type:"", details:"", media:""}]);

  const handleAtypeChange = i => event =>{
    let accomplishments = [...accomplishmentslist];
    accomplishments[i].type = event.target.value;
    setalist(accomplishments);
  }
  const handleAdetailChange = i => event =>{
    let accomplishments = [...accomplishmentslist]
    accomplishments[i].details = event.target.value
    setalist(accomplishments);
  }
  const handleAfileChange = i => event =>{
    let accomplishments = [...accomplishmentslist]
    accomplishments[i].media = event.target.value
    setalist(accomplishments);
  }
  const handleCtypeChange = i => event =>{
    let certifications = [...certificationslist]
    certifications[i].type = event.target.value
    setclist(certifications);
  }
  const handleCdetailChange = i => event =>{
    let certifications = [...certificationslist]
    certifications[i].details = event.target.value
    setclist(certifications);
  }
  const handleCfileChange = i => event =>{
    let certifications = [...certificationslist]
    certifications[i].media = event.target.value
    setclist(certifications);
  }
  const handleAddClickA= event =>{
    event.preventDefault()
    let accomplishments = accomplishmentslist.concat({type:"", details:"", media:""})
    setalist(accomplishments);
  }
  const handleAddClickC= event =>{
    event.preventDefault()
    let certifications = certificationslist.concat({type:"", details:"", media:""})
    setclist(certifications);
  }
  const handleDeleteA = i => e => {
    e.preventDefault()
    if(i>=1){
      let accomplishments = [
        ...accomplishmentslist.slice(0, i),
        ...accomplishmentslist.slice(i + 1)
      ]
      setalist(accomplishments);
    }
  }
  const handleDeleteC = i => e => {
    e.preventDefault()
    if(i>=1){
      let certifications = [
        ...certificationslist.slice(0, i),
        ...certificationslist.slice(i + 1)
      ]
      setclist(certifications);
    }
  }
  const handleSubmit =() => {
    event.preventDefault();
    var noempty = 0;
    for(var i=0;i<accomplishmentslist.length;i++)
    {
      let accomplishments = [...accomplishmentslist];
      if(accomplishments[i].type===""||
        accomplishments[i].details===""||accomplishments[i].media===""){
        noempty=1;
        break;
      }
    }
    for(var i=0;i<certificationslist.length;i++)
    {
      let certifications = [...certificationslist];
      if(certifications[i].type===""||
        certifications[i].details===""||certifications[i].media===""){
        noempty=1;
        break;
      }
    }
    if(noempty==0)
      navigate("/studentprogress4")
    else
      alert('Empty interest field');
  }
  const handleBefore =() =>{
    navigate("/studentprogress2");
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
							<Button color="inherit" component={RouterLink} to="/login">Logout</Button>
						</Toolbar>			
					</AppBar>
				</Box>
				<Box>
					<Box justifyContent="center" sx={{ display: 'flex',pt: "10px"}}>
      			<Box justifyContent="center" sx={{ width: '60%', mr: 1}}>
        			<LinearProgress variant="determinate" sx={{height: 10, borderRadius: 5, pt:"10px"}} value={40} />
      			</Box>
      			<Box justifyContent="center" sx={{ minWidth: 35 }}>
        			<Typography variant="body2" color="text.secondary">40%</Typography>
      			</Box>
    			</Box>
				</Box>
				<Box sx={{ minWidth: 35, pt: "10px"}}>
        	<Typography variant="h5" color="text.secondary" align="center">Tell us more about your
        	favourite research interest(s)</Typography>
      	</Box>
      	<Grid container spacing={0} justifyContent="center" direction="row" sx={{pt: "40px"}}>
					<form style={{minWidth: "800px"}}>
						{accomplishmentslist.map((accomplishment,index)=>(
							<span key={index}>
                  <Grid container direction="row">
                    <Grid item lg={4}>
                        <Typography variant="h6" sx={{fontWeight: "bold"}}>Accomplishment type</Typography>
                    </Grid> 
                    <Grid item lg={4} key={index}>  
                        <Select value={accomplishment.type} label="" size='small' onChange=
                          {handleAtypeChange(index)} required autoFocus>
                          <MenuItem value={"US"}>US</MenuItem>
                          <MenuItem value={"Canada"}>Canada</MenuItem>
                          <MenuItem value={"Other"}>Other</MenuItem>
                        </Select>
                    </Grid>
                  </Grid>
									<Grid container direction="row">
										<Grid item lg={4}>
												<Typography variant="h6" sx={{fontWeight: "bold"}}>Detail</Typography>
										</Grid>	
										<Grid item lg={4} key={index}>	
												<TextField type="text" size='small' value={accomplishment.details} onChange=
													{handleAdetailChange(index)} required autoFocus/>
										</Grid>
									</Grid>
                  <Grid container direction="row">
                    <Grid item lg={4}>
                        <Typography variant="h6" sx={{fontWeight: "bold"}}>File</Typography>
                    </Grid> 
                    <Grid item lg={4} key={index}>  
                        <input type="file" accept=".doc,.docx,.pdf" 
                      value={accomplishment.media} onChange={handleAfileChange(index)}/>
                    </Grid>
                    <Grid item lg={4}>
                      <Button onClick={handleDeleteA(index)} size="small">remove</Button>
                    </Grid>
                  </Grid>
							</span>
						))}	
						<Grid item lg={3}>
							<Button variant="text" size="small" onClick={handleAddClickA}>+add more</Button>
						</Grid>
            {certificationslist.map((certification,index)=>(
              <span key={index}>
                  <Grid container direction="row">
                    <Grid item lg={4}>
                        <Typography variant="h6" sx={{fontWeight: "bold"}}>Certification type</Typography>
                    </Grid> 
                    <Grid item lg={4} key={index}>  
                        <Select value={certification.type} label="" size='small' onChange=
                          {handleCtypeChange(index)} required autoFocus>
                          <MenuItem value={"US"}>US</MenuItem>
                          <MenuItem value={"Canada"}>Canada</MenuItem>
                          <MenuItem value={"Other"}>Other</MenuItem>
                        </Select>
                    </Grid>
                  </Grid>
                  <Grid container direction="row">
                    <Grid item lg={4}>
                        <Typography variant="h6" sx={{fontWeight: "bold"}}>Detail</Typography>
                    </Grid> 
                    <Grid item lg={4} key={index}>  
                        <TextField type="text" size='small' value={certification.details} onChange=
                          {handleCdetailChange(index)} required autoFocus/>
                    </Grid>
                  </Grid>
                  <Grid container direction="row">
                    <Grid item lg={4}>
                        <Typography variant="h6" sx={{fontWeight: "bold"}}>File</Typography>
                    </Grid> 
                    <Grid item lg={4} key={index}>  
                        <input type="file" accept=".doc,.docx,.pdf" 
                      value={certification.media} onChange={handleCfileChange(index)}/>
                    </Grid>
                    <Grid item lg={4}>
                      <Button onClick={handleDeleteC(index)} size="small">remove</Button>
                    </Grid>
                  </Grid>
              </span>
            ))} 
            <Grid item lg={3}>
              <Button variant="text" size="small" onClick={handleAddClickC}>+add more</Button>
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
export default StudentStep3;