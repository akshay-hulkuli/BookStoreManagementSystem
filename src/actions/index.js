import axios from "axios"
import BookService from "../services/BookServices"

const bookService = new BookService();

export const addToCart = (data,getCart) => async dispatch => {
    
    try{
            const payload = {
                          "product_id": data._id
                     }
            const url = `bookstore_user/add_cart_item/${data._id}`
            await bookService.addBookToCart(url,payload);
            console.log(localStorage.getItem('accessToken'))
            dispatch( {
                type: "ADDTOCART",
                payload: data._id
            })
            getCart();
    }
    catch(e){
        console.log(e);
    }

}

export const removeFromCart = (id,data) => async dispatch => {
    try{
        const payload = {
                      "cartItem_id": id
                 }
        const url = `bookstore_user/remove_cart_item/${id}`
        await bookService.deleteFromCart(url,payload);
        console.log(localStorage.getItem('accessToken'))
        dispatch( {
            type: "REMOVEFROMCART",
            payload: data
        })
    }
    catch(e){
        console.log(e);
    }
}

export const initialiseCart = () => async dispatch => {
    
    try{
        const res = await bookService.getCartItems('bookstore_user/get_cart_items',localStorage.getItem('accessToken'));
        let ids = [];
        res.data.result.map(cur => {
            ids.push(cur.product_id._id)
        })
        console.log(ids)
        dispatch( {
            type: "INITIALISECART",
            payload: ids
        })
    }
    catch(e){
        console.log(e);
    }

}


