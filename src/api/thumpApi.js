import Axios from "@/plugins/axios";
import { ElMessage } from "element-plus";

const url = "thumb/"

export default {
    up(mode, id, out) {
        if (localStorage.getItem("token")) {
            Axios.post({
                url: url + "up/" + mode + "/" + id
            }).then(res => {
                out(res)
            })
        } else {
            ElMessage({
                message: "暂未登录，无法操作",
                type: "error"
            })
        }

    },
    down(mode, id, out) {
        if (localStorage.getItem('token')) {
            Axios.post({
                url: url + "down/" + mode + "/" + id
            }).then(res => {
                out(res)
            })
        } else {
            ElMessage({
                message: "暂未登录，无法操作",
                type: "error"
            })
        }
    }
}