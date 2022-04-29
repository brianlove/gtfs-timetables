<script setup lang="ts">
import { computed, onBeforeMount, PropType, ref } from 'vue';

import type { Train } from '@/types';
import { MAJOR_STATIONS } from '@/util';

import TrainStopCell from './TrainStopCell.vue';

const props = defineProps({
    trains: {
        type: Object as PropType<Array<Train>>,
        required: true,
    },
    stations: {
        type: Array,
        required: false,
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

const stationMapping = computed(() => {
    const mapping = {};
    props.trains.forEach((train) => {
        const stationMap = {};
        train.trips[0].stops.forEach((stop) => {
            stationMap[stop.stopId] = stop;
        });
        mapping[train.trainId] = stationMap;
    });
    return mapping;
});

// onBeforeMount( () => {
//     // props.trains.value.forEach((train) => {
//     //     trainStations.value[train.trainId] = getStationMapping(train);
//     // });
// });


// function getStationMapping(train: Train) {
//     const mapping = {};
//     train.trips[0].stops.forEach((stop) => {
//         mapping[stop.stopId] = stop;
//     });
//     return mapping;
// }


</script>

<template>
<table class="sideways">
    <!--
        COMMENT:  Should I be using CSS Grid for this instead?
                  That would probably make it easier to make things the right size
                  And, I think you can select the directions (horiz or vert)
    -->
    <thead>
    </thead>
    <tbody>
        <tr class="table-row-stations">
            <th>&nbsp;</th>
            <th v-for="station in stations">
                {{station}}
            </th>
        </tr>
        <tr class="table-row-train" v-for="train in trainsInThisDirection">
            <th>{{train.trainId}}</th>
            <!-- <td v-for="station in stations">
                {{station}}
                {{stationMapping[train.trainId][station]}}
            </td> -->
            <!-- <td v-for="station in stations">
                {{trainStations[train.trainId][station]}}
            </td> -->
            <!-- <div> -->
            <td v-for="(station, ix) in stations">
                <TrainStopCell
                    v-if="stationMapping[train.trainId][station]"
                    class="table-col-train"
                    :arrive="stationMapping[train.trainId][station]?.arrivalTime"
                    :depart="stationMapping[train.trainId][station]?.departureTime"
                    :first="ix == 0"
                    :last="ix == stations.length - 1"
                    :major="MAJOR_STATIONS.includes(station)" />
                <div v-else>&nbsp;</div>
            </td>
            <!-- </div> -->
        </tr>
    </tbody>
</table>
</template>

<style scoped>
table {
    background-color: lightyellow;
    border: 1px solid #ccc;
}

table.sideways {
    display: flex;
}

table.sideways tr {
    display: block;
    float: left;
}

tr.table-row-train {
    width: 80px;
}

table.sideways th,
table.sideways td {
    display: block;
}

th {
    background-color: #bbc;
    background-clip: padding-box;
    border: 1px solid #333;
    font-weight: 700;
    text-align: center;
}

td {
    background-clip: padding-box;
    border-color: #ccc;
    border-style: solid;
    border-width: 1px;
    /* border: 1px solid #ccc; */
    width: 80px;
}

.station {
    background-color: lightgreen;
    margin-bottom: 0.25rem;
}
</style>
