<script setup lang="ts">
const props = defineProps({
    name: String,
    id: String,
    featured: Boolean,
});
</script>

<template>
<router-link :to="{ name: 'stationDetail', params: {id: id} }">
    <span :class="{ 'bold': featured }">{{name}}</span>
</router-link>
</template>

<style>
.bold {
    font-weight: 700;
}
</style>
