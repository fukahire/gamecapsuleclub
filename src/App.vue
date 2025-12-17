<script setup lang="ts">
// import HelloWorld from './components/HelloWorld.vue'
import Index from './pages/index.vue';
import navDesktop from './components/navDesktop.vue';
import navMobile from './components/navMobile.vue';

</script>

<template>
  <div>
    <!-- <div class="text-green-500">App.vue loaded</div> -->

    <Index />
    <router-view />
    <navDesktop class="hidden md:block" />
    <navMobile class="block fixed md:hidden z-10" /> 
  </div>
</template>