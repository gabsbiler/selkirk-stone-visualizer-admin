<script setup lang="ts">
import MostFrequentCountry from '@/layouts/components/dashboard/userAnalytics/MostFrequentCountry.vue'
import MostUsedBrowser from '@/layouts/components/dashboard/userAnalytics/MostUsedBrowser.vue'
import UserAnalyticsCards from '@/layouts/components/dashboard/userAnalytics/UserAnalyticsCards.vue'
import UsersNewVisitor from '@/layouts/components/dashboard/userAnalytics/usersNewVisitor.vue'
import axios from '@axios'
import { VDateInput } from 'vuetify/labs/VDateInput'

const dateRange = ref()
const loading = ref(true)
const data = ref({})
const days = ref(30)

const getDefaultDateRange = () => {
  const start = new Date()
  start.setHours(0, 0, 0, 0)
  start.setDate(start.getDate() - 1)
  const end = new Date(start.getTime())
  end.setDate(end.getDate() + 1)
  var range = []
  while (start <= end) {
    range.push(new Date(start))
    start.setDate(start.getDate() + 1)
  }
  return range
}

const dateWithoutTimezone = (date, additionalDays) => {
  const tzoffset = date.getTimezoneOffset() * 60000
  const withoutTimezoneDate = new Date(date.valueOf() - tzoffset)
  if (additionalDays) withoutTimezoneDate.setDate(withoutTimezoneDate.getDate() + additionalDays)
  return withoutTimezoneDate.toISOString().slice(0, -1)
}

const getData = async () => {
  loading.value = true

  let url = '/analytics/user-data'
  if (dateRange.value) url += `?start=${dateWithoutTimezone(dateRange.value[0])}&end=${dateWithoutTimezone(dateRange.value[dateRange.value.length - 1], 1)}`

  const response = await axios.get(url)

  data.value = response.data
  loading.value = false
}

watch(days, () => getData(), {})

onMounted(() => {
  dateRange.value = getDefaultDateRange()
  getData()
})
</script>

<template>
  <section>
    <VRow>
      <VCol cols="12">
        <VCard>
          <VDateInput 
            v-model="dateRange" 
            variant="solo" 
            density="compact"
            color="primary" 
            label="Date range" 
            multiple="range"
            :disabled="loading"
            v-on:update:model-value="getData"
            hide-details
            prepend-icon=""
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
