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
import { removeFromCart, initialiseCart, addToWishList, initializeWishList,initialiseCartWithoutApi } from '../../actions';
import CartItem from '../../components/cartItem/CartItem'
import UserService from '../../services/UserService'
import { useNavigate } from 'react-router-dom'

const bookService  = new BookService();
const userService = new UserService();

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
    const[openCollapse, setOpenCollapse] = React.useState(false);
    const[openCollapse2, setOpenCollapse2] = React.useState(false);
    const [cartData, setCartData] = React.useState([]);
    const[backup,setBackup] = React.useState([]);
    const dispatch = useDispatch();
    // const cartState = useSelector(state => state);
    const navigate = useNavigate();
    const [formData, setFormData] = React.useState({
        "name":"",
        "nameError": false,
        "phone": "",
        "phoneError": false,
        "pincode":"",
        "pincodeError": false,
        "state": "",
        "stateError": false,
        "address": "",
        "addressError": false,
        "city":"",
        "cityError": false,
        "landmark":"",
        "landmarkError": false,
        "type":"",
        "typeError": false,
    });

    const handleFormInputChange = (e) => {
        var tempFormData = formData;
        switch(e.target.name){
            case 'name': tempFormData.name = e.target.value;
                          break;
            case 'phone' : tempFormData.phone = e.target.value;
                         break;
            case 'pincode' : tempFormData.pincode = e.target.value;
                         break;
            case 'state' : tempFormData.state = e.target.value;
                         break;
            case 'address' : tempFormData.address = e.target.value;
                         break;
            case 'city' : tempFormData.city = e.target.value;
                         break;
            case 'landmark' : tempFormData.landmark = e.target.value;
                         break;
            case 'type' : tempFormData.type = e.target.value;
                         break;
        }
        setFormData({...formData,tempFormData});
        // console.log(formData)
    }

    const isValid = () => {
        var error = false;
        var data = formData;

        data.nameError = (data.name !== "") ? false : true;
        data.phoneError = (data.phone !== "") ? false : true;
        data.pincodeError = (data.pincode !== "") ? false : true;
        data.stateError = (data.state !== "") ? false : true;
        data.addressError = (data.address !== "") ? false : true;
        data.cityError = (data.city !== "") ? false : true;
        data.landmarkError = (data.landmark !== "") ? false : true;
        data.typeError = (data.type != "") ? false: true;

        setFormData({...formData, data});
        console.log(formData);
        error = (data.nameError || data.phoneError || data.pincodeError || data.stateError || data.addressError || data.cityError || data.landmarkError || data.typeError);
        return error;
    }

    const submitForm = () => {
        if(!isValid()){
            console.log("validation successfull");
            var data = {
                'addressType': formData.type,
                'fullAddress': formData.address,
                'city': formData.city,
                'state': formData.state
            }
            userService.addCustomerAddress('bookstore_user/edit_user',data)
                .then((a)=>{
                    setOpenCollapse2(!openCollapse2);

                })
                .catch((err)=>{
                    console.log(err);
                })
        }
        else {
            console.log("validation failed");
        }
    }

    const getCartData = () => {
        bookService.getCartItems('bookstore_user/get_cart_items',localStorage.getItem('accessToken'))
            .then((res)=> {
                setCartData(res.data.result);
                console.log(res.data.result)
                setBackup(res.data.result);
                dispatch(initialiseCartWithoutApi(res.data.result))
            })
    }

    React.useEffect(()=>{
        getCartData();
    },[])


    const handleCollapse = () => {
        setOpenCollapse(!openCollapse);
    }

    const allowEdit = () => {
        setOpenCollapse2(false)
    }

    const backToCart = () => {
        setOpenCollapse(false);
        setOpenCollapse2(false)
    }

    const placeOrder = () => {
        var orders  = [];
        cartData.map((order)=>{
            orders.push({
                "product_id":order.product_id._id,
                "product_name": order.product_id.bookName,
                "product_quantity":order.quantityToBuy,
                "product_price":order.product_id.price
            })
        })
        console.log(orders)
        var data ={
            "orders": orders
        }
        bookService.placeOrder('bookstore_user/add/order',data)
            .then(async()=>{
                await cartData.map((order)=>{
                     dispatch(removeFromCart(order._id,order.product_id._id));
                })
                navigate('/success');
                dispatch(initialiseCart())
            })
            .catch((err)=>{
                console.log(err);
            })
    }

    return (
        <div>
            <Header mode="cart" bookData={cartData} setBookData ={setCartData} backup={backup}/>
            {/* section one my cart */}
            <div className="cart-main">
                <div className="my-cart">
                    <div className = "my-cart-left">
                        <p className="my-cart-left-header" onClick={backToCart}>
                            My Cart
                        </p>

                        {/* this is the book iterate it */}
                        {cartData.map((book=>(
                            <CartItem book={book} getCartData={getCartData}/>
                        )))}
                       
                    </div>
                    <div className="my-cart-right">
                        <Fade in={!openCollapse}>
                            <CustomButton onClick={()=>{handleCollapse();getCartData()}}>Place order</CustomButton>
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
                                        name="name"
                                        onChange={(e)=>handleFormInputChange(e)}
                                        error={formData.nameError}
                                        helperText = {formData.nameError? "this is a required field":" "}
                                    />
                                    <TextField
                                        variant="outlined"
                                        placeholder="Phone number"
                                        sx={{margin: '5px'}}
                                        fullWidth
                                        size="medium"
                                        disabled={openCollapse2}
                                        name="phone"
                                        onChange={(e)=>handleFormInputChange(e)}
                                        error={formData.phoneError}
                                        helperText = {formData.phoneError? "this is a required field":" "}
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
                                        name="pincode"
                                        onChange={(e)=>handleFormInputChange(e)}
                                        error={formData.pincodeError}
                                        helperText = {formData.pincodeError? "this is a required field":" "}
                                    />
                                    <TextField
                                        variant="outlined"
                                        placeholder="State"
                                        sx={{margin: '5px'}}
                                        fullWidth
                                        size="medium"
                                        disabled={openCollapse2}
                                        name="state"
                                        onChange={(e)=>handleFormInputChange(e)}
                                        error={formData.stateError}
                                        helperText = {formData.stateError? "this is a required field":" "}
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
                                        name="address"
                                        onChange={(e)=>handleFormInputChange(e)}
                                        error={formData.addressError}
                                        helperText = {formData.addressError? "this is a required field":" "}
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
                                        name="city"
                                        onChange={(e)=>handleFormInputChange(e)}
                                        error={formData.cityError}
                                        helperText = {formData.cityError? "this is a required field":" "}
                                    />
                                    <TextField
                                        variant="outlined"
                                        placeholder="Landmark"
                                        sx={{margin: '5px'}}
                                        fullWidth
                                        size="medium"
                                        disabled={openCollapse2}
                                        name="landmark"
                                        onChange={(e)=>handleFormInputChange(e)}
                                        error={formData.landmarkError}
                                        helperText = {formData.landmarkError? "this is a required field":" "}
                                    />
                                </div>
                                <div style={{margin:'30px 10px'}}>
                                    <span className="customer-details-radio-header">
                                        type
                                    </span>
                                    <RadioGroup 
                                        row aria-label="gender" 
                                        name="row-radio-buttons-group" 
                                        sx={{color:'#9D9D9D'}} 
                                        onChange={(e)=>handleFormInputChange(e)}
                                    >
                                        <FormControlLabel name="type" value="Home" control={<Radio />} label="Home" sx={{paddingRight:'100px'}} disabled={openCollapse2}/>
                                        <FormControlLabel name="type" value="Office" control={<Radio />} label="Work" sx={{paddingRight:'100px'}} disabled={openCollapse2} />
                                        <FormControlLabel name="type" value="Other" control={<Radio />} label="Other"disabled={openCollapse2} />
                                    </RadioGroup>
                               
                                </div>
                            </div>
                            <div className="collapse-main-right">
                                <Fade in={!openCollapse2}>
                                    <CustomButton onClick={submitForm}>continue</CustomButton>
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
                                                <div className="my-book-cost">Rs. {book.product_id.price*book.quantityToBuy}</div>
                                            </div>
                                            <div className="empty">
                                                <br></br><br></br><br></br><br></br>
                                            </div>
                                        </div> 
                                    </div>
                                ))}
                                
                            </div>
                            <div className="my-cart-right">
                                <CustomButton onClick={placeOrder}>checkout</CustomButton>
                            </div>
                        </div>
                    </Collapse>
                </div>

            </div>
            <Footer/>
        </div>
    )
}
