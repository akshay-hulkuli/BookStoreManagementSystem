import React from 'react'
import icon from '../../assets/education.svg'
import './header.scss'
import { OutlinedInput, InputAdornment,IconButton, Box,Divider,Badge } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import {useSelector} from 'react-redux';
import { red } from '@mui/material/colors';

export default function Header() {
    const state  = useSelector(state => state);
    return (
        <div class="root">
            <div className="logo">
                <img src={icon} style={{paddingTop:'10px'}}/>
                <div class="header-text">bookstore</div>
            </div>
            <OutlinedInput
                placeholder="Search"
                name="search"
                startAdornment={<InputAdornment position="start"><IconButton sx={{color:'rgb(26, 26, 26)'}}><SearchIcon/></IconButton></InputAdornment>}
                sx={{width:{md:'40%',sm:'100%'},backgroundColor:'rgb(239, 239, 239)', color:'rgb(26, 26, 26)', margin:'5px 10px', borderRadius:'8px', height:'40px' }}  
            />
            <Box sx={{flexGrow:1}}/>
            <div className="icons">
                <Divider orientation="vertical" flexItem />
                <div className="iconbox">
                    <IconButton sx={{color:'white'}}><PersonOutlineOutlinedIcon/></IconButton>
                    <div className="caption">account</div>
                </div>
                <Divider orientation="vertical" flexItem />
                <div className="iconbox">
                    <IconButton sx={{color:'white'}}><Badge badgeContent={state.length} color="info"><ShoppingCartOutlinedIcon/></Badge></IconButton>
                    <div className="caption">cart</div>
                </div>
                <Divider orientation="vertical" flexItem />
            </div>
        </div>
    )
}
