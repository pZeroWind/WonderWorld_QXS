<template>
    <div class="hot">
      <h3 style="margin-bottom:10px">{{title}}</h3>
      <div v-loading="loading" v-if="data.length == 0">
        <el-empty class="hot-pic" :image-size="100" description="没有相关内容"/>
      </div>
      <el-row v-else class="hot-pic" >
        <el-col
          v-for="it in data"
          :key="it.id"
          :span="4"
        >
          <router-link @click="click(it.id)" target="_blank" :to="'/library/book/'+it.id">
            <book-item :src="it.cover" :title="it.title"></book-item>
          </router-link>
        </el-col>
      </el-row>
    </div>
</template>


<script>
import BookItem from "./BookItem.vue"
import "@/Style/ListView.scss"
import bookApi from '@/api/bookApi'
export default {
    props:{
        title:String,
        data:Array,
        loading:Boolean
    },
    components:{
      BookItem
    },
    methods:{
      click(id){
        bookApi.clickUp(id)
      }
    }
}

</script>