<script setup lang="ts">
import { onBeforeMount, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import { getRouteAndTrips } from '../api';

const props = defineProps({
    routeId: {
        type: Number,
        required: true,
    },
});

const VueRouter = useRouter();
const VueRoute = useRoute();

const route = ref({});

onBeforeMount( async () => {
    route.value = await getRouteAndTrips(props.routeId);
})


</script>

<template>
<div>
    <h3>
        {{route.shortName || route.longName}}
    </h3>
    <div v-if="route.url">
        <label>Website:</label>
        <a :href="route.url" target="_blank">{{route.url}}</a>
    </div>
    <div>
        <label>Trains:</label>
        {{route.trains.map(train => train.trainId)}}
    </div>
</div>
</template>

<style>

</style>
