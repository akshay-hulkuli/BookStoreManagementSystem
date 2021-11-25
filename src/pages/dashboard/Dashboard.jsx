import React from 'react'
import Header from '../../components/header/Header'
import Footer from '../../components/footer/Footer'
import './dashboard.scss'
import MenuItem from '@mui/material/MenuItem';
import {FormControl,Box,IconButton, Grid, Button, Stack,PaginationItem, getCardUtilityClass} from '@mui/material';
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
import { addToCart,removeFromCart, initialiseCart } from '../../actions';

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
    'sort by relevence',
    'sort by price',
    'sort by popularity',
    'sort by rating'
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
    const [currentPage, setCurrentPage] = React.useState(1);
    const booksPerPage = 8;
    const dispatch = useDispatch();
    const cartData = useSelector(state => state);
    let indexOfLastTodo = currentPage * booksPerPage;
    let indexOfFirstTodo = indexOfLastTodo - booksPerPage;
    let currentBooks = bookData.slice(indexOfFirstTodo, indexOfLastTodo);

    async function getCart ()  {
        console.log(localStorage.getItem('accessToken'))
        await bookService.getCartItems('bookstore_user/get_cart_items')
            .then((res)=>{
                console.log(res);
                dispatch(initialiseCart(res.data.result));
                
            })
            .catch((err)=>{
                console.log(err);
            })
    }

    const getData = () => {
        bookService.getBooks('bookstore_user/get/book')
            .then((res)=>{
                console.log(res);
                setBookData(res.data.result);
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
    },[])

    React.useEffect(()=>{
        console.log("redux state change")
        console.log(cartData)
        getData();
    },[cartData])

    const handleChange = (event) => {
        setSortingFilter(event.target.value);
    };

    const buttons = (book) => {
        // console.log(cartData, book._id);
        if(!DoesCartHave(book)){
            return (
                <div className="buttons">
                    <CustomButton onClick={()=>addToBag(book)}>Add to bag</CustomButton>
                    <CustomButton
                        sx={{background:'white', '&:hover':{background:'white'}, color:'black'}}
                    > wishlist
                    </CustomButton>
                </div>
            );
        }
        else{
            return (
                <div className="buttons">
                    <CustomButton
                            sx={{background:'#3371B5', '&:hover':{background:'#3371B5'}, color:'white', width:'100%'}}
                    > Added to cart
                    </CustomButton>
                </div>
            );
        }
    }

    const DoesCartHave = (book) => {
        var flag = false;
        cartData.map((cur) => {
            if(cur.product_id._id === book._id)
            flag = true;
        })
        return flag;
    }

    function addToBag(book) {
        dispatch(addToCart(book,getCart));
    }

    return (
        <div>
            <Header/>
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
                                    <MenuItem value={1}>sort by relevence</MenuItem>
                                    <MenuItem value={2}>sort by price</MenuItem>
                                    <MenuItem value={3}>sort by popularity</MenuItem>
                                    <MenuItem value={4}>sort by rating</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                    </div>
                </div>
                <Grid container spacing={4}>
                    {currentBooks.map((book,index)=>(
                        <Grid item xs={12} sm={6} md={4} lg={4} xl={3}>
                            <div className='card'>
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
        </div>
    )
}