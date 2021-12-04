import AxiosService from "./AxiosService";

const axiosService = new AxiosService();

const config = {
    headers:{
        "x-access-token" : localStorage.getItem('accessToken'),
    }
}

class UserService {
    Registration (url, data){
        return axiosService.PostMeth(url,data);
    }
    LogIn (url, data){
        return axiosService.PostMeth(url,data);
    }
    addCustomerAddress(url,data){
        return axiosService.PutMeth(url,data,config);
    }
}

export default UserService;