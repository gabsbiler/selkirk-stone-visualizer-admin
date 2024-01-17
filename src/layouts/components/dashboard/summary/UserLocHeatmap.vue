<script setup lang="ts">
const googleMap = ref(null)
const mapRef = ref(null)

onMounted(() => {
  if (window.google && window.google.maps)
    initMap()
  else
    console.error('Google Maps JavaScript API not loaded')
})

function initMap() {
  const mapOptions = {
    zoom: 4,
    center: { lat: 43.6532, lng: -79.3832 }, // Example location
    mapTypeId: 'roadmap',
  }

  mapRef.value = new google.maps.Map(googleMap.value, mapOptions)

  const heatmapData = [
    { location: new google.maps.LatLng(43.7, -79.4), weight: 0.5 },

    // Add more data points here
  ]

  const heatmap = new google.maps.visualization.HeatmapLayer({
    data: heatmapData,
    map: mapRef.value,
  })
}
</script>

<template>
  <section>
    <VCard
      title="User Location"
      height="400"
    >
      <VCardText>
        <div
          ref="googleMap"
          class="google-map"
        />
      </VCardText>
    </VCard>
  </section>
</template>

<style>
.google-map {
  block-size: 280px; /* Set a specific height to ensure the map displays */
}
</style>
