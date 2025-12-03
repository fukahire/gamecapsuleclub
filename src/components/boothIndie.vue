
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
        <a v-if="booth.boothCount > 0" :href="booth.url" class="flex flex-col items-center" target="_blank">
            <p class="py-0.5 px-2 rounded-lg font-bold text-white bg-[#30507a] mb-0.5">{{ booth.boothNum }}</p>
            <img :src="booth.img" class="w-full block mb-1" alt="">
            <div>
                <p class="text-sm font-bold">{{ booth.boothName }}</p>
                <p class="text-sm font-bold">{{ booth.author }}</p>
            </div>
        </a>
        <div v-else class="w-full h-full">
            <p class="invisible py-0.5 px-2 mb-0.5">{{ booth.boothNum }}</p>
            <img :src="booth.img" class="w-full block mb-1 brightness-50" alt="">
        </div>
     </div>
</template>