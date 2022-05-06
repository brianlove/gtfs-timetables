<script setup lang="ts">
import { computed, onBeforeMount, ref } from 'vue';

import { getAllStations } from '../api';

const stations = ref([]);
const filterString = ref("");
const filteredStations = computed(() => {
    if ( filterString.value?.length && filterString.value.length > 0 ) {
        return stations.value.filter((station) => {
            return (
                station?.stop_name.includes(filterString.value) ||
                station?.stop_id.includes(filterString.value)
            );
        });
    } else {
        return stations.value;
    }
});

onBeforeMount(async () => {
    stations.value = await getAllStations();
});
</script>

<template>
<div>
    <div class="button-bar mb-2">
        <input type="text" class="form-control" v-model="filterString" />
    </div>
    <ul>
        <li v-for="station in filteredStations" :key="station.stop_id">
            <router-link :to="{ name: 'stationDetail', params: {id: station.stop_id}}">
                {{station.stop_name}}
            </router-link>
        </li>
    </ul>
</div>
</template>