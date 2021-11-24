import AxiosService from "./AxiosService";

const axiosService = new AxiosService();

const config = {
    headers:{
        "x-acess-token" : localStorage.getItem('accessToken'),
    }
}

class BookService {
    getBooks (url){
        return axiosService.GetMeth(url,config)
    }
}

export default BookService;