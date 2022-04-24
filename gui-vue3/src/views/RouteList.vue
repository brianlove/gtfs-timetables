<script setup lang="ts">
import { onBeforeMount, ref } from 'vue';

import { getAllRoutes } from '../api';

console.info("import.meta.env:", import.meta.env); // DEBUG

const routes = ref([]);

onBeforeMount(async () => {
    routes.value = await getAllRoutes();
    console.info("mounted and have data:", routes.value, routes); // DEBUG
});

</script>

<template>
<div>
    <!-- {{routes}} -->
    <div v-for="route in routes" :key="route.route_id">
        {{route.route_long_name}} ({{route.route_id}})
    </div>
</div>
</template>