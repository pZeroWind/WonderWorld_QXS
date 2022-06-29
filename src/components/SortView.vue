<template>
    <div >
      <h3 style="margin-left:10px">{{title}}</h3>
      <div class="all">
        <div class="left">
            <ul>
                <li :class="{selected:SelectIndex==it.id}" v-for="it in type" :key="it.id" @click="changeType(it.id)">{{it.name}}</li>
            </ul>
        </div>
        <el-empty v-loading="load" class="right" v-if="data.length == 0" :image-size="100" description="没有相关内容"/>
        <div v-loading="load" v-else class="right">
          <div class="rbook" v-for="it in data" :key="it.id">
            <book-item :src="it.cover" :title="it.title"/>
          </div>
        </div>
      </div>
    </div>
</template>

<script >
import "@/Style/SortView.scss"
import BookItem from "./BookItem.vue"
export default {
    props: {
        title: String,
        type: Array,
        data:Array,
        SelectIndex:Number,
        load:Boolean
    },
    emits:{
      Select:null
    },
    components: { 
      BookItem
    },
    methods:{
      changeType(id){
        if(this.load){
          return
        }
        this.$emit("Select",id)
      }
    }
}

</script>

<style lang="scss" scoped>
  .rbook{
    flex: 0 0 20%;
    width: 20%;
    display: flex;
    justify-content: center;
  }
</style>