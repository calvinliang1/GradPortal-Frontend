import React, { useState,useEffect  } from "react";
import {Button,TextField,Grid,Paper,AppBar,Typography,Toolbar,Box,Stack,Select,IconButton,Menu,MenuItem,
  Card,CardContent,Divider,LinearProgress} from "@mui/material";
import {MenuIcon,AccountCircle} from '@mui/icons-material/';
import { Link as RouterLink, MemoryRouter, useNavigate} from 'react-router-dom';
import './login.css';
import {auth,signout} from './Firebase';
import {option2,option1} from './ChartOptions'
import ConfigData from "./config.json";

function StudentStep2 () {
	let navigate = useNavigate();
  let authToken = sessionStorage.getItem('Auth Token')
  const [academicinfolist, setacainfolist] = useState(/*JSON.parse(sessionStorage.getItem("academicinfolist"))||*/
    [{aname:"",major:"",degree_type:"",start_date:"",end_date:"",gpa:""}]);
  const [username, setusername] = React.useState("");
  const [aid, setaid] = React.useState(0);
  const [studentid, setstudentid] = React.useState(0);
  const [ainstlist, setainstList] = useState([""]);
  const [anchorEl, setAnchorEl] = React.useState(null);

  useEffect(() => {
    let url = ConfigData.studentapi+auth.currentUser.email.replace("@","%40")+'/'+authToken

        if (authToken) {
            navigate('/studentprogress2')
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
              let url1 = ConfigData.attendapi+obj.uuid+'/'+authToken
              fetch(url1,{
              method:'GET',
              headers : {
                'Content-Type':'application/json',
                'Access-Control-Allow-Origin':'*',
              },
              })
              .then(response => response.json())
              .then(response => {
                let index = 0; let academics = [...academicinfolist];
                response.forEach(function(obj) {
                  academics[index]={...academics[index],aname: obj.academic_institution_name};
                  academics[index]={...academics[index],major: obj.research_name};
                  academics[index]={...academics[index],degree_type: obj.degree};
                  academics[index]={...academics[index],start_date: obj.start_date};
                  academics[index]={...academics[index],end_date: obj.end_date};
                  academics[index]={...academics[index],gpa: obj.gpa};
                  index++;
                });setacainfolist(academics);})
              .catch(error => console.log(error))
            })})
            .catch(error => console.log(error));
        }

        if (!authToken) {
            navigate('/login')
        }
    },[]);
  useEffect(() => {
    let url2 = ConfigData.acainstapi+authToken;
      if(authToken){
        navigate('/studentprogress2');
        fetch(url2,{
              method:'GET',
              headers : {
                'Content-Type':'application/json',
                'Access-Control-Allow-Origin':'*'
              }
            })
            .then(response => response.json())
            .then(response => {
              var output = []
              response.forEach(function(obj) { 
                output.push(obj.name);
              })
              setainstList(output);
          })
            .catch(error => console.log(error));
      }
      else if (!authToken) {
            navigate('/login')
      }
    },[]);
  
  const handleAddClick= event =>{
    event.preventDefault()
    let academics = academicinfolist.concat([{aname:"",major:"",degree_type:"",
		start_date:"",end_date:"",gpa:""}]);
    setacainfolist(academics);
    //sessionStorage.setItem("academicinfolist",JSON.stringify(academics));
  }

  const handleDelete = i => e => {
    e.preventDefault()
    if(i>=1){
      let academics = [
        ...academicinfolist.slice(0, i),
        ...academicinfolist.slice(i + 1)
      ]
      setacainfolist(academics);
      //sessionStorage.setItem("academicinfolist",JSON.stringify(academics));
    }
  }

  const handleInputChange = index => event =>{
  	const { name, value } = event.target;
  	let academics = [...academicinfolist];
  	academics[index]={...academics[index],[name]: value};
  	setacainfolist(academics);
    //sessionStorage.setItem("academicinfolist",JSON.stringify(academics));
  }

  const handleSubmit = event =>{
    event.preventDefault();
    var noempty = 0;
    for(var i=0;i<academicinfolist.length;i++)
    {
    	let academics = [...academicinfolist];
      if(academics[i].aname===""||academics[i].degree_type===""||academics[i].major===""||
      	academics[i].start_date===""||academics[i].end_date===""||academics[i].gpa===""){
        noempty=1;
        break;
      }
    }
    if(noempty==0){
      if(option1.series[0].data[1].y==20){
        option1.series[0].data[1].y=0
        option1.series[0].data[5].y+=20
      }
      else{}
      let url1 = ConfigData.attendapi+studentid+'/'+authToken
      let outputlength = 0;
      console.log("got here 2")
      sessionStorage.setItem("Step2",0);
      fetch(url1,{
        method:'GET',
        headers : {
          'Content-Type':'application/json'
        },
      })
      .then(response => response.json())
      .then(response => {
        outputlength=response.length; 
        if(outputlength==0)
        {
          let url2 = ConfigData.attendapi+authToken
          for(var i=0; i<academicinfolist.length;i++){
            let academics = [...academicinfolist];
            var bodyv = "academic_institution_name="+academics[i].aname.replace(" ","%20")
            +"&research_name="+academics[i].major.replace(" ","%20")+
            "&degree="+academics[i].degree_type+"&student_id="+studentid+"&start_date="+academics[i].start_date+
            "&end_date="+academics[i].end_date+"&gpa="+academics[i].gpa;
            fetch(url2,{
              method:'POST',
              headers : {
                'accept': 'application/json',
                'Content-Type':'application/x-www-form-urlencoded'
              },
              body: bodyv,
            })
            .then(response => response.json())
            .then(response => {response.forEach(function(obj) {console.log(obj); });})
            .catch(error => console.log(error))
          }
        }
        else{
        response.forEach(function(obj) {
          let url3 = ConfigData.citizenapi+obj.uuid+'/'+authToken
          var bodyv = "academic_institution_name="+academics[i].aname.replace(" ","%20")
            +"research_name="+academics[i].major.replace(" ","%20")+
          "degree="+academics[i].degree_type+"student_id="+studentid+"start_date="+academics[i].start_date+
          "end_date="+academics[i].end_date+"gpa="+academics[i].gpa;
          fetch(url3,{
            method:'PUT',
            headers : {
              Accept: 'application/json',
              'Content-Type':'application/x-www-form-urlencoded',
            },
            body: bodyv,
          })
          .then(response => response.json())
          .then(response => { console.log(response);})
          .catch(error => console.log(error))
      });}
    })
      .catch(error => console.log(error))
      navigate("/studentprogress3")
    }
    else{
      if(option1.series[0].data[1].y==0){
        option1.series[0].data[1].y=20
        option1.series[0].data[5].y-=20
      }
      else{}
      sessionStorage.setItem("Step2",20);
      navigate("/studentprogress3");
    }  
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
											<Typography variant="h6">Academic Institution name</Typography>
										</Grid>	
										<Grid item lg={6} key={index}>
												<Select value={info.aname} label="" size='small' onChange=
                          {handleInputChange(index)} name="aname"required autoFocus>
                          {ainstlist.map(ainst=>(<MenuItem key={ainst} value={ainst}>{ainst}</MenuItem>))}
                          {/*
                          <MenuItem value={"UWO"}>UWO</MenuItem>
                          <MenuItem value={"UW"}>UW</MenuItem>
                          <MenuItem value={"UT"}>UT</MenuItem>
                          <MenuItem value={"Other"}>Other</MenuItem>*/}
                        </Select>
										</Grid>	
									</Grid>
                  <Grid container direction="row">
                    <Grid item lg={6}>
                        <Typography variant="h6">Major</Typography>
                    </Grid> 
                    <Grid item lg={6} key={index}>  
                        <TextField type="text" name="major" size='small' value={info.major} onChange=
                          {handleInputChange(index)} name="major" required autoFocus key={index}/>
                    </Grid>
                  </Grid>
									<Grid container direction="row">
										<Grid item lg={6}>
											<Typography variant="h6">Degree Type</Typography>
										</Grid>	
										<Grid item lg={6} key={index}>
												<Select value={info.degree_type} label="" size='small' onChange=
                          {handleInputChange(index)} name="degree_type" required autoFocus>
                          <MenuItem value={"bachelor"}>bachelor</MenuItem>
                          <MenuItem value={"master"}>master</MenuItem>
                          <MenuItem value={"doctoral"}>doctoral</MenuItem>
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