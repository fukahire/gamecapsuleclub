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
    <div class="flex-row justify-between px-4">
        <div>test</div>
        <div class="flex gap-8">
            <router-link v-for="nav in navlink" :to="nav.link">{{ nav.title }}</router-link>
        </div>
    </div>
</template>

<style scoped>
    a{
        text-decoration: none;
        color: #30507a;
        font-weight: 700;
        font-size: 1rem;
    }
</style>
