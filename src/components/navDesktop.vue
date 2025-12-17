<script setup lang="ts">
    import { reactive } from 'vue'
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
                title: '相關問題',
                link:'/qa'
            },
            {
                title: '我要報名',
                link:'https://forms.gle/hwsKafDRvcxuZNa2A'
            },
        ],)
</script>

<template>
    <div>
        <!-- 標題 -->
        <!-- <NuxtLink to="/picnic">About page</NuxtLink> -->
    </div>
</template>

