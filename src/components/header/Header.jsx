import React from 'react'
import icon from '../../assets/education.svg'
import './header.scss'
import { OutlinedInput, InputAdornment,IconButton, Box,Divider,Badge,Popover,Typography,Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import {useSelector} from 'react-redux';
import { red } from '@mui/material/colors';
import { useNavigate } from 'react-router-dom';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

export default function Header(props) {
    const state  = useSelector(state => state);
    const navigate  = useNavigate();

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;


    const searchOperation = (e) => {
        let searchedArray = new Array();
        if(props.mode === 'dashboard')
             searchedArray = props.backup.filter((cur)=> 
            (cur.bookName.toLowerCase().includes(e.target.value.toLowerCase())|| cur.author.toLowerCase().includes(e.target.value.toLowerCase())));
        if(props.mode === 'cart' || props.mode === 'wishlist')
             searchedArray = props.backup.filter((cur)=> 
            (cur.product_id.bookName.toLowerCase().includes(e.target.value.toLowerCase())|| cur.product_id.author.toLowerCase().includes(e.target.value.toLowerCase())));
        props.setBookData(searchedArray);
    }

    const logout = () => {
        localStorage.removeItem('accessToken');
        navigate('/');
    }

    const wishlist = () => {
        navigate('/wishlist');
    }

    const gotohome = () => {
        navigate('/dashboard');
    }
    return (
        <div class="root">
            <div className="logo" onClick={gotohome}>
                <img src={icon} style={{paddingTop:'10px'}}/>
                <div class="header-text">bookstore</div>
            </div>
            <OutlinedInput
                placeholder="Search"
                name="search"
                startAdornment={<InputAdornment position="start"><IconButton sx={{color:'rgb(26, 26, 26)'}}><SearchIcon/></IconButton></InputAdornment>}
                sx={{width:{md:'40%',sm:'100%'},backgroundColor:'rgb(239, 239, 239)', color:'rgb(26, 26, 26)', margin:'5px 10px', borderRadius:'8px', height:'40px' }}
                onChange={(e)=>searchOperation(e)}  
            />
            <Box sx={{flexGrow:1}}/>
            <div className="icons">
                <Divider orientation="vertical" flexItem />
                <div className="iconbox" onClick={handleClick}>
                    <IconButton sx={{color:'white'}} ><PersonOutlineOutlinedIcon/></IconButton>
                    <div className="caption">{localStorage.getItem('uname')}</div>
                </div>
                <Popover
                    id={id}
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                    }}
                >
                    <div className="profile">
                        <Typography sx={{ p: 1.5 }}>Hello <b>{localStorage.getItem('uname')}</b>,</Typography>
                        <div className="wishlist" onClick={wishlist}><FavoriteBorderIcon/><span style={{padding:'2px'}}>My WishList</span></div>
                        <Button variant="outlined" sx={{margin: '10px 20px'}} color="error" onClick={logout}>Logout</Button>
                    </div>
                </Popover>
                <Divider orientation="vertical" flexItem />
                <div className="iconbox" onClick={()=>navigate('/cart')}>
                    <IconButton sx={{color:'white'}}><Badge badgeContent={state.length} color="info"><ShoppingCartOutlinedIcon/></Badge></IconButton>
                    <div className="caption">cart</div>
                </div>
                <Divider orientation="vertical" flexItem />
            </div>
        </div>
    )
}
