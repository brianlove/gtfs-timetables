<script setup lang="ts">
import { computed } from 'vue';

import type { StopAndTrip } from '@/types';
import { NonBoundedTime } from '@/util';

const props = defineProps({
    train: {
        type: Object as PropType<StopAndTrip>,
        required: true,
    },
})

const arrivalTime = computed(() => {
    return new NonBoundedTime(props.train.stop.arrivalTime);
});

const departureTime = computed(() => {
    return new NonBoundedTime(props.train.stop.departureTime);
});
</script>

<template>
<div>
    <div>
        <router-link class="route" :to="{ name: 'routeDetail', params: {id: props.train.trip.routeId} }">
            {{props.train.trip.routeShortName || props.train.trip.routeLongName}}
        </router-link>

        <router-link class="train" :to="{ name: 'train', params: {id: props.train.trip.shortName} }">
            #{{props.train.trip.shortName}}
        </router-link>
    </div>
    <div>
        <div>
            <label>To:</label>
            {{props.train.trip.headsign}}
        </div>
        <div>
            <label>Arrives:</label>
            {{arrivalTime}}
        </div>
        <div>
            <label>Departs:</label>
            {{departureTime}}
        </div>
    </div>
</div>
</template>

<style scoped>
.route {
    font-weight: 700;
}
</style>
