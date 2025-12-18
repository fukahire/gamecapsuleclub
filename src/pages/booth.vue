<script setup lang="ts">
import { useBooth } from '../store/booth';
import boothIndie from '../components/boothIndie.vue';
import boothIndieMobile from '../components/boothIndieMobile.vue';
import boothIndieMobilePopup from '../components/boothIndieMobilePopup.vue';
import { computed } from 'vue';


const booth = useBooth().boothList
// 避免在computed裡改store：無限循環
// 避免push reactive物件：觸發連鎖更新
// 避免在map裡直接改e：觸發記憶體共享

const boothResize = computed(() => {
    // 複製陣列
    const boothClone = booth.map(e => ({ ...e }))
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
    
    // 攤位Num轉數字(用複製後的陣列)
    let boothBoothNum = boothClone.map(e => {
        if(map.has(e.boothNum[0])) {
            // 這樣會改到舊物件
            // e.boothNum = `${map.get(e.boothNum[0])}${e.boothNum[1]}${e.boothNum[2]}`
            // return新物件
            return {
            ...e,
            // slice淺拷貝
            boothNum: `${map.get(e.boothNum[0])}${e.boothNum.slice(1)}`
            }
        }
    return e})
    
    for(let i = 0; i< boothBoothNum.length ; i++){
        // for(let k = 0; k< boothBoothNum[i].boothCount; k++){
        //     if(k>0){
        //         arr.push({...boothBoothNum[i],
        //                 boothNum: (Number(boothBoothNum[i].boothNum) + k).toString()})
        //     }else{
        //         arr.push(boothBoothNum[i])
        //     }
        // }

        // 原寫法k===0時
        // arr.push(boothBoothNum[i]) ❌ 推進的是「同一個物件」= arr[0] === boothBoothNum[i]
        // arr[0].boothNum = 'A01'
        // boothBoothNum[i].boothNum === 'A01'  也被改了


        // arr.push({ ...boothBoothNum[i] }) / ✅ 每次都是「新物件」 = 複製一份資料，新的值
        // 只要資料是來自 state / props / store
        // → 永遠不要直接丟 reference 到新陣列
        // 「資料流」跟「記憶體模型」
        // immutable data transform
        for (let k = 0; k < boothBoothNum[i].boothCount; k++) {
            arr.push({
                ...boothBoothNum[i],
                boothNum: (Number(boothBoothNum[i].boothNum) + k).toString()
        })
  }
    }

    // 排序
    arr.sort(function (a, b) {
        return Number(a.boothNum) - Number(b.boothNum);
    });

    // 數字轉回攤位字母
    let arrAlphabet = arr.map(e => {
        if(reverseMap.has(Number(e.boothNum[0]))){
            // e.boothNum = `${reverseMap.get(Number(e.boothNum[0]))}${e.boothNum[1]}${e.boothNum[2]}`
            // 一樣回傳新物件及淺拷貝
            return {
            ...e,
            boothNum: `${reverseMap.get(Number(e.boothNum[0]))}${e.boothNum.slice(1)}`
            }
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
const selectedBooth = ref<booth | null>(null)
const open = ref(false)
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

// const popupClose = function(){
//     console.log('close')
//     selectedBooth.value = ''
    
//     // console.log('selectedBooth.value',selectedBooth.value)
// }


// 有 () = 現在執行
// 沒 () = 事件發生時才執行

const popupClose = () => {
  selectedBooth.value = null
  open.value = false
}

const popupOpen = (item : booth) => {
  open.value = true
  selectedBooth.value = item

}
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
    <div>
        <div class="hidden md:block">
            <p class="text-3xl font-black text-[#30507a] drag-item">活動攤位圖</p>
            <!-- content -->
            <div class="mt-2 mb-4 flex justify-center">
                <div class="flex gap-1 items-center">
                    <div class="w-4 h-4 border-2 bg-amber-400 rounded-full"></div>
                    <p class="font-bold drag-item">活動集點攤</p>
                </div>
                <div class="bg-[#30507a] p-1 px-2 rounded-xl font-bold text-white ml-2 cursor-pointer drag-item" @click="reset">復原</div>
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
        <div class="block md:hidden min-h-screen">
            <p class="text-3xl font-black text-[#30507a] mb-2 drag-item">活動攤位圖</p>
            <div class="grid grid-cols-2 gap-y-1">
                <boothIndieMobile v-for="(item,index) in boothResize" :key="`${item.boothNum}${index}`" :booth="item" @click="popupOpen(item)"></boothIndieMobile>
            </div>
        </div>
        <boothIndieMobilePopup  class="fixed left-0 bottom-0 z-20 bg-white rounded-t-xl overflow-hidden" v-if="open" :booth="selectedBooth" :open ="open" @close="popupClose()"></boothIndieMobilePopup>
    </div>
</template>

<style scoped>
.drag-item{
    user-select: none;
}
</style>
