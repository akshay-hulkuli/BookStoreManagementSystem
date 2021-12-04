import axios from 'axios';

const baseUrl = "https://bookstore.incubation.bridgelabz.com/";

// https://bookstore.incubation.bridgelabz.com/bookstore_app/swagger/api/#/WishList/get_bookstore_user_get_wishlist_items

class AxiosService {
    PostMeth(url, data, config=false){
        return axios.post(baseUrl+url, data, config);
    }
    GetMeth(url,config=false){
        return axios.get(baseUrl+url,config);
    }
    DeleteMeth(url,data,config=false){
        return axios.delete(baseUrl+url, {
            headers:{
                "x-access-token": localStorage.getItem('accessToken')
            },
            data:{
                "cartItem_id": data.cartItem_id
            }
        })
    }
    PutMeth(url,data,config=false){
        return axios.put(baseUrl+url,data,config);
    }
}

export default AxiosService;