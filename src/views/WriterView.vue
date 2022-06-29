<template>
    <div class="content">
        <ul class="menu">
            <li @click="select=0" :class="{select:select==0}">
                数据分析
            </li>
            <li @click="select=1" :class="{select:select==1}">
                我的作品
            </li>
        </ul>
        <div class="view" v-if="select==0">
            <div class="boxList">
                <div class="box">
                    <div class="title">总字数</div>
                    <div class="data">{{ data.totalWord}}</div>
                </div>
                <div class="box">
                    <div class="title">今日字数</div>
                    <div class="data">{{ data.todayWord}}</div>
                </div>
                <div class="box">
                    <div class="title">钱包</div>
                    <div class="data">{{data.money}}</div>
                </div>
                <div class="box">
                    <div class="title">作品数</div>
                    <div class="data">{{data.bookNum}}</div>
                </div>
            </div>
            <div style="width:100%;height:100%" id="e">
            </div>
        </div>
        <div class="view" v-else>
            <div class="tab">
                <div style="display:flex;">
                    <div :class="{sel:isPublish==i.id}" class="tab-box" @click="chagePublish(i.id)" v-for="i in tab"
                        :key="i.id">
                        {{i.name}}
                    </div>
                </div>
                <div @click="addShow=true" class="tab-box">写新书</div>
            </div>

            <div v-if="!load&&booklist.data.length>0" style="flex:1;">
                <div v-for="i in booklist.data" :key="i.id">
                    <router-link :to="{path:'/personCenter/book/'+i.id}">
                        <book-item-plus :data="i"></book-item-plus>
                    </router-link>
                </div>
            </div>
            <div v-else-if="!load" style="flex:1;">
                <el-empty description="没有找到相关内容"></el-empty>
            </div>
            <div v-loading="load" v-else style="flex:1;"></div>
            <div style="display:flex;justify-content: center;align-items: center;">
                <el-pagination background layout="prev, pager, next" @current-change="getList"
                    :page-size="booklist.size" :total="booklist.total" />
            </div>
        </div>
        <el-dialog width="500px" title="添加新作品" v-model="addShow">
            <add-book-dialog @uploaded="changePublish(1)"></add-book-dialog>
        </el-dialog>
    </div>
</template>

<script>
import BookItemPlus from '@/components/BookItemPlus.vue'
import bookApi from '@/api/bookApi';
import "@/Style/WriterView.scss"
import AddBookDialog from '@/components/AddBookDialog.vue';
import ayApi from '@/api/ayApi';
import * as echarts from "echarts"
export default {
    data() {
        return {
            data: {},
            day: [],
            moneys:[],
            select: 0,
            isPublish:2,
            booklist:{
                data:[]
            },
            load:false,
            addShow:false,
            tab:[
                {
                    id:2,
                    name:"已发布"
                },
                {
                    id:3,
                    name:"已上架"
                },
                {
                    id:1,
                    name:"未发布"
                }
            ],
            e:null
        };
    },
    components: { BookItemPlus, AddBookDialog },
    created(){
        this.getList(1)
        
        
    },
    mounted() {
        ayApi.writer(res => {
            this.data = res.data.writerData
            this.day = res.data.days
            this.moneys = res.data.datas
            this.e = echarts.init(document.getElementById("e"))
            var option = {
                xAxis: {
                    type: 'category',
                    data: this.day
                },
                yAxis: {
                    type: 'value'
                },
                series: [
                    {
                        type: 'line',
                        data: this.moneys
                    }
                ]
            }
            this.e.setOption(option)
        })
    },
    updated() {
        if (this.select == 0) {
            ayApi.writer(res => {
                this.data = res.data.writerData
                this.day = res.data.days
                this.moneys = res.data.datas
                this.e = echarts.init(document.getElementById("e"))
                var option = {
                    xAxis: {
                        type: 'category',
                        data: this.day
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [
                        {
                            type: 'line',
                            data: this.moneys
                        }
                    ]
                }
                this.e.setOption(option)
            })
        }
    },
    methods:{
        getList(page){
            console.log(page)
            var account = localStorage.getItem("account")
            bookApi.getList({
                account:account,
                isPublish:this.isPublish,
                size:2,
                page:page,
            },res=>{
                this.load = false
                this.booklist = res
            })
        },
        chagePublish(id){
            this.addShow = false
            if(this.load){
                return
            }
            this.isPublish = id
            this.load = true
            this.getList(1)
        }
    }
}
</script>

<style lang="scss" scoped>

</style>