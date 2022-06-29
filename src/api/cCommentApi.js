import Axios from "@/plugins/axios";
import { ElMessage } from "element-plus";

const url = "chapter/comment/"

export default {
    getComment(id, p, page, out) {
        Axios.get({
            url: url + id + "/" + p,
            params: {
                page: page
            }
        }).then(r => {
            out(r)
        })
    },
    getSubComment(id, page, out) {
        Axios.get({
            url: url + id,
            params: {
                page: page,
                size: 2
            }
        }).then(r => {
            out(r)
        })
    },
    putComments(data, out) {
        if (localStorage.getItem('token')) {
            Axios.post({
                url: url,
                data: data
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