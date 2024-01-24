<script setup lang="ts">
import UserStatsCard from '@/layouts/components/dashboard/summary/UserStatsCard.vue'
import MostFrequentCountry from '@/layouts/components/dashboard/userAnalytics/MostFrequentCountry.vue'
import MostUsedBrowser from '@/layouts/components/dashboard/userAnalytics/MostUsedBrowser.vue'
import UserAnalyticsCards from '@/layouts/components/dashboard/userAnalytics/UserAnalyticsCards.vue'
import UsersNewVisitor from '@/layouts/components/dashboard/userAnalytics/usersNewVisitor.vue'
</script>

<template>
  <section>
    <VRow>
      <VCol cols="12">
        <UsersNewVisitor />
      </VCol>
      <VCol cols="12">
        <UserAnalyticsCards />
      </VCol>
      <VCol cols="5">
        <MostFrequentCountry />
      </VCol>
      <VCol cols="7">
        <UserStatsCard />
      </VCol>
      <VCol cols="12">
        <MostUsedBrowser />
      </VCol>
    </VRow>
  </section>
</template>
