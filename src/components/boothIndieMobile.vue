
<script setup lang="ts">

const props = defineProps<{ booth: booth,}>()
const booth = props.booth

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