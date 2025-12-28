<script setup lang="ts">
    import { ref } from 'vue'

    defineProps<{ info: Info,
     }>()
    type Info = {
      block: string
    }
    const emit = defineEmits<{(e: 'tab', value: string): void}>()

    let active = ref(false)

    const tab = function(alphabet:string){
        // 按下後無法返回
        if(active.value){
            return
        }
        active.value = !active.value
        emit('tab', alphabet)
    }

</script>

<template>
    <div :class="`h-20 w-20 text-3xl cursor-pointer font-bold flex items-center justify-center text-white ${active ? 'bg-[#30507a]' : `bg-[#e5ad55]`}`" @click="tab(info.block)">{{ info.block }}</div>
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
