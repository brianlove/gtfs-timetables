<script setup lang="ts">

import type { NonBoundedTime } from '@/util';

const props = defineProps({
    arrive: {
        type: Object as PropType<NonBoundedTime>,
        required: true,
    },
    depart: {
        type: Object as PropType<NonBoundedTime>,
        required: true,
    },
    first: Boolean,
    last: Boolean,
    major: {
        type: Boolean,
        default: false,
    },
});
</script>

<template>
<td class="cell">
    <div v-if="last || major || (depart.subtract(arrive) > 5)">
        <span class="action">Ar</span>
        <span class="time">{{arrive}}</span>
    </div>
    <div v-if="!last">
        <span class="action">Dp</span>
        <span class="time">{{depart}}</span>
    </div>
</td>
</template>

<style scoped>
.cell {
    border: 1px solid #ccc;
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
</style>
