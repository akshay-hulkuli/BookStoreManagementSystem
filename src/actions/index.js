import axios from "axios"
import BookService from "../services/BookServices"

const bookService = new BookService();

export const addToCart = (data,getCart) => {

    return function(dispatch) {
        const payload = {
            "product_id": data._id
        }
        const url = `bookstore_user/add_cart_item/${data._id}`

        bookService.addBookToCart(url,payload)
            .then(()=>{
                dispatch({
                    type:"ADDTOCART",
                    payload: data
                })
                getCart();
            })
            .catch((err)=>{
                console.log(err);
            });
    }
}

export const removeFromCart = (data) => {
    return {
        type: "REMOVEFROMCART",
        payload: data
    }
}

export const initialiseCart = (data) => {
    return {
        type: "INITIALISECART",
        payload: data
    }
}


