<template>
    <div class="data">
        <div class="line">
            <label>作品名</label>
            <input v-model="upload.title" placeholder="请输入书名" class="inp" type="text"/>
        </div>
        <div class="line">
            <label>分区</label>
            <select v-model="upload.typeId" class="inp">
                <option v-for="i in type" :key="i.id" :value="i.id">
                    {{i.name}}
                </option>
            </select>
        </div>
        <div class="line">
            <label>简介</label>
            <textarea v-model="upload.intro" placeholder="请输入简介" class="inps"></textarea>
        </div>
        <div class="line">
            <label>标签</label>
            <div class="line-tag">
                <input v-model="tagText" placeholder="请输入标签" class="inp" type="text"/>
                <button class="line-btn" @click="addTag(tagText)">添加</button>
            </div>
        </div>
        <div class="line">
            <label>已添加标签</label>
            
            <div class="tags">
                <el-popconfirm
                    v-for="(it,i) in upload.tags" 
                    :key="i"
                title="是否移除该标签？"
                @confirm="removeTag(it)">
                <template #reference>
                    <el-tag
                    type="info">
                    {{it}}
                    </el-tag>
                </template>
            </el-popconfirm>
            </div>
        </div>
        <div class="line">
            <label>推荐标签</label>
            <div class="tags">
                 <el-tag
                @click="addTag(it)"
                type="info" 
                v-for="(it,i) in tags" 
                :key="i">
                {{it}}
                </el-tag>
            </div>
        </div>
        <div class="line center">
            <button class="line-btn" @click="uploadData">开始书写</button>
        </div>
    </div>
</template>

<script setup>
import bookApi from '@/api/bookApi'
import { ElMessage } from 'element-plus';
import { ref, defineEmits } from 'vue';
//自定义方法
const emits = defineEmits(["uploaded"])

//传入数据
const upload = ref({
    title:"",
    intro:"",
    tags:[],
    typeId:1
})

//标签输入框内容
const tagText = ref("")

//确认开始写书
function uploadData(){
    bookApi.upload(upload.value,res=>{
        if(res.code==200){
            upload.value={
                title:"",
                intro:"",
                tags:[],
                typeId:1
            }
            ElMessage({
                message:"发布成功",
                type:"success"
            })
            emits("uploaded")
        }
    })
}


//获取分类
const type = ref([])
bookApi.type(res=>{
    type.value = res
})

//获取热门标签
const tags = ref([])
bookApi.tagM(10,res=>{
    tags.value = res.data
})

//添加标签
function addTag(tag){
    if(tag==""||tag==undefined){
        ElMessage({
            message:"标签内容不得为空",
            type:"error"
        })
        return
    }
    if(tagText.value == tag){
        tagText.value = ""
    }
    upload.value.tags = upload.value.tags.filter(p=>p != tag)
    upload.value.tags.push(tag)
}

//移除标签
function removeTag(tag){
    upload.value.tags = upload.value.tags.filter(p=>p != tag)
}
</script>

<style lang="scss" scoped>
    .data{
        flex-direction: column;
        .center{
                justify-content: center;
        }
        .line{
            display: flex;
            align-items: center;
            &-btn{
                cursor: pointer;
                border: 1px solid #900;
                background-color: #a00;
                color: #fff;
                margin: 2.5px;
                padding: 5px 10px;
                border-radius: 5px;
                &:hover{
                    background-color: #900;
                }
            }
            label{
                display: block;
                width: 100px;
            }
            .inp,.inps,.tags{
                margin: 2.5px;
                padding: 2.5px;
                border: none;
                outline: none;
                resize: none;
                font-family: '微软雅黑';
                span{
                    cursor: pointer;
                    user-select: none;
                    margin: 2.5px;
                }
            }
            .inp,.inps{
                border: 1px solid #ddd;
                border-radius: 5px;
                flex: 0 0 300px;
                width: 300px;
            }
            .inps{
                height: 100px;
            }
            .tags{
                border: 1px solid #ddd;
                border-radius: 5px;
                flex: 0 0 300px;
                width: 300px;
                min-height: 30px;
                display: flex;
                flex-flow: row wrap;
                justify-content: left;
            }
            &-tag{
                display: flex;
                justify-content: space-between;
                .inp{
                    flex: 0 0 240px;
                    width: 240px;
                }
            }
        }
    }
</style>