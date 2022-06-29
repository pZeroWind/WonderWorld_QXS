<template>
  <div class="all1">
    <h3 style="text-align: center;padding:5px">作家热度榜</h3>
    <ul>
      <li v-for="item in data" :key="item.id">
        <img alt="头像" style="width: 40px;height: 40px;border-radius: 50px;margin-right: 10px;"
          :src="baseURL+item.imgUrl" />
        <span class="name">{{item.nickName}}</span>
      </li>
    </ul>
  </div>
</template>

<script setup>
import "@/Style/AuthorView.scss"
import { reactive } from "vue-demi"
import axiosConfig from "@/plugins/axiosConfig";
import userApi from "@/api/userApi";

const baseURL = axiosConfig.baseURL;
const data = reactive([])
userApi.Hot(res => {
  data.push(...res.data)
})
</script>

