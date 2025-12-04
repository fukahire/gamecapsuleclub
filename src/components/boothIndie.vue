
<script setup lang="ts">
defineProps<{ booth: booth }>()
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

// defineProps<{ msg: string }>()

// const open = ref(false)

</script>
<template>
    <!-- 單張卡片 -->
     <div>
        <a v-if="booth.boothCount > 0 && booth.boothCount < 12" :href="booth.url" class="flex flex-col items-center" target="_blank">
            <p class="py-0.5 px-2 rounded-lg font-bold text-white bg-[#30507a] mb-0.5">{{ booth.boothNum }}</p>
            <div class="relative">
                <img :src="booth.img" class="w-full block mb-1" alt=""></img>
                <div class="absolute rounded-full top-1 left-1 w-6 h-6 flex items-center justify-center text-white bg-amber-400 font-bold">{{ booth.event }}</div>
            </div>
            <div>
                <p class="text-sm font-bold">{{ booth.boothName }}</p>
                <p class="text-sm font-bold">{{ booth.author }}</p>
            </div>
        </a>
        <div v-else-if="booth.boothCount == 12" class="w-full h-12 flex justify-center items-center font-bold text-lg">走道</div>
        <div v-else class="w-full h-full">
            <p class="invisible py-0.5 px-2 mb-0.5">{{ booth.boothNum }}</p>
            <img src="@/assets/booth/boothimg_sprite.png" class="w-full block mb-1 brightness-50" alt="">
        </div>
     </div>
</template>