<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
import HelloWorld from '@/components/HelloWorld.vue';
import Navbar from '@/components/Navbar.vue';
</script>

<template>
  <header>
    <Navbar />
  </header>

  <div class="route-container">
    <RouterView />
  </div>
</template>

<style>
@import '@/assets/base.css';

#app {
  width: 100vw;
  font-weight: normal;
}

header {
  line-height: 1.5;
}

a,
.green {
  text-decoration: none;
  color: hsla(160, 100%, 37%, 1);
  transition: 0.4s;
}

@media (hover: hover) {
  a:hover {
    background-color: hsla(160, 100%, 37%, 0.2);
  }
}

.route-container {
  margin-top: 2.5rem;
  padding: 1rem;
}

@media (min-width: 1024px) {
  body {
    display: flex;
  }
}
</style>
