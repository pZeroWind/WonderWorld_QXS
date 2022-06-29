const baseURL = "http://175.178.20.112:5107"

const axiosConfig = {
    baseURL: baseURL+"/",
    imgURL(img){
        return baseURL+img
    }
}

export default axiosConfig