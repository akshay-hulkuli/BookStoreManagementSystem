import React from 'react'
import Header from '../../components/header/Header'
import Footer from '../../components/footer/Footer'
import './dashboard.scss'
import MenuItem from '@mui/material/MenuItem';
import {FormControl,Box,IconButton, Grid, Button, Stack,PaginationItem, Popper, Fade, Paper, Typography} from '@mui/material';
import Select from '@mui/material/Select';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import BookService from '../../services/BookServices';
import image from '../../assets/Image 23.png'
import {styled} from '@mui/system'
import Pagination from '@mui/material/Pagination';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import {useDispatch,useSelector} from 'react-redux';
import { addToCart,removeFromCart, initialiseCart, addToWishList, initializeWishList } from '../../actions';
import bookloader from '../../assets/bookLoad.gif'

const theme = createTheme({
  palette: {
    myColor: {
      main: "#A03037",
      contrastText: 'white'
    }
  }
});

const bookService = new BookService();

const filterOptions = [
    'Price: Low to High',
    'Price: High to Low',
    'Title: A-Z',
    'Title: Z-A'
]

const CustomButton = styled(Button) (({theme}) => ({
    background:'#A03037',
    "&:hover": {
        background:'#A03037'
    },
    textTransform:'uppercase',
    color:'white',
    marginLeft:'3px',
    border:'black 1px solid',
    padding:'5px 20px'
}))

const a = () => {
    return (
      <IconButton sx={{border: '2px solid #E2E2E2'}}><ChevronLeftRoundedIcon/></IconButton>
    )
}

const b = () => {
    return (
      <IconButton sx={{border: '2px solid #E2E2E2'}}> <ChevronRightRoundedIcon/> </IconButton>
    )
}

export default function Dashboard() {
    const [sortingFilter, setSortingFilter] = React.useState(-1);
    const [bookData, setBookData] = React.useState([]);
    const [backup,setBackup] = React.useState([]);
    const [currentPage, setCurrentPage] = React.useState(1);
    const [wishlist, setWishlist] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [bookDetail, setBookDetail] = React.useState(null);
    const [openPopper, setOpenPopper] = React.useState(false);
    const booksPerPage = 8;
    const dispatch = useDispatch();
    const cartData = useSelector(state => state);
    let indexOfLastTodo = currentPage * booksPerPage;
    let indexOfFirstTodo = indexOfLastTodo - booksPerPage;
    let currentBooks = bookData.slice(indexOfFirstTodo, indexOfLastTodo);

    const handleHover = () => (event) => {
        setBookDetail(event.currentTarget);
        setOpenPopper((prev) => true);
    };

    const handleHover2 = () => () => {
        setBookDetail(null);
        setOpenPopper((prev) => false);
    };

    async function getCart ()  {
       dispatch(initialiseCart())
    }

    const getData = () => {
        bookService.getBooks('bookstore_user/get/book')
            .then((res)=>{
                console.log(res);
                setBookData(res.data.result);
                setBackup(res.data.result);
            })
            .catch((err)=>{
                console.log(err);
            })
    }

    const getWishList = () => {
        bookService.getWishList('bookstore_user/get_wishlist_items',localStorage.getItem('accessToken'))
            .then ((res) => {
                console.log(res);
                let ids = [];
                res.data.result.map(cur => {
                    ids.push(cur.product_id._id)
                })
                setWishlist(ids);
            })
            .catch((err)=>{
                console.log(err);
            })
    }

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
        indexOfLastTodo = currentPage * booksPerPage;
        indexOfFirstTodo = indexOfLastTodo - booksPerPage;
        currentBooks = bookData.slice(indexOfFirstTodo, indexOfLastTodo);
    };

    React.useEffect(()=>{
        getCart();
        getWishList();
        setTimeout(()=>{
            setLoading(false);
        },2000);
    },[])

    React.useEffect(()=>{
        console.log("redux state change")
        console.log(cartData)
        getData();
    },[cartData])

    React.useEffect(()=>{
        getData();
    },[wishlist])

    const handleChange = (event) => {
        setSortingFilter(event.target.value);
        switch(event.target.value){
            case 1: var array = backup.sort((cur1, cur2)=> cur1.price - cur2.price);
                    setBookData(array);
                    break;
            case 2: var array = backup.sort((cur1,cur2)=> cur2.price - cur1.price);
                    setBookData(array);
                    break;
            case 3: var array = backup.sort((cur1,cur2)=> {
                                    if(cur1.bookName < cur2.bookName) return -1;
                                    else if(cur1.bookName > cur2.bookName) return 1;
                                    else return 0
                                });
                    setBookData(array);
                    break;
            case 4: var array = backup.sort((cur1,cur2)=> {
                                    if(cur2.bookName < cur1.bookName) return -1;
                                    else if(cur2.bookName > cur1.bookName) return 1;
                                    else return 0
                                });
                    setBookData(array);
                    break;
        }
    };

    const buttons = (book) => {
        // console.log(cartData, book._id);
        if(cartData.includes(book._id)){
            return (
                <div className="buttons">
                    <CustomButton
                            sx={{background:'#3371B5', '&:hover':{background:'#3371B5'}, color:'white', width:'100%'}}
                    > Added to cart
                    </CustomButton>
                </div>
            );
        }
        else if (wishlist.includes(book._id)){
            return (
                <div className="buttons">
                    <CustomButton
                            sx={{background:'white', '&:hover':{background:'white'}, color:'black', width:'100%'}}
                    > Added to wishlist
                    </CustomButton>
                </div>
            );
        }
        else{
            return (
                <div className="buttons">
                    <CustomButton onClick={()=>addToBag(book)}>Add to bag</CustomButton>
                    <CustomButton
                        sx={{background:'white', '&:hover':{background:'white'}, color:'black'}}
                        onClick = {()=>addToWishList(book)}
                    > wishlist
                    </CustomButton>
                </div>
            );
        }
    }

    function addToBag(book) {
        dispatch(addToCart(book,getCart()));
    }

    const addToWishList = (book) => {
        const payload = {
            "product_id": book._id
        }
        var url = `bookstore_user/add_wish_list/${book._id}`;
        bookService.addToWishList(url,payload)
            .then((res)=>{
                console.log("added to wish list");
                setWishlist(wishlist => wishlist.concat(book._id));
            })
            .catch((err)=>{
                console.log(err);
            })
    }

    return (
        <div class="dashboard">
            {loading ? <div className="preloader"><img src={bookloader}/></div> : ""}
            <div>
                <Header mode="dashboard" bookData={bookData} setBookData ={setBookData} backup={backup}/>
                <div className="main">
                    <div className="main-header">
                        <div className="main-header-left"><span style={{fontSize:'24px'}}>Books</span><span style={{color:'#9D9D9D'}} id="items">({bookData.length} items)</span></div>
                        <div>
                            <Box sx={{ minWidth: {md:200}}}>
                                <FormControl fullWidth>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={sortingFilter}
                                        onChange={handleChange}
                                        IconComponent={KeyboardArrowDownOutlinedIcon}
                                        size='small'
                                        renderValue = {()=> {
                                            if(sortingFilter === -1 )
                                                return <em>select sorting option</em>
                                            else
                                                return <em>{filterOptions[sortingFilter-1]}</em>
                                        }}
                                    >
                                        <MenuItem value={1}>Price: Low to High</MenuItem>
                                        <MenuItem value={2}>Price: High to Low</MenuItem>
                                        <MenuItem value={3}>Title: A-Z</MenuItem>
                                        <MenuItem value={4}>Title: Z-A</MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>
                        </div>
                    </div>
                    <Grid container spacing={4} sx={{minHeight:'68vh'}}>
                        {currentBooks.map((book,index)=>(
                            <Grid item xs={12} sm={6} md={4} lg={4} xl={3}>
                                <div className='card' onMouseEnter={handleHover()} onMouseLeave={handleHover2()}>
                                    <div className="card-media">
                                        <img src={image} className="image"/>
                                    </div>
                                    <div className="book-details">
                                        <div className="book-name">{book.bookName}</div>
                                        <div className="book-author">by {book.author}</div>
                                        <div className="book-price">Rs. {book.price}</div>
                                    </div>
                                    {buttons(book)}
                                    {/* {console.log(cartData)} */}
                                </div>
                            </Grid>
                        ))}
                    </Grid>
                    <ThemeProvider theme={theme}>
                        <Stack direction='row' justifyContent="center" sx={{padding:'30px'}}>
                            <Pagination 
                                count={((bookData.length-(bookData.length%booksPerPage))/booksPerPage)+1} 
                                onChange={handlePageChange} 
                                shape="rounded"
                                color="myColor"
                                renderItem={(item) => (
                                    <PaginationItem
                                    components={{ previous: a, next: b }}
                                    {...item}
                                    />
                                )}
                            />
                        </Stack>
                    </ThemeProvider>
                </div>
                <Footer/>
                <Popper open={openPopper} anchorEl={bookDetail} placement={'right-start'} transition>
                    {({ TransitionProps }) => (
                    <Fade {...TransitionProps} timeout={350}>
                        <Paper sx={{width:'30%'}}>
                        <span className="book-detail">Book Detail</span>
                        <Typography sx={{ p: 2,color: 'gray'}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In enim enim, interdum vel pulvinar sit amet, posuere a purus. Duis in lorem vel lacus aliquam placerat et sit amet dui. Integer ullamcorper tortor leo. Quisque a mollis nibh. In eros tellus, luctus et laoreet et, gravida eget risus. Nam molestie accumsan velit vitae molestie. Maecenas dapibus diam eu dui venenatis porttitor. Curabitur feugiat dolor et odio eleifend egestas ac vitae nisi. In pulvinar faucibus neque, at venenatis risus tincidunt non.

                            Nulla tristique turpis ac erat maximus, nec sodales massa sagittis. Nullam ornare, ante id laoreet convallis, nulla velit molestie ante, pharetra aliquam ex orci commodo quam. Nunc vestibulum dapibus arcu nec volutpat. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aenean mattis arcu at dui tempus pellentesque. Morbi vel nulla massa. In dignissim, ligula a sodales lacinia, arcu nulla elementum quam, vel sollicitudin ligula velit finibus odio. Donec eget laoreet eros, vel suscipit sapien. Nulla facilisi. Etiam ac tempor sem.

                        </Typography>
                        </Paper>
                    </Fade>
                    )}
                </Popper>
            </div>  
        </div>
    )
}