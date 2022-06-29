<template>
    <div>
        <div class="inline">
            <el-input v-model="data.name" placeholder="请输入卷名" />
        </div>
        <div class="inline">
            <button @click="end">确定</button>
        </div>
    </div>
</template>

<script setup>
import { ref,defineEmits,defineProps } from 'vue'
const props = defineProps({
    id: Number,
    name: String,
    bookId:Number
})
const emit = defineEmits("overred")
const data = ref({
    id: props.id,
    name: props.name,
    bookId: props.bookId
})

function end() {
    emit("overred", data.value)
    data.value = {
        name: "",
        bookId: props.bookId
    }
}
</script>

<style lang="scss" scoped>
.inline{
    display: flex;
    justify-content: center;
    button{
        margin: 5px;
        border-radius: 5px;
        width: 100px;
        height: 30px;
        font-size: 14px;
        font-weight: bold;
        border: none;
        outline: none;
        cursor: pointer;
    }
}

</style>