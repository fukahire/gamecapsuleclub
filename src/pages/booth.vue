<script setup lang="ts">
import { useBooth } from '../store/booth';
import boothIndie from '../components/boothIndie.vue';
import { computed } from 'vue';

const booth = useBooth().boothList

const boothResize = computed(() => {
    let arr = []
    // 做map
    let alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    let map = new Map()
    for(let i = 0 ; i< 26; i++){
        map.set(alphabet[i], i + 1)
    }
    // 做反向map
    const reverseMap = new Map()
    for (const [key, value] of map.entries()) {
    reverseMap.set(value, key)
    }
    // 攤位Num轉數字
    let boothBoothNum = booth.map(e => {if(map.has(e.boothNum[0])){
        e.boothNum = `${map.get(e.boothNum[0])}${e.boothNum[1]}${e.boothNum[2]}`
    }
return e})
    for(let i = 0; i< boothBoothNum.length ; i++){
        for(let k = 0; k< boothBoothNum[i].boothCount; k++){
            if(k>0){
                arr.push({...boothBoothNum[i], boothNum: (Number(boothBoothNum[i].boothNum) + k).toString()})
            }else{
                arr.push(boothBoothNum[i])
            }
        }
    }

    // 排序
    arr.sort(function (a, b) {
        return Number(a.boothNum) - Number(b.boothNum);
    });

    // 數字轉回攤位字母
    let arrAlphabet = arr.map(e => {
        if(reverseMap.has(Number(e.boothNum[0]))){
            e.boothNum = `${reverseMap.get(Number(e.boothNum[0]))}${e.boothNum[1]}${e.boothNum[2]}`
        }
        return e
    })


    // 補空位至24攤
    if(arrAlphabet.length< 36){
        let space = 36 - arrAlphabet.length
        for(let j =0; j< space; j++){
            arrAlphabet.push({
                img: 'booth/boothimg_sprite.png',
                boothNum: '00',
                boothName: '',
                boothCount: 0,
                author: '',
                area: '',
                url: '',
                index: 0,
                event: 0,
    })
        }
    }

    // 走道
    arrAlphabet.splice(12, 0, ({
                img: '',
                boothNum: '00',
                boothName: '',
                boothCount: 12,
                author: '',
                area: '',
                url: '',
                index: 0,
                event: 0,
    })) // 结果：[1, 2, 99, 3, 4]

    return arrAlphabet
})

import { ref } from 'vue';
const scale = ref(1)
const moved = ref(false)

const pos = ref({ x: 0, y: 0 })

// 拖曳狀態
const dragging = ref(false)
const last = ref({ x: 0, y: 0 })

// 滾輪縮放
function onWheel(e: WheelEvent) {
  const delta = e.deltaY > 0 ? -0.1 : 0.1
  scale.value = Math.min(3, Math.max(0.5, scale.value + delta))
}

// 開始拖曳
function startDrag(e: MouseEvent) {
    console.log('hi')
  dragging.value = true
    moved.value = false
  last.value = { x: e.clientX, y: e.clientY }
}

// 拖曳中
function onDrag(e: MouseEvent) {
  if (!dragging.value) return

  const dx = e.clientX - last.value.x
  const dy = e.clientY - last.value.y

  if (Math.abs(dx) > 2 || Math.abs(dy) > 2) {
    moved.value = true
  }

  pos.value.x += dx
  pos.value.y += dy

  last.value = { x: e.clientX, y: e.clientY }

}

// 結束拖曳
function endDrag() {
  dragging.value = false
}

// 復原
function reset() {
  scale.value = 1
  pos.value = { x: 0, y: 0 }
}

</script>

<template>
    <div class="pt-20 md:pt-0 mb-30">
        <p class="text-3xl font-black text-[#30507a] mb-2">活動攤位圖</p>
        <!-- content -->
        <div class="mt-4 mb-6 flex justify-center">
            <div class="flex gap-1 items-center">
                <div class="w-4 h-4 border-2 bg-amber-400 rounded-full"></div>
                <p class="font-bold">活動集點攤</p>
            </div>
            <div class="bg-[#30507a] p-1 px-2 rounded-xl font-bold text-white ml-2 cursor-pointer" @click="reset">復原</div>
        </div>
        <!-- 外框 -->
        <div class="w-4/5 h-full overflow-hidden bg-gray-600/30 mx-auto"
        
                    @wheel.prevent="onWheel"
                    @mousedown="startDrag"
                    @mousemove="onDrag"
                    @mouseup="endDrag"
                    @mouseleave="endDrag">
            <!-- 內框 -->
                <div
                    :style="{transform: `translate(${pos.x}px, ${pos.y}px) scale(${scale})`}"
                    class="grid grid-cols-12 drag-item w-full min-w-[1200px]">
                    <boothIndie v-for="(item,index) in boothResize" :class="`${ item.boothCount == 12 ? `col-span-12` : ``}`" :moved="moved" :key="index" :booth="item"></boothIndie>
                </div>
        </div>
    </div>
</template>

<style scoped>
.drag-item{
    user-select: none;
}
</style>
