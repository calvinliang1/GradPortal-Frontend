import React, { useState,useEffect } from "react";
import {Button,TextField,Grid,Paper,AppBar,Typography,Toolbar,Box,Stack,Select,IconButton,Menu,MenuItem,
  Card,CardContent,Divider,LinearProgress} from "@mui/material";
import {MenuIcon,AccountCircle} from '@mui/icons-material/';
import { Link as RouterLink, MemoryRouter, useNavigate, useParams } from 'react-router-dom';
import './login.css';
import {auth,signout} from './Firebase';
import {option2,option1} from './ChartOptions'
import ConfigData from './config.json'

function StudentStep5 () {
	let navigate = useNavigate();
  let params = useParams();

  const [research_interests, setrinterests] = useState(//JSON.parse(sessionStorage.getItem("r_interests_list"))||
    ['']);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [username, setusername] = React.useState("");
  const [studentid, setstudentid] = React.useState(0);
  const [researchslist, setrlists] = useState(['']);
  const [textreslist, settreslist] = useState(['']);

  let authToken = sessionStorage.getItem('Auth Token')

  useEffect(() => {
    let url = ConfigData.studentapi+auth.currentUser.email.replace("@","%40")+'/'+authToken
        if (authToken) {
          navigate('/studentprogress5')
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
              let url1 = ConfigData.interestinapi+obj.uuid+'/'+authToken
              fetch(url1,{
              method:'GET',
              headers : {
                'Content-Type':'application/json',
                'Access-Control-Allow-Origin':'*',
              },
              })
              .then(response => response.json())
              .then(response => {
                var listofres = []
                response.forEach(function(obj) {
                  listofres.push(obj.research_name)
                });
                if(listofres.length>0){
                  setrinterests(listofres);
                }
                else{
                  setrinterests(['']);
                }
              })
              .catch(error => console.log(error))
            })})
            .catch(error => console.log(error));
        }

        if (!authToken) {
          navigate('/login')
        }
    },[]);

  useEffect(() => {
      let url2 = ConfigData.researchapi+authToken;
      if(authToken){
        navigate('/studentprogress5');
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
              output.push("Other")
              setrlists(output)
          })
            .catch(error => console.log(error));
      }
      else if (!authToken) {
            navigate('/login')
      }
  },[]);
  
  const handleInputChange = i => event =>{
    let researchs = [...research_interests];
    researchs[i] = event.target.value;
    setrinterests(researchs);
    sessionStorage.setItem("r_interests_list",JSON.stringify(researchs));
  }
  const handleAddClick= event =>{
    event.preventDefault()
    let researchs = research_interests.concat([""])
    setrinterests(researchs);
    sessionStorage.setItem("r_interests_list",JSON.stringify(researchs));
  }
  const handleDelete = i => e => {
    e.preventDefault()
    if(i>=1){
    let researchs = [
      ...research_interests.slice(0, i),
      ...research_interests.slice(i + 1)
    ]
    setrinterests(researchs);
    sessionStorage.setItem("r_interests_list",JSON.stringify(researchs));
    }
  }
  const handleSubmit =()=> {
    event.preventDefault();
    var noempty = 0;
    let url1 = ConfigData.interestinapi+studentid+'/'+authToken
    let outputlength = 0;
    let uuidlist = [];
    for(var i=0;i<research_interests.length;i++)
    {
      if(research_interests[i]===""){
        noempty=1;
        break;
      }
    }
    if(noempty==0){
      sessionStorage.setItem("Step5",0);
      for(var i=0;i<option2.series.length; i++)
      {
        for(var j=0;j<research_interests.length;j++){
          if(option2.series[i].name===research_interests[j]){
            option2.series[i].visible = true;
          }
        }
      }
      fetch(url1,{
          method:'GET',
          headers : {
            'Content-Type':'application/json'
          },
        })
        .then(response => response.json())
        .then(response =>{outputlength=response.length; 
          if(outputlength==0)
          {
            for (var i=0; i<research_interests.length; i++){
              let url2 = ConfigData.interestinapi+authToken
              var bodyv = "student_id="+studentid+"&research_name="+research_interests[i];
              fetch(url2,{
                method:'POST',
                headers : {
                  Accept: 'application/json',
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
          if(outputlength!=research_interests.length)
          {
            response.forEach(function(obj) {
              let url2 = ConfigData.interestinapi+obj.uuid+authToken
              fetch(url2,{
                method:'DELETE',
                headers : {
                  Accept: 'application/json',
                },
              })
              .then(response => response.json())
              .catch(error => console.log(error))
            });
            for (var i=0; i<research_interests.length; i++){
              let url3 = ConfigData.interestinapi+authToken
              var bodyv = "student_id="+studentid+"&research_name="+research_interests[i];
              fetch(url3,{
                method:'POST',
                headers : {
                  Accept: 'application/json',
                  'Content-Type':'application/x-www-form-urlencoded'
                },
                body: bodyv,
              })
              .then(response => response.json())
              .then(response => {response.forEach(function(obj) {console.log(obj); });})
              .catch(error => console.log(error))
            }
          }
          else if(outputlength=research_interests.length)
          {
            response.forEach(function(obj){
              let url3 = ConfigData.interestinapi+obj.uuid+'/'+authToken
              var bodyv = "research_name="+obj.research_name;
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
            });
          }
        }
        })
      if(option1.series[0].data[4].y==20){
        option1.series[0].data[4].y=0;
        option1.series[0].data[5].y+=20;
      }
      else{}
    }
    else{
      if(option1.series[0].data[4].y==0){
        option1.series[0].data[4].y=20;
        option1.series[0].data[5].y-=20;
      }
      else{}
      //alert("Fill in your interests correctly, some are empty")
      sessionStorage.setItem("Step5",20);
    }
    navigate("/in");
  }
  const handleBefore =() =>{
    navigate("/studentprogress4");
  }
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
                      {/*<Select value={research} 
                        onChange={handleInputChange(index)} required autoFocus>
                        {researchslist.map(rs=>(<MenuItem key={rs} value={rs}>{rs}</MenuItem>))}
                      </Select>*/}
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
					<Button variant="contained" color="primary" sx={{ml: "200px"}} onClick={handleSubmit} className="next-button">Save</Button>
				</Stack>
			</div>
    );
	
}
export default StudentStep5;