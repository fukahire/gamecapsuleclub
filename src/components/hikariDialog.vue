<script setup lang="ts">
import { ref, reactive, computed } from 'vue';

const dialogStory = reactive([
    {
        netto: '聽說這遊戲有個小技巧喔!',
        nettoface: 'chatimg/chat_01.png',
        rockman: '是什麼!',
        rockmanface: 'rockman-happy'
    },
    {
        netto: '那就是!英文單字的頭跟尾會在最邊邊的格子!',
        nettoface: 'chatimg/chat_02.png',
        rockman: '熱斗好厲害!!',
        rockmanface: 'rockman-happy'
    },
    {
        netto: '',
        nettoface: 'chatimg/chat_03.png',
        rockman: '那你知道答案了嗎',
        rockmanface: 'rockman-happy'
    },
    {
        netto: '……英文我還是不會拼',
        nettoface: 'chatimg/chat_04.png',
        rockman: '如果上課沒有打瞌睡的話就不會這樣了……',
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
        <div class="max-w-[40rem] w-full grid grid-cols-6 gap-x-4 cursor-pointer" @click="nextDialog()">
            <!-- dialog -->
            <div :class="`${currentDialog.netto.length>0 ? `` : `opacity-0`}`" class="col-span-3 font-bold py-4 px-6 ring-[#e5ad55] ring-4 rounded-lg bg-white flex justify-center items-center h-[5rem]">{{ currentDialog.netto }}</div>
            <div v-if="currentDialog.rockman.length>0" class="col-span-3 font-bold py-4 px-6 ring-[#e5ad55] ring-4 rounded-lg bg-white flex justify-center items-center h-[5rem]">{{ currentDialog.rockman }}</div>
            <div v-else class="col-span-3"></div>
            <!-- netto -->
            <div class="col-span-6"><img :src="currentDialog.nettoface" alt=""></div>
            <!-- <div class="col-span-2"></div> -->
            <!-- <div class="col-span-2 text-white"></div> -->
            <!-- rockman -->
            <!-- <div class="col-span-2"></div> -->
        </div>
    </div>
</template>

