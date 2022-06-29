import Axios from "@/plugins/axios";

const url = "book/"

const bookApi = {
    type(out) {
        Axios.get({
            url: url + "type"
        }).then(res => {
            out(res.data)
        })
    },
    banner(out) {
        Axios.get({
            url: url + "banner"
        }).then(res => {
            out(res.data)
        })
    },
    getList(data, out) {
        Axios.get({
            url: url + "getList",
            params: data
        }).then(res => {
            out(res)
        })
    },
    get(id, out) {
        Axios.get({
            url: url + "get/" + id
        }).then(res => {
            out(res)
        })
    },
    wirter(id, out) {
        Axios.get({
            url: url + "writer/" + id
        }).then(res => {
            out(res)
        })
    },
    state(out) {
        Axios.get({
            url: url + "state"
        }).then(res => {
            out(res.data)
        })
    },
    tag(out) {
        Axios.get({
            url: url + "tag",
            params: {
                size: 20
            }
        }).then(res => {
            out(res)
        })
    },
    tagM(size, out) {
        Axios.get({
            url: url + "tag",
            params: {
                size
            }
        }).then(res => {
            out(res)
        })
    },
    clickUp(id) {
        Axios.put({
            url: url + "clickUp/" + id
        })
    },
    upload(data, out) {
        Axios.post({
            url: url + "upload",
            data
        }).then(res => {
            out(res)
        })
    },
    update(data, out) {
        Axios.put({
            url: url + "update",
            data
        }).then(res => {
            out(res)
        })
    },
    AddShelf(params, out) {
        Axios.post({
            url: url + "shelf",
            params
        }).then(res => {
            out(res)
        })
    },
    GetShelf(page, out) {
        Axios.get({
            url: url + "shelf/5/" + page,
        }).then(res => {
            out(res)
        })
    },
    GiveTiket(bookId, out) {
        Axios.post({
            url: url + "tiket/" + bookId,
        }).then(res => {
            out(res)
        })
    },
    GiveBlade(bookId, out) {
        Axios.post({
            url: url + "blade/" + bookId,
        }).then(res => {
            out(res)
        })
    },
    BuyChapter(bookId, chapterId, out) {
        Axios.post({
            url: url + "buy/" + bookId + "/" + chapterId,
        }).then(res => {
            out(res)
        })
    },
    OnShelf(bookId, out) {
        Axios.post({
            url: url + "onShelf/" + bookId,
        }).then(res => {
            out(res)
        })
    },
    OnPublish(bookId, out) {
        Axios.put({
            url: url + "publish/" + bookId,
        }).then(res => {
            out(res)
        })
    },
    OnComplete(bookId, out) {
        Axios.put({
            url: url + "complete/" + bookId,
        }).then(res => {
            out(res)
        })
    },
    shelf(page, out) {
        Axios.get({
            url: url + "shelf" + "/3/" + page
        }).then(r => {
            out(r)
        })
    }
}

export default bookApi