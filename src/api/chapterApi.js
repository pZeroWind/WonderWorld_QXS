import Axios from "@/plugins/axios";

const url = "chapter/"

export default {
    getScroll(id, out) {
        Axios.get({
            url: url + "scroll/" + id
        }).then(r => {
            out(r)
        })
    },
    getChapter(id, page, out) {
        Axios.get({
            url: url + id,
            params: {
                page: page
            }
        }).then(r => {
            out(r)
        })
    },
    get(id, scrollId, bookId, out) {
        Axios.get({
            url: url + "get/" + bookId + "/" + scrollId + "/" + id,
        }).then(r => {
            out(r)
        })
    },
    wirterChapter(id, page, out) {
        Axios.get({
            url: url + "writer/" + id,
            params: {
                page: page
            }
        }).then(r => {
            out(r)
        })
    },
    scrollAdd(params, out) {
        Axios.post({
            url: url + "scroll",
            params
        }).then(res => {
            out(res)
        })
    },
    scrollUpdate(params, out) {
        Axios.put({
            url: url + "scroll",
            params
        }).then(res => {
            out(res)
        })
    },
    chapterAdd(data, out) {
        Axios.post({
            url: url,
            data
        }).then(res => {
            out(res)
        })
    },
    chapterUpdate(data, out) {
        Axios.put({
            url: url,
            data
        }).then(res => {
            out(res)
        })
    },
    buyChapter(bookId, chapterId, out) {
        Axios.post({
            url: "book/buy/" + bookId + "/" + chapterId
        }).then(res => {
            out(res)
        })
    }
}