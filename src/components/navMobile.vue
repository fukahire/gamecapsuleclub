<script setup lang="ts">
    import { reactive, ref } from 'vue'
    const openmenu = ref(false)
    const navlink = reactive([
            {
                title: '首頁',
                link:'/'
            },
            {
                title: '攤位資訊',
                link:'/booth'
            },
            {
                title: '學園風角色',
                link:'/character'
            },
            {
                title: '常見問題',
                link:'/qa'
            },
            // {
            //     title: '我要報名',
            //     link:'https://forms.gle/hwsKafDRvcxuZNa2A'
            // },
        ],)
</script>

<template>
    <div>
            <div class="flex flex-col gap-2.5 fixed top-0 left-0 overflow-hidden
            cursor-pointer w-full h-full items-center justify-center bg-[#30507a] -translate-x-full transition ease-in-out duration-500
            " :class="{ '!-translate-x-0' : openmenu == true }">
                <div v-for="item in navlink" :href="item.link" class="px-8 py-3 text-white font-medium md:hover:bg-[#FFCD40] md:active:grayscale cursor-pointer" @click="openmenu = !openmenu">
                    <a v-if="item.link.includes('http')" href="https://forms.gle/hwsKafDRvcxuZNa2A" target="_blank">{{item.title}}</a>
                    <router-link v-else :to="item.link">{{item.title}}</router-link>
                </div>
            </div>
            <div :class="{ '!-rotate-90' : openmenu == true }" class="text text-2xl font-bold text-white drop-shadow-lg transition ease-in-out duration-500 fixed h-12 w-12 bg-[#FFCD40] bottom-6 right-6 rounded-full cursor-pointer flex justify-center items-center rotate-45 origin-center" @click="openmenu = !openmenu">×</div>
        </div>
</template>