<template>
  <div class="AboutAll">
    <div class="AboutAll-left">
      <all-sort-view title="分区" @SetData="setType" :data="type" :index="typeIndex" />
      <all-sort-view title="排序" @SetData="setSort" :data="sort" :index="sortIndex" />
      <all-sort-view title="状态" @SetData="setState" :data="state" :index="stateIndex" />
      <all-sort-view title="字数" @SetData="setWord" :data="word" :index="wordIndex" />
      <add-tag-view :items="tags" @Deleting="deleteTags" @Add="addTags" />
    </div>
    <div v-loading="load" v-if="books.data.length==0" class="AboutAll-right">
      <el-empty description="没有相关内容" />
    </div>
    <div v-else v-loading="load" class="AboutAll-right">
      <div style="flex:1">
        <router-link @click="click(it.id)" v-for="it in books.data" :key="it.id" target="_blank"
          :to="'/library/book/'+it.id">
          <book-item-plus :data="it" />
        </router-link>
      </div>
      <div style="display:flex;justify-content: center;align-items: center;">
        <el-pagination background layout="prev, pager, next" @current-change="getList" :page-size="books.size"
          :total="books.total" />
      </div>
    </div>
  </div>
</template>

<script>
import "@/Style/About.scss"
import AllSortView from "@/components/AllSortView.vue"
import bookApi from "@/api/bookApi"
import BookItemPlus from "../components/BookItemPlus.vue"
import AddTagView from '@/components/AddTagView.vue'
export default {
    components:{
    AllSortView,
    BookItemPlus,
        AddTagView
},
    data(){
      return{
        load:false,
        type:[
          {
            id:0,
            name:"全部分区"
          }
        ],
        typeIndex:0,
          sort:[
            {
              id: 1,
              name:"综合排序"
            },
            {
              id: 2,
              name:"最近更新"
            },
            {
              id: 3,
              name:"最新上架"
            },
            {
              id: 4,
              name:"总点击数"
            },
            {
              id: 5,
              name:"总月票数"
            },
            {
              id: 6,
              name:"总刀片数"
            },
            {
              id: 7,
              name:"总字数"
            }
          ],
          sortIndex:1,
          state:[
            {
              id:2,
              name:"无限制"
            },
            {
              id:5,
              name:"连载中"
            },
            {
              id:4,
              name:"已完本"
            }
          ],
          stateIndex:2,
          word:[
            {
              id: 1,
              name: "无限制",
              data: {
                maxWord: 0,
                minWord: 0
              }
            },
            {
              id: 2,
              name: "30万以下",
              data: {
                maxWord: 300000,
                minWord: 0
                }
            },
            {
                  id: 3,
                  name: "30万-50万",
                  data: {
                      maxWord: 500000,
                      minWord: 300000
                  }
            },
              {
                  id: 4,
                  name: "50万-100万",
                  data: {
                      maxWord: 1000000,
                      minWord: 500000
                  }
              },
              {
                  id: 5,
                  name: "100万-200万",
                  data: {
                      maxWord: 2000000,
                      minWord: 1000000
                  }
              },
              {
                  id: 6,
                  name: "200万以上",
                  data: {
                      maxWord: 0,
                      minWord: 2000000
                  }
              }
            ],
            wordIndex:1,
            src: "",
            tags:[],
            books:{
              data:[]
            }
          }
    
    },
  methods: {
      deleteTags(name) {
        this.tags = this.tags.filter(p => p != name)
        this.getList(1)
      },
    addTags(name) {
        if (this.tags.indexOf(name) == -1) {
          this.tags.push(name)
          this.getList(1)
        }
      },
      click(id){
        bookApi.clickUp(id)
      },
      setType(id){
        this.typeIndex = id
        this.getList(1)
      },
      setSort(id){
        this.sortIndex = id
        this.getList(1)
      },
      setState(id){
        this.stateIndex = id
        this.getList(1)
      },
      setWord(id){
        this.wordIndex = id
        this.getList(1)
      },
      getList(p){
        this.load = true
        let data = {
          page: p,
          type: this.typeIndex,
          mode: this.sortIndex,
          isPublish: this.stateIndex,
          src: this.src,
          maxWord: 0,
          minWord: 0,
          tags:this.tags.join(",")
        }
        this.word.forEach(it => {
          if(it.id == this.wordIndex){
            data.maxWord = it.data.maxWord
            data.minWord = it.data.minWord
          }
        })
        bookApi.getList(data,res=>{
          this.books = res
          this.load = false
        })
      }
    },
    created(){
      bookApi.type(res=>{
        this.type.push(...res)
      })
      if (this.$route.query.tag != undefined) {
        this.tags.push(this.$route.query.tag)
      }
      if (this.$route.query.sch != undefined) {
        this.src = this.$route.query.sch
      }
      this.getList()
    }
}
</script>

