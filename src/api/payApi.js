import Axios from "@/plugins/axios";

const url = "pay/charge"

export default{
    pay(size,type,out){
        Axios.post({
            url,
            params:{
                type:type,
                size:size
            }
        }).then(res=>{
            out(res)
        })
    }
}