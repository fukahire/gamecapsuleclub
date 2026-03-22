
<script setup lang="ts">
type Info = {
  sprite: string
  name: string
  index: number
  position: string
  img: string
  description: string
  origin: string
  painter: string
  painterURL: string
}

defineProps<{ info: Info,
    positionIndex: Number
 }>()
// defineProps<{ msg: string }>()

// const open = ref(false)

</script>
<template>
    <!-- 單張卡片 -->
     <div class="flex flex-col md:grid md:grid-cols-2 gap-4 items-center" v-if="positionIndex === info.index">
        <div class="flex justify-center items-center">
            <a :href="`https://fukahire.github.io/gamecapsuleclub/education/${info.img.split('/').pop()}`" target="_blank">
                <img class="h-full max-h-[250px] md:max-h-[550px]" alt="" :src="info.img">
            </a>
        </div>
        <div class="flex flex-col justify-start gap-0.5 text-left">
            <div class="flex items-center gap-2 mb-1">
                <!-- 角色縮圖 -->
                <div>
                    <img class="w-8 mr-2 character" :src="info.sprite" alt="">
                </div>
                <!-- 角色名 -->
                 <div>
                <div class="text-lg md:text-3xl font-black text-[#30507a] relative">{{ `${ info.position }` }}</div>
                <div class="text-lg md:text-3xl font-black text-[#30507a] relative">{{ `${ info.name }` }}</div>
                </div>
            </div>
            <!-- 介紹 -->
            <div class="pl-2 max-w-[450px] font-bold text-base md:text-lg">{{ info.description }}</div>
            <!-- 出場作品 -->
            <p class="pl-2 mt-5 font-bold">{{ `出場作品：《${info.origin}》` }}</p>
            <a :href="info.painterURL" target="_blank" class="pl-2 max-w-[450px] font-bold text-base md:text-lg mt-12">{{ `繪師：${info.painter}` }}</a>

        </div>
     </div>
</template>

<style scoped>
/* 定義動畫軌跡 */
@keyframes game-jump {
  /* 0% 到 30%：停在地面 (可加微小縮放模擬蓄力) */
  0%, 30%, 100% {
    transform: translateY(0) scaleY(1);
    animation-timing-function: cubic-bezier(0.8, 0, 1, 1); /* 加速起跳 */
  }
  /* 40%：稍微壓扁 (蓄力瞬間) */
  35% {
    transform: translateY(0) scaleY(0.9);
  }
  /* 65%：跳到最高點 */
  65% {
    transform: translateY(-20px) scaleY(1.1);
    animation-timing-function: cubic-bezier(0, 0, 0.2, 1); /* 緩慢到頂 */
  }
}

.character {
  display: inline-block;
  animation: game-jump 1.1s infinite; /* 總時長設長一點，停頓感才明顯 */
}
</style>