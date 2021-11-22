import { Box, InputLabel, TextField,OutlinedInput,InputAdornment,IconButton, Button } from '@mui/material'
import { styled } from '@mui/system';
import React from 'react'
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

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
    const [showPassword, setShowPassword] = React.useState(false);
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    }
    const handleMouseDownPassword = (e) => {
        e.preventDefault();
    }
    return (
        <Root>
                <InputLabel sx={{color:'black',fontSize:'15px'}}>Full Name</InputLabel>
                <TextField id="" label="" variant="outlined" size="small" color="error" sx={{marginBottom:'10px'}}/>
                <InputLabel sx={{color:'black',fontSize:'15px'}}>Email Id</InputLabel>
                <TextField id="" label="" variant="outlined" size="small" color="error" sx={{marginBottom:'10px'}}/>
                <InputLabel sx={{color:'black',fontSize:'15px'}}>Password</InputLabel>
                <OutlinedInput 
                    variant="outlined" 
                    size="small" 
                    fullWidth 
                    type={showPassword?'text':'password'} 
                    color="error"
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
                    sx={{marginBottom:'10px'}}
                />
                <InputLabel sx={{color:'black',fontSize:'15px'}}>Mobile Number</InputLabel>
                <TextField id="" label="" variant="outlined" size="small" color="error" sx={{marginBottom:'10px'}}/>
                <CustomButton variant="contained" fullWidth size="medium">SignUp</CustomButton>
        </Root>
        
    )
}
