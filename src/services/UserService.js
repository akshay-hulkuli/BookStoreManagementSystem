import AxiosService from "./AxiosService";

const axiosService = new AxiosService();


class UserService {
    Registration (url, data){
        return axiosService.PostMeth(url,data);
    }
    LogIn (url, data){
        return axiosService.PostMeth(url,data);
    }
}

export default UserService;