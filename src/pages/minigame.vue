<script setup lang="ts">
    import { ref,reactive } from 'vue'
    import minigameBtn from '../components/minigameBtn.vue'
    const question = ref('ROCKMAN')
    const mapimage = ref('0000123000450076')
    let checkString = ref('')


    let Qarr = []
    for(let i = 0; i< mapimage.value.length; i++){
        if(mapimage.value[i] === '0'){
           Qarr.push('Z')
        }else{
            let a = Number(mapimage.value[i]) -1
            Qarr.push(question.value[a])
        }
    }

    const answer = reactive([])
    const check = function(alphabet:string){
        answer.push(alphabet as never)
        checkString.value = answer.join('')

        for(let i = 0; i< checkString.value.length; i++){
            if(checkString.value[i] !== question.value[i]){
                checkString.value = '答錯嚕!請重新來過'
            }
        }

        if(answer.join('') === question.value){
            checkString.value = '恭喜答對!!'
        }
    }
</script>

<template>
    <!-- 社團攤位圖 -->
    <div class="flex flex-col justify-center items-center">
        <p class="font-bold mb-10 py-4 px-6 ring-[#e5ad55] ring-4 rounded-lg bg-white">請問洛克人的英文怎麼拼呢！</p>
        <div class="grid grid-cols-4 gap-1">
            <minigameBtn :info="{block: block}" v-for="(block,index) in Qarr" :key="`${block}${index}`" @tab="check"/>
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
</style>
