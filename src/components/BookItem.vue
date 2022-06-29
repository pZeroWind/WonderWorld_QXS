<template>
  <div class="book">
        <img
            alt="封面"
            :src="base + src"
            class="image"
        />
        <div>
          {{title}}
        </div>
  </div>
</template>

<script>
import axiosConfig from '@/plugins/axiosConfig'
export default {
  props:{
    title:String,
    src:String
  },
  data(){
    return{
      base:axiosConfig.baseURL
    }
  }
}
</script>

<style lang="scss" scoped>
  .book{
    cursor: pointer;
    display: flex;
    flex-direction: column;
    width: 105px;
    margin: 15px;
    height: 150px;
    transition: all .5s;
    &:hover{
      transform: scale(1.05);
    }
    img{
      flex: 1;
      height: 125px;
      box-shadow: 0 0 5px #ddd;
      width: 100%;
      border-radius: 5px;
    }
    div{
      font-size: 12px;
      margin-top: 5px;
      font-weight: bold;
      text-align: center;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
  }
</style>