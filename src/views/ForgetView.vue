<template>
    <div class="loginDialog">
        <div class="box">
            <el-input v-model="data.account" placeholder="请输入账号" />
            <div style="display:flex;height:45px">
                <el-input v-model="data.code" placeholder="请输入验证码" />
                <button v-if="code == 0" class="btn small" @click="codeGet">获取验证码</button>
                <button v-else class="btn small disabled" disabled>{{ code }}秒后继续</button>
            </div>
            <el-input v-model="data.password" placeholder="请输入新密码" show-password />
            <button @click="come" class="btn">确定</button>
        </div>
    </div>
</template>

<script setup>
import userApi from "@/api/userApi"
import { ref,reactive } from "vue"
const data = reactive({
    account: "",
    code: "",
    password:""
})


const code = ref(0)

function codeGet() {
    userApi.GetCodeF(data.account, () => {
        code.value = 60
        let timer = setInterval(() => {
            code.value--
            if (code.value == 0) {
                clearInterval(timer)
            }
        }, 1000)
    })
    
}

function come() {
    userApi.Forget(data, () => {
        location.href = "/"
    })
}
</script>

<style lang="scss" scoped>


.loginDialog {
    width: 300px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;

    div {
        display: flex;
        justify-content: center;
        align-content: center;
    }

    .el-input {
        margin-top: 10px;
    }

    .box {
        flex-direction: column;

        a {
            margin-top: 10px;

            &:hover {
                text-decoration: underline;
            }
        }

        .btn {
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

        .disabled {
            background-color: #a33;
            color: #aaa;
        }

        .small {
            margin-left: 10px;
            width: 100px;
            font-size: 12px;
        }
    }

}
</style>