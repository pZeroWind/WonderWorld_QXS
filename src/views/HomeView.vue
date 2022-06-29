<template>
  <div class="AllHome">
    <div>
      <el-carousel ref="banner" :interval="3000" trigger="click" type="card" height="300px">
        <el-carousel-item v-for="item in banner" :key="item.id">
          <router-link :to="'/library/book/'+item.bookId" target="_blank">
            <div class="banner">
              <img :src="item.imgUrl" style="width:100%;height:100%;" alt="banner" />
              <div class="title">
                {{item.title}}
              </div>
            </div>
          </router-link>
        </el-carousel-item>
      </el-carousel>
    </div>

    <div class="middle" style="">
      <div class="middle-left">
        <list-view title="热度最高" :data="book.hotbook" :loading="book.hot" />
        <list-view title="最近更新" :data="book.newUpload" :loading="book.newup" />
        <list-view title="最新上架" :data="book.shelfbook" :loading="book.shelf" />
        <sort-view title="分类推荐" :type="type" :data="typebook" :SelectIndex="SelectIndex" @Select="GetListType"
          :load="typeload" />
      </div>
      <div class="middle-right">
        <tag-view :items="tags" />
        <author-view />
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import bookApi from "../api/bookApi"
import ListView from "@/components/ListView.vue"
import SortView from "@/components/SortView.vue"
import TagView from "@/components/TagView.vue"
import AuthorView from "@/components/AuthorView.vue"
import axiosConfig from "@/plugins/axiosConfig"
import"@/Style/Home.scss"

export default {
  components:{
    ListView,
    SortView,
    TagView,
    AuthorView,
    
  },
  data(){
    return{
      user:{
        account: "",
        password:""
      },
      banner:[],
      type:[],
      tags:[],
      book:{
        hot:true,
        newup:true,
        shelf:true,
        hotbook:[],
        newUpload:[],
        shelfbook:[]
      },
      typebook:[],
      SelectIndex:1,
      typeload:true
    }
  },
  methods:{
    //获取轮播图
    GetBanner(){
      bookApi.banner(res=>{
        res.forEach(i=>{
          i.imgUrl = axiosConfig.baseURL+i.imgUrl
        })
        this.banner = res
        this.$refs.banner.setActiveItem(0)
      })
    },
    //获取列表
    GetList(mode,out){
      bookApi.getList({
        mode:mode,
        size:6
      },res=>{
        out(res)
      })
    },
    //获取分区列表
    GetListType(type){
      this.SelectIndex = type
      this.typeload = true
      bookApi.getList({
        type:type,
        size:10
      },res=>{
        this.typebook = res.data
        this.typeload = false
      })
    },
    //获取标签
    GetTag(){
      bookApi.tag(res=>{
        this.tags = res.data
      })
    },
    GetType(){
       bookApi.type(res=>{
        this.type = res
      })
    }
  },
  created(){
    this.GetTag()
    this.GetListType(this.SelectIndex)
    this.GetType()
    this.GetBanner()
    this.GetList(1,res=>{
      this.book.hotbook = res.data
      this.book.hot = false
      this.$forceUpdate()
    })
    this.GetList(2,res=>{
      this.book.newUpload = res.data
      this.book.newup = false
      this.$forceUpdate()
    })
    this.GetList(3,res=>{
      this.book.shelfbook = res.data
      this.book.shelf = false
      this.$forceUpdate()
    })
  }
}

</script>


