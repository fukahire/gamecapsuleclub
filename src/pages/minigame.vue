<script setup lang="ts">
    import { ref,reactive,computed } from 'vue'
    // 按鈕元件
    import minigameBtn from '../components/minigameBtn.vue'
    // 目前題目編號
    const testNum = ref(0)
    // 題目位置，要寫題目產生器
    const questList = reactive([
        {
            'hint':'洛克人英文怎麼拼',
            'letter':'ROCKMAN',
            'mapimg':['0', '0', '0', '0', '1', '2', '3', '0', '0', '0', '4', '5', '0', '0', '7', '6'],
        },{
            'hint':'學園風的洛克人exe是什麼型態',
            'letter':'NUMBERSOUL',
            'mapimg':['0','0','0','1','0','5','4','3','2','0','6','7','0','0','0','0','8','0','0','0','0','9','10','0','0'],
        },{
            'hint':'可以改變洛克人exe 0.001%基因資料的修正檔是什麼',
            'letter':'SAITOBAT',
            'mapimg':['0','0','0','0','8','3','2','1','7','4','0','0','6','5','0','0'],
        },{
            'hint':'熱斗跟洛克人exe意識完全重合、操作沒有時間差的狀態是什麼',
            'letter':'FULLSYNCHRO',
            'mapimg':['0','0','8','9','0','0','6','7','10','11','0','5','4','0','0','1','2','3','0','0','0','0','0','0','0'],
        },
    ])
    // 題目
    const currentQuest = computed(()=>{
        return questList[testNum.value]
    })

    // 所有英文字母 
    const abc = ref('ABCDEFGHIJKLMNOPQRSTUVWXYZ')
    // 遊戲狀態：1進行中，2輸了，3贏了
    const gameStatus = ref(1)
    // 檢查答案
    let checkString = ref('')

    // 題目產生器，置入字母
    const Qarr = ref<{ letter: string; active: boolean }[]>([])
    const generateQarr = () => {
    let arr = []
    for (let i = 0; i < currentQuest.value.mapimg.length; i++) {
        if (currentQuest.value.mapimg[i] === '0') {
            let cubeSpace = {
                'letter': abc.value[Math.floor(Math.random() * 26)],
                'active': false
            }
        arr.push(cubeSpace)
        } else {
            let a = Number(currentQuest.value.mapimg[i]) - 1
            let cubeSpace = {
                'letter': currentQuest.value.letter[a],
                'active': false
            }
        
        arr.push(cubeSpace)
        }
    }
      Qarr.value = arr
    }

    // 初始化
    generateQarr()

    // 紀錄狀態 要不要加xy
    // 玩家答案
    const answer = reactive([])
    // 檢查答案
    const check = function(alphabet:string){
        // 輸入
        answer.push(alphabet as never)
        checkString.value = answer.join('')
        // 檢查
        for(let i = 0; i< checkString.value.length; i++){
            if(checkString.value[i] !== currentQuest.value.letter[i]){
                checkString.value = '答錯嚕!請重新來過'
                gameStatus.value = 2
            }
        }

        if(answer.join('') === currentQuest.value.letter){
            checkString.value = '恭喜答對!!'
            gameStatus.value = 3
        }
    }

    // 算方塊字數
    const cubeNumber = computed(()=>{
        let num = Math.sqrt(currentQuest.value.mapimg.length)
        return `grid-${num}`
        })

    const changeQuestion = function(){
        if(testNum.value == questList.length - 1){
            testNum.value = 0
        }else{
            testNum.value +=1
        }
        reset()
    }

    // 重新開始
    const reset = function(){
        checkString.value = ''
        generateQarr()
        gameStatus.value = 1
        answer.length = 0
    }

    // 按鈕按下
    const tab = function(cube:any){
        // 按下後無法返回
        if(cube.active){
            return
        }
        // 遊戲結束(win(3) or lose(2))時無法輸入
        if(gameStatus.value ==2){
            return
        }
        cube.active = !cube.active
        check(cube.letter)
    }
</script>

<template>
    <!-- 社團攤位圖 -->
    <div class="flex flex-col justify-center items-center">
        <p class="font-bold mb-10 py-4 px-6 ring-[#e5ad55] ring-4 rounded-lg bg-white">{{ currentQuest.hint }}</p>
        <div class="flex gap-2 mb-2">
            <p @click="changeQuestion()" class="bg-[#30507a] text-white p-2 rounded cursor-pointer font-bold">換題目</p>
            <p @click="reset()" class="bg-[#30507a] text-white p-2 rounded cursor-pointer font-bold">重新開始</p>
        </div>
        <div :class="`grid gap-1 ${cubeNumber} w-full max-w-[40rem]`">
            <minigameBtn :info="cube.letter" :active="cube.active" :gamestatus="gameStatus"  v-for="(cube,index) in Qarr" :key="`${cube}${index}`" @click="tab(cube)"/>
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
