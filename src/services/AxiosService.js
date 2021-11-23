import axios from 'axios';

const baseUrl = "https://new-bookstore-backend.herokuapp.com/";

class AxiosService {
    PostMeth(url, data, config=false){
        return axios.post(baseUrl+url, data, config);
    }
    GetMeth(url,config=false){
        return axios.get(baseUrl+url,config);
    }
}

export default AxiosService;