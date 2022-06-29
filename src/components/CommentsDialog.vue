<template>
    <div>
        <div class="myComment">
            <textarea v-model="commentsData.content" @dblclick="clearOthers" :placeholder="plach"></textarea>
            <button @click="PutComment">评论</button>
        </div>
        <div style="height: 420px;">
            <el-scrollbar style="height: 100%;">
                <div v-infinite-scroll="getComments" infinite-scroll-distance="10">
                    <ul class="parent" v-for="(it,i) in comments" :key="it.id">
                        <li class="com">
                            <div class="com-h">
                                <img :src="baseURL+it.imgUrl" alt="头像" />
                                <span>{{it.userName}}</span>
                            </div>
                            <div class="com-d">
                                {{it.content}}
                            </div>
                            <div class="com-t">
                                <div class="com-t-box">
                                    <div @click="upComment(2,it.id)" v-if="it.thumb==null||!it.thumb" class="com-t-up">
                                        <img src="../assets/icon/thumb-up-line.svg" alt="点赞" />
                                        <span>{{it.tumbUp}}</span>
                                    </div>
                                    <div @click="upComment(2,it.id)" v-else class="com-t-up">
                                        <img src="../assets/icon/thumb-up-fill.svg" alt="点赞" />
                                        <span>{{it.tumbUp}}</span>
                                    </div>
                                    <div @click="downComment(2,it.id)" v-if="it.thumb==null||it.thumb"
                                        class="com-t-down">
                                        <img src="../assets/icon/thumb-down-line.svg" alt="点踩" />
                                        <span>{{it.tumbDown}}</span>
                                    </div>
                                    <div @click="downComment(2,it.id)" v-else class="com-t-down">
                                        <img src="../assets/icon/thumb-down-fill.svg" alt="点踩" />
                                        <span>{{it.tumbDown}}</span>
                                    </div>
                                    <div class="com-t-sub" @click="subOthers(it.userId,it.id)">回复</div>
                                </div>
                                <div class="com-t-time">
                                    {{GetDate(it.time)}}
                                </div>
                            </div>
                            <ul class="ch" v-if="it.subComents!=undefined">
                                <li class="com" v-for="(it2,i2) in it.subComents.data" :key="i2">
                                    <div class="com-h">
                                        <img :src="baseURL+it.imgUrl" alt="头像" />
                                        <span>{{it2.userName}}</span>&nbsp;@<span>{{it2.otherName}}</span>
                                    </div>
                                    <div class="com-d">
                                        {{it2.content}}
                                    </div>
                                    <div class="com-t">
                                        <div class="com-t-box">
                                            <div @click="upComment(3,it2.id)" v-if="it2.thumb==null||!it2.thumb"
                                                class="com-t-up">
                                                <img src="../assets/icon/thumb-up-line.svg" alt="点赞" />
                                                <span>{{it2.tumbUp}}</span>
                                            </div>
                                            <div @click="upComment(3,it2.id)" v-else class="com-t-up">
                                                <img src="../assets/icon/thumb-up-fill.svg" alt="点赞" />
                                                <span>{{it2.tumbUp}}</span>
                                            </div>
                                            <div @click="downComment(3,it2.id)" v-if="it2.thumb==null||it2.thumb"
                                                class="com-t-down">
                                                <img src="../assets/icon/thumb-down-line.svg" alt="点踩" />
                                                <span>{{it2.tumbDown}}</span>
                                            </div>
                                            <div @click="downComment(3,it2.id)" v-else class="com-t-down">
                                                <img src="../assets/icon/thumb-down-fill.svg" alt="点踩" />
                                                <span>{{it2.tumbDown}}</span>
                                            </div>
                                            <div class="com-t-sub" @click="subOthers(it2.userId,it.id)">回复</div>
                                        </div>
                                        <div class="com-t-time">
                                            {{GetDate(it2.time)}}
                                        </div>
                                    </div>
                                </li>
                            </ul>
                            <div v-if="it.subComents!=undefined&&it.subComents.count > 0"
                                style="display:flex;align-items: center;justify-content: center;">
                                <el-pagination @current-change="val=>getSubComment(i,val)" layout="prev, pager, next"
                                    small :page-size="it.subComents.size" :total="it.subComents.total" />
                            </div>
                        </li>
                    </ul>
                </div>
            </el-scrollbar>
        </div>
    </div>
</template>

<script>
import cCommentApi from '@/api/cCommentApi'
import axiosConfig from '@/plugins/axiosConfig'
import { GetDate } from '@/plugins/TimeTool'
import userApi from '@/api/userApi'
import thumpApi from '@/api/thumpApi'

export default {
    data(){
        return {
            page:0,
            count:1,
            total:0,
            baseURL:"",
            comments:[],
            commentsData:{
                chapterId:"",
                content: "",
                parentId: null,
                otherId: null,
                p:0
            },
            plach:"请输入你的评论"
        }
    },
    props:{
        p: Number,
        id: Number,
    },
    methods: {
        upComment(mode, id) {
            thumpApi.up(mode, id, res => {
                if (mode == 2) {
                    for (let i in this.comments) {
                        if (this.comments[i].id == id) {
                            this.comments[i].thumb = res.data
                            if (res.data) {
                                this.comments[i].tumbUp++
                            } else {
                                this.comments[i].tumbUp--
                            }
                            break
                        }
                    }
                } else {
                    for (let i of this.comments) {
                        for (let p of i.subComents.data) {
                            if (p.id == id) {
                                p.thumb = res.data
                                if (res.data) {
                                    p.tumbUp++
                                } else {
                                    p.tumbUp--
                                }
                                break
                            }
                        }
                    }
                }
            })
        },
        downComment(mode, id) {
            thumpApi.down(mode, id, res => {
                if (mode == 2) {
                    for (let i in this.comments) {
                        if (this.comments[i].id == id) {
                            this.comments[i].thumb = res.data
                            if (!res.data && res.data != null) {
                                this.comments[i].tumbDown++
                            } else {
                                this.comments[i].tumbDown--
                            }
                            break
                        }
                    }
                } else {
                    for (let i of this.comments) {
                        i.subComents.data.forEach(p => {
                            if (p.id == id) {
                                p.thumb = res.data
                                if (!res.data && res.data != null) {
                                    p.tumbDown++
                                } else {
                                    p.tumbDown--
                                }
                            }
                        })
                    }
                }
            })
        },
        getSubComment(index, page) {
            cCommentApi.getSubComment(this.comments[index].id, page, res2 => {
                this.comments[index].subComents.data = res2.data
                this.comments[index].subComents.page = res2.page
            })
        },
        getComments(){
            if(this.page>=this.count){
                return
            }
            this.page++
            cCommentApi.getComment(this.id,this.p,this.page,res=>{
                this.comments = res.data
                this.count = res.count
                this.total = res.total
                this.comments.forEach(p=>{
                    cCommentApi.getSubComment(p.id,1,res2=>{
                        p.subComents=res2
                    })
                })
            })
        },
        GetDate(val){
            return GetDate(val)
        },
        PutComment() {
            cCommentApi.putComments(this.commentsData, res => {
                if (this.commentsData.parentId != null) {
                    for (let index in this.comments) {
                        if (this.comments[index].id == this.commentsData.parentId) {
                            this.comments[index].subComents.data.unshift(res.data)
                            break
                        }
                    }
                    
                } else {
                    this.comments.unshift(res.data)
                }
                this.commentsData.content = ""
                this.commentsData.otherId = null
                this.commentsData.parentId = null
            })
        },
        clearOthers() {
            this.commentsData.parentId = null
            this.commentsData.otherId = null
            this.plach = "请输入你的评论"
        },
        subOthers(userId,parentid) {
            this.commentsData.parentId = parentid
            this.commentsData.otherId = userId
            userApi.Get(userId, res => {
                this.plach = "@回复：" + res.nickName + "(双击取消回复)"
            })
        }
    },
    mounted(){
        this.baseURL = axiosConfig.baseURL
        this.commentsData.p = this.p
        this.commentsData.chapterId = this.id
        this.getComments()
    }
}
</script>

<style lang="scss" scoped>
        .parent{
            text-indent: 0;
            padding: 10px;
            font-size: 12px;
            li{
                list-style: none;
            }
            .com{
                padding-top: 10px;
                .ch{
                    margin-left: 25px;
                }
                &-h{
                    display: flex;
                    align-items: center;
                    span{
                        font-weight: bold;
                    }
                    img{
                        width: 30px;
                        height: 30px;
                        border-radius: 50%;
                        margin: 5px;
                    }
                }
                &-d{
                    padding: 10px;
                }
                &-t{
                    display: flex;
                    border-bottom: 1px solid #ddd;
                    justify-content: space-between;
                    img{
                        width: 15px;
                        height: 15px;
                    }
                    &-box{
                        display: flex;
                    }
                    &-up,&-down,&-sub{
                        cursor: pointer;
                        padding: 5px;
                        display: flex;
                        width: 30px;
                        justify-content: space-between;
                        align-items: center;
                    }
                    &-time{
                        display: flex;
                        justify-content: center;
                        align-items: center;
                    }
                    &-sub{
                        &:hover{
                            text-decoration: underline;
                        }
                    }
                }
            }
        }
        .myComment{
            display: flex;
            text-indent: 0;
            textarea{
                flex: 1;
                padding: 5px;
                margin: 5px;
                margin-top: 10px;
                border-radius: 5px;
                resize: none;
                border: 1px solid #ddd;
                outline: none;
            }
            button{
                padding: 5px;
                margin: 5px;
                margin-top: 10px;
                border-radius: 5px;
                outline: none;
                border: none;
                font-weight: bold;
                background-color: #a00;
                color: #fff;
                transition: all .25s;
                cursor: pointer;
                &:hover{
                    background-color: #c00;
                }
            }
        }
</style>