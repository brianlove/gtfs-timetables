<script setup lang="ts">
import HomeRouteLink from '@/components/HomeRouteLink.vue';
import HomeStationLink from '@/components/HomeStationLink.vue';
</script>

<template>
<main>
  <p>Timetable-based viewer for Amtrak's GTFS data schedules.</p>

  <div class="wrapper">
    <div class="routes">
      <h2>Routes</h2>
      <ul class="route-list">
        <li>
          <HomeRouteLink name="Acela Express" id="40571" />
        </li>
        <li>
          <HomeRouteLink name="Northeast Regional" id="88" :featured="true" /> &ndash; recommended
        </li>
        <li>
          <HomeRouteLink name="Keystone Service" id="94" />
        </li>
        <li>
          <HomeRouteLink name="Hiawatha Service" id="54" />
        </li>
      </ul>
      <router-link to="/routes">
        View all available routes
      </router-link>
    </div>

    <div class="stations">
      <h2>Stations</h2>
      <ul class="station-list">
        <li>
          <HomeStationLink name="New York Penn Station" id="NYP" />
        </li>
        <li>
          <HomeStationLink name="Philadelphia 30th Street Station" id="PHL" />
        </li>
        <li>
          <HomeStationLink name="Washington Union Station" id="WAS" />
        </li>
        <li>
          <HomeStationLink name="Chicago Union Station" id="CHI" />
        </li>
        <li>
          <HomeStationLink name="St Paul Union Depot" id="MSP" />
        </li>
        <li>
          <HomeStationLink name="New York Penn Station" id="NYP" />
        </li>
      </ul>
      <router-link to="/stations">
        View all available stations
      </router-link>
    </div>
  </div>
</main>
</template>

<style scoped>
.wrapper {
  display: grid;
  gap: 1rem;
  grid-template-columns: 1fr 1fr;
}

.routes,
.stations {
  margin-bottom: 1rem;
}
</style>
