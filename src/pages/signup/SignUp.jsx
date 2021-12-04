import { Box, InputLabel, TextField,OutlinedInput,InputAdornment,IconButton, Button,FormHelperText, Snackbar } from '@mui/material'
import { styled } from '@mui/system';
import React from 'react'
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import UserService from '../../services/UserService';

const userService = new UserService();

const CustomButton = styled(Button) (({theme}) => ({
    background:'#A03037',
    "&:hover": {
        background:'#A03037'
    },
    marginTop:'10px',
    textTransform:'capitalize'
}))

const Root = styled('div') (({theme}) => ({
    display: 'flex',
    flexDirection:'column',
    [theme.breakpoints.down('sm')]: {
        padding: '20px 10px'
    },
    [theme.breakpoints.up('sm')]: {
        padding: '20px 50px'
    },
}))

export default function SignUp() {
    const [openSnackbar, setOpenSnackBar] = React.useState(false);
    const [message, setMessage] = React.useState("");
    const [inputData, setInputData] = React.useState({
        "name": "",
        "nameError": false,
        "email": "",
        "emailError": false,
        "psw":"",
        "pswError": false,
        "mobile":"",
        "mobileError": false
    })
    const [showPassword, setShowPassword] = React.useState(false);
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    }
    const handleMouseDownPassword = (e) => {
        e.preventDefault();
    }

    const handleSnackbarClose = (event , reason) => {
        if(reason === 'clickaway'){
            return;
        }
        setOpenSnackBar(false);
    }

    const handleChange = (e) => {
        var data = inputData;
        switch(e.target.name){
            case "name": data.name = e.target.value;
                         break;
            case "email": data.email = e.target.value;
                         break;
            case "psw": data.psw = e.target.value;
                         break;
            case "mobile": data.mobile = e.target.value;
                         break;
        } 

        setInputData({...inputData,data});
        // console.log(data)
    }

    const isValid = () => {
        var error = false;
        var data = inputData;

        var emailReg = RegExp("(^[a-zA-Z][a-zA-Z0-9_-]*[a-zA-Z0-9])(([+_.-][a-zA-Z0-9]*)?)(@[a-zA-Z0-9]+)([.])([a-z]{2,})(([.][a-z]{2,})?)");
        var mobileReg = RegExp('^(([+]?[1-9][0-9])?)([6-9][0-9]{9})$');

        data.nameError = data.name !== "" ? false: true;
        data.pswError = data.psw !== "" ? false : true;
        data.emailError = (data.emailError !== "" && emailReg.test(data.email)) ? false: true;
        data.mobileError = (data.mobile !== "" && mobileReg.test(data.mobile)) ? false :true;

        setInputData({...inputData, data});
        console.log(inputData)
        return error = (data.nameError || data.pswError || data.emailError || data.mobileError);
    }

    const submitForm = () => {
        setOpenSnackBar(true);
        if(!isValid()){
            console.log("successful validation");
            var data = {
                'fullName': inputData.name,
                'email': inputData.email,
                'password':inputData.psw,
                'phone': inputData.mobile
            }
            userService.Registration('bookstore_user/registration',data)
                .then((a)=>{
                    console.log("successful registration");
                    console.log(a);
                    setMessage('Registration sucessful, verification mail sent')
                })
                .catch((err)=>{
                    console.log(err);
                    setMessage('Registration failed')
                })
        }
        else {
            console.log("validation failed");
        }
    }
    return (
        <Root>
                <InputLabel sx={{color:'black',fontSize:'15px'}}>Full Name</InputLabel>
                <TextField 
                    name="name" 
                    label="" 
                    variant="outlined" 
                    size="small" 
                    error= {inputData.nameError} 
                    onChange ={(e)=>handleChange(e)}
                    helperText = {inputData.nameError?"this is can't be empty":" "}
                />
                <InputLabel sx={{color:'black',fontSize:'15px'}}>Email Id</InputLabel>
                <TextField 
                    name="email" 
                    label="" 
                    variant="outlined" 
                    size="small"  
                    error= {inputData.emailError}
                    onChange ={(e)=>handleChange(e)}
                    helperText = {inputData.emailError?"Enter correct data":" "}
                />
                <InputLabel sx={{color:'black',fontSize:'15px'}}>Password</InputLabel>
                <OutlinedInput 
                    variant="outlined" 
                    size="small" 
                    name="psw"
                    fullWidth 
                    type={showPassword?'text':'password'} 
                    error= {inputData.pswError}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <Visibility />:<VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    }
                    onChange ={(e)=>handleChange(e)}
                />
                <FormHelperText error= {inputData.pswError} sx={{marginLeft:'15px'}} >{inputData.pswError?"this field can't be empty":" "}</FormHelperText>
                <InputLabel sx={{color:'black',fontSize:'15px'}}>Mobile Number</InputLabel>
                <TextField 
                    name="mobile" 
                    label="" 
                    variant="outlined" 
                    size="small" 
                    onChange ={(e)=>handleChange(e)}
                    helperText = {inputData.mobileError?"enter Correct data":" "}
                    error= {inputData.mobileError}
                />
                <CustomButton variant="contained" fullWidth size="medium" onClick={submitForm}>SignUp</CustomButton>
                <Snackbar open ={openSnackbar} autoHideDuration={4000} onClose={handleSnackbarClose}
                    message={message}
                    anchorOrigin = {{
                        vertical: 'bottom',
                        horizontal : 'right'
                    }}
                >
                </Snackbar>
        </Root>
        
    )
}
