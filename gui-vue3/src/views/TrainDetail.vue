<script setup lang="ts">
import { onBeforeMount, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import { getRoute, getTrainDetail } from '../api';
import SingleTimetable from '@/components/SingleTimetable.vue';

const props = defineProps({
    trainId: {
        type: Number,
        required: true,
    },
});

const VueRouter = useRouter();
const VueRoute = useRoute();

const train = ref([]);
const routeDetails = ref({});

onBeforeMount( async () => {
    console.info('mounting...');
    train.value = await getTrainDetail(props.trainId);
    routeDetails.value = await getRoute(train.value.routeId);
})

</script>

<template>
<div>
    <h3>
        {{routeDetails.route_long_name || 'Train'}} #{{trainId}}
    </h3>

    <div class="trip-selector">
        <button type="button" class="btn btn-outline-secondary" v-for="(trip, index) in train.trips" :key="index">
            {{trip.serviceStartDate}} &ndash; {{trip.serviceEndDate}}
        </button>
    </div>


    <div class="detail" v-for="(trip, index) in train.trips" :key="index">
        <div>
            <label>Line:</label>
            {{routeDetails.route_long_name}}
        </div>
        <div>
            <label>Destination:</label>
            {{trip.headsign}}
        </div>
        <div>
            <label>Service period:</label>
            {{trip.serviceStartDate}} &ndash; {{trip.serviceEndDate}}
        </div>
        <div v-if="routeDetails.route_url">
            <label>Website:</label>
            <a :href="routeDetails.route_url" target="_blank">{{routeDetails.route_url}}</a>
        </div>

        <hr />

        <SingleTimetable :trip="trip" />
    </div>

    <!-- <TrainTimetable :trips="trips" /> -->
</div>
</template>

<style>
label {
    font-weight: 700;
    margin-right: 0.25rem;
}

.trip-selector {
    margin-bottom: 0.5rem;
}

.trip-selector button {
    margin-right: 0.5rem;
}

.detail {
    background-color: lightblue;
    border: 1px solid gray;
    margin-bottom: 1rem;
    padding: 0.5rem;
}

.stations {
    background-color: salmon;
    padding: 0.5rem;
}
</style>
