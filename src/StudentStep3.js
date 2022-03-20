import React, { useState,useEffect } from "react";
import {Button,TextField,Grid,Paper,AppBar,Typography,Toolbar,Box,Stack,Select,IconButton,Menu,MenuItem,
  Card,CardContent,Divider,LinearProgress} from "@mui/material";
import {MenuIcon,AccountCircle} from '@mui/icons-material/';
import { Link as RouterLink, MemoryRouter, useNavigate} from 'react-router-dom';
import './login.css';
import {auth,signout} from './Firebase';
import {option2,option1} from './ChartOptions'
import ConfigData from './config.json'

function StudentStep3 (){
	let navigate = useNavigate();

  const [accomplishmentslist, setalist] = useState(JSON.parse(sessionStorage.getItem("aclist"))||[{type:"", details:"", media: "", date:""}]);
  const [certificationslist, setclist] = useState(JSON.parse(sessionStorage.getItem("celist"))||[{name:"", details:"", media: ""}]);
  let authToken = sessionStorage.getItem('Auth Token')
  const [username, setusername] = React.useState("");
  const [studentid, setstudentid] = React.useState(0);
  const [anchorEl, setAnchorEl] = React.useState(null);

  useEffect(() => {
    
    let url = ConfigData.studentapi+auth.currentUser.email.replace("@","%40")+'/'+authToken

        if (authToken) {
            navigate('/studentprogress3')
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
  useEffect(() => {
    
    },[]);

  const handleAtypeChange = i => event =>{
    let accomplishments = [...accomplishmentslist];
    accomplishments[i].type = event.target.value;
    setalist(accomplishments);
    sessionStorage.setItem("aclist",JSON.stringify(accomplishments));
  }
  const handleAdetailChange = i => event =>{
    let accomplishments = [...accomplishmentslist]
    accomplishments[i].details = event.target.value
    setalist(accomplishments);
    sessionStorage.setItem("aclist",JSON.stringify(accomplishments));
  }
  const handleAfileChange = i => event =>{
    let accomplishments = [...accomplishmentslist]
    accomplishments[i].media = event.target.files[0];
    setalist(accomplishments);
    sessionStorage.setItem("aclist",JSON.stringify(accomplishments));
  }
  const handleAdateChange = i => event =>{
    let accomplishments = [...accomplishmentslist]
    accomplishments[i].date = event.target.value
    setalist(accomplishments);
    sessionStorage.setItem("aclist",JSON.stringify(accomplishments));
  }
  const handleCnameChange = i => event =>{
    let certifications = [...certificationslist]
    certifications[i].name = event.target.value
    setclist(certifications);
    sessionStorage.setItem("celist",JSON.stringify(certifications));
  }
  const handleCdetailChange = i => event =>{
    let certifications = [...certificationslist]
    certifications[i].details = event.target.value
    setclist(certifications);
    sessionStorage.setItem("celist",JSON.stringify(certifications));
  }
  const handleCfileChange = i => event =>{
    let certifications = [...certificationslist]
    certifications[i].media = event.target.files[0];
    setclist(certifications);
    sessionStorage.setItem("celist",JSON.stringify(certifications));
  }
  const handleAddClickA= event =>{
    event.preventDefault()
    let accomplishments = accomplishmentslist.concat({type:"", details:"", media:"", date:""})
    setalist(accomplishments);
    sessionStorage.setItem("aclist",JSON.stringify(accomplishments));
  }
  const handleAddClickC= event =>{
    event.preventDefault()
    let certifications = certificationslist.concat({name:"", details:"", media:""})
    setclist(certifications);
    sessionStorage.setItem("celist",JSON.stringify(accomplishments));
  }
  const handleDeleteA = i => e => {
    e.preventDefault()
    if(i>=1){
      let accomplishments = [
        ...accomplishmentslist.slice(0, i),
        ...accomplishmentslist.slice(i + 1)
      ]
      setalist(accomplishments);
      sessionStorage.setItem("aclist",JSON.stringify(accomplishments));
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
      sessionStorage.setItem("celist",JSON.stringify(certifications));
    }
  }
  const handleSubmit =() => {
    event.preventDefault();
    var noempty = 0;
    console.log(accomplishmentslist)
    console.log(certificationslist)
    for(var i=0;i<accomplishmentslist.length;i++)
    {
      let accomplishments = [...accomplishmentslist];
      if(accomplishments[i].type===""||accomplishments[i].date===""||
        accomplishments[i].details===""||accomplishments[i].media===""){
        noempty+=1;
        break;
      }
    }
    for(var i=0;i<certificationslist.length;i++)
    {
      let certifications = [...certificationslist];
      if(certifications[i].name===""||
        certifications[i].details===""||certifications[i].media===""){
        noempty+=1;
        break;
      }
    }
    if(noempty==0){
      if(option1.series[0].data[2].y==20){
        option1.series[0].data[2].y=0;
        option1.series[0].data[5].y+=20;
      }
      else if(option1.series[0].data[2].y==10){
        option1.series[0].data[2].y=0;
        option1.series[0].data[5].y+=10;
      }
      else{}
      sessionStorage.setItem("Step3",0)
    }
    else if(noempty==1){
      if(option1.series[0].data[2].y==20){
        option1.series[0].data[2].y=10;
        option1.series[0].data[5].y+=10;
      }
      else if(option1.series[0].data[2].y==0){
        option1.series[0].data[2].y=10;
        option1.series[0].data[2].y-=10;
      }
      else{}
      sessionStorage.setItem("Step3",10)
    }
    else{
      if(option1.series[0].data[2].y==0){
        option1.series[0].data[2].y=20;
        option1.series[0].data[5].y-=20;
      }
      else if(option1.series[0].data[2].y==10){
        option1.series[0].data[2].y=20;
        option1.series[0].data[5].y-=10;
      }
      else{}
      sessionStorage.setItem("Step3",20)
    }
    navigate("/studentprogress4")
  }
  const handleBefore =() =>{
    navigate("/studentprogress2");
  }
  async function handleLogout(event) {
    event.preventDefault();
    await signout();
    sessionStorage.removeItem('Auth Token');
    navigate("/Login");
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
        			<LinearProgress variant="determinate" sx={{height: 10, borderRadius: 5, pt:"10px"}} value={40} />
      			</Box>
      			<Box justifyContent="center" sx={{ minWidth: 35 }}>
        			<Typography variant="body2" color="text.secondary">40%</Typography>
      			</Box>
    			</Box>
				</Box>
				<Box sx={{ minWidth: 35, pt: "10px"}}>
        	<Typography variant="h5" color="text.secondary" align="center">Tell us more about your
        	Accomplishment(s) and certification(s)</Typography>
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
                          <MenuItem value={"publication"}>publication</MenuItem>
                          <MenuItem value={"project"}>project</MenuItem>
                          <MenuItem value={"honor_and_award"}>honor_and_award</MenuItem>
                          <MenuItem value={"test_score"}>test_score</MenuItem>
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
                      <Typography variant="h6">Date received</Typography>
                    </Grid> 
                    <TextField label="start-date" type="date" name="start_date" value={accomplishment.date} size='small'
                    sx={{ width: 220 }} InputLabelProps={{shrink: true,}} onChange={handleAdateChange(index)}/>
                  </Grid>
                  <Grid container direction="row">
                    <Grid item lg={4}>
                        <Typography variant="h6" sx={{fontWeight: "bold"}}>File</Typography>
                    </Grid> 
                    <Grid item lg={4} key={index}>  
                        <input type="file" accept=".doc,.docx,.pdf" 
                        onChange={handleAfileChange(index)}/>
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
                        <Typography variant="h6" sx={{fontWeight: "bold"}}>Certification name</Typography>
                    </Grid> 
                    <Grid item lg={4} key={index}>  
                        <TextField type="text" size='small' value={certification.name} onChange=
                          {handleCnameChange(index)} required autoFocus/>
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
                        onChange={handleCfileChange(index)}/>
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