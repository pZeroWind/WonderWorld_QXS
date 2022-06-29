<template>
    <div>
        <div class="content">
            <div
                style="display: flex;justify-content: center;align-items: center;font-weight: bold;font-size: 18px;text-indent: 0;padding-bottom: 25px;padding-top: 10px;">
                {{title}}
                <div class="btn">
                    <button @click="open=!open">举报</button>
                </div>
            </div>

            <div style="flex:1;">
                <div class="text" v-for="(it,i) in content" :key="i">
                    <p>
                        {{it.content}}
                        <img @click="it.show=true" alt="message" style="margin-left:10px" width="12.5"
                            src="@/assets/icon/message-3-line.svg">
                        <el-dialog width="600px" title="评论" v-model="it.show">
                            <comments-dialog :id="id" :p="i" />
                        </el-dialog>
                    </p>
                </div>
                <div class="btn" v-if="chargeState">
                    <button @click="Buy">解锁章节</button>
                </div>
            </div>
            <div style="display: flex;justify-content: space-between;text-indent: 0em;padding: 10px 20px;">
                <a v-if="forward" :href="'/library/'+bookId+'/'+ forward">上一章</a>
                <a v-else>没有上一章了</a>
                <a v-if="next" :href="'/library/'+bookId+'/'+ next">下一章</a>
                <a v-else>没有下一章了</a>
            </div>
            <el-dialog v-model="open" title="举报文章" center="true" width="50%" draggable>
                <div style="padding-top:10px;padding-left:30px"><span>举报理由：</span></div>
                <div style="text-align: center; padding-top:30px;">
                    <textarea v-model="repContent" style="width:500px;height:400px;resize: none;"></textarea>
                </div>
                <div style="display: flex;justify-content: center;align-items: center;">
                    <el-button class="btn" @click="Report">上传举报</el-button>
                </div>
            </el-dialog>
        </div>
    </div>
</template>

<script>
import chapterApi from '@/api/chapterApi'
import CommentsDialog from '@/components/CommentsDialog.vue'
import { ElMessage } from 'element-plus';
import bookApi from '@/api/bookApi';
import reportApi from "@/api/reportApi"
export default {
    data() {
        return {
            id: "",
            scrollId: "",
            bookId: "",
            title: "",
            content: [],
            next: "",
            forward: "",
            chargeState: true,
            open: false,
            repContent:""
        };
    },
    created() {
        this.id = this.$route.params.chapterId;
        this.scrollId = this.$route.params.scrollId;
        this.bookId = this.$route.params.bookId;
        chapterApi.get(this.id,this.scrollId,this.bookId, res => {
            this.title = res.data.title;
            this.next = res.data.next;
            this.chargeState = res.data.chargeState
            this.forward = res.data.forward;
            let content = res.data.content;
            let arr = content.replace(/<p>/g, "").split("</p>");
            arr.forEach(el => {
                this.content.push({
                    show:false,
                    content:el
                })
            })
            //移除最后一位空值
            this.content.pop();
            if (localStorage.getItem("token")){
                bookApi.AddShelf({
                    bookId: this.bookId,
                    scrollId: this.scrollId,
                    chapterId: this.id
                }, () => {
                    ElMessage({
                        message: "历史记录已更新"
                    })
                })
            }
        });
    },
    methods: {
        Buy() {
            chapterApi.buyChapter(this.bookId, this.id, res => {
                if (res.code == 200) {
                    location.reload()
                }
            })
        },
        Report() {
            reportApi.add({
                chapterId: this.id,
                details:this.repContent
            }, res => {
                if (res.code == 200) {
                    ElMessage({
                        message: "举报成功",
                        type:"success"
                    })
                    this.open = false
                }
            })
        }
    },
    components: { CommentsDialog }
}
</script>

<style lang="scss" scoped>


    .content{
        display: flex;
        flex-direction: column;
        margin: 0 150px;
        font-size: 14px;
        text-indent: 2em;
        min-height: 600px;
        height: max-content;
        padding: 10px 30px;
        background-color: #fff;
        border-radius: 10px;
        box-shadow: 0 0 5px #ddd;
        .text{
            display: flex;
            flex-wrap: wrap;
            p{
                word-break: break-all;
                word-wrap: break-word;
                margin-bottom: 5px;
            }
           
        }
        .btn {
            display: flex;
            justify-content: center;
            button {
                cursor: pointer;
                border-radius: 5px;
                background-color: #a00;
                margin: 5px;
                color: #fff;
                font-weight: bold;
                border: none;
                outline: none;
            }
        
        }
    }
</style>