<script setup lang="ts">
import { ref, reactive, computed } from 'vue';

const dialogStory = reactive([
    {
        netto: '聽說這遊戲有個小技巧喔!',
        nettoface: 'netto-happy',
        rockman: '那是什麼啊?',
        rockmanface: 'rockman-happy'
    },
    {
        netto: '那就是!英文單字的頭跟尾會在最邊邊的格子!',
        nettoface: 'netto-happy',
        rockman: '哇!好厲害!',
        rockmanface: 'rockman-happy'
    },
    {
        netto: '',
        nettoface: 'netto-happy',
        rockman: '那熱斗已經知道答案了嗎!',
        rockmanface: 'rockman-happy'
    },
    {
        netto: '……我還是不會拼',
        nettoface: 'netto-happy',
        rockman: '熱斗……',
        rockmanface: 'rockman-happy'
    }
])

let positionIndex = ref(0)

const nextDialog = () => {
    const dialogLength = dialogStory.length
    positionIndex.value < dialogLength - 1 ? positionIndex.value += 1 : positionIndex.value = 0
}

const currentDialog = computed(() => {
    return dialogStory[positionIndex.value]
})

// 想一下我要幹嘛
// 洛克人跟熱斗對白+換圖
</script>

<template>
    <div>
        <div class="max-w-[40rem] w-full grid grid-cols-6 gap-4 cursor-pointer" @click="nextDialog()">
            <!-- dialog -->
            <div :class="`${currentDialog.netto.length>0 ? `` : `opacity-0`}`" class="col-span-3 font-bold py-4 px-6 ring-[#e5ad55] ring-4 rounded-lg bg-white flex justify-center items-center">{{ currentDialog.netto }}</div>
            <div v-if="currentDialog.rockman.length>0" class="col-span-3 font-bold py-4 px-6 ring-[#e5ad55] ring-4 rounded-lg bg-white flex justify-center items-center">{{ currentDialog.rockman }}</div>
            <div v-else class="col-span-3"></div>
            <!-- netto -->
            <div class="col-span-2"></div>
            <div class="col-span-2 text-white"></div>
            <!-- rockman -->
            <div class="col-span-2"></div>
        </div>
    </div>
</template>

