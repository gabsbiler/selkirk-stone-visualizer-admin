<script setup lang="ts">
import MostFrequentCountry from '@/layouts/components/dashboard/userAnalytics/MostFrequentCountry.vue'
import MostUsedBrowser from '@/layouts/components/dashboard/userAnalytics/MostUsedBrowser.vue'
import UserAnalyticsCards from '@/layouts/components/dashboard/userAnalytics/UserAnalyticsCards.vue'
import UsersNewVisitor from '@/layouts/components/dashboard/userAnalytics/usersNewVisitor.vue'
import axios from '@axios'

const data = ref({})
const days = ref(30)

const getData = async () => {
  const response = await axios.get('/analytics/user-data')

  data.value = response.data
}

onMounted(() => {
  getData()
})
</script>

<template>
  <section>
    <VRow>
      <VCol cols="12">
        <UsersNewVisitor :data="data['users_visits']" :days="days" />
      </VCol>
      <VCol cols="12">
        <UserAnalyticsCards :data="data['users_sessions']" />
      </VCol>
      <VCol cols="6">
        <MostFrequentCountry :data="data['users_countries']" />
      </VCol>
      <VCol cols="6">
        <MostUsedBrowser :data="data['users_browsers']" />
      </VCol>
    </VRow>
  </section>
</template>
