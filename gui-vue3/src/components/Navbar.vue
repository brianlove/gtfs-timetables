<script setup lang="ts">
</script>

<template>
<nav class="navbar navbar-expand-lg fixed-top navbar-dark bg-dark">
    <RouterLink class="navbar-brand" to="/">
        GTFS Timetables
    </RouterLink>
    <ul class="navbar-nav mr-2">
        <li class="nav-item">
            <RouterLink class="nav-link" to="/routes">
                Routes
            </RouterLink>
        </li>
        <!--
        <li class="nav-item">
            <RouterLink class="nav-link" to="/stations">
                Stations
            </RouterLink>
        </li>
        -->
    </ul>
</nav>
</template>

<style scoped>
.navbar {
    color: white;
    padding: 0;
}

.navbar-brand {
    padding-left: 0.5rem;
    padding-right: 0.5rem;
}

.brand {
    color: white;
    font-weight: 700;
}

nav a {
    color: white;
}

nav a:focus,
nav a:hover {
    color: lightblue;
    text-decoration: none;
}
</style>