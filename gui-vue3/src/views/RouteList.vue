<script setup lang="ts">
import { onBeforeMount, ref } from 'vue';

import { getAllRoutes } from '../api';

const routes = ref([]);

onBeforeMount(async () => {
    routes.value = await getAllRoutes();
});
</script>

<template>
<ul>
    <li v-for="route in routes" :key="route.route_id">
        <router-link :to="{ name: 'routeDetail', params: {id: route.route_id}}">
            {{route.route_long_name}}
        </router-link>
    </li>
</ul>
</template>