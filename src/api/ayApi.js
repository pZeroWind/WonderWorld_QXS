import Axios from "@/plugins/axios";

const url = "analysis/"

export default {
    writer(out) {
        Axios.get({
            url: url + "writer"
        }).then(res => {
            out(res)
        })
    }
}