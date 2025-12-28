<script setup lang="ts">
    import { ref,reactive,computed,watch } from 'vue'
    // 按鈕元件
    import minigameBtn from '../components/minigameBtn.vue'
    const testNum = ref(0)
    // 題目位置，要寫題目產生器
    const questList = reactive([
        {
            'hint':'請問洛克人的英文怎麼拼呢！',
            'letter':'ROCKMAN',
            'mapimg':['0', '0', '0', '0', '1', '2', '3', '0', '0', '0', '4', '5', '0', '0', '7', '6'],
        },{
            'hint':'請問學園風的洛克人EXE是什麼型態呢！',
            'letter':'NUMBERSOUL',
            'mapimg':['0','0','0','1','0','5','4','3','2','0','6','7','0','0','0','0','8','0','0','0','0','9','10','0','0'],
        },{
            'hint':'請問可以改變洛克人EXE0.001%基因資料的修正檔是什麼！',
            'letter':'SAITOBAT',
            'mapimg':['0','0','0','0','8','3','2','1','7','4','0','0','6','5','0','0'],
        },
    ])
    // 題目
    const hint = computed(()=>{
        return questList[testNum.value].hint
    })
    const question = computed(()=>{
        return questList[testNum.value].letter
    })
    const mapimage = computed(()=>{
        return questList[testNum.value].mapimg
    })

    // 所有英文字母 
    const abc = ref('ABCDEFGHIJKLMNOPQRSTUVWXYZ')
    // 遊戲狀態：1進行中，2輸了，3贏了
    const gameStatus = ref(1)
    // 檢查答案
    let checkString = ref('')

    // 題目產生器，置入字母
    const Qarr = computed(()=>{
        let arr = []
        for(let i = 0; i< mapimage.value.length; i++){
        // 非答案位置的話隨機填入字母
        if(mapimage.value[i] === '0'){
            arr.push(abc.value[Math.floor(Math.random() * 26)])
        }else{
            // 填入答案字母
            let a = Number(mapimage.value[i]) -1
            arr.push(question.value[a])
        }
    }
    return arr
    })

    // 玩家答案
    const answer = reactive([])
    // 檢查答案
    const check = function(alphabet:string){
        // 輸入
        answer.push(alphabet as never)
        checkString.value = answer.join('')
        // 檢查
        for(let i = 0; i< checkString.value.length; i++){
            if(checkString.value[i] !== question.value[i]){
                checkString.value = '答錯嚕!請重新來過'
                gameStatus.value = 2
            }
        }

        if(answer.join('') === question.value){
            checkString.value = '恭喜答對!!'
            gameStatus.value = 3
        }
    }

    // 算方塊字數
    const cubeNumber = computed(()=>{
        let num = Math.sqrt(mapimage.value.length)
        return `grid-${num}`
        })

    const changeQuestion = function(){
        if(testNum.value == questList.length - 1){
            testNum.value = 0
        }else{
            testNum.value +=1
        }
        // gameStatus.value = 4
    }
</script>

<template>
    <!-- 社團攤位圖 -->
    <div class="flex flex-col justify-center items-center">
        <p class="font-bold mb-10 py-4 px-6 ring-[#e5ad55] ring-4 rounded-lg bg-white">{{ hint }}</p>
        <p @click="changeQuestion()" class="bg-[#30507a] text-white p-2 rounded cursor-pointer mb-2 font-bold">換題目</p>
        <div :class="`grid gap-1 ${cubeNumber} w-full`">
            <minigameBtn :info="block" :gamestatus="gameStatus" v-for="(block,index) in Qarr" :key="`${block}${index}`" @tab="check"/>
        </div>
        <p class="mt-10 font-bold text-lg">{{ checkString }}</p>
    </div>
</template>

<style scoped>
/* .container{
    width:100%
} */
.read-the-docs {
    color: #888;
}
a{
    color: white;
}

.grid-4 {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
}
.grid-5 {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
}
.grid-6 {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
}

</style>
