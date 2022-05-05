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
            <tr :class="{ major: MAJOR_STATIONS.includes(stop.stopId) }" v-for="(stop, ix) in trip.stops" :key="ix">
                <th class="table-col-station">
                    <router-link :to="{ name: 'stationPage', params: { id: stop.stopId } }">
                        {{stop.stopId}}
                    </router-link>
                </th>
                <td class="table-col-train">
                    <TrainStopCell
                        :arrive="stop.arrivalTime"
                        :depart="stop.departureTime"
                        :first="ix == 0"
                        :last="ix == trip.stops.length - 1"
                        :major="MAJOR_STATIONS.includes(stop.stopId)" />
                </td>
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

th.table-col-station {
    width: 100px;
}

tr.major th.table-col-station {
    background-color: steelblue;
    color: white;
}

tr.major th.table-col-station a {
    color: white;
}

tr:not(.major):nth-child(odd) td.table-col-train {
    background-color: #efeff7;
}

tr:not(.major):nth-child(even) td.table-col-train {
    background-color: #dfdfe7;
}

tr.major td.table-col-train {
    background-color: lightsteelblue;
}
</style>
