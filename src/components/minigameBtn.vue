<script setup lang="ts">
    import { computed } from 'vue'

    const props = defineProps<{
        info: string,
        active: boolean,
        gamestatus: number
     }>()
     
    const bgColor = computed(() => {
        // 遊戲進行中
        if(props.gamestatus === 1){
            if(props.active){
                return 'bg-[#30507a]'
            }else{
                return 'bg-[#e5ad55]'
            }
        }else if(props.gamestatus === 2){
            return 'bg-red-700'
        }else if(props.gamestatus === 3){
            return 'bg-lime-500'
        }})

</script>

<template>
    <div :class="`h-20 text-3xl cursor-pointer font-bold flex items-center justify-center text-white ${bgColor}`">{{ info }}</div>
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
