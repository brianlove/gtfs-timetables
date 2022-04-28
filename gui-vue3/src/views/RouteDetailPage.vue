<script setup lang="ts">
import { onBeforeMount, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import { getRouteAndTrips } from '../api';

import MultiTimetable from '@/components/MultiTimetable.vue';

const props = defineProps({
    routeId: {
        type: Number,
        required: true,
    },
});

const VueRouter = useRouter();
const VueRoute = useRoute();

const route = ref({});
const stations = ref([]);

onBeforeMount( async () => {
    route.value = await getRouteAndTrips(props.routeId);
    stations.value = route.value.trains[0].trips[0].stops.map(stop => stop.stopId);
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
        {{route.trains?.map(train => train.trainId)}}
    </div>

    <MultiTimetable v-if="route.trains" :trains="route.trains" :stations="stations" />
</div>
</template>

<style>

</style>
