<script setup lang="ts">
import { computed, onBeforeMount, PropType, ref } from 'vue';

import type { Train } from '@/types';
import { MAJOR_STATIONS, STATIONS_BY_ROUTE } from '@/util/amtrak';

import TrainStopCell from './TrainStopCell.vue';

const props = defineProps({
    route: {
        type: Number,
        required: true,
    },
    trains: {
        type: Object as PropType<Array<Train>>,
        required: true,
    },
});

const trainStations = ref({});

const trainsInThisDirection = computed(() => {
    if ( props.trains ) {
        return props.trains.filter(train => train.direction == 1);
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
})

const stationMapping = computed(() => {
    const mapping = {};
    props.trains.forEach((train) => {
        const stationMap = {};
        train.trips[0].stops.forEach((stop, ix) => {
            stationMap[stop.stopId] = {
                ...stop,
                first: ix == 0,
            };
        });
        mapping[train.trainId] = stationMap;
    });
    return mapping;
});
</script>

<template>
<table id="timetable">
    <tr class="header-wrapper">
        <th class="corner-cell"></th>
        <th class="station-header" :class="{ major: MAJOR_STATIONS.includes(station) }" v-for="station in stations">
            {{station}}
        </th>
    </tr>
    <div class="scrollable-wrapper">
        <tr class="train-wrapper" :data-train="train.trainId" v-for="train in trainsInThisDirection">
            <th class="train-header">
                {{train.trainId}}
            </th>
            <td class="cell" :class="{ major: MAJOR_STATIONS.includes(station) }" v-for="(station, ix) in stations" :data-station="station">
                <TrainStopCell
                    v-if="stationMapping[train.trainId][station]"
                    class="table-col-train"
                    :arrive="stationMapping[train.trainId][station]?.arrivalTime"
                    :depart="stationMapping[train.trainId][station]?.departureTime"
                    :first="stationMapping[train.trainId][station]?.first"
                    :last="ix == stations.length - 1"
                    :major="MAJOR_STATIONS.includes(station)" />
                <div v-else>&nbsp;</div>
            </td>
        </tr>
    </div>
</table>
</template>

<style>
#timetable {
    background-color: lightyellow;
    display: grid;
    grid-auto-flow: column;
    grid-auto-rows: minmax(30px, max-content);
    grid-template-columns: [station-start] 100px [station-end] repeat(4, 80px);
    grid-template-rows: [header-start] 30px [header-end] repeat(v-bind('stations.length'), max-content);
    height: 500px;
    overflow: auto;
    width: calc(100vw - 2rem);
}

.scrollable-wrapper,
.header-wrapper,
.train-wrapper {
    display: contents;
}

.corner-cell,
.station-header,
.train-header {
    background-color: #bbc;
    background-clip: padding-box;
    border: 1px solid #333;
    border-collapse: collapse;
    font-weight: 700;
    position: sticky;
    text-align: center;
}

.corner-cell {
    left: 0;
    top: 0;
    z-index: 15;
}

.station-header {
    left: 0;
    z-index: 10;
}

.station-header.major {
    background-color: steelblue;
    color: white;
}

.train-header {
    top: 0;
    z-index: 5;
}

td.cell {
    border: 1px solid #ccc;
}

td.cell:not(.major):nth-child(odd) {
    background-color: #efeff7;
}

td.cell:not(.major):nth-child(even) {
    background-color: #dfdfe7;
}

td.cell.major {
    background-color: lightsteelblue;
}

</style>
