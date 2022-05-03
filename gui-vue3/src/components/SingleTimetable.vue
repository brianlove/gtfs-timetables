<script setup lang="ts">
import { onBeforeMount, PropType, ref } from 'vue';

import type { Trip } from '@/types';
import { MAJOR_STATIONS } from '@/util/amtrak';

import TrainStopCell from './TrainStopCell.vue';

const props = defineProps({
    trip: {
        type: Object as PropType<Trip>,
        required: true,
    },
});
</script>

<template>
<div>
    <table>
        <thead>
            <tr>
                <th class="table-col-station"></th>
                <th class="table-col-train">{{trip.shortName}}</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(stop, ix) in trip.stops" :key="ix">
                <th class="table-col-station">
                    {{stop.stopId}}
                </th>
                <TrainStopCell
                    class="table-col-train"
                    :arrive="stop.arrivalTime"
                    :depart="stop.departureTime"
                    :first="ix == 0"
                    :last="ix == trip.stops.length - 1"
                    :major="MAJOR_STATIONS.includes(stop.stopId)" />
            </tr>
        </tbody>
    </table>
</div>
</template>

<style scoped>
table {
    background-color: lightyellow;
    border: 1px solid #ccc;
}

th {
    background-color: #bbc;
    background-clip: padding-box;
    border: 1px solid #333;
    font-weight: 700;
    text-align: center;
}

.station {
    background-color: lightgreen;
    margin-bottom: 0.25rem;
}
</style>
