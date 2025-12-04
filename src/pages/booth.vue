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
        </div>
        <div class="grid grid-cols-12">
            <boothIndie v-for="(item,index) in boothResize" :class="`${ item.boothCount == 12 ? `col-span-12` : ``}`" :key="index" :booth="item"></boothIndie>
        </div>
    </div>
</template>

<style scoped>
</style>
