import React from 'react'
import './cartPage.scss'
import Header from '../../components/header/Header'
import Footer from '../../components/footer/Footer'
import {Button, IconButton, TextField,Collapse, Fade,FormControl,FormLabel,RadioGroup,Radio,FormControlLabel} from '@mui/material'
import {Box, padding, styled} from '@mui/system'
import image from '../../assets/Image 23.png'
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import BookService from '../../services/BookServices'
import {useDispatch,useSelector} from 'react-redux';
import { removeFromCart, initialiseCart, addToWishList, initializeWishList } from '../../actions';

const bookService  = new BookService();

const CustomButton = styled(Button) (({theme}) => ({
    background:'#3371B5',
    "&:hover": {
        background:'#3371B5'
    },
    textTransform:'uppercase',
    color:'white',
    marginLeft:'3px',
    border:'black 1px solid',
    padding:'5px 20px',
    width:'180px'
}))

export default function CartPage() {
    const [counter, setCounter] = React.useState(1);
    const[openCollapse, setOpenCollapse] = React.useState(false);
    const[openCollapse2, setOpenCollapse2] = React.useState(false);
    const [cartData, setCartData] = React.useState([]);

    const dispatch = useDispatch();
    const cartState = useSelector(state => state);

    const getCartData = () => {
        bookService.getCartItems('bookstore_user/get_cart_items',localStorage.getItem('accessToken'))
            .then((res)=> {
                console.log(res);
                setCartData(res.data.result);
            })
    }

    React.useEffect(()=>{
        getCartData();
    },[])

    React.useEffect(()=>{
        getCartData();
    },[cartState])

    const removeCart = (book) => {
        dispatch(removeFromCart(book._id,book.product_id._id));
    }

    const handleCollapse = () => {
        setOpenCollapse(!openCollapse);
    }

    const handleCollapse2 = () => {
        setOpenCollapse2(!openCollapse2);
    }

    const onCounterUp = () => {
        setCounter(counter+1);
    }
    const onCounterDown = () => {
        setCounter(counter-1);
    }

    const allowEdit = () => {
        setOpenCollapse2(false)
    }

    const backToCart = () => {
        setOpenCollapse(false);
        setOpenCollapse2(false)
    }
    return (
        <div>
            <Header/>
            {/* section one my cart */}
            <div className="cart-main">
                <div className="my-cart">
                    <div className = "my-cart-left">
                        <p className="my-cart-left-header" onClick={backToCart}>
                            My Cart
                        </p>

                        {/* this is the book iterate it */}
                        {cartData.map((book)=>(
                            <div className="my-book">
                                <div className="my-book-left">
                                    <img src = {image} className="my-book-left-image"/>
                                </div> 
                                <div className="my-book-right">
                                    <div className="my-book-details">
                                        <div className="my-book-name">{book.product_id.bookName}</div>
                                        <div className="my-book-author">{book.product_id.author}</div>
                                        <div className="my-book-cost">Rs. {book.product_id.price}</div>
                                    </div>
                                    <div className="my-book-handler">
                                        <div className="counter">
                                            <IconButton
                                                sx={{background: '#FAFAFA 0% 0% no-repeat paddingBox',
                                                border: '1px solid #DBDBDB',
                                                }}
                                                onClick={onCounterUp}
                                            >
                                                    <AddIcon/>
                                            </IconButton>
                                            <TextField
                                                variant='outlined'
                                                size="small"
                                                sx={{width:"40px",margin:'0 10px'}}
                                                value={counter}
                                            />
                                            <IconButton
                                                sx={{background: '#FAFAFA 0% 0% no-repeat paddingBox',
                                                border: '1px solid #DBDBDB'}}
                                                onClick={onCounterDown}
                                            >
                                                    <RemoveIcon/>
                                            </IconButton>
                                        </div>
                                        <div style={{height:'40px', marginLeft: '20px'}}>
                                            <Button onClick={()=>removeCart(book)}>remove</Button>
                                        </div>
                                        
                                    </div>
                                </div> 
                            </div>
                        ))}
                       
                    </div>
                    <div className="my-cart-right">
                        <Fade in={!openCollapse}>
                            <CustomButton onClick={handleCollapse}>Place order</CustomButton>
                        </Fade>
                    </div>
                </div>
                
                {/* section 2 address */}
                <div className="customer-details">
                    <p className="customer-details-header" onClick={allowEdit}>
                        customer details
                    </p>  
                    <Collapse in={openCollapse}>
                        <div className="collapse-main">
                            <div className="collapse-main-left">
                                <div className="textfield-box">
                                    <TextField
                                        variant="outlined"
                                        placeholder="Name"
                                        sx={{margin: '5px'}}
                                        fullWidth
                                        size="medium"
                                        disabled={openCollapse2}
                                    />
                                    <TextField
                                        variant="outlined"
                                        placeholder="Phone number"
                                        sx={{margin: '5px'}}
                                        fullWidth
                                        size="medium"
                                        disabled={openCollapse2}
                                    />
                                </div>
                                <div className="textfield-box">
                                    <TextField
                                        variant="outlined"
                                        placeholder="Pincode"
                                        sx={{margin: '5px'}}
                                        fullWidth
                                        size="medium"
                                        disabled={openCollapse2}
                                    />
                                    <TextField
                                        variant="outlined"
                                        placeholder="Locality"
                                        sx={{margin: '5px'}}
                                        fullWidth
                                        size="medium"
                                        disabled={openCollapse2}
                                    />
                                </div>
                                <div className="textfield-box">
                                    <TextField
                                        variant="outlined"
                                        multiline
                                        rows={3}
                                        placeholder="Address"
                                        sx={{margin: '5px'}}
                                        fullWidth
                                        disabled={openCollapse2}
                                    />
                                </div>
                                <div className="textfield-box">
                                    <TextField
                                        variant="outlined"
                                        placeholder="City/Town"
                                        sx={{margin: '5px'}}
                                        fullWidth
                                        size="medium"
                                        disabled={openCollapse2}
                                    />
                                    <TextField
                                        variant="outlined"
                                        placeholder="Landmark"
                                        sx={{margin: '5px'}}
                                        fullWidth
                                        size="medium"
                                        disabled={openCollapse2}
                                    />
                                </div>
                                <div style={{margin:'30px 10px'}}>
                                    <span className="customer-details-radio-header">
                                        type
                                    </span>
                                    <RadioGroup row aria-label="gender" name="row-radio-buttons-group" sx={{color:'#9D9D9D'}} >
                                        <FormControlLabel value="female" control={<Radio />} label="Home" sx={{paddingRight:'100px'}} disabled={openCollapse2}/>
                                        <FormControlLabel value="male" control={<Radio />} label="Work" sx={{paddingRight:'100px'}} disabled={openCollapse2} />
                                        <FormControlLabel value="other" control={<Radio />} label="Other"disabled={openCollapse2} />
                                    </RadioGroup>
                               
                                </div>
                            </div>
                            <div className="collapse-main-right">
                                <Fade in={!openCollapse2}>
                                    <CustomButton onClick={handleCollapse2}>continue</CustomButton>
                                </Fade>
                            </div>
                        </div>
                    </Collapse>  
                </div>
                
                {/* this is the third section */}
                <div class="customer-details">
                    <p className="customer-details-header">
                        order summary
                    </p>
                    <Collapse in={openCollapse2}>
                        <div className="order-summary">
                            <div className = "my-cart-left">
                                {/* this is the book iterate it */}
                                {cartData.map((book)=>(
                                    <div className="my-book">
                                        <div className="my-book-left">
                                            <img src = {image} className="my-book-left-image"/>
                                        </div> 
                                        <div className="my-book-right">
                                            <div className="my-book-details">
                                                <div className="my-book-name">{book.product_id.bookName}</div>
                                                <div className="my-book-author">{book.product_id.author} </div>
                                                <div className="my-book-cost">Rs. {book.product_id.price}</div>
                                            </div>
                                            <div>
                                                <br></br><br></br><br></br><br></br>
                                            </div>
                                        </div> 
                                    </div>
                                ))}
                                
                            </div>
                            <div className="my-cart-right">
                                <CustomButton onClick={handleCollapse}>checkout</CustomButton>
                            </div>
                        </div>
                    </Collapse>
                </div>

            </div>
            <Footer/>
        </div>
    )
}
