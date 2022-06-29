import Axios from "@/plugins/axios";
import { ElMessage } from "element-plus";

const url = "book/comment/"

export default {
    getComment(id, page, out) {
        Axios.get({
            url: url + id,
            params: {
                page: page
            }
        }).then(r => {
            out(r)
        })
    },
    getSubComment(id, p, page, out) {
        Axios.get({
            url: url + id + "/" + p,
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
    },
    getSubCommentbyme(page, out) {
        Axios.get({
            url: '/user/getSubCommentsByMe',
            params: {
                page: page
            }
        }).then(res => {
            out(res)
        })
    },
    getCommentbyme(page, out) {
        Axios.get({
            url: '/user/getCommentsByMe',
            params: {
                page: page
            }
        }).then(res => {
            out(res)
        })
    },
}