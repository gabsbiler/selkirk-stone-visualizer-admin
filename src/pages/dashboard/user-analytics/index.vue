<script setup lang="ts">
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
    </VRow>
  </section>
</template>
