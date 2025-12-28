<script setup lang="ts">
    import { ref,computed } from 'vue'

    const props = defineProps<{
        info: string,
        gamestatus: number
     }>()
    const emit = defineEmits<{(e: 'tab', value: string): void}>()

    let active = ref(false)

    const tab = function(alphabet:string){
        // 按下後無法返回
        if(active.value){
            return
        }
        // 遊戲結束(win(3) or lose(2))時無法輸入
        if(props.gamestatus !==1){
            return
        }
        active.value = !active.value
        emit('tab', alphabet)
    }

    const bgColor = computed(() => {
        // 遊戲進行中
        if(props.gamestatus === 1){
            if(active.value){
                return 'bg-[#30507a]'
            }else{
                return 'bg-[#e5ad55]'
            }
        }else if(props.gamestatus === 2){
            return 'bg-red-700'
        }else{
            return 'bg-lime-500'
        }})

</script>

<template>
    <div :class="`h-20 w-20 text-3xl cursor-pointer font-bold flex items-center justify-center text-white ${bgColor}`" @click="tab(info)">{{ info }}</div>
</template>

<style scoped>
/* .container{
    width:100%
} */
.read-the-docs {
    color: #888;
}
a{
    color: white;
}
</style>
