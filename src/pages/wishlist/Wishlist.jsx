import React from 'react'
import './wishlist.scss'
import Header from '../../components/header/Header'
import Footer from '../../components/footer/Footer'
import image from "../../assets/Image 23.png"
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import BookService from '../../services/BookServices'
import { Button, IconButton } from '@mui/material'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, initialiseCart } from '../../actions'
import bookloader from '../../assets/bookLoad.gif'

const bookService = new BookService();

export default function Wishlist() {

    const [wishlist, setWishlist] = React.useState([]);
    const [backup, setBackup] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const dispatch = useDispatch();

    const getWishListData = () => {
        bookService.getWishList('bookstore_user/get_wishlist_items')
            .then((res)=>{
                console.log(res.data.result);
                setWishlist(res.data.result);
                setBackup(res.data.result);
            })
            .catch((err)=>{
                console.log(err);
            })
    }

    const deleteFromWishlist = (book) => {
        var data = {
            "product_id": book.product_id._id
        }
        bookService.removeWishlist(`bookstore_user/remove_wishlist_item/${book.product_id._id}`,data)
            .then((res)=>{
                getWishListData();
            })
    }

    const callBackToRefreshRedux = () => {
        dispatch(initialiseCart());
    }

    const addtocart = (book) => {
        dispatch(addToCart(book.product_id, callBackToRefreshRedux));
        deleteFromWishlist(book);
    }


    React.useEffect(()=>{
        getWishListData();
        setTimeout(()=>{
            setLoading(false);
        },1500);
    },[])

    return (
        <React.Fragment>
            { loading ? <div className="preloader"><img src={bookloader}/></div> : ""}
            <div className="wishlist-container">
                <div>
                    <Header mode="wishlist" bookData={wishlist} setBookData={setWishlist} backup={backup}/>
                    <div className="wishlist-main">
                        <div className="wishlist-main-header">
                            My WishList ({wishlist.length})
                        </div>
                        {wishlist.map((book)=>(
                            <div className="wishlist-item">
                                <div className="wishlist-item-left">
                                    <img src={image}/>
                                    <div className="book-details">
                                        <div className="bookname">{book.product_id.bookName}</div>
                                        <div className="author">{book.product_id.author}</div>
                                        <div className="price">Rs. {book.product_id.price}</div>
                                    </div>
                                </div>
                                <div className="wishlist-item-right">
                                    {/* <IconButton><AddShoppingCartIcon sx={{color:'#9D9D9D'}}/></IconButton> */}
                                    <Button variant="text" color="secondary" onClick={()=>addtocart(book)}>Move to cart</Button>
                                    <IconButton onClick={()=> deleteFromWishlist(book)}> <DeleteForeverIcon sx={{color:'#9D9D9D', padding: '0 20px'}} /> </IconButton>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <Footer/>
            </div> 
        </React.Fragment>
    )
}
