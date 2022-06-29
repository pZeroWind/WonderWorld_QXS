<template>
    <div>
        <div class="PC-TOP">
            <el-upload :action="uploadUrl" :headers="uploadHeader" :show-file-list="false" :on-success="success">
                <el-avatar :size="25" class="PCimg" :src="img"></el-avatar>
            </el-upload>
            <div class="PCAbout">
                <div class="PCAbout-name">{{UserData.nickName}}</div>
                <div class="PCAbout-other">
                    <span>月票数:</span>
                    <span
                        style="margin-left:20px;padding-right:10px; border-right: 2px solid gainsboro;">{{UserData.tiket}}</span>
                    <span style="margin-left:20px;padding-right:10px;">刀片数:</span>
                    <span style="margin-left:10px">{{UserData.blade}}</span>
                </div>
                <div style="position:absolute;right:400px;top:120px;display:flex;">
                    <img src="..\..\src\assets\icon\coins-line.svg" />
                    <div style="margin-left:10px;font-size:16px">{{UserData.coin}}</div>
                    <div>
                        <el-button @click="open1=true" class="btn">充值</el-button>
                        <el-dialog v-model="open1" title="充值中心" center="true" width="50%" draggable>
                            <div>
                                选择你要充值的道具：
                                <el-radio-group v-model="radio1" class="ml-4">
                                    <el-radio label="1">月票</el-radio>
                                    <el-radio label="2">刀片</el-radio>
                                    <el-radio label="3">硬币</el-radio>
                                </el-radio-group>
                            </div>
                            <div>
                                选择你要充值的数量：
                                <input v-model="num" type="number" />
                            </div>
                            <div style="text-align: center;">
                                <el-button class="btn" @click="Payfor()">确认充值</el-button>
                            </div>
                        </el-dialog>
                    </div>
                </div>
            </div>
        </div>
        <div class="PC-Middle">
            <div class="PC-Middle-left">
                <ul>
                    <li :class="{selected:index==1}" @click="change(1)">
                        个人资料
                    </li>
                    <li :class="{selected:index==2}" @click="change(2)">
                        我的书架
                    </li>
                    <li :class="{selected:index==3}" @click="change(3)">
                        我的评论
                    </li>
                    <li :class="{selected:index==4}" @click="change(4)">
                        回复我的
                    </li>
                </ul>
            </div>
            <div class="PC-Middle-right">
                <div v-if="index==1" class="PC-Middle-right-1">
                    <ul>
                        <li class="list-top">
                            <h2>用户信息</h2>
                        </li>
                        <li>
                            <span>昵称</span>
                            <div v-if="c.nickName" class="PC-text">
                                <span>{{UserData.nickName}}</span>
                                <button @click="c.nickName=false" class="btn">修改</button>
                            </div>
                            <div v-else class="PC-text">
                                <el-input v-model="UserData2.nickName" />
                                <div>
                                    <button @click="changeNickName">保存</button>
                                    <button @click="changeNickName2">取消</button>
                                </div>

                            </div>
                        </li>
                        <li>
                            <span>性别</span>
                            <div class="PC-text">
                                <div class="mb-2 flex items-center text-sm">
                                    <el-radio-group @change="changegender" v-model="UserData.gender" class="ml-4">
                                        <el-radio :label="true">男</el-radio>
                                        <el-radio :label="false">女</el-radio>
                                    </el-radio-group>
                                </div>
                            </div>
                        </li>
                        <li>
                            <span>生日</span>
                            <div v-if="c.birthday" class="PC-text">
                                <span>{{GetDate(UserData.birthday)}}</span>
                                <button @click="c.birthday=false" class="btn">修改</button>
                            </div>
                            <div v-else class="PC-text">
                                <input v-model="UserData2.birthday" type="Date" />
                                <div>
                                    <button @click="changebirthday">保存</button>
                                    <button @click="changebirthday2">取消</button>
                                </div>

                            </div>
                        </li>
                        <li>
                            <span>邮箱</span>
                            <div v-if="c.email" class="PC-text">
                                <span>{{UserData2.email}}</span>
                                <button @click="c.email=false" class="btn">修改</button>
                            </div>
                            <div v-else class="PC-text">
                                <el-input v-model="UserData2.email" />
                                <div>
                                    <button @click="changeemail">保存</button>
                                    <button @click="changeemail2">取消</button>
                                </div>

                            </div>
                        </li>
                        <li>
                            <span>手机</span>
                            <div v-if="c.tel" class="PC-text">
                                <span>{{UserData2.tel}}</span>
                                <button @click="c.tel=false" class="btn">修改</button>
                            </div>
                            <div v-else class="PC-text">
                                <el-input v-model="UserData2.tel" />
                                <div>
                                    <button @click="changetel">保存</button>
                                    <button @click="changetel2">取消</button>
                                </div>

                            </div>
                        </li>
                    </ul>
                </div>
                <div v-else-if="index==2" class="PC-Middle-right-2">
                    <div v-if="books.length>0">
                        <router-link :to="'/library/book/'+it.id" v-for="it in books" :key="it.id">
                            <book-item-plus :data="it"></book-item-plus>
                        </router-link>
                    </div>
                    <div v-else>
                        <el-empty description="暂无数据" />
                    </div>
                    <el-pagination v-if="books.length>0" background layout="prev, pager, next" :total="bookTotal"
                        page-size="3" />
                </div>
                <div v-else-if="index==3" class="PC-Middle-right-3">
                    <div v-if="comment1.length > 0" v-infinite-scroll="load1" infinite-scroll-distance="10"
                        class="infinite-list" style="overflow: auto;height:400px">
                        <div class="comments" v-for="i in comment1" :key="i">
                            <div class="comments-top">
                                <div class="comments-top-name">{{i.userName}}</div>
                                <div class="comments-top-time">{{GetDate(i.time)}}</div>
                            </div>
                            <div class="comments-text">{{i.content}}</div>
                            <div class="comments-book">
                                <router-link :to="'/library/book/'+i.bookId">《{{i.bookName}}》</router-link>
                            </div>
                        </div>
                    </div>
                    <div v-else>
                        <el-empty description="暂无数据" />
                    </div>
                </div>
                <div v-else class="PC-Middle-right-4">
                    <div v-if="comment.length > 0" v-infinite-scroll="load" infinite-scroll-distance="10"
                        class="infinite-list" style="overflow: auto;height:400px">
                        <div class="comments" v-for="i in comment" :key="i.id">
                            <div class="comments-top">
                                <div class="comments-top-name">{{i.userName}}</div>
                                <div class="comments-top-time">{{GetDate(i.time)}}</div>
                            </div>
                            <div class="comments-text">"{{i.content}}"</div>
                            <div class="comments-book">
                                <router-link :to="'/library/book/'+i.bookId">《{{i.bookName}}》</router-link>
                            </div>
                        </div>
                    </div>
                    <div v-else>
                        <el-empty description="暂无数据" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import commentApi from "@/api/commentApi"
import userApi from "@/api/userApi"
import "@/Style/PersonCenter.scss"
import { ElMessage } from "element-plus"
import { ref } from 'vue'
import {useRoute} from 'vue-router'
import {GetDate} from '../plugins/TimeTool'
import axiosConfig from '../plugins/axiosConfig';
import bookApi from "@/api/bookApi"
import payApi from "@/api/payApi"
import BookItemPlus from "@/components/BookItemPlus.vue"


const route = useRoute()
const page = ref(0)
const count = ref(1)
const comment=ref([])
const load = () => {
  if(page.value >= count.value){
      return
  }
  page.value++
  commentApi.getSubCommentbyme(page.value,res=>{
      comment.value=res.data
      page.value=res.page
      count.value=res.count
  })
}
load()
const open1=ref(false)
const radio1 = ref('1')
const num =ref(0)
const page1 = ref(0)
const count1 = ref(1)
const comment1=ref([])
const load1 = () => {
  if(page1.value >= count1.value){
      return
  }
  page1.value++
  commentApi.getCommentbyme(page1.value,res=>{
      comment1.value.push(...res.data)
      page1.value=res.page
      count1.value=res.count
  })
}
load1()

const index = ref(1)
function change(i){
    index.value = i
}
const books = ref([])
const bookTotal = ref(0)
function shelf(page){
    bookApi.shelf(page,res=>{
        books.value.push(...res.data)
        bookTotal.value = res.tatal
    })
}
shelf(1)


//个人信息
const UserData=ref({
    account: 1,
    nickName: "ZeroWind",
    birthday: 1012752000000,
    imgUrl: "img/BraveDragon.png",
    gender: true,
    email: null,
    tel: "18075566390",
    bankCard: null,
    idCard: null,
    coin:"",
    tiket:"",
    
})

//个人信息
const UserData2=ref({
    account: 1,
    nickName: "ZeroWind",
    birthday: 1012752000000,
    imgUrl: "/img/BraveDragon.png",
    gender: true,
    email: null,
    tel: "18075566390",
    bankCard: null,
    idCard: null,
    
})


const img = ref(axiosConfig.imgURL(UserData.value.imgUrl))
//是否处于修改状态
const c=ref({
    nickName: true,
    birthday: true,
    imgUrl: true,
    gender: true,
    email: true,
    tel: true,
    bankCard: true,
    idCard: true,
})

userApi.Get(route.params.id?route.params.id:"",res=>{
    UserData.value = res
    UserData2.value = res
    img.value = axiosConfig.imgURL(UserData.value.imgUrl)
})
function Payfor(){
    payApi.pay(num.value,radio1.value,res=>{
        window.open(res.data)
    })
}
function UpdateData(){
    userApi.update(UserData.value,res=>{
        if(res.code==200){
        ElMessage({
            message:"修改成功",
            type:"success"
        })
        }
        
    })
}

function changeNickName(){
    UserData.value.nickName = UserData2.value.nickName
    c.value.nickName = true
    UpdateData()
}

function changeNickName2(){
    UserData2.value.nickName = UserData.value.nickName
    c.value.nickName = true
}
function changebirthday(){
    UserData.value.birthday = new Date(UserData2.value.birthday).getTime()
    c.value.birthday = true
    UpdateData()

}

function changebirthday2(){
    UserData2.value.birthday = UserData.value.birthday
    c.value.birthday = true
}
function changeemail(){
    UserData.value.email = UserData2.value.email
    c.value.email = true
    UpdateData()

}

function changeemail2(){
    UserData2.value.email = UserData.value.email
    c.value.email = true
}
function changetel(){
    UserData.value.tel = UserData2.value.tel
    c.value.tel = true
    UpdateData()

}

function changetel2(){
    UserData2.value.tel = UserData.value.tel
    c.value.tel = true
}
function changegender(){
    UserData.value.gender=UserData2.value.gender
    UpdateData()
}
const uploadUrl = axiosConfig.baseURL + "file/upload"
const uploadHeader = {
    Authorization : "Bearer " + localStorage.getItem("token")
}

function success(e){
 UserData.value.imgUrl=e.data[0]
 img.value = axiosConfig.imgURL(e.data[0])
 UpdateData()
}

</script>
<script>

</script>

<style lang="scss" scoped>
.PC-text{
    display: flex;
    width: 300px;
    justify-content: space-between;
    div{
        width: 100px;
    }
}
</style>