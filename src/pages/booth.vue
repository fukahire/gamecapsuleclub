<script setup lang="ts">
import { useBooth } from '../store/booth';
import boothIndie from '../components/boothIndie.vue';
import { computed } from 'vue';

const booth = useBooth().boothList

const boothResize = computed(() => {
    let arr = []
    // 依booth數量展開陣列
    for(let i = 0; i< booth.length ; i++){
        for(let k = 0; k< booth[i].boothCount; k++){
            arr.push(booth[i])
        }
    }
    // 補空位
    if(arr.length< 24){
        let space = 24 - arr.length
        for(let j =0; j< space; j++){
            arr.push({
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
    return arr
})

</script>

<template>
    <div class="pt-20 md:pt-0 mb-30">
            <p class="text-3xl font-black text-[#30507a] mb-2">活動攤位圖</p>
        <!-- content -->
        <div class="grid grid-cols-12">
            <boothIndie v-for="(item,index) in boothResize" :key="index" :booth="item"></boothIndie>
        </div>
    </div>
</template>

<style scoped>
</style>
