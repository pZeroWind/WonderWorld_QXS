import Axios from "@/plugins/axios";

const url = "user/"

export default {
    Get(account, out) {
        Axios.get({
            url: url + account,
        }).then(res => {
            if (res.code == 200) {
                out(res.data)
            }
        })
    },
    Hot(out) {
        Axios.get({
            url: url + "hot",
        }).then(res => {
            out(res)
        })
    },
    Login(data, out) {
        Axios.post({
            url: url + "login",
            data: data
        }).then(res => {
            if (res.code == 200) {
                localStorage.setItem("token", res.data)
                out()
            }
        })
    },
    Register(data, out) {
        Axios.post({
            url: url + "register",
            data: data
        }).then(res => {
            out(res)
        })
    },
    Account(account, out) {
        Axios.get({
            url: url + "account/" + account,
        }).then(res => {
            out(res.data)
        })
    },
    Forget(data, out) {
        Axios.post({
            url: url + "forget",
            data
        }).then(res => {
            out(res)
        })
    },
    update(data, out) {
        Axios.post({
            url: url + "modify",
            data
        }).then(res => {
            out(res)
        })
    },
    GetCode(em, out) {
        Axios.get({
            url: url + "email/get/" + em
        }).then(res => {
            if (res.code == 200) {
                out(res)
            }
        })
    },
    GetCodeF(em, out) {
        Axios.get({
            url: url + "forget/get/" + em
        }).then(res => {
            if (res.code == 200) {
                out(res)
            }
        })
    }
}