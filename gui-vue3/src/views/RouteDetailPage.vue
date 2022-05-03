<script setup lang="ts">
import { onBeforeMount, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import { getRouteAndTrips } from '../api';

// import MultiTimetable from '@/components/MultiTimetable.vue';
import MultiTimetable from '@/components/MultiTimetableWithGrid.vue';

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
});


</script>

<template>
<div class="detail-wrapper">
    <h3>
        {{route.shortName || route.longName}}
    </h3>
    <div v-if="route.url">
        <label>Website:</label>
        <a :href="route.url" target="_blank">{{route.url}}</a>
    </div>
    <div>
        <label>Trains:</label>
        {{route.trains?.length}} per day
        <!-- {{route.trains?.map(train => train.trainId)}} -->
    </div>

    <MultiTimetable class="mt-2" v-if="route.trains" :route="props.routeId" :trains="route.trains" />
</div>
</template>

<style scoped>
.detail-wrapper {
    background-color: lightblue;
}
</style>
