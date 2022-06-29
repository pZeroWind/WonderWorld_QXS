<template>
  <div class="tag-all">
    <h3 style="padding:5px">标签热度榜</h3>
    <div class="data">
      <router-link v-for="(item,index) in items" :key="index" target="_blank" :to="{ path:'/library',query:{tag:item}}"
        :title="item">
        <el-tag type="info" style="margin:5px;">
          {{item}}
        </el-tag>
      </router-link>
    </div>
  </div>
</template>

<script>

export default {
  props:{
    items:Array
  }
}
import "@/Style/TagView.scss"
</script>

<style lang="scss" scoped>
  .data{
    display: flex;
    flex-wrap: wrap;
    span{
      display: inline-block;
      max-width: 100px;
      height: 25px;
      line-height: 25px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
</style>

