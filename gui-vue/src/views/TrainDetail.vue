<script setup lang="ts">
import { onBeforeMount, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import { getTrainDetail } from '../api';

const props = defineProps({
    trainId: Number,
});

const router = useRouter();
const route = useRoute();

const rawDetails = ref([]);
const trips = ref([]);
// const stations = ref([]);

onBeforeMount( async () => {
    console.info('mounting...');
    rawDetails.value = await getTrainDetail(props.trainId);
    rawDetails.value.forEach((train, ix) => {
        console.info("train:", train); // DEBUG
        const {stop_times, ...basics} = train;
        console.info(ix, basics, stop_times); // DEBUG
        trips.value.push({
            basics,
            stop_times,
            stations: stop_times.map(entry => entry.stop_id),
        })
    });
})

</script>

<template>
<div>
    <div class="detail" v-for="(detail, index) in trips" :key="index">
        <!-- {{detail}} -->
        {{detail.basics}}
        <div class="stations">
            {{detail.stations}}
        </div>
    </div>
</div>
</template>

<style>
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
