import { styled } from "@mui/material/styles";
import { Box, Tab, Tabs } from '@mui/material'
import React from 'react'
import './orderLogin.scss'
import bg from '../../assets/bg_img.png'
import Login from '../login/Login'
import SignUp from "../signup/SignUp";

const StyledTabs = styled((props) => (
    <Tabs
      {...props}
      centered
      TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
    />
  ))({
      
    "& .MuiTabs-indicator": {
      display: "flex",
      justifyContent: "center",
      backgroundColor: "transparent",
    },
    "& .MuiTabs-indicatorSpan": {
      maxWidth: 20,
      width: "100%",
      backgroundColor: "#A03037",
    },
});
  
const StyledTab = styled((props) => <Tab disableRipple {...props} />)(({ theme }) => ({
    textTransform: "none",
    fontWeight: theme.typography.fontWeightRegular,
    fontSize: theme.typography.pxToRem(25),
    marginRight: theme.spacing(3),
    color: "#878787",
    fontWeight: 'bold',
    textTransform: 'uppercase',
    "&.Mui-selected": {
    color: "#0A0102"
    },
    "&.Mui-focusVisible": {
    backgroundColor: "rgba(100, 95, 228, 0.32)"
    }
})
);
  

export default function OderLogin() {
    const [value, setValue] = React.useState(1);
  
    const handleChange = (event, newValue) => {
      setValue(newValue);
      console.log(newValue);
    };
    return (
        <div  class="login-root">
            <div class="login-root-left">
                <div class="login-root-left-left">
                    <img src={bg} class="logo"/>
                    <span class="text">online book shoping</span>
                </div>
                
            </div>
            <div class="login-root-right">
                <Box sx={{ width: "100%" }}>
                    <Box>
                        <StyledTabs
                        value={value}
                        onChange={handleChange}
                        aria-label="styled tabs example"
                        >
                            <StyledTab label="Login" value={1}/>
                            <StyledTab label="SignUp" value={2} />
                        </StyledTabs>
                        {value===1 ? (
                        window.history.pushState('','Login','/'),
                        <Login/> )
                        : (
                        window.history.pushState('','SignUp','/signup'),
                        <SignUp/>)}
                    </Box>
                </Box>
            </div>
        </div>
    )
}
