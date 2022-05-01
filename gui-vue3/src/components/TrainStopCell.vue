<script setup lang="ts">
import { computed } from 'vue';

import { NonBoundedTime, TimeObject } from '@/util';

const props = defineProps({
    arrive: {
        type: Object as PropType<TimeObject>,
        required: true,
    },
    depart: {
        type: Object as PropType<TimeObject>,
        required: true,
    },
    first: Boolean,
    last: Boolean,
    major: {
        type: Boolean,
        default: false,
    },
});

const arrivalTime = computed(() => {
    return new NonBoundedTime(props.arrive);
});

const departureTime = computed(() => {
    return new NonBoundedTime(props.depart);
});
</script>

<template>
<div class="cell" :class="{major: major}">
    <div v-if="arrive && depart">
        <div v-if="last || (major && !first)">
            <span class="action">Ar</span>
            <span class="time">{{arrivalTime}}</span>
        </div>
        <div v-if="!last">
            <span class="action">Dp</span>
            <span class="time">{{departureTime}}</span>
        </div>
    </div>
    <div v-else>
        &nbsp;
    </div>
</div>
</template>

<style scoped>
.cell {
    /* border: 1px solid #ccc; */
    display: flex;
    flex-direction: column;
    padding-left: 0.25rem;
    padding-right: 0.25rem;
    text-align: right;
    width: 80px;
}

.cell div {
    overflow: hidden;
}

.action {
    color: #888;
    float: left;
}

.time {
    float: right;
}

.major .action,
.major .time {
    font-weight: bold;
}
</style>
