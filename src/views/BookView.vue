<template>
    <div class="bookView">
        <div class="leftData">
            <div class="topData">
                <img :src="img" alt="封面" />
                <div class="data">
                    <h4>{{data.title}}</h4>
                    <div class="tags">
                        <router-link v-for="it in data.tags" :key="it.id" target="_blank"
                            :to="{ path: '/library', query: { tag: it.name}}">
                            <el-tag type="info">{{it.name}}</el-tag>
                        </router-link>
                    </div>
                    <div class="inline">
                        <strong>作者：</strong>
                        {{data.nickName}}
                    </div>
                    <div class="inline">
                        <strong>分区：</strong>
                        {{data.type}}
                    </div>
                    <div class="inline">
                        <strong>状态：</strong>
                        {{data.state}}&nbsp;&nbsp;&nbsp;
                        <strong>点击量：</strong>
                        {{data.clickNum}}&nbsp;&nbsp;&nbsp;
                        <strong>月票数：</strong>
                        {{data.profits.tiketNum}}&nbsp;&nbsp;&nbsp;
                        <strong>刀片数：</strong>
                        {{data.profits.bladeNum}}&nbsp;&nbsp;&nbsp;
                    </div>
                    <div class="inline">
                        <strong>更新时间：</strong>
                        {{UploadTime}}
                    </div>
                    <div class="inline">
                        <router-link v-if="data.history==null&&chapter.length>0" target="_blank"
                            :to="'/library/' + id + '/' + scrolls[0].id + '/' + chapter[0].data[0].id">
                            <button class="r" @click="ToRead">开始阅读</button>
                        </router-link>
                        <router-link v-else target="_blank" :to="'/library/' + id + '/' + data.history">
                            <button class="r" @click="ToRead">继续阅读</button>
                        </router-link>
                        <button class="w" @click="AddShelf">加入书架</button>
                        <button class="w" @click="OnTiket">投月票</button>
                        <button class="w" @click="OnBlade">寄刀片</button>
                    </div>
                </div>
            </div>
            <div class="intro">
                <h4>详情</h4>
                <p>
                    {{data.intro}}
                </p>
            </div>
            <div class="chapter">
                <h4>章节</h4>
                <div class="scroll">
                    <el-collapse>
                        <el-collapse-item v-for="(it,i) in scrolls" :key="it.id">
                            <template #title>
                                <h4>{{it.name}}</h4>
                            </template>
                            <ul v-if="chapter[i]">
                                <li class="list" v-for="it2 in chapter[i].data" :key="it2.id">
                                    <router-link target="_blank" :to="'/library/'+id+'/'+it.id+'/'+it2.id">
                                        <div class="hov">
                                            <span class="hov-item">{{it2.title}}</span>
                                            <span v-if="!it2.chargeState">免费</span>
                                            <span v-else class="fu">付费</span>
                                        </div>
                                    </router-link>
                                    <div class="more" @click="addChapter(it.id,i)"
                                        v-if="chapter[i].count!=chapter[i].page">
                                        加载更多
                                    </div>
                                </li>
                            </ul>
                        </el-collapse-item>
                    </el-collapse>
                </div>
            </div>
        </div>
        <div class="comments">
            <h4>评论</h4>
            <div class="myComment">
                <textarea v-model="commentsData.content" @dblclick="clearOthers" :placeholder="plach"></textarea>
                <button @click="putComments">评论</button>
            </div>
            <div style="height: 420px;" v-if="comments.length == 0">
                <el-empty description="暂无评论"></el-empty>
            </div>
            <div v-else style="height: 420px;">
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
                                        <div @click="upComment(0,it.id)" v-if="it.thumb==null||!it.thumb"
                                            class="com-t-up">
                                            <img src="../assets/icon/thumb-up-line.svg" alt="点赞" />
                                            <span>{{it.tumbUp}}</span>
                                        </div>
                                        <div @click="upComment(0,it.id)" v-else class="com-t-up">
                                            <img src="../assets/icon/thumb-up-fill.svg" alt="点赞" />
                                            <span>{{it.tumbUp}}</span>
                                        </div>
                                        <div @click="downComment(0,it.id)" v-if="it.thumb==null||it.thumb"
                                            class="com-t-down">
                                            <img src="../assets/icon/thumb-down-line.svg" alt="点踩" />
                                            <span>{{it.tumbDown}}</span>
                                        </div>
                                        <div @click="downComment(0,it.id)" v-else class="com-t-down">
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
                                                <div @click="upComment(1,it2.id)" v-if="it2.thumb==null||!it2.thumb"
                                                    class="com-t-up">
                                                    <img src="../assets/icon/thumb-up-line.svg" alt="点赞" />
                                                    <span>{{it2.tumbUp}}</span>
                                                </div>
                                                <div @click="upComment(1,it2.id)" v-else class="com-t-up">
                                                    <img src="../assets/icon/thumb-up-fill.svg" alt="点赞" />
                                                    <span>{{it2.tumbUp}}</span>
                                                </div>
                                                <div @click="downComment(1,it2.id)" v-if="it2.thumb==null||it2.thumb"
                                                    class="com-t-down">
                                                    <img src="../assets/icon/thumb-down-line.svg" alt="点踩" />
                                                    <span>{{it2.tumbDown}}</span>
                                                </div>
                                                <div @click="downComment(1,it2.id)" v-else class="com-t-down">
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
                                    <el-pagination @current-change="val=>getSubComment(i,val)"
                                        layout="prev, pager, next" small :page-size="it.subComents.size"
                                        :total="it.subComents.total" />
                                </div>
                            </li>
                        </ul>
                    </div>
                </el-scrollbar>
            </div>
        </div>
    </div>
</template>

<script>
import bookApi from '@/api/bookApi'
import chapterApi from '@/api/chapterApi'
import commentApi from '@/api/commentApi'
import axiosConfig from '@/plugins/axiosConfig'
import { GetDate } from '@/plugins/TimeTool'
import "@/Style/BookView.scss"
import userApi from '@/api/userApi'
import thumpApi from '@/api/thumpApi'
import { ElMessage } from 'element-plus'
export default {
    data(){
        return{
            id:'',
            data: {
                profits: {}
            },
            scrolls:[],
            chapter: [],
            comments:[],
            page:0,
            count:1,
            commentsData:{
                bookId:"",
                content: "",
                parentId: null,
                otherId: null,
            },
            plach:"发表你的评论"
        }
    },
    created(){
        //获取小说id，查询信息
        this.id = this.$route.params.bookId
        bookApi.get(this.id,res=>{
            this.data = res.data
        })
        chapterApi.getScroll(this.id,res=>{
            this.scrolls = res.data
            this.chapter = []
            this.scrolls.forEach((i,index)=>{
                chapterApi.getChapter(i.id, 1, r => {
                    this.chapter[index] = r
                    console.log(this.chapter)
                })
            })
        })
        
        this.getComments()
    },
    methods: {
        OnTiket() {
            bookApi.GiveTiket(this.id, () => {
                this.ToRead()
            })
        },
        OnBlade() {
            bookApi.GiveBlade(this.id, () => {
                this.ToRead()
                
            })
        },
        AddShelf() {
            bookApi.AddShelf({
                bookId: this.id,
                scrollId: this.scrolls[0].id,
                chapterId: this.chapter[0].data[0].id
            }, () => {
                this.ToRead()
            })
        },
        ToRead() {
            console.log(this.chapter)
            bookApi.get(this.id, res => {
                this.data = res.data;
                ElMessage({
                    message: "操作成功",
                    type: "success"
                })
            });
        },
        upComment(mode,id){
            thumpApi.up(mode,id,res=>{
                if(mode==0){
                    for(let i in this.comments){
                        if(this.comments[i].id == id){
                            this.comments[i].thumb = res.data
                            if(res.data){
                                this.comments[i].tumbUp++
                            }else{
                                this.comments[i].tumbUp--
                            }
                            break
                        }
                    }
                }else{
                    for(let i of this.comments){
                        i.subComents.data.forEach(p=>{
                            if(p.id == id){
                                p.thumb = res.data
                                if(res.data){
                                    p.tumbUp++
                                }else{
                                    p.tumbUp--
                                }
                            }
                        })
                    }
                }
            })
        },
        downComment(mode,id){
            thumpApi.down(mode,id,res =>{
                if(mode==0){
                    for(let i in this.comments){
                        if(this.comments[i].id == id){
                            this.comments[i].thumb = res.data
                            if(!res.data&&res.data!=null){
                                this.comments[i].tumbDown++
                            }else{
                                this.comments[i].tumbDown--
                            }
                            break
                        }
                    }
                }else{
                    for(let i of this.comments){
                        i.subComents.data.forEach(p=>{
                            if(p.id == id){
                                p.thumb = res.data
                                if(!res.data&&res.data!=null){
                                    p.tumbDown++
                                }else{
                                    p.tumbDown--
                                }
                            }
                        })
                    }
                }
            })
        },
        addChapter(id,index){
            chapterApi.getChapter(id,this.chapter[index].page++,res=>{
                this.chapter[index].data.push(...res.data)
                this.chapter[index].total=res.total
                this.chapter[index].size=res.size
                this.chapter[index].page=res.page
            })
        },
        getComments(){
            if(this.page >= this.count){
                return
            }
            this.page++
            commentApi.getComment(this.id,this.page,res=>{
                this.page = res.page
                this.count = res.count
                this.comments.push(...res.data)
                this.comments.forEach(async i=>{
                    commentApi.getSubComment(this.id,i.id,1,res2=>{
                        i.subComents = res2
                    })
                })
            })
        },
        getSubComment(index,page){
            commentApi.getSubComment(this.id,this.comments[index].id,page,res2=>{
                this.comments[index].subComents.data = res2.data
                this.comments[index].subComents.page = res2.page
            })
        },
        GetDate(val){
            return GetDate(val)
        },
        subOthers(uid,pid){
            this.commentsData.otherId = uid
            this.commentsData.parentId = pid
            userApi.Get(uid,res=>{
                this.plach = "@回复："+res.nickName + "(双击取消回复)"
            })
        },
        clearOthers(){
            this.commentsData.otherId = null
            this.commentsData.parentId = null
            this.plach = "发表你的评论"
        },
        putComments(){
            var data = JSON.parse(JSON.stringify(this.commentsData))
            data.bookId = this.id
            commentApi.putComments(data,res=>{
                if(this.commentsData.parentId!=null){
                    this.comments.forEach((p)=>{
                        if(p.id == this.commentsData.parentId){
                            p.subComents.data.unshift(res.data)
                        }
                    })
                }else{
                    this.comments.unshift(res.data)
                }
                this.commentsData = {
                    bookId:"",
                    content: "",
                    parentId: null,
                    otherId: null
                }
            })
        }
    },
    computed:{
        img(){
            return axiosConfig.baseURL + this.data.cover
        },
        UploadTime(){
            return GetDate(this.data.updateTime)
        },
        baseURL(){
            return axiosConfig.baseURL
        }
    }
}
</script>

<style lang="scss" scoped>
    .inline{
        button{
            cursor: pointer;
            margin: 5px;
            padding: 7.5px;
            font-weight: bold;
            border: none;
            outline: none;
            border-radius: 5px;
        }
        .r{
            background-color: #a00;
            color: #fff;
            transition: all 0.25s;
            &:hover{
                background-color: #700;
            }
        }
        .w{
            background-color: #eee;
            transition: all 0.25s;
            &:hover{
                background-color: #ddd;
            }
        }
    }
</style>