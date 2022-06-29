import Axios from "@/plugins/axios";

const url = "report/"

export default {
    add(data, out) {
        Axios.post({
            url,
            data
        }).then(res => {
            out(res)
        })
    }
}