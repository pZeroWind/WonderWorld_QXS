<template>
  <div class="book">
    <img alt="封面" :src="base + data.cover" class="image" />
    <div class="data">
      <div class="title">
        {{data.title}}
      </div>
      <div class="tags">
        <el-tag type="info" v-for="it in data.tags" :key="it.id">
          {{it.name}}
        </el-tag>
      </div>
      <div class="dataLine">
        <strong>作者：</strong>
        {{data.nickName}}&nbsp;&nbsp;&nbsp;<strong>总字数：</strong>{{data.totalWord}}字
      </div>
      <div class="dataLine">
        <strong>综合信息：</strong>
        {{data.type}} · {{data.state}} · {{UploadTime}}&nbsp;&nbsp;&nbsp;
        <strong>点击量：</strong>
        {{data.clickNum}}
      </div>
      <div class="dataLine intro">
        <strong>简介：</strong>
        {{data.intro}}
      </div>
    </div>
  </div>
</template>

<script>
import axiosConfig from '@/plugins/axiosConfig'
import {GetDate} from '@/plugins/TimeTool'
export default {
  props:{
    data:Object
  },
  data(){
    return{
      base:axiosConfig.baseURL
    }
  },
  computed:{
    UploadTime(){
      return GetDate(this.data.updateTime)
    }
  }
}
</script>

<style lang="scss" scoped>
  .book{
    cursor: pointer;
    display: flex;
    flex-wrap: nowrap;
    background-color: #fff;
    border-radius: 10px;
    align-items: center;
    box-shadow: 0 0 5px #ddd;
    margin: 15px;
    height: 175px;
    transition: all .5s;
    &:hover{
      transform: scale(1.015);
    }
    img{
      margin: 10px;
      width: 120px;
      height: 150px;
      border-radius: 5px;
    }
    .data{
      flex: 1;
      height: 90%;
      margin: 2.5%;
      .title{
        font-size: 16px;
        margin-top: 5px;
        font-weight: bold;
        white-space: nowrap;
      }
      .dataLine{
        font-size: 12px;
        margin-top: 5px;
        white-space: nowrap;
      }
      .tags{
        span{
          margin-top: 5px;
          margin-right: 2.5px;
        }
      }
      .intro{
        display:-webkit-box;
        white-space: pre-wrap;
        -webkit-line-clamp:3;
        -webkit-box-orient:vertical;
        overflow:hidden;
      }
    }
  }
</style>