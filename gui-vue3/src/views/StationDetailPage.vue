<script setup lang="ts">
import { computed, onBeforeMount, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import { getStationAndTrains } from '@/api';

import TrainLink from '@/components/TrainLink.vue';

const props = defineProps({
    stationId: {
        type: String,
        required: true,
    },
});

const VueRouter = useRouter();
const VueRoute = useRoute();

const station = ref({});

onBeforeMount( async () => {
    station.value = await getStationAndTrains(props.stationId);
});
</script>

<template>
<div class="wrapper">
    <h3>
        {{station.name}}
    </h3>
    <div class="mb-2" v-if="station.trips">
        <label>Trains per day:</label>
        {{station.trips?.length}}
    </div>

    <div class="train-list">
        <div class="train-detail" v-for="train in station.trips">
            <TrainLink :train="train" />
        </div>
    </div>
</div>
</template>

<style>
.train-list {
    display: grid;
    gap: 1rem;
    grid-template-columns: repeat(auto-fill, 240px);
}

.train-detail {
    border: 1px solid #ddd;
    padding: 0.25rem;
}
</style>
