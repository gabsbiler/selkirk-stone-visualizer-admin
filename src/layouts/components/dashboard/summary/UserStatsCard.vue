<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useTheme } from 'vuetify'
import axiosIns from '@/plugins/axios'
import { getLineChartConfig } from '@core/libs/chartjs/chartjsConfig'
import LineChart from '@core/libs/chartjs/components/LineChart'

const users_per_month = ref({})
const users_per_week = ref({})
const users_per_day = ref({})

const loading = ref(false)

const fetch = async () => {
  loading.value = true
  try {
    const response = await axiosIns.get('https://api.selkirkstone.app/api/analytics/user-stats')

    users_per_month.value = response.data.users_per_month
    users_per_week.value = response.data.users_per_week
    users_per_day.value = response.data.users_per_day
  }
  catch (e) {
    console.error(e)
  }
  finally {
    loading.value = false
  }
}

onMounted(fetch)

const filterTab = ref('week')
const vuetifyTheme = useTheme()

const users_per_week_data = computed(() => {
  return {
    labels: users_per_week.value ? Object.keys(users_per_week.value) : [],
    datasets: [
      {
        fill: false,
        label: 'User Growth',
        tension: 0.5,
        pointRadius: 1,
        pointHoverRadius: 5,
        pointStyle: 'circle',
        borderColor: 'green',
        backgroundColor: 'green',
        pointHoverBorderWidth: 1,
        pointHoverBorderColor: 'white',
        pointBorderColor: 'transparent',
        pointHoverBackgroundColor: 'green',
        data: users_per_week.value ? Object.values(users_per_week.value) : [],
      },
    ],
  }
})

const users_per_month_data = computed(() => {
  return {
    labels: users_per_month.value ? Object.keys(users_per_month.value) : [],
    datasets: [
      {
        fill: false,
        label: 'User Growth',
        tension: 0.5,
        pointRadius: 1,
        pointHoverRadius: 5,
        pointStyle: 'circle',
        borderColor: 'green',
        backgroundColor: 'green',
        pointHoverBorderWidth: 1,
        pointHoverBorderColor: 'white',
        pointBorderColor: 'transparent',
        pointHoverBackgroundColor: 'green',
        data: users_per_month.value ? Object.values(users_per_month.value) : [],
      },
    ],
  }
})

const users_per_day_data = computed(() => {
  return {
    labels: users_per_day.value ? Object.keys(users_per_day.value) : [],
    datasets: [
      {
        fill: false,
        label: 'User Growth',
        tension: 0.5,
        pointRadius: 1,
        pointHoverRadius: 5,
        pointStyle: 'circle',
        borderColor: 'green',
        backgroundColor: 'green',
        pointHoverBorderWidth: 1,
        pointHoverBorderColor: 'white',
        pointBorderColor: 'transparent',
        pointHoverBackgroundColor: 'green',
        data: users_per_day.value ? Object.values(users_per_day.value) : [],
      },
    ],
  }
})

const chartConfig = computed(() => getLineChartConfig(vuetifyTheme.current.value))

const tabs = [
  { title: 'Month' },
  { title: 'Week' },
  { title: 'Day' },
]
</script>

<template>
  <VCard :loading="loading">
    <VCardText>
      <VTabs
        v-model="filterTab"
        color="primary"
        align-tabs="right"
        class="v-tabs-pill"
      >
        <VTab
          v-for="tab in tabs"
          :key="tab.title"
        >
          {{ tab.title }}
        </VTab>
      </VTabs>
      <VWindow v-model="filterTab">
        <!-- Month -->
        <VWindowItem key="month">
          <LineChart
            :chart-options="chartConfig"
            :height="300"
            :chart-data="users_per_month_data"
          />
        </VWindowItem>

        <VWindowItem key="week">
          <LineChart
            :chart-options="chartConfig"
            :height="300"
            :chart-data="users_per_week_data"
          />
        </VWindowItem>
        <VWindowItem key="day">
          <LineChart
            :chart-options="chartConfig"
            :height="300"
            :chart-data="users_per_day_data"
          />
        </VWindowItem>
      </VWindow>
    </VCardText>
  </VCard>
</template>
