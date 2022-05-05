<script setup lang="ts">
import { computed, onBeforeMount, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import { getRouteAndTrips } from '@/api';
import { generateTimetable } from '@/util/convert';

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
const direction = ref(1);
const sortStation = ref('NYP');

const trainsInThisDirection = computed(() => {
    if ( route.value ) {
        return route.value.trains.filter(train => train.direction == direction.value);
    } else {
        return [];
    }
});

const stations = computed(() => {
    if ( props.route == 88 ) {
        return STATIONS_BY_ROUTE[88];
    } else if ( trainsInThisDirection ) {
        // This needs to be fixed to incorporate all the stops from all the trains we're dealing with
        return trainsInThisDirection.value[0].trips[0].stops.map(stop => stop.stopId);
    } else {
        return [];
    }
});

const timetable = computed(() => {
    if ( trainsInThisDirection ) {
        return generateTimetable(trainsInThisDirection.value, sortStation.value);
    } else {
        return {};
    }
});


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
    </div>

    <div class="button-bar mt-2">
        <div id="direction-toggle">
            <label>
                Direction:
            </label>
            <div class="btn-group">
                <button type="button" class="btn btn-sm btn-outline-secondary" :class="{ active: direction == 0 }" @click="direction = 0">
                    Northbound (0)
                </button>
                <button type="button" class="btn btn-sm btn-outline-secondary" :class="{ active: direction == 1 }" @click="direction = 1">
                    Southbound (1)
                </button>
            </div>
        </div>
    </div>

    <MultiTimetable
        v-if="route.trains"
        class="mt-2"
        :stations="stations"
        :timetable="timetable" />
</div>
</template>

<style scoped>
.detail-wrapper {
    background-color: lightblue;
}
</style>
