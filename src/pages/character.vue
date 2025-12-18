<script setup lang="ts">
import { ref } from 'vue';
import { useEducation } from '../store/education';
import CharacterInfo from "../components/CharacterInfo.vue";

const education = useEducation()
const station = education.station

let positionIndex = ref(0)
const arrowLeft = () => {
    const stationLength = education.station.length
    if (positionIndex.value > 0) {
        positionIndex.value -= 1
    }else{
        positionIndex.value = stationLength -1
    }
}

const arrowRight = () => {
    if (positionIndex.value < station.length - 1) {
        positionIndex.value += 1
    }else{
        positionIndex.value = 0
    }
}

</script>

<template>
    <div>
        <p class="text-2xl md:text-3xl font-black text-[#30507a] mb-2 drag-item">學園風角色</p>
        <div class="justify-center flex gap-2 items-center">
            <div @click="arrowLeft"><img class="w-12" src="@/assets/arrow-left.svg" alt=""></div>
            <div>
                <character-info v-for="(item,index) in station" :key="index" :info="item" :positionIndex="positionIndex"></character-info>
            </div>
            <div @click="arrowRight"><img class="w-12" src="@/assets/arrow-right.svg" alt=""></div>
        </div>
    </div>
</template>

