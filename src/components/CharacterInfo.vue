
<script setup lang="ts">
type Info = {
  sprite: string
  name: string
  index: number
  position: string
  img: string
  description: string
  origin: string
}

defineProps<{ info: Info,
    positionIndex: Number
 }>()
// defineProps<{ msg: string }>()

// const open = ref(false)

</script>
<template>
    <!-- 單張卡片 -->
     <div class="grid grid-cols-2 gap-4 items-center" v-if="positionIndex === info.index">
        <div class="flex justify-center items-center"><img class="w-full max-w-[500px]" alt="" :src="info.img"></div>
        <div class="flex flex-col justify-start gap-2 text-left">
            <p></p>
            <div class="flex items-end gap-2 mb-4">
                <!-- 角色縮圖 -->
                <div><img class="w-8" :src="info.sprite" alt=""></div>
                <!-- 角色名 -->
                <div class="text-3xl font-black text-[#30507a] relative">{{ `${ info.name } --${ info.position }` }}
                    <!-- <div class="absolute bottom-0 right-0 w-full h-2 bg-[#e5ad55]"></div> -->
                </div>
            </div>
            <!-- 介紹 -->
            <div class="pl-2 max-w-[450px] font-bold text-lg">{{ info.description }}</div>
            <!-- 出場作品 -->
            <p class="pl-2 mt-8 font-bold">{{ `出場作品：《${info.origin}》` }}</p>
        </div>
     </div>
</template>