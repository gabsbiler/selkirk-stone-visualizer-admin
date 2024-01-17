<script setup lang="ts">
import UserStatsCard from '@/layouts/components/dashboard/summary/UserStatsCard.vue'
</script>

<template>
  <section>
    <h1 class="text-h5 text-primary">
      SUMMARY
    </h1>

    <VRow>
      <!-- Users Statistic Card -->
      <VCol
        cols="12"
        md="6"
      >
        <UserStatsCard />
      </VCol>
    </VRow>
  </section>
</template>
