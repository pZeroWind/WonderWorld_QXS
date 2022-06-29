<template>
    <div class="allsort">
        <div class="allsort-1">
            <h5>{{title}}</h5>
            <ul>
                <li v-for="(it,i) in data" :key="i" @click="set(it.id)" :class="{select:it.id==index}">
                    {{it.name}}
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import "@/Style/AllSortView.scss"
export default {
  props:{
      data:Array,
      title:String,
      index:Number
  },
  emits:{
      SetData:null
  },
  methods:{
      set(id){
          this.$emit("SetData",id)
      }
  }
}

</script>

