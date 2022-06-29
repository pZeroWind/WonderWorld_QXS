<template>
    <div class="content">
        <div class="data">
            <el-input v-model="title" placeholder="请输入本章标题" />
            <div style="display:flex">
                <label>是否收费：</label>
                <el-switch v-model="chargeState" />
            </div>
            <div style="display:flex">
                <label>发布状态：</label>
                <el-switch v-model="pass" />
            </div>
        </div>

        <div>
            <div id="editor" ref="editor"></div>
        </div>

        <div style="display:flex;justify-content: center;">
            <button @click="update" v-if="ids.chapterId">保存</button>
            <button @click="upload" v-else>上传</button>
        </div>
    </div>
</template>

<script>
import wangEditor from 'wangeditor'
import chapterApi from '@/api/chapterApi'
export default {
    data(){
        return {
            ids: {
                bookId: undefined,
                scrollId: undefined,
                chapterId: undefined
            },
            title:"",
            context: "",
            chargeState: false,
            pass:false,
            editor:{}
        }
    },
    created() {
        console.log(this.$route.params)
        this.ids.bookId = this.$route.params.bookId
        this.ids.scrollId = this.$route.params.scrollId
        this.ids.chapterId = this.$route.params.chapterId
    },
    mounted(){
        const editor = new wangEditor(`#editor`)
        editor.config.height = 500
        // 配置 onchange 回调函数，将数据同步到 vue 中
        editor.config.onchange = (newHtml) => {
            this.context = newHtml
        }
        editor.config.zIndex = 10
        editor.config.menus = [
            "undo", // 撤销
            "redo" // 重复
        ]
        
        // 创建编辑器
        editor.create()
        this.editor = editor
        if (this.ids.chapterId != undefined && this.ids.chapterId != "") {
            chapterApi.get(this.ids.chapterId, this.ids.scrollId, this.ids.bookId, res => {
                this.title = res.data.title
                this.editor.txt.html(res.data.content)
                this.chargeState = res.data.chargeState
                this.pass = res.data.pass
            })
            
        }
    },
    beforeUnmount() {
        // 调用销毁 API 对当前编辑器实例进行销毁
        this.editor.destroy()
        this.editor = null
    },
    methods:{
        update() {
            chapterApi.chapterUpdate({
                "id": this.ids.chapterId,
                "title": this.title,
                "content": this.context,
                "chargeState": this.chargeState,
                "scrollId": this.ids.scrollId,
                "pass": this.pass
            }, res => {
                this.toHome(res)
            })
        },
        upload() {
            chapterApi.chapterAdd({
                "title": this.title,
                "content": this.context,
                "chargeState": this.chargeState,
                "scrollId": this.ids.scrollId,
                "pass": this.pass
            }, res => {
                this.toHome(res)
            })
        },
        toHome(res) {
            if (res.code == 200) {
                location.href = "/personCenter/book/" + this.ids.bookId
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.content{
    height: auto;
    min-height: 600px;
    flex-direction: column;
    .data{
        margin: 10px;
        display: flex;
        label{
            display: flex;
            margin-left: 20px;
            width: 100px;
            justify-content: center;
            align-items: center;
        }
    }
}

#editor{
    margin: 10px;
}

button{
    width: 100px;
    padding: 10px;
    border-radius: 10px;
    border: none;
    outline: none;
    font-size: 14px;
    font-weight: bold;
    background-color: #eee;
    cursor: pointer;
    &:hover{
        background-color: #ddd;
    }
}
</style>