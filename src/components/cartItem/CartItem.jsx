import React, { useState } from 'react'
import {Button,IconButton,TextField} from '@mui/material'
import image from '../../assets/Image 23.png'
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import {useDispatch,useSelector} from 'react-redux';
import { removeFromCart, initialiseCart, addToWishList, initializeWishList, initialiseCartWithoutApi } from '../../actions';
import BookService from '../../services/BookServices';

const bookService = new BookService();

export default function CartItem(props) {
    const [counter, setCounter] = useState(props.book.quantityToBuy);
    const dispatch = useDispatch();
    const onCounterUp = () => {
        setCounter(counter+1);
        let payload = {
            "quantityToBuy": counter+1
        }
        const url = `bookstore_user/cart_item_quantity/${props.book._id}`
        bookService.changeQuantity(url,payload)
            .then(()=>{
                console.log("updatedQuantity");
            })
            .catch((err)=>{
                console.log(err)
            })
    }
    const onCounterDown = () => {
        if(counter > 1){
            setCounter(counter-1)
            let payload = {
                "quantityToBuy": counter-1
            }
            const url = `bookstore_user/cart_item_quantity/${props.book._id}`
            bookService.changeQuantity(url,payload)
                .then(()=>{
                    console.log("updatedQuantity");
                })
                .catch((err)=>{
                    console.log(err)
                })
        }
    }
    const removeCart = (book) => {
        dispatch(removeFromCart(book._id,book.product_id._id,props.getCartData));
    }
    return (
        <div className="my-book">
            <div className="my-book-left">
                <img src = {image} className="my-book-left-image"/>
            </div> 
            <div className="my-book-right">
                <div className="my-book-details">
                    <div className="my-book-name">{props.book.product_id.bookName}</div>
                    <div className="my-book-author">{props.book.product_id.author}</div>
                    <div className="my-book-cost">Rs. {props.book.product_id.price}</div>
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
                        <Button onClick={()=>removeCart(props.book)}>remove</Button>
                    </div>
                    
                </div>
            </div> 
        </div>
    )
}
