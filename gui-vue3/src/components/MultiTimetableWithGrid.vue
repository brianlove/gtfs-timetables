<script setup lang="ts">
import { computed, onBeforeMount, PropType, ref } from 'vue';

import type { Train } from '@/types';
import type { Timetable } from '@/types/timetable';
import { MAJOR_STATIONS, STATIONS_BY_ROUTE } from '@/util/amtrak';

import { generateTimetable } from '@/util/convert';

import TrainStopCell from './TrainStopCell.vue';

const props = defineProps({
    stations: {
        type: Array,
        required: true,
    },
    timetable: {
        type: Object as PropType<Timetable>,
        required: true,
    },
});
</script>

<template>
<table id="timetable">
    <tr class="header-wrapper">
        <th class="corner-cell"></th>
        <th class="station-header" :class="{ major: MAJOR_STATIONS.includes(station) }" v-for="station in props.stations">
            <router-link :to="{ name: 'stationDetail', params: { id: station } }">
                {{station}}
            </router-link>
        </th>
    </tr>
    <div class="scrollable-wrapper">
        <tr class="train-wrapper" :data-train="train.id" v-for="train in props.timetable.trains">
            <th class="train-header">
                <router-link :to="{ name: 'train', params: {id: train.id} }">
                    {{train.id}}
                </router-link>
            </th>
            <td class="cell" :class="{ major: MAJOR_STATIONS.includes(station) }" v-for="(station, ix) in props.stations" :data-station="station">
                <TrainStopCell
                    v-if="train.stations[station]"
                    class="table-col-train"
                    :arrive="train.stations[station]?.arrive"
                    :depart="train.stations[station]?.depart"
                    :first="train.stations[station]?.first"
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
    display: grid;
    grid-auto-flow: column;
    grid-auto-rows: minmax(30px, max-content);
    grid-template-columns: [station-start] 100px [station-end] repeat(4, 80px);
    grid-template-rows: [header-start] 30px [header-end] repeat(v-bind('stations.length'), max-content);
    height: calc(100vh - 220px);
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

.station-header.major a {
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
