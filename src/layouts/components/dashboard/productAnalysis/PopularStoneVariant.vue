<script setup lang="ts">
import axiosIns from '@/plugins/axios'
import { VDataTable } from 'vuetify/components'
import { VDateInput } from 'vuetify/labs/VDateInput'

const search = ref()
const dateRange = ref()
const loading = ref(true)

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

const header = [
  { title: 'No', key: 'rank', sortable: false },
  { title: 'Stone Profile', key: 'stone_category' },
  { title: 'Stone Color', key: 'stone_color' },
  { title: 'Count', key: 'count' },
]

const items = ref([])

const indexedItems = computed(() => {
  return items.value.map((item, index) => {
    return { ...item, index: index + 1 } // Add 1 to start the index at 1 instead of 0
  })
})

const fetch = async () => {
  loading.value = true
  try {
    let url = 'https://selkirkappapi-staging.azurewebsites.net/api/analytics/stone-stats/'
    if (dateRange.value) url += `?start=${dateWithoutTimezone(dateRange.value[0])}&end=${dateWithoutTimezone(dateRange.value[dateRange.value.length - 1], 1)}`

    const response = await axiosIns.get(url)

    items.value = response.data
  }
  catch (e) {
    console.log(e)
  }
  finally {
    loading.value = false
  }
}

onMounted(() => {
  dateRange.value = getDefaultDateRange()
  fetch()
})
</script>

<template>
  <VCard :loading="loading">
    <VCardTitle class="d-flex align-center">
      <VCol>
        Ranking of Popular Stone Variant
      </VCol>
      <VCol
        cols="12"
        md="3"
      >
        <VDateInput 
          v-model="dateRange" 
          variant="outlined" 
          color="primary" 
          label="Date range" 
          multiple="range"
          :disabled="loading"
          v-on:update:model-value="fetch"
          hide-details
        />
      </VCol>
      <VCol
        cols="12"
        md="2"
      >
        <VTextField
          v-model="search"
          label="Search"
        />
      </VCol>
    </VCardTitle>
    <VCardText>
      <VDataTable
        :headers="header"
        :items="indexedItems"
        :search="search"
      >
        <template v-slot:item.index="{ item }">
          {{ item.value.index }}
        </template>
      </VDataTable>
    </VCardText>
  </VCard>
</template>
