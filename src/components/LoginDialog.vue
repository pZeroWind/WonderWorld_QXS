<template>
    <div class="loginDialog">
        <el-radio-group v-model="radio" size="large">
            <el-radio-button label="登录" />
            <el-radio-button label="注册" />
        </el-radio-group>
        <div class="box" v-if="radio=='登录'">
            <el-input v-model="login.account" placeholder="请输入账号" />
            <el-input v-model="login.password" placeholder="请输入密码" show-password />
            <a href="/password/forget">忘记密码</a>
            <button @click="loging" class="btn">登录</button>
        </div>
        <div class="box" v-else>
            <el-input v-model="register.account" placeholder="请输入想要账号" />
            <el-input v-model="register.nickName" placeholder="请输入昵称" />
            <el-input v-model="register.password" placeholder="请输入密码" show-password />
            <el-input v-model="repassword" placeholder="请确认密码" show-password />
            <el-input v-model="register.email" placeholder="请输入邮箱" />
            <div style="display:flex;height:45px">
                <el-input v-model="register.code" placeholder="请输入验证码" />
                <button v-if="code==0" class="btn small" @click="codeGet">获取验证码</button>
                <button v-else class="btn small disabled" disabled>{{code}}秒后继续</button>
            </div>
            <el-input v-model="register.tel" placeholder="请输入联系电话" />
            <button class="btn" @click="registeing">注册</button>
        </div>
    </div>
</template>

<script>
import userApi from '@/api/userApi'
export default {
    data(){
        return{
            radio:"登录",
            login:{
                account:"",
                password:""
            },
            register:{
                account: "",
                password: "",
                nickName: "",
                gender: true,
                email: "",
                tel: ""
            },
            repassword:"",
            code:0
        }
    },
    emits:{
        isLogin:function(){
            return true
        }
    },
    methods:{
        loging(){
            userApi.Login(this.login,()=>{
                localStorage.setItem("account",this.login.account)
                this.$emit("isLogin")
            })
        },
        codeGet() {
            userApi.GetCode(this.register.email, () => {
                this.code = 60
                let timer = setInterval(() => {
                    this.code--
                    if (this.code == 0) {
                        clearInterval(timer)
                    }
                }, 1000)
            })
        },
        registeing() {
            userApi.Register(this.register, res => {
                if (res.code == 200) {
                    this.register = {
                        account: "",
                        password: "",
                        nickName: "",
                        gender: true,
                        email: "",
                        tel: ""
                    }
                    this.radio = "登录"
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.loginDialog{
    width: 300px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
    div{
        display: flex;
        justify-content: center;
        align-content: center;
    }
    .el-input{
        margin-top: 10px;
    }
    .box{
        flex-direction: column;
        a{
            margin-top: 10px;
            &:hover{
                text-decoration: underline;
            }
        }
        .btn{
            cursor: pointer;
            margin-top: 10px;
            background: #900;
            border: none;
            outline: none;
            color: #fff;
            font-size: 16px;
            font-weight: bold;
            padding: 5px;
            border-radius: 5px;
        }
        .disabled{
            background-color: #a33;
            color: #aaa;
        }
        .small{
            margin-left: 10px;
            width: 100px;
            font-size: 12px;
        }
    }
    
}
</style>