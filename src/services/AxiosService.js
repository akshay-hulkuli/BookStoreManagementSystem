import axios from 'axios';

const baseUrl = "https://new-bookstore-backend.herokuapp.com/";

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
                "token": config.headers.token
            },
            data:{
                "cartItem_id": data.cartItem_id
            }
        })
    }
}

export default AxiosService;