import AxiosService from "./AxiosService";

const axiosService = new AxiosService();

const config = {
    headers:{
        "x-acess-token" : localStorage.getItem('accessToken'),
    }
}

const config1 = {
    headers:{
        "token" : localStorage.getItem('accessToken'),
    }
}

class BookService {
    getBooks (url){
        return axiosService.GetMeth(url,config)
    }

    getCartItems (url){
        return axiosService.GetMeth(url,config1)
    }

    addBookToCart(url,data){
        return axiosService.PostMeth(url,data,config1);
    }
}

export default BookService;