
<script setup lang="ts">

const props = defineProps<{ booth: booth, selected: boolean}>()
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
        <div v-if="booth.boothCount > 0 && booth.boothCount < 12" class="flex items-center gap-2">
            <p class="py-0.5 px-2 rounded-lg font-bold text-white bg-[#30507a] mb-0.5">{{ booth.boothNum }}</p>
            <div>
                <p class="text-sm font-bold text-left">{{ booth.boothName }}</p>
                <p class="text-sm font-bold text-left">{{ booth.author }}</p>
            </div>
            <!-- <div class="rounded-full w-6 h-6 flex items-center justify-center text-white bg-amber-400 font-bold">{{ booth.event }}</div> -->
        </div>
        <div v-if="selected" class="fixed w-full bg-white left-0 bottom-0 rounded-t-xl z-20 overflow-hidden">
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
                        <p v-if="booth.event>0" class="text-left">{{ `活動攤：${booth.event}號活動` }}</p>
                    </div>
                    <!-- <div class="w-8 h-8 text-white bg-[#30507a] rounded-full flex items-center justify-center self-end cursor-pointer" @click="console.log('close')">X</div> -->
                </div>
            </div>
        </div>
        <!-- <div v-else-if="booth.boothCount == 12" class="w-full h-12 flex justify-center items-center font-bold text-lg">走道</div> -->
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