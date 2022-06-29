<template>
  <div class="tag-all">
    <h5 style="padding:5px;text-align: left;padding: 10px;">选定标签</h5>
    <div class="data">
      <el-tag @click="deleteTags(item)" v-for="(item,index) in items" :key="index" type="info"
        style="margin:5px;margin-left: 0;cursor: pointer;">
        {{item}}
      </el-tag>
    </div>
    <h5 style="padding:5px;text-align: left;padding: 10px;">推荐标签</h5>
    <div class="data">
      <el-tag @click="addTags(item)" v-for="(item,index) in tags" :key="index" type="info"
        style="margin:5px;margin-left: 0;cursor: pointer;">
        {{item}}
      </el-tag>
    </div>
  </div>
</template>

<script>

export default {
  props:{
    items:Array
  },
  data() {
    return{
      tags:[]
    }
  },
  methods: {
    deleteTags(name) {
      this.$emit("Deleting",name)
    },
    addTags(name) {
      this.$emit("Add", name)
    }
  },
  mounted() {
    bookApi.tag(res => {
      this.tags = res.data
    })
  }
}
import "@/Style/TagView.scss"
import bookApi from '@/api/bookApi'
</script>

<style lang="scss" scoped>


.tag-all{
  margin: 20px 10px;
  width: auto;
  .data {
    display: flex;
    flex-wrap: wrap;
    font-size: 14px;

    span {
      display: inline-block;
      max-width: 100px;
      height: 25px;
      line-height: 25px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}
  
</style>

