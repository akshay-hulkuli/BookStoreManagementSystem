import React from 'react'
import { TextField, Box, Button, Divider, InputAdornment, IconButton, OutlinedInput } from '@mui/material';
import { styled } from '@mui/system';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

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
    return (
        <Root>
            <Box sx={{flexGrow:1}}>
                <Label id="label1">Name</Label>
                <TextField variant="outlined" size="small" fullWidth color="error" onFocus={()=>setColor('label1')} onBlur={()=>clearColor('label1')}/>
            </Box>
            <Box sx={{flexGrow:1}}>
                <Label id="label2">password</Label>
                <OutlinedInput 
                    variant="outlined" 
                    size="small" 
                    fullWidth 
                    type={showPassword?'text':'password'} 
                    color="error" 
                    onFocus={()=>setColor('label2')} 
                    onBlur={()=>clearColor('label2')}
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
                />
            </Box>
            <CustomButton variant="contained" fullWidth size="medium">Login</CustomButton>
            <Divider sx={{margin:'30px'}}>OR</Divider>
            <Box sx={{display:'flex'}}>
                <FaceBookButton variant="contained" fullWidth size="medium">Facebook</FaceBookButton>
                <GoogleButton variant="contained" fullWidth size="medium">Google</GoogleButton>
            </Box>
        </Root>
    )
}
