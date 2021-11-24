import React from 'react'
import { TextField, Box, Button, Divider, InputAdornment, IconButton, OutlinedInput,FormHelperText } from '@mui/material';
import { styled } from '@mui/system';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import UserService from '../../services/UserService';
import {useNavigate} from 'react-router-dom';

const userService = new UserService();

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

const Label = styled('p') (({theme}) => ({
    marginBottom : '3px',
    fontSize: '14px'
}))

const CustomButton = styled(Button) (({theme}) => ({
    background:'#A03037',
    "&:hover": {
        background:'#A03037'
    },
    marginTop:'30px',
    textTransform:'capitalize'
}))

const FaceBookButton = styled(Button) (({theme}) => ({
    background:'#4266B2',
    "&:hover": {
        background:'#4266B2'
    },
    textTransform:'capitalize',
    marginRight:'3px'
}))

const GoogleButton = styled(Button) (({theme}) => ({
    background:'#F5F5F5',
    "&:hover": {
        background:'#F5F5F5'
    },
    textTransform:'capitalize',
    color:'black',
    marginLeft:'3px'
}))

export default function Login() {
    const [showPassword, setShowPassword] = React.useState(false);
    const [inputData, setInputData] = React.useState({
        "email" : "",
        "emailError" : false,
        "psw": "",
        "pswError": false
    });
    const navigate = useNavigate();
    const setColor = (id) => {
        document.getElementById(id).style.color = 'red';
    } 
    const clearColor = (id) => {
        document.getElementById(id).style.color = 'black';
    }
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    }
    const handleMouseDownPassword = (e) => {
        e.preventDefault();
    }

    const handleChange = (e) => {
        var data = inputData;
        switch(e.target.name){
            case 'email': data.email = e.target.value;
                          break;
            case 'psw' : data.psw = e.target.value;
                         break;
        }
        setInputData({...inputData,data});
        // console.log(data)
    }

    const isValid = () => {
        var error = false;
        var data = inputData;

        var emailReg = RegExp("(^[a-zA-Z][a-zA-Z0-9_-]*[a-zA-Z0-9])(([+_.-][a-zA-Z0-9]*)?)(@[a-zA-Z0-9]+)([.])([a-z]{2,})(([.][a-z]{2,})?)");

        data.emailError = (data.email !== "" && emailReg.test(data.email) ) ? false: true;
        data.pswError = (data.psw !== "") ? false : true;

        setInputData({...inputData, data});
        console.log(inputData);
        error = (data.pswError || data.emailError);
        return error;
    }

    const submitForm = () => {
        if(!isValid()){
            console.log("validation successfull");
            var data = {
                'email': inputData.email,
                'password':inputData.psw,
            }
            userService.Registration('bookstore_user/login',data)
                .then((a)=>{
                    console.log("successfully logged in");
                    console.log(a);
                    localStorage.setItem('accessToken',a.data.result.accessToken);
                    navigate('/dashboard');
                })
                .catch((err)=>{
                    console.log(err);
                })
        }
        else {
            console.log("validation failed");
        }
    }
    return (
        <Root>
            <Box sx={{flexGrow:1}}>
                <Label id="label1">Email Id</Label>
                <TextField 
                    variant="outlined" 
                    size="small" 
                    name="email" 
                    fullWidth 
                    error={inputData.emailError}
                    helperText = {inputData.emailError?"Enter correct Email id": ""}
                    onChange={(e)=>handleChange(e)}
                />
            </Box>
            <Box sx={{flexGrow:1}}>
                <Label id="label2">password</Label>
                <OutlinedInput 
                    name="psw"
                    variant="outlined" 
                    size="small" 
                    fullWidth 
                    type={showPassword?'text':'password'} 
                    error={inputData.pswError}
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
                    // helperText = {inputData.pswError?"this field can't be empty":""}
                    onChange={(e)=>handleChange(e)}
                />
                <FormHelperText error={inputData.pswError} sx={{paddingLeft:'15px'}}>{inputData.pswError?"this field can't be empty":""}</FormHelperText>
            </Box>
            <CustomButton variant="contained" fullWidth size="medium" onClick={submitForm}>Login</CustomButton>
            <Divider sx={{margin:'30px'}}>OR</Divider>
            <Box sx={{display:'flex'}}>
                <FaceBookButton variant="contained" fullWidth size="medium">Facebook</FaceBookButton>
                <GoogleButton variant="contained" fullWidth size="medium">Google</GoogleButton>
            </Box>
        </Root>
    )
}
