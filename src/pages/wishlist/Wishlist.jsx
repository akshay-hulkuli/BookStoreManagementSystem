import React from 'react'
import './wishlist.scss'
import Header from '../../components/header/Header'
import Footer from '../../components/footer/Footer'
import image from "../../assets/Image 23.png"
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import BookService from '../../services/BookServices'
import { IconButton } from '@mui/material'

const bookService = new BookService();

export default function Wishlist() {

    const [wishlist, setWishlist] = React.useState([]);
    const [backup, setBackup] = React.useState([]);

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

    React.useEffect(()=>{
        getWishListData();
    },[])

    return (
        <div>
            <Header mode="wishlist" bookData={wishlist} setBookData={setWishlist} backup={backup}/>
            <div class="all-container">
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
                               <IconButton onClick={()=> deleteFromWishlist(book)}> <DeleteForeverIcon sx={{color:'#9D9D9D'}} /> </IconButton>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <Footer/>
        </div>
    )
}
