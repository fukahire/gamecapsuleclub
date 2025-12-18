
<script setup lang="ts">

const props = defineProps<{ booth: booth | any,}>()
type booth = {
    img: string,
    boothNum: string,
    boothName: string,
    boothCount: number,
    author: string,
    area: string,
    url: string,
    index: number,
    event: number,
}

</script>
<template>
    <!-- 單張卡片 -->
        <div>
            <p class="py-2 px-2 font-bold text-lg text-white bg-[#30507a]">{{ booth.boothNum }}</p>
            <div class=" p-4 grid grid-cols-2 gap-2">
                <div class="flex flex-col gap-1 items-stretch">
                    <img :src="booth.img" class="block" alt=""></img>
                    <a :href="booth.url" target="_blank" class="py-1 px-2 rounded-lg font-bold text-white bg-[#30507a]">資訊連結</a>
                </div>
                <div class="flex flex-col ">
                    <div class="text-base font-bold grow">
                        <p class="text-left">{{ `攤位：${booth.boothName}` }}</p>
                        <p class="text-left">{{ `作者：${booth.author}` }}</p>
                        <p v-if="booth.event>0" class="text-left">{{ `${booth.event}號活動攤` }}</p>
                    </div>
                    <div class="w-8 h-8 text-white bg-[#30507a] rounded-full flex items-center justify-center self-end cursor-pointer" @click.prevents="$emit('close')">X</div>
                </div>
            </div>
        </div>
</template>
<style scoped>
    a{
        font-weight: 700;
    }
.notdrag{
    user-select: none
}
</style>