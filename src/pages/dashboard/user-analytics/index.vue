<script setup lang="ts">
import MostFrequentCountry from '@/layouts/components/dashboard/userAnalytics/MostFrequentCountry.vue'
import MostUsedBrowser from '@/layouts/components/dashboard/userAnalytics/MostUsedBrowser.vue'
import UserAnalyticsCards from '@/layouts/components/dashboard/userAnalytics/UserAnalyticsCards.vue'
import UsersNewVisitor from '@/layouts/components/dashboard/userAnalytics/usersNewVisitor.vue'
import axios from '@axios'

const loading = ref(true)
const data = ref({})
const days = ref(30)

const getData = async () => {
  loading.value = true

  const response = await axios.get(`/analytics/user-data?days=${days.value}`)

  data.value = response.data
  loading.value = false
}

watch(days, () => getData(), {})

onMounted(() => {
  getData()
})
</script>

<template>
  <section>
    <VRow>
      <VCol cols="12">
        <VCard>
          <VSelect
            v-model="days"
            :items="[{ title: 'Last 30 days', value: 30 }, { title: 'Last 60 days', value: 60 }, { title: 'Last 90 days', value: 90 }]"
            :disabled="loading"
            density="compact"
            variant="solo"
          />
        </VCard>
      </VCol>
      <VCol cols="12">
        <UsersNewVisitor
          :loading="loading"
          :data="data.users_visits"
          :days="days"
        />
      </VCol>
      <VCol cols="12">
        <UserAnalyticsCards
          :loading="loading"
          :data="data.users_sessions"
        />
      </VCol>
      <VCol cols="6">
        <MostFrequentCountry
          :loading="loading"
          :data="data.users_countries"
        />
      </VCol>
      <VCol cols="6">
        <MostUsedBrowser
          :loading="loading"
          :data="data.users_browsers"
        />
      </VCol>
    </VRow>
  </section>
</template>
