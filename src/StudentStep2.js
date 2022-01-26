import React, { useState,useEffect  } from "react";
import {Button,TextField,Grid,Paper,AppBar,Typography,Toolbar,Box,Stack,Select,MenuItem,
  Divider,LinearProgress,InputLabel} from "@mui/material";
import { Link as RouterLink, MemoryRouter, useNavigate} from 'react-router-dom';
import './login.css';
import {auth,signout} from './Firebase';

function StudentStep2 () {
	let navigate = useNavigate();

  const [academicinfolist, setacainfolist] = useState(JSON.parse(sessionStorage.getItem("academicinfolist"))||
    [{country:"",aname:"",degree_type:"", start_date:"",end_date:"",gpa:""}]);

  useEffect(() => {
    let authToken = sessionStorage.getItem('Auth Token')

        if (authToken) {
            navigate('/studentprogress2')
        }

        if (!authToken) {
            navigate('/login')
        }
    },[]);
  
  const handleAddClick= event =>{
    event.preventDefault()
    let academics = academicinfolist.concat([{country:"",aname:"",degree_type:"",
		start_month:"",start_year:"",end_month:"",end_year:"",gpa:""}]);
    setacainfolist(academics);
    sessionStorage.setItem("academicinfolist",JSON.stringify(academics));
  }

  const handleDelete = i => e => {
    e.preventDefault()
    if(i>=1){
      let academics = [
        ...academicinfolist.slice(0, i),
        ...academicinfolist.slice(i + 1)
      ]
      setacainfolist(academics);
      sessionStorage.setItem("academicinfolist",JSON.stringify(academics));
    }
  }

  const handleInputChange = index => event =>{
  	const { name, value } = event.target;
  	let academics = [...academicinfolist];
  	academics[index]={...academics[index],[name]: value};
  	setacainfolist(academics);
    sessionStorage.setItem("academicinfolist",JSON.stringify(academics));
  }

  const handleSubmit =() => {
    event.preventDefault();
    var noempty = 0;
    for(var i=0;i<academicinfolist.length;i++)
    {
    	let academics = [...academicinfolist];
      if(academics[i].country===""||academics[i].aname===""||academics[i].degree_type===""||
      	academics[i].start_month===""||academics[i].start_year===""||academics[i].end_month===""||
      	academics[i].end_year===""||academics[i].gpa===""){
        noempty=1;
        break;
      }
    }
    if(noempty==0)
      navigate("/studentprogress3");
    else
      alert('Empty interest field');
  }
  const handleBefore =() =>{
    navigate("/studentprogress1");
  }
  async function handleLogout(event) {
    event.preventDefault();
    await signout();
    sessionStorage.removeItem('Auth Token');
    navigate("/Login");
  }
	
		return (
    	<div>
        <Box>
          <AppBar position="static" alignitems="center" color="primary">
						<Toolbar>
							<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>Gradportal</Typography>
							<Button color="inherit" component={RouterLink} to="/login" onClick={handleLogout}>Logout</Button>
						</Toolbar>			
					</AppBar>
				</Box>
				<Box>
					<Box justifyContent="center" sx={{ display: 'flex',pt: "10px"}}>
      			<Box justifyContent="center" sx={{ width: '60%', mr: 1}}>
        			<LinearProgress variant="determinate" sx={{height: 10, borderRadius: 5, pt:"10px"}} value={20} />
      			</Box>
      			<Box justifyContent="center" sx={{ minWidth: 35 }}>
        			<Typography variant="body2" color="text.secondary">20%</Typography>
      			</Box>
    			</Box>
				</Box>
				<Box sx={{ minWidth: 35, pt: "10px"}}>
        	<Typography variant="h5" color="text.secondary" align="center">
        		Tell us more about your basic post secondary education
        	</Typography>
      	</Box>
      	<Grid container rowSpacing={1} justifyContent="center" direction="row">
					<form style={{minWidth: "900px"}} >
						{academicinfolist.map((info,index)=>(
							<div key={index} className="academicpart">
									<Grid container direction="row">
										<Grid item lg={6}>
												<Typography variant="h6">Country of Academic Institution</Typography>
										</Grid>	
										<Grid item lg={6} key={index}>	
												<Select value={info.country} label="" size='small' onChange=
                          {handleInputChange(index)} name="country" required autoFocus>
                          <MenuItem value={"US"}>US</MenuItem>
                          <MenuItem value={"Canada"}>Canada</MenuItem>
                          <MenuItem value={"Other"}>Other</MenuItem>
                        </Select>
										</Grid>
									</Grid>
									<Grid container direction="row">
										<Grid item lg={6}>
											<Typography variant="h6">Academic Institution name</Typography>
										</Grid>	
										<Grid item lg={6} key={index}>
												<Select value={info.aname} label="" size='small' onChange=
                          {handleInputChange(index)} name="aname"required autoFocus>
                          <MenuItem value={"UWO"}>UWO</MenuItem>
                          <MenuItem value={"UW"}>UW</MenuItem>
                          <MenuItem value={"UT"}>UT</MenuItem>
                        </Select>
										</Grid>	
									</Grid>
									<Grid container direction="row">
										<Grid item lg={6}>
											<Typography variant="h6">Degree Type</Typography>
										</Grid>	
										<Grid item lg={6} key={index}>
												<Select value={info.degree_type} label="" size='small' onChange=
                          {handleInputChange(index)} name="degree_type" required autoFocus>
                          <MenuItem value={"BS"}>BS</MenuItem>
                          <MenuItem value={"MS"}>MS</MenuItem>
                          <MenuItem value={"DS"}>DS</MenuItem>
                        </Select>
										</Grid>	
									</Grid>
									<Grid container direction="row">
										<Grid item lg={4}>
											<Typography variant="h6">Start Date</Typography>
										</Grid>	
										<TextField label="start-date" type="date" name="start_date" value={info.start_date} size='small'
										sx={{ width: 220 }} InputLabelProps={{shrink: true,}} onChange={handleInputChange(index)}/>
									</Grid>
									<Grid container direction="row">
										<Grid item lg={4}>
											<Typography variant="h6">End Date</Typography>
										</Grid>	
										<TextField label="end-date" type="date" name="end_date" value={info.end_date} size='small'
										sx={{ width: 220 }} InputLabelProps={{shrink: true,}} onChange={handleInputChange(index)}/>
									</Grid>
									<Grid container direction="row">
										<Grid item lg={4}>
											<Typography variant="h6">GPA</Typography>
										</Grid>	
										<Grid item lg={4}>
												<TextField type="text" name="GPA" size='small' value={info.gpa} onChange=
                          {handleInputChange(index)} name="gpa" required autoFocus key={index}/>
										</Grid>	
										<Grid item lg={4}>
                      <Button onClick={handleDelete(index)} size="small">remove</Button>
                    </Grid>
									</Grid>
								</div>
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
export default StudentStep2;