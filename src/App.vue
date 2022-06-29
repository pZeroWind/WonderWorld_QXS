
<template>
  <div class="AllPage">
    <div class="topNav">
      <div class="topNav_left">
        <ul>
          <li class="text">
            <img src="../src/assets/BraveDragon.png" alt="logo"
              style="width:40px;height:40px;margin-top:5px;margin-left:25px" />
            WonderWorld
          </li>
          <li>
            <router-link to="/" class="active" style="margin-left:20px">首页</router-link>
          </li>
          <li>
            <router-link to="/library" class="active">书库</router-link>
          </li>
        </ul>
      </div>
      <div class="topNav_middle">
        <el-input style="margin-top:1px" v-model="input2" placeholder="请输入你想搜索的内容" />
        <button class="btn" @click="sch">搜索</button>
      </div>
      <div class="topNav_right">
        <el-dropdown v-if="isLogin">
          <a class="active user">
            <el-avatar :size="25" style="margin-right:10px" :src="img"></el-avatar>
            {{user.nickName}}
          </a>
          <template #dropdown>
            <router-link to="/person">
              <div class="dorpItem">个人中心</div>
            </router-link>
            <div class="dorpItem" @click="logout">退出登录</div>
          </template>
        </el-dropdown>
        <a v-else @click="userCenter" class="active user">
          <el-avatar :size="25" style="margin-right:10px" :src="img"></el-avatar>
          {{user.nickName}}
        </a>
        <router-link v-if="isLogin" to="/personCenter/writer" class="active btn">
          作家中心
        </router-link>
        <a v-else @click="noLogin" class="active btn">
          作家中心
        </a>
      </div>
    </div>
    <div class="FirstAll">
      <div style="height:20px"></div>
      <div class="FirstMiddle" style="width:1240px;">
        <router-view />
      </div>
      <el-backtop :right="50" :bottom="100" />
      <div class="bottom">
        <div class="bottom-link">
          <div class="wrap">
            Copyright © 2002-2022 www.wonder.com All Rights Reserved 版权所有 Xtreme小组

            请所有作者发布作品时务必遵守国家互联网信息管理办法规定，我们拒绝任何色情小说，一经发现，即作删除！举报电话：18674606156

            本站所收录的作品、社区话题、用户评论、用户上传内容或图片等均属用户个人行为。如前述内容侵害您的权益，欢迎举报投诉，一经核实，立即删除，本站不承担任何责任

            联系方式 18075566390 地址：中国（长沙）皇家工程职院11-719
          </div>
        </div>
      </div>
    </div>
    <el-dialog width="500px" v-model="show">
      <login-dialog @isLogin="toReLoad"></login-dialog>
    </el-dialog>
  </div>
</template>
<script>
import "@/Style/App.scss"
import LoginDialog from "./components/LoginDialog.vue"
import { ElMessage } from 'element-plus';
import userApi from './api/userApi';
import axiosConfig from './plugins/axiosConfig';
export default {
    name: "app",
    data() {
        return {
            inv:false,
            input2: "",
            show:false,
            user:{
              nickName: "游客",
              imgUrl:"/img/BraveDragon.png"
            },
            isLogin:false
        };
    },
    components: { LoginDialog },
    methods:{
      noLogin(){
        ElMessage({
          message:"您还未登录",
          type:"error"
        })
      },
      userCenter(){
        let token = localStorage.getItem("token")
        if(token!=undefined){
          return true
        }else{
          this.show = true
          return false
        }
      },
      toReLoad(){
        ElMessage({
          message:"登录成功",
          type:"success"
        })
        setTimeout(()=>{
          location.reload()
        },500)
      },
      sch() {
        location.href = "/library?sch=" + encodeURI(this.input2)
      },
      logout() {
        localStorage.removeItem("token")
        location.href = "/"
      },
      
    },
    created(){
      let token = localStorage.getItem("token")
      if(token==undefined||token==""){
        return
      }
      userApi.Get("",res=>{
        this.user = res
        this.isLogin = true
      })
    },
  mounted() {
    let s = location.search
    if (s.indexOf("?sch=")!==-1) {
      this.input2 = decodeURI(s.replace("?sch=", ""))
    }
  },
  computed:{
    img(){
      return axiosConfig.baseURL + this.user.imgUrl
    }
  }
}
</script>

<style lang="scss" scoped>
  .text{
    display: flex;
    align-items: center;
    justify-items: center;
    font-size: 18px;
    font-weight: bold;
    color: #d00;
  }
  .btn{
    cursor: pointer;
    background-color: #a00;
    width: 60px;
    height: 30px;
    border: none;
    font-weight: bold;
    color: #fff;
    border-radius: 5px;
    &:hover{
      background-color: #d00;
    }
  }
</style>


