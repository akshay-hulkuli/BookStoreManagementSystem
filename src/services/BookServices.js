import axios from "axios";
import AxiosService from "./AxiosService";

const axiosService = new AxiosService();

const config = {
    headers:{
        "x-access-token" : localStorage.getItem('accessToken'),
    }
}

const config1 = {
    headers:{
        "x-access-token" : localStorage.getItem('accessToken'),
    }
}

class BookService {
    getBooks (url){
        return axiosService.GetMeth(url,config)
    }

    getCartItems (url,token){
        const config2 = {
            headers:{
                "x-access-token" : token,
            }
        }
        return axiosService.GetMeth(url,config2)
    }

    addBookToCart(url,data){
        return axiosService.PostMeth(url,data,config1);
    }

    getWishList(url,token){
        const config2 = {
            headers:{
                "x-access-token" : token,
            }
        }
        return axiosService.GetMeth(url,config2)
    } 

    addToWishList(url,data){
        return axiosService.PostMeth(url,data,config1);
    }

    deleteFromCart (url,data){
        return axiosService.DeleteMeth(url,data,config1);
    }

    changeQuantity(url,data){
        return axiosService.PutMeth(url,data,config1);
    }

    placeOrder(url,data){
        return axiosService.PostMeth(url,data,config1);
    }

    getWishList(url){
        return axiosService.GetMeth(url,config1);
    }

    removeWishlist(url,data){
        return axiosService.DeleteMeth(url,data);
    }
}

export default BookService;